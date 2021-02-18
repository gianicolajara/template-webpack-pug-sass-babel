const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const pages = ["about"];

const pagesMap = pages.map((name) => {
  return new HtmlWebpackPlugin({
    template: `./src/pages/${name}.pug`,
    filename: `./${name}.html`,
    chunks: [`${name}`],
    hash: true,
  });
});

const babelRules = {
  test: /\.m?js$/i,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env"],
      cacheDirectory: true,
    },
  },
};

const pugRules = {
  test: /\.pug$/,
  use: [
    {
      loader: "pug-loader",
    },
  ],
};

const fileRules = {
  test: /\.(png|jpe?g|gif|svg)$/i,
  use: [
    {
      loader: "file-loader",
      options: {
        name: "[contenthash].[ext]",
        outputPath: "./assets/images",
      },
    },
    {
      loader: "image-webpack-loader",
    },
  ],
};

const sassRules = {
  test: /\.s[ac]ss$/i,
  use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
};

module.exports = {
  entry: {
    index: "./src/index.js",
    about: "./src/js/about.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.pug",
      filename: "./index.html",
      chunks: ["index"],
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: "css/main.css",
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: true,
    }),
  ].concat(pagesMap),
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[chunkhash].js",
  },
  module: {
    rules: [babelRules, fileRules, pugRules, sassRules],
  },
};
