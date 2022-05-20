# webpack的各种loader
1. css-loader
   ```shell
   npm i style-loader css-loader -D
   ```
2. less-loader
   ```shell
   npm i less less-loader -D
   ```
3. sass-loader
   ```shell
   npm i sass-loader sass -D
   ```
4. 使用`mini-css-extract-plugin`插件提取的单独的css文件
   ```shell
   npm i mini-css-extract-plugin -D
   ```
   1. 引入mini-css-extract-plugin 插件
        ```js
        const MiniCssExtractPlugin = require('mini-css-extract-plugin')
        ```
   2. 在loader中使用 `MiniCssExtractPlugin.loader` 替换 `'style-loader'`
        ```js
      // use: ['style-loader', 'css-loader']
      use: [MiniCssExtractPlugin.loader, 'css-loader']
      // use: ['style-loader', 'css-loader', 'less-loader']
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      // use: ['style-loader', 'css-loader', 'sass-loader']
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        ```
5. 处理css的兼容性
   ```shell
   npm i postcss-loader postcss-preset-env -D
   ```
   1. 在每个样式`loader`后添加 `postcss-loader`
   ```js
      // use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
   ```
   2. 新建 `postcss.config.js`
   3. 在`package.json`中添加 `browserslist`
   
6. 压缩css，使用 `optimize-css-assets-webpack-plugin` 插件压缩css内容
   1. 引入插件
      ```shell
      npm i optimize-css-assets-webpack-plugin -D
      ```
   2. 使用插件
      ```js
        new OptimizeCssAssetsWebpackPlugin()
      ```
      
7. webpack 打包图片资源，使用 `url-laoder` 和 `file-loader`
   ```shell
      npm i url-loader file-loader -D
   ```
   ```js
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader',
        options: {
          // 图片输出文件夹
          outputPath: './img',
          // 限制图片大小，将小于1024*60即60kb的图片转为base64编码
          limit: 1024 * 60,
          name: '[name].[ext]'
        }
      }
   ```
   
8. html-loader 处理在html页面中img标签使用src引入的图片资源
   ```shell
      npm i html-loader -D
   ```
   ```js
      {
        // html-loader 处理在html页面中img标签使用src引入的图片资源
        test: /\.html$/,
        loader: 'html-loader'
      }
   ```
   
9. 配置开发服务器
   ```shell
      npm i webpack-dev-server -D
   ```
   ```shell
      webpack serve
      webpack serve --port 3000 --open
   ```
   ```js
      // webpack.config.js 
      // webpack5中只有加入 target: 'web' 才会自动刷新浏览器
      target: 'web'
   ```
   配置
   1. `packjson.json` 中
      ```json
      "scripts": {
        "dev": "webpack serve --mode development --port 3000 --open",
        "build": "webpack --mode production"
      }
      ```
   2. `webpack.config.js` 中
      ```js
      devServer: {
         port: 3000,
         // 启用压缩
         compress: true,
         // 自动打开浏览器
         open: true,
         hot: true
      }
      ```
      
10. 去除项目中无用的css代码
   ```shell
    npm i purgecss-webpack-plugin -D
   ```
   ```js
    const { resolve, join } = require('path')
    const PurgeCssWebpackPlugin = require('purgecss-webpack-plugin')
    
    const glob = require('glob')
    const PATHS = {src: join(__dirname, 'src')}
    
    new PurgeCssWebpackPlugin({
      // 异步找到项目下的所有css文件
      paths: glob.sync(`${PATHS.src}/**/*`, {nodir: true})
    })
   ```
      


   