# TODOredux

## 简介

本Demo是使用React+redux作为前端框架，Express作为后端框架的todo清单项目，实现了清单项的创建、删除以及清单里面的任务项的创建、删除功能。

## 使用

### 下载源码

```bash
$ git clone https://github.com/Runtu4378/TODOredux.git
```

### 安装依赖

```bash
$ npm install
```

### 启动项目
```bash
$ npm run kaifa
```

然后打开浏览器，输入地址 `http://localhost:3000/` 即可进入demo页面

## 项目目录结构

```
┍client（项目源文件目录）
┃ ┝actions（action文件目录）
┃ ┝components（UI组件文件目录）
┃ ┝containers（容器组件文件目录）
┃ ┝utils（公用资源模块目录）
┃ ┝reducers（reducer文件目录）
┃ ┕view（对应后台的view视图文件的入口文件存放目录）
┃   ┝index1.jsx（view1入口文件）
┃   ┕index2.jsx（view2入口文件）
┝server（服务器文件目录）
┃ ┝views（view文件存放目录）
┃ ┕routes（route文件存放目录）
┝build（编译文件存放目录，可不创建）
┝node_modules（模块仓库）
┝app.js（后台入口文件）
┝.babelrc（babel配置文件）
┝package.json（项目描述文件）
┕webpack.config.js（webpack配置文件）
```

## 环境搭建教程

[React+Redux+webpack+Express应用环境搭建实战](http://runtu4378.github.io/2017/02/16/React-Redux-webpack%E5%BA%94%E7%94%A8%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E5%AE%9E%E6%88%98/)