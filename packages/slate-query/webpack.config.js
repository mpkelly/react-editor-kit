const TerserPlugin = require("terser-webpack-plugin");
var HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
var path = require("path");

var config = {
  entry: {
    app: "./src/Index.ts",
  },
  output: {
    path: path.join(__dirname, "lib"),
    filename: "index.js",
    publicPath: "./lib",
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
          output: {
            ascii_only: true,
          },
        },
      }),
    ],
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: "awesome-typescript-loader" }],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/bundle*.*js"],
    }),
    new HardSourceWebpackPlugin(),
  ],
  externals: {
    slate: true,
    "slate-react": true,
  },
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.devtool = "eval";
  }
  return config;
};
