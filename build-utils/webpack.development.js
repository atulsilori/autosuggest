const path = require("path");
module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
    chunkFilename: "bundle.[name].js",
  },
  devServer: {
    port: 8080,
  },
};
