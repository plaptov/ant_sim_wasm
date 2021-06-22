const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  entry: "./bootstrap.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bootstrap.js",
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },

  module: {
    rules: [
        { test: /\.tsx?$/, loader: "ts-loader" },
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        { enforce: 'pre', test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  mode: "development",
  experiments: {
    syncWebAssembly: true
  },
  plugins: [
    new CopyWebpackPlugin({ patterns: ['index.html'] })
  ],
};
