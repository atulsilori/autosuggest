const path = require("path");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractorPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { SubresourceIntegrityPlugin } = require("webpack-subresource-integrity");

const getTimeStamp = () => new Date().toISOString().replace(/[-:]/g, "");

module.exports = {
  mode: "production",
  target: "web",
  output: {
    path: path.join(__dirname, "../dist"),
    filename: `assets/js/bundle.main.[contenthash:8].${getTimeStamp()}.js`,
    chunkFilename: `assets/js/bundle.[name].[contenthash:8].${getTimeStamp()}.js`,
    crossOriginLoading: "anonymous",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: MiniCssExtractorPlugin.loader }, "css-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
  plugins: [
    new ProgressBarPlugin(),
    new MiniCssExtractorPlugin({
      filename: `assets/css/[name].[contenthash].${getTimeStamp()}.css`,
      chunkFilename: `assets/css/[id].[contenthash].${getTimeStamp()}.css`,
    }),
    new SubresourceIntegrityPlugin(),
  ],
};
