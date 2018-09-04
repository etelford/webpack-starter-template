let webpack = require("webpack");
let path = require("path");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
let UglifyJsPlugin = require("uglifyjs-webpack-plugin");
let WriteManifestPlugin = require("./build/plugins/write-manifest-plugin");
let CleanDirectoryPlugin = require("./build/plugins/clean-directory-plugin");

module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
  },

  entry:
    ["./src/js/index.js", "./src/sass/app.scss"],

  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "js/[name].[chunkHash].js",
    publicPath: "/"
  },

  module: {
  	rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/css"
            }
          },
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
  	]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/app.[chunkHash].css",
      chunkFilename: "[id].css"
    }),

    new CleanDirectoryPlugin(["public/css", "public/js"]),

    new WriteManifestPlugin(),
  ]
};
