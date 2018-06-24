# Node-blog
基于nodejs的一个简单博客系统
## 开始
### 配置环境
安装git、Node、npm、mongodb
配置数据库
### 克隆代码
clone 代码到本地 git clone https://github.com/newcaptain/blog
### 运行
打开gitbash，执行node app.js ， 打开浏览器，输入http://localhost 就可以查看项目了
## 技术构成
### 前端技术框架
*html + css + js
* jquery 
* bootstrap
### 后端技术框架
* nodejs
* express
* mongodb
* mongoose
* ejs
## 总结

本项目虽然使用了nodejs， 但是并没有实现前后端分离，前端和后端的代码杂糅在一起，后来看了vue的文档，其实前后端可以做到分离。

开始构思并没有构思得比较好，数据库的模型没有想清楚就开始写代码，导致后面标签模块实现起来非常困难，后来认证想了一下，最后决定更改数据库。现在想来MVC中模型层是多么重要。
