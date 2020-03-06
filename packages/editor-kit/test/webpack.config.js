var path = require("path");

var config = {
  entry: {
    app: "./test/TestEditor.tsx"
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js",
    publicPath: "./test/dist"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: "awesome-typescript-loader" }]
  }
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.devtool = "eval";
  }
  return config;
};
