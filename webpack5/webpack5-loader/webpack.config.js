const { resolve, join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 将css片段合并为一个单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const PurgeCssWebpackPlugin = require('purgecss-webpack-plugin')

const glob = require('glob')
const PATHS = {src: join(__dirname, 'src')}

module.exports = {
  mode: 'development',
  // webpack5中只有加入 target: 'web' 才会自动刷新浏览器
  target: 'web',
  entry: ['./src/js/index.js'],
  output: {
    filename: './js/bundle.js',
    path: resolve(__dirname, 'dist')
  },
  module: {
    // 以下loader会将css样式插入html的head中
    // 可以使用 mini-css-extract-plugin 插件提取的单独的css文件
    // 1. 引入mini-css-extract-plugin 插件
    // 2. 在loader中使用MiniCssExtractPlugin.loader 替换 'style-loader'
    rules: [
      // 1. css-loader和style-loader
      {
        // 处理 .css 结尾的文件
        test: /\.css$/,
        // 使用loader
        // loader执行顺序，从右到左，从下到上
        // npm i css-loader style-loader -D
        // use: ['style-loader', 'css-loader']
        // use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      // 2. less-loader和sass-loader
      // npm i less less-loader -D
      // npm i sass sass-loader -D
      {
        test: /\.less$/,
        // use: ['style-loader', 'css-loader', 'less-loader']
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        // use: ['style-loader', 'css-loader', 'sass-loader']
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader',
        options: {
          publicPath: './img',
          // 图片输出文件夹
          outputPath: '/img',
          // 限制图片大小，将小于1024*60即60kb的图片转为base64编码
          limit: 1024 * 60,
          name: '[name].[ext]'
        }
      },
      {
        // html-loader 处理在html页面中img标签使用src引入的图片资源
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  devServer: {
    port: 3000,
    // 启用压缩
    compress: true,
    // 自动打开浏览器
    open: true,
    // 开启HMR热更新
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    // 压缩css
    // new OptimizeCssAssetsWebpackPlugin()

    new PurgeCssWebpackPlugin({
      // 找到项目下的所有css文件
      paths: glob.sync(`${PATHS.src}/**/*`, {nodir: true})
    })
  ]
}