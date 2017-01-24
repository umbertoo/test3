const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const API_URL_SDVOR = process.env.API_URL_SDVOR || 'https://www.sdvor.com/api/v1';
const API_URL_CATALOG = process.env.API_URL_CATALOG || 'https://catalog-api-dev.sdvor.com';
// const WriteFilePlugin = require('write-file-webpack-plugin');
const HOT_SERVER_URL = '/';
const devEntries = [

];

const commonPlugins = [

  new CopyWebpackPlugin([
    {from: 'public/favicon.ico', to: path.resolve(__dirname, './dist/assets/')},
    {from: 'public/manifest.json', to: path.resolve(__dirname, './dist')},
    {from: 'public/icons', to: path.resolve(__dirname, './dist/assets/icons')},
  ],{
    // By default, we only copy modified files during
    // a watch or webpack-dev-server build. Setting this
    // to `true` copies all files.
    copyUnmodified: false,
  }),

  // new webpack.NoErrorsPlugin(), // TODO: после разработки можно включить. чтобы не генерились файлы с ошибками
];


const devPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  // prints more readable module names in the browser console on HMR updates
];

// const productionPlugins = [
//   /*UglifyJsPlugin no longer switches loaders into minimize mode.
//    The minimize: true setting needs to be passed via loader options
//    in long-term. See loader documentation for relevant options.
//   The minimize mode for loaders will be removed in webpack 3 or later.
//   To keep compatibility with old loaders,
//   loaders can be switched to minimize mode via plugin LoaderOptionsPlugin:*/
//   new webpack.LoaderOptionsPlugin({
//     minimize: true,
//     debug: false,
//   }),
//   new webpack.optimize.UglifyJsPlugin({
//     compress: {
//       screw_ie8: true, // React doesn't support IE8
//       warnings: false,
//     },
//     mangle: {
//       screw_ie8: true,
//     },
//     output: {
//       comments: false,
//       screw_ie8: true,
//     },
//   }),
// ];

module.exports = (options = {}) => ({
  // context: path.join(__dirname, `${HOT_SERVER_URL}`),
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    // `webpack-hot-middleware/client?path=${HOT_SERVER_URL}__webpack_hmr&reload=true`,
    // 'webpack-hot-middleware/client?path=http://localhost:3001/__webpack_hmr&timeout=20000',
    // 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&overlay=false',
    // 'babel-polyfill',
    path.join(__dirname, 'src/index.js'),
    // './src/index.js',
  ],

  // devtool: NODE_ENV == 'development' ? 'cheap-inline-module-source-map' : false,
  output: {
    path: path.join(__dirname, '/dist'),
    // path: 'dist',
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  resolveLoader: {
    moduleExtensions: ['-loader'], // позволяет писать лодеры без '-loader' в конце имени
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|jsx)$/,
      //   loader: 'eslint',
      //   include: path.resolve('./src'),
      //   enforce: 'pre',
      // },
      // {
      //   test: /\.js$/,
      //   include: path.resolve('./src'),
      //   exclude: /node_modules/,
      //   loader: 'babel',
      // },
      {
        test: /\.(js|jsx)$/,
        use: [
          // 'eslint', //первым идет eslint, потом передается в babel
          'babel',
        ],
        include: path.resolve('./src'),
        // exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style',
          'css',
        ],
        include: path.resolve('./src'),
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file',
        query: {
              name: 'assets/[name].[hash:6].[ext]',
        },
      },
    ],
  },
  resolve: {
    // ## указываем где брать модули
    // по умалчанию уже смотрит modules: ["node_modules"]
    // меняем если надо указать особенный путь
    // modules: [
    //   'node_modules',
    //   path.resolve(__dirname, 'app'),
    // ],

    // ## указываем форматы которые определяются автоматически при импорте
    // т.е. когда пишем : import module from './module';
    // значение по умолчанию json и js
    // extensions: [".js", ".json"]

  },
  plugins: [


    // new WriteFilePlugin(),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      // template: path.resolve('./src/index.html'),
      // filename: path.resolve('./dist/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        API_URL_SDVOR: JSON.stringify(API_URL_SDVOR),
        API_URL_CATALOG: JSON.stringify(API_URL_CATALOG),
      },
    }),
    // ...devPlugins,

    //   new HtmlWebpackPlugin({
    //     inject: true,
    //     template: path.resolve('./src/index.html'),
    //     minify: (NODE_ENV == 'development' ?
    //     {
    //       removeComments: true,
    //       collapseWhitespace: true,
    //       removeRedundantAttributes: true,
    //       useShortDoctype: true,
    //       removeEmptyAttributes: true,
    //       removeStyleLinkTypeAttributes: true,
    //       keepClosingSlash: true,
    //       minifyJS: true,
    //       minifyCSS: true,
    //       minifyURLs: true,
    //     } :
    //     {}
    //   ),
    // }),
    /*UglifyJsPlugin no longer switches loaders into minimize mode.
    The minimize: true setting needs to be passed via loader options
    in long-term. See loader documentation for relevant options.
    The minimize mode for loaders will be removed in webpack 3 or later.
    To keep compatibility with old loaders,
    loaders can be switched to minimize mode via plugin LoaderOptionsPlugin:*/
    new webpack.LoaderOptionsPlugin({
      // minimize: true,
      debug: true,
    }),
    ...commonPlugins,
    // ...(NODE_ENV == 'development' ? devPlugins : productionPlugins),
  ],
});
