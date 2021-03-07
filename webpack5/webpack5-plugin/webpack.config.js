// 导入nodejs原生path模块的resolve函数，获取当前项目的路径
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // mode 指定js压缩类型，development 为开发模式，production 为生产模式
  mode: 'development',
  // entry 指定webpack打包入口
  // 1. 单个入口文件
  // entry: './src/index.js',
  // 2. 多个入口文件，所有入口文件形成一个chunk，输出也只有一个bundle
  entry: {
    vendor: ['./src/js/jquery.js', './src/js/common.js'],
    index: './src/js/index.js',
    cart: './src/js/cart.js'
  },
  // output 指定webpack打包后生成的bundle资源输出到哪个目录，以及如何命名
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist')
  },
  // loader 让webpack 能够处理非js的静态资源，如img和css等，将它们处理成webpack能够识别的资源
  // 分模块导入loader
  module: {
    // rules 指定loader的规则
    rules: []
  },
  // plugins webpack插件，可用于执行范围更广的任务。包括打包、优化、压缩和重新定义环境中的变量等
  plugins: [
    // ***** 打包多html开发 *****

    // new HtmlWebpackPlugin() 默认会创建一个空的HTML文件，自动引入打包所输出的所有资源
    new HtmlWebpackPlugin({
      // 根据src/index.html 生成html模板
      template: './src/index.html',
      // filename 默认为index.html
      filename: 'index.html',
      chunks: ['index', 'vendor'],
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true
      }
    }),
    new HtmlWebpackPlugin({
      // 根据src/index.html 生成html模板
      template: './src/cart.html',
      // filename 默认为index.html
      filename: 'cart.html',
      chunks: ['cart', 'vendor'],
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true
      }
    })
  ]
}