
var webpack = require('webpack');
var path = require('path');
var CompressionPlugin = require('compression-webpack-plugin');


module.exports={
    entry: [
        './src/index.js'
    ],
    output: {
        ascii_only: true,
        path: path.join(__dirname, 'web'),
        publicPath: '/',
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            { test: /\.json$/, loader: 'json' },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {test: /\.(woff|woff2).*$/, loader: "file-loader"},
            { test: /\.png$/, loader: "file-loader" },
            { test: /\.(ttf|eot|svg).*$/, loader: "file-loader" }
            // {test: /\.svg$/, loader: "file-loader"}
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({
          'process.env':{
              'NODE_ENV': JSON.stringify('production')
          }
      }),
      //
      new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false,
              screw_ie8: true
          },
          comments: false,
          sourceMap: false
      }),
            new CompressionPlugin({
          asset: "[path].gz[query]",
          algorithm: "gzip",
          test: /\.js$|\.html$/,
          threshold: 10240,
          minRatio: 0.8
      }),
        new webpack.NoErrorsPlugin()
    ]
};
