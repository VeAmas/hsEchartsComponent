const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const archiver = require('archiver');

/** 复制文件夹 抄来的 */
function copyFolderRecursiveSync(source, target) {
  var files = [];

  function copyFileSync(source, target) {
    var targetFile = target;

    // If target is a directory, a new file with the same name will be created
    if (fs.existsSync(target)) {
      if (fs.lstatSync(target).isDirectory()) {
        targetFile = path.join(target, path.basename(source));
      }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
  }

  // Check if folder needs to be created or integrated
  var targetFolder = path.join(target, path.basename(source));
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  // Copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function (file) {
      var curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        copyFileSync(curSource, targetFolder);
      }
    });
  }
}

async function main() {
  const read = url => fs.readFileSync(url, { encoding: 'utf-8' });

  /** 读取build目录下的三个模板文件 */
  let installScript = read(path.resolve(__dirname, './install.py'));
  let uninstallScript = read(path.resolve(__dirname, './uninstall.py'));
  let deployXml = read(path.resolve(__dirname, './deploy.xml'));
  /** 读取package.json */
  const packageJson = JSON.parse(
    read(path.resolve(__dirname, '../package.json'))
  );

  /** 获取项目名称和版本号 */
  const appName = packageJson.name;
  const version = packageJson.version;

  /** 覆盖模板文件里的版本号和项目名称 */
  installScript = installScript.replace(/#appName#/g, appName);
  uninstallScript = uninstallScript.replace(/#appName#/g, appName);
  deployXml = deployXml
    .replace(/#appName#/g, appName)
    .replace(/#version#/g, version);

  /** 如果tmp文件夹存在 先删除 */
  if (fs.existsSync(path.resolve(__dirname, '../tmp'))) {
    await new Promise(rev =>
      rimraf(path.resolve(__dirname, '../tmp'), e => {
        if (e) {
          console.error(e);
        } else {
          rev();
        }
      })
    );
  }

  /** 创建tmp文件夹结果 */
  fs.mkdirSync(path.resolve(__dirname, '../tmp'));
  fs.writeFileSync(path.resolve(__dirname, '../tmp/deploy.xml'), deployXml);
  fs.mkdirSync(path.resolve(__dirname, '../tmp/scripts'));
  fs.mkdirSync(path.resolve(__dirname, '../tmp/scripts/' + appName));
  fs.writeFileSync(
    path.resolve(__dirname, '../tmp/scripts/' + appName + '/install.py'),
    installScript
  );
  fs.writeFileSync(
    path.resolve(__dirname, '../tmp/scripts/' + appName + '/uninstall.py'),
    uninstallScript
  );
  fs.mkdirSync(path.resolve(__dirname, '../tmp/template'));
  /** 复制dist到tmp */
  copyFolderRecursiveSync(
    path.resolve(__dirname, '../dist/'),
    path.resolve(__dirname, '../tmp/')
  );
  /** 修改文件夹名称 */
  fs.renameSync(
    path.resolve(__dirname, '../tmp/dist'),
    path.resolve(__dirname, '../tmp/' + appName)
  );

  /** 打成zip */
  var output = fs.createWriteStream(
    path.resolve(__dirname, '../' + appName + '.zip')
  );
  var archive = archiver('zip');

  output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log(
      'archiver has been finalized and the output file descriptor has closed.'
    );

    /** 打包完成后删除tmp */
    rimraf(path.resolve(__dirname, '../tmp'), () => {});
  });

  archive.on('error', function (err) {
    throw err;
  });

  archive.pipe(output);

  // append files from a sub-directory, putting its contents at the root of archive
  archive.directory(path.resolve(__dirname, '../tmp'), false);

  archive.finalize();
}

main();
