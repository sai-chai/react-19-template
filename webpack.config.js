const {
   HotModuleReplacementPlugin,
   HashedModuleIdsPlugin,
} = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BabelMinifyPlugin = require('babel-minify-webpack-plugin');
const path = require('path');

const root = path.resolve();

const config = {
   mode: process.env.NODE_ENV,
   entry: {
      polyfills: path.join(root, "src", "polyfills.js"),
      index: path.join(root, "src", "client", "index.js"),
   },
   output: {
      path: path.join(root, "build"),
      publicPath: "/",
      filename: "[name].[contenthash].js",
   },
   plugins: [
      new CleanWebpackPlugin(),
      new HashedModuleIdsPlugin(),
      new HtmlWebpackPlugin({
         template: path.join(root, "src", "client", "index.html"),
         filename: "index.html",
      }),
   ],
   resolve: {
      modules: [
         path.join(root, 'src'),
         'node_modules',
      ],
   },
   optimization: {
      runtimeChunk: {
         name: 'single',
      },
      splitChunks: {
         chunks: 'all',
         minSize: 0,
         maxInitialRequests: Infinity,
         automaticNameDelimiter: '~',
         automaticNameMaxLength: 30,
         cacheGroups: {
            vendors: {
               test: /[\\/]node_modules[\\/]/,
               name (module) {
                  // credit: @davidgilbertson
                  const [, packageName] = module.context.match(
                     /[\\/]node_modules[\\/](?:(@[\w-]*?[\\/].*?|.*?)([\\/]|$))/
                  );
                  return `npm.${packageName.replace('@', '').replace(/[\\/]/, '.')}`;
               },
               priority: -10,
            },
            default: {
               priority: -20,
               reuseExistingChunk: true,
            },
         },
      },
   },
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ["babel-loader", "eslint-loader"],
         },
         {
            test: /\.html$/,
            use: [
               {
                  loader: "html-loader",
               },
            ],
         },
         {
            test: /\.s[ac]ss$/i,
            use: [
               "style-loader",
               "css-loader",
               "sass-loader",
            ],
         },
         {
            test: /\.(png|jpe?g|gif)$/,
            use: ["file-loader"],
         },
         {
            test: /\.svg$/,
            use: ['svg-inline-loader?classPrefix&idPrefix'],
         },
      ],
   },
};

if (process.env.NODE_ENV === "development") {
   config.plugins.push(new HotModuleReplacementPlugin());
   config.entry.client = path.join(root, "node_modules", "webpack-hot-middleware", "client");
   config.output.filename = "[name].[hash].js";
   config.devServer = {
      contentBase: path.join(root, "build"),
      compress: true,
      hot: true,
      port: 3000,
   };
   config.devtool = "inline-source-map";
   config.watchOptions = {
      poll: 5000,
   };
} else {
   config.plugins.push(new BabelMinifyPlugin());
}

module.exports = config;
