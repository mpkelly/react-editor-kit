const TerserPlugin = require("terser-webpack-plugin");
var HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
var path = require("path");

var config = {
  entry: {
    app: "./src/Index.tsx",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js",
    publicPath: "./dist",
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".styl"],
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
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      {
        test: /\.styl$/i,
        use: "raw-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/bundle*.*js"],
    }),
    new HardSourceWebpackPlugin(),
    //new BundleAnalyzerPlugin(),
  ],
  externals: {
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "react-dom",
      root: "ReactDOM",
    },
    react: {
      commonjs2: "react",
      commonjs: "react",
      amd: "react",
      root: "React",
    },
  },
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.devtool = "eval";
  }
  return config;
};
