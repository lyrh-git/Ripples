'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {//服务器的代理规则,,通过这里访问后端java web项目
      '/api':{
        target:"http://175.24.101.5:8080",
        //secure:false,//如果是https的接口，需要配置这个参数
        changeOrigin:true,//如果接口跨域，需要进行这个参数配置
        pathRewrite:{
          '^/api':'/'
        }
      }
    },

    // },

    //arious Dev Server settings
    //host:'10.15.208.95',
    //host: '192.168.43.206', // can be overwritten by process.env.HOST
    //host:'127.0.0.1',
    host:'localhost',
    port: 80, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),//本地文件系统绝对路径，index.html会被生成

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),//指向包含应用程序的所有静态资产的根目录,public/对应Rails/laravel（一种后端）
    assetsSubDirectory: 'static',//被webpack编译处理过的资源文件，path/to/dist/static目录，，每次编译前这个目录都会清空
    assetsPublicPath: './',//通过http服务器运行的url路径

    /**
     * Source Maps
     */

    productionSourceMap: true,//在构建生产环境版本时是否开启source map
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css','jpg','png'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
