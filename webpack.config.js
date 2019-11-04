const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
   entry: {
      app: path.join(__dirname, "src", "index.js")
   },
   output: {
      path: path.join(__dirname, "build"),
      publicPath: "/",
      filename: "bundle.js"
   },
   target: "node",
   devServer: {
      contentBase: path.join(__dirname, "build"),
      compress: true,
      hot: true,
      port: 3000
   },
   devtool: "inline-source-map",
   watchOptions: {
      poll: 5000
   },
   plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
         template: path.join(__dirname, "src", "index.html"),
         filename: "index.html"
      })
   ],
   resolve: {
      modules: [
         path.resolve(__dirname, 'src'),
         'node_modules'
      ]
   },
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ["babel-loader", "eslint-loader"]
         },
         {
            test: /\.html$/,
            use: [
               {
                  loader: "html-loader"
               }
            ]
         },
         {
            test: /\.s[ac]ss$/i,
            use: [
               "style-loader",
               "css-loader",
               "sass-loader"
            ]
         },
         {
            test: /\.(png|jpe?g|gif)$/,
            use: ["file-loader"]
         },
         {
            test: /\.svg$/,
            use: ['svg-inline-loader?classPrefix&idPrefix']
         }
      ]
   }
};
