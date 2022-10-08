const path = require('path');
module.exports = {
  lintOnSave: false,
  devServer: { overlay: { warning: false, errors: false } },
  publicPath: '/DocTest/',
  configureWebpack: config => {
    //配置成完整版以使用template
    config.resolve.alias.vue$ = 'vue/dist/vue.esm.js'; // 用 webpack 1 时需用 'vue/dist/vue.common.js'
    config.resolve.alias['@@'] = path.resolve(__dirname, 'src/.hui');
    config.resolve.alias['@fais-store'] = path.resolve(__dirname, 'src/store');
    config.module.rules.push({
      test: /(\.md$)|(\.prettierrc$)/,
      use: [
        {
          loader: 'raw-loader'
        }
      ]
    });
    config.module.rules.push({
      test: /\.m?js$/,
      include: [path.resolve(__dirname, 'node_modules/@fais/tzjc-comps')],
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['babel-plugin-transform-vue-jsx']
        }
      }
    });
  }
};
