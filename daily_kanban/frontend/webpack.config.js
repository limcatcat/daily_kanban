const path = require("path");
const webpack = require("webpack");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "../static/frontend"),
      filename: "main.js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    optimization: {
      minimize: isProduction,
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(isProduction ? 'production' : 'development'),
      }), 
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
  };
};