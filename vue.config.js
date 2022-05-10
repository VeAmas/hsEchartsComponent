module.exports = {
  lintOnSave: false,
  devServer: { overlay: { warning: false, errors: false } },
  publicPath: '/DocTest/',
  configureWebpack: config => {
    //配置成完整版以使用template
    config.resolve.alias.vue$ = 'vue/dist/vue.esm.js'; // 用 webpack 1 时需用 'vue/dist/vue.common.js'
    config.module.rules.push({
      test: /(\.md$)|(\.prettierrc$)/,
      use: [
        {
          loader: 'raw-loader'
        }
      ]
    });
  }
};
