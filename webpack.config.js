// webpack.config.dev.js
var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'client');
var Mod_PATH = path.resolve(ROOT_PATH, 'node_modules');

var publicPath = 'http://localhost:3000/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

var devConfig = {
    entry: {
        page1: ['./client/views/index1', hotMiddlewareScript],
        // page2: ['./client/views/index2', hotMiddlewareScript]
    },
    output: {
        filename: './[name]/bundle.js',
        path: path.resolve('./public'),
        publicPath: publicPath,
    },
    devtool: 'source-map',
    module: {
        loaders: [
        {
          test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, 
          loader: 'url-loader?limit=50000&name=[path][name].[ext]'
        }, {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          include: APP_PATH      
        },{
          test: /\.css?$/,
          loaders: ['style-loader', 'css-loader']
        },{
          test: /\.less?$/,
          loaders: ['style-loader', 'css-loader', 'less-loader']
        },]
    },
    resolve: {
      extensions: ['.js', '.jsx', ".scss", ".less"],
      // 设置常用模块别名，优化webpack检索时间
      alias: {
        // 'jquery': 'client/utils/javascript/jquery-3.1.1.min.js',
        'react': path.join(Mod_PATH, 'react/dist/react.min.js'),
        'react-dom': path.join(Mod_PATH, 'react-dom/dist/react-dom.min.js'),
        'react-redux': path.join(Mod_PATH, 'react-redux/dist/react-redux.min.js'),
        'redux': path.join(Mod_PATH, 'redux/dist/redux.min.js'),
        'react-bootstrap': path.join(Mod_PATH, 'react-bootstrap/dist/react-bootstrap.min.js'),
      }
    },
    plugins: [
        // new webpack.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlwebpackPlugin({
          title: 'My first react app',
        }),
        new webpack.ProvidePlugin({
          $:"jquery",
          jQuery:"jquery",
          "window.jQuery":"jquery"
        })
    ]
};
module.exports = devConfig;