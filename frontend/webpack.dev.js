const { merge } = require("webpack-merge");
const path = require("path");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    publicPath: "/",
    overlay: true,
    port: 8081,
    stats: "errors-only",
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:3000",
      "/upload": "http://localhost:3000",
      "/socket.io": "http://localhost:3000",
    },
  },
});
