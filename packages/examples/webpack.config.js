const TerserPlugin = require("terser-webpack-plugin");
var HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
var path = require("path");

var config = {
  entry: {
    app: "./src/Index.tsx"
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js",
    publicPath: "./dist"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
          output: {
            ascii_only: true
          }
        }
      })
    ]
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: "awesome-typescript-loader" }]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/bundle*.*js"]
    }),
    new HardSourceWebpackPlugin()
  ],
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  }
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.devtool = "eval";
  }
  return config;
};
