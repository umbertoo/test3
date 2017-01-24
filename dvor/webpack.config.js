const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyPlugin = require('purifycss-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || 'development';
//const API_URL_SDVOR = process.env.API_URL_SDVOR || 'https://www.sdvor-dev.com/api/v1';
//const API_URL_CATALOG = process.env.API_URL_CATALOG || 'https://catalog-api-dev.sdvor.com';
const API_URL_SDVOR = 'https://www.sdvor.com/api/v1';
const API_URL_CATALOG = 'https://catalog-api.sdvor.com';
// const API_URL_SDVOR = 'http://localhost:5000/api/sdvor';
// const API_URL_CATALOG = 'http://localhost:5000/api/catalog';
const HOT_SERVER_URL = '/';
const devEntries = [
  'react-hot-loader/patch',
  `webpack-hot-middleware/client?path=${HOT_SERVER_URL}__webpack_hmr&reload=true`,
];
function addHash(template, hash) {
  return NODE_ENV == 'production' ? template.replace(/\.[^.]+$/,`.[${hash}]$&`) : `${template}?hash=[${hash}]`;
}
const commonPlugins = [
  new CleanWebpackPlugin('./dist', {
    dry: false,
    exclude: [],
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV),
      API_URL_SDVOR: JSON.stringify(API_URL_SDVOR),
      API_URL_CATALOG: JSON.stringify(API_URL_CATALOG),
    },
  }),
  new CopyWebpackPlugin(
    [
      {from: 'public/favicon.ico', to: path.resolve(__dirname, './dist/assets/')},
      {from: 'public/manifest.json', to: path.resolve(__dirname, './dist')},
      {from: 'public/icons', to: path.resolve(__dirname, './dist/assets/icons')},
    ],
    {
      // By default, we only copy modified files during
      // a watch or webpack-dev-server build. Setting this
      // to `true` copies all files.
      copyUnmodified: true,
    }
  ),
  //new webpack.NoErrorsPlugin(), // TODO: после разработки можно включить. чтобы не генерились файлы с ошибками
];
const devPlugins = [
  new ExtractTextPlugin('styles.css'),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
];
const productionPlugins = [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      screw_ie8: true, // React doesn't support IE8
      warnings: false,
    },
    mangle: {
      screw_ie8: true,
    },
    output: {
      comments: false,
      screw_ie8: true,
    },
  }),
  new ExtractTextPlugin('styles.css'),
  new PurifyPlugin({
    basePath: __dirname,
    purifyOptions: {
      minify: true,
    },
  }),
];
module.exports = (options = {}) => ({
  context: path.join(__dirname, `${HOT_SERVER_URL}`),
  entry: [
    'babel-polyfill',
    ...(NODE_ENV == 'development' ? devEntries : []),
    './src/index.js',
  ],
  devtool: NODE_ENV == 'development' ? 'cheap-inline-module-source-map' : false,
  output: {
    path: path.resolve('./dist'),
    filename: addHash('app.js', 'hash'),
    publicPath: `${HOT_SERVER_URL}`,
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [
      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        include: path.resolve('./src'),
        exclude: [/__tests__/],
        enforce: 'pre',
      },
      {
        test: /\.jsx?$/,
        include: path.resolve('./src'),
        exclude: [/node_modules/, /__tests__/],
        loader: 'babel',
      },
      {
        test: /\.css$/, loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader:[{
            loader:'css',
            query:{
              minimize:NODE_ENV=='development'?false:true,
            },
          },  
          ],
        }),
      },
      // JSON is not enabled by default in Webpack but both Node and Browserify
      // allow it implicitly so we also enable it.
      {
        test: /\.json$/,
        loader: 'json',
      },
      // "file" loader makes sure those assets end up in the `build` folder.
      // When you `import` an asset, you get its filename.
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file',
        query: {
          name: addHash('assets/[name].[ext]', 'hash'),
        },
      },
      //HTML error files (for github pages)
      {
        test: /\d{3}\.html$/,
        loader: 'file',
        query: {
          name: '[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('./src/index.html'),
      minify: (NODE_ENV == 'development' ?
        {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        }
        :
        {}
      ),
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    ...commonPlugins,
    ...(NODE_ENV == 'development' ? devPlugins : productionPlugins),
  ],
});