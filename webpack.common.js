const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "src/scripts/main.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      { test: /\.(png|jpg|jpeg|svg|webp|gif)$/i, type: "asset/resource" },
      {
        test: /\.(css|scss|sass)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src/templates/index.html"),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/public/"),
          to: path.resolve(__dirname, "dist/"),
        },
      ],
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      skipWaiting: true,
      swDest: "./sw.bundle.js",
      runtimeCaching: [
        {
          urlPattern: ({ url }) =>
            url.href.startsWith("https://restaurant-api.dicoding.dev/images/medium"),
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "dicoding-restaurant-image-api",
            expiration: {
              maxEntries: 30,
              maxAgeSeconds: 7 * 24 * 60 * 60,
            },
          },
        },
        {
          urlPattern: ({ url }) => url.href.startsWith("https://restaurant-api.dicoding.dev"),
          handler: "StaleWhileRevalidate",
          options: { cacheName: "dicoding-restaurant-api" },
        },
        {
          urlPattern: ({ url }) => url.href.startsWith("https://fonts.gstatic.com"),
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "google-fonts-webfonts",
          },
        },
      ],
    }),
  ],
};
