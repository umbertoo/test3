
const webpack = require('webpack');
const path = require('path');

const devFlagPlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': '"development"'
});
module.exports={
  // devtool: '#eval',

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
    externals: {
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true
    },
    plugins: [

        new webpack.optimize.OccurenceOrderPlugin(),
        devFlagPlugin,
        new webpack.NoErrorsPlugin()
    ]
};
