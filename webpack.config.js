const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development', // enabled useful tools for development
  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  context: __dirname + '/client', // string (absolute path!)
  // the home directory for webpack
  // the entry and module.rules.loader option
  //   is resolved relative to this directory
  entry: './index.js',
  // Here the application starts executing
  // and webpack starts bundling
  module: {
  // configuration regarding modules
    rules: [
    // rules for modules (configure loaders, parser options, etc.)
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader', 
        query: {
          presets: ['react', 'es2015', 'env'],
          plugins: [['styled-components'], ['babel-plugin-styled-components']]
        },
      },
      {
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' 
      },
      {
      test: /\.scss$/,
      use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
      ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true // true outputs JSX tags
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  output: {
    path: __dirname + '/public',
    filename: 'app.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};