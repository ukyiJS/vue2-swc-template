const { join } = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const assetsDir = 'assets';

const config = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? false : 'source-map',
  stats: 'minimal',
  entry: {
    app: join(__dirname, 'src/main.ts'),
  },
  output: {
    path: join(__dirname, 'dist'),
    filename: `${assetsDir}/js/[name].[contenthash:8].js`,
    publicPath: '/',
    assetModuleFilename: `${assetsDir}/img/[name].[contenthash:8][ext][query]`,
  },
  resolve: {
    extensions: ['.js', '.ts', 'vue', 'json'],
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'swc-loader',
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'swc-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
      {
        test: /\.(css|s[ac]ss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: `${assetsDir}/css/[name].[contenthash:8].css`,
      ignoreOrder: true,
    }),
    new WebpackBar({
      name: isProd ? 'build' : 'app',
      color: isProd ? 'yellow' : 'green',
    }),
    new webpack.DefinePlugin({
      __VUE_PROD_DEVTOOLS__: !isProd,
      __VUE_HMR_RUNTIME__: !isProd,
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: 'body',
      meta: {
        webpack: true,
      },
      minify: {
        collapseWhitespace: isProd,
        removeComments: true,
      },
    }),
    new PreloadWebpackPlugin({
      rel: 'prefetch',
      include: 'asyncChunks',
      fileBlacklist: [
        /\.(png|svg|jpe?g)$/,
      ],
    }),
  ],
  optimization: {
    splitChunks: {
      maxSize: 300 * 1024,
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
        },
      },
    },
    moduleIds: 'deterministic',
    runtimeChunk: true,
  },
};

module.exports = config;
