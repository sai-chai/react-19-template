const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
   entry: "./src/index.js",
   output: {
      path: path.join(__dirname, "build"),
      publicPath: "/",
      filename: "bundle.js"
   },
   devServer: {
      contentBase: path.join(__dirname, "build"),
      compress: true,
      port: 3000
   },
   devtool: "inline-source-map",
   watchOptions: {
      poll: 5000
   },
   plugins: [
      new HtmlWebPackPlugin({
         template: "./src/index.html",
         filename: "./index.html"
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
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
         },
         {
            test: /\.(png|jpg|gif)$/,
            use: [
               {
                  loader: "file-loader"
               }
            ]
         }
      ]
   }
};
