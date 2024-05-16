const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = () => {
  return {
    mode: "production",
    stats: "errors-warnings",
    target: "node",
    externalsPresets: { node: true },
    externals: [nodeExternals()],
    entry: "./server/server.js",
    output: {
      path: path.resolve(__dirname, "../dist/server"),
      filename: "app-prod.js",
      libraryTarget: "commonjs",
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: "ignore-loader",
            },
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", { targets: { node: "current" } }],
                ["@babel/preset-react"],
              ],
              plugins: [],
            },
          },
        },
      ],
    },
    experiments: {
      topLevelAwait: true,
    },
  };
};
