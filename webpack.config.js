const path = require("path");
var webpack = require("webpack");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenv = require("dotenv").config({ path: __dirname + "/.env" });

const modeConfig = (mode) => require(`./build-utils/webpack.${mode}`);
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (props) => {
  const mode = props?.development ? "development" : "production";

  return merge(
    {
      entry: "./src/index.js",
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "babel-loader",
          },
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.(less)$/,
            exclude: /\.module\.scss$/,
            use: [
              {
                loader: "style-loader",
              },
              {
                loader: "css-loader",
              },
              {
                loader: "less-loader",
              },
            ],
          },
          {
            test: /\.(sass|scss)$/,
            exclude: /\.module\.less$/,
            use: [
              {
                loader: "style-loader",
              },
              {
                loader: "css-loader",
              },
              {
                loader: "sass-loader",
              },
            ],
          },
          {
            test: /\.png/,
            type: "asset/resource",
          },
          {
            test: /\.(csv|tsv)$/,
            use: ["csv-loader"],
          },
          {
            test: /\.xml$/,
            use: ["xml-loader"],
          },
        ],
      },
      resolve: {
        extensions: [".js", ".jsx"],
      },
      plugins: [
        new webpack.DefinePlugin({
          "process.env": JSON.stringify(dotenv.parsed),
        }),
        new CleanWebpackPlugin({
          cleanBeforeBuildPatterns: [path.join(__dirname, "./dist")],
        }),
        new HtmlWebpackPlugin({
          template: path.join(__dirname, "/src/index.html"),
        }),
      ],
    },
    modeConfig(mode)
  );
};
