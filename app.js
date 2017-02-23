var express = require('express');
var app = express();
var bs = require('browser-sync').create();

//nodeJs模板引擎，选用ejs(需要安装)，如下配置才可正常使用.html文件作为view入口
app.engine('.html', require('ejs').__express);
//change the template main catelog
app.set('views',__dirname+'server/views/');
app.set('view engine','html')

// 设置以开发模式启动项目
app.locals.env = process.env.NODE_ENV || 'dev';
app.locals.reload = false;

var isDev = process.env.NODE_ENV !== 'production';

// 检查当前是否以开发模式启动项目，若是的话，启用webpack中间件生成预览服务器
if(isDev){
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const config = require('./webpack.config.dev.js');
    const compiler=webpack(config);
    app.use(webpackDevMiddleware(compiler,{
      publicPath:config.output.publicPath,
      noInfo: false,
      stats:{
        colors:true
      }
    }));
    app.use(webpackHotMiddleware(compiler));
    app.get('/', function (req, res) {
      res.render('./index.html');
    });
    app.listen(3000,function(){
        bs.init({
          open: false,
          ui: false,
          notify: false,
          proxy: 'loaclhost:3000',
          files: ['./client/**'],
          port: 8080
        })
        console.log("App (dev) is going to be running on port 8080 (by browsersync).");
    })
}