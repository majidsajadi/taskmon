const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const postcssImport = require("postcss-import");

require("dotenv").config();

module.exports = (_, { mode }) => {
  const isEnvDevelopment = mode === "development";
  const isEnvProduction = mode === "production";

  const config = {
    target: "web",
    mode: isEnvProduction ? "production" : isEnvDevelopment && "development",
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "index.bundle.js",
      publicPath: "/",
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    optimization: {
      minimize: isEnvProduction,
      minimizer: [new TerserPlugin()],
    },
    devtool: isEnvDevelopment ? "inline-source-map" : false,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: [
            // TODO: MiniCssExtractPlugin
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  ident: "postcss",
                  plugins: [postcssImport, tailwindcss, autoprefixer],
                },
              },
            },
          ],
        },
        {
          test: /\.(woff2|woff)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "static",
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html",
        inject: true,
        hash: true,
      }),
      new NodePolyfillPlugin(),
      new webpack.DefinePlugin({
        // env
      }),
    ],
  };

  if (isEnvDevelopment) {
    config.devServer = {
      static: "./build",
      hot: true,
      historyApiFallback: true,
      port: 3001,
      compress: true,
      open: true,
    };
  }

  return config;
};
