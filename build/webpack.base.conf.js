//webpack.base.conf.js基础webpack配置文件组要根据模式定义了入口出口，以及处理vue、babel等的各种模块

'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

//获取绝对路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

//定义一下代码检测的规则
const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay//index.js定义的false
  }
})

module.exports = {
  // 基础上下文
  context: path.resolve(__dirname, '../'),
  // webpack的入口文件
  /*
  entry: {
    app: './src/main.js'
  },*/
  	
  entry: ['babel-polyfill', './src/main.js'],

  // webpack的输出文件
  output: {
    path: config.build.assetsRoot,//..dist文件夹
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath//'/',通过http服务器运行的url路径
      : config.dev.assetsPublicPath
  },

  /**
   * 当webpack试图去加载模块的时候，它默认是查找以 .js 结尾的文件的，
   * 它并不知道 .vue 结尾的文件是什么鬼玩意儿，
   * 所以我们要在配置文件中告诉webpack，
   * 遇到 .vue 结尾的也要去加载，
   * 添加 resolve 配置项，如下：
   */
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),//@也可表示src目录
    }
  },

  // 不同类型模块的处理规则 就是用不同的loader处理不同的文件
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),//是否使用eslint检测规则（false）
      {
        test: /\.vue$/,// 对所有.vue文件使用vue-loader进行编译
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,// 对src和test文件夹下的.js文件使用babel-loader将es6+的代码转成es5
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,// 对图片资源文件使用url-loader
        loader: 'url-loader',
        options: {
          limit: 10000,// 小于10K的图片转成base64编码的dataURL字符串写到代码中
          name: utils.assetsPath('img/[name].[hash:7].[ext]')// 其他的图片转移到静态资源文件夹
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,// 对多媒体资源文件使用url-loader
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')// hash:7 代表 7 位数的 hash
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,// 对字体资源文件使用url-loader
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },

  node: {
    // prevent webpack from injecting（注入） useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
