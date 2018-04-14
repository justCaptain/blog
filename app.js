
// 加载express
var express = require('express');
var app = express();
//加载数据库
var mongoose = require('mongoose');
//加载path模块  
var path = require('path');
//加载body-parser模块
var bodyParser = require('body-parser');

// 设置模板引擎
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
//清除模板缓存
app.set('view cache', false);
//托管静态文件
app.use(express.static('public'));
// 解析body
app.use(bodyParser.urlencoded({extended: false}));

//设置管理员路由
app.use('/admin',require('./routers/admin'));
//设置主页路由
app.use('/',require('./routers/main'));
//设置API路由
app.use('/api',require('./routers/api'));

app.get('*',function(req,res){
    res.render('404');
})

mongoose.connect('mongodb://localhost:27017/blog',function(err){
    if(err){
        console.log('数据库连接失败');
    }else{
        console.log('数据库连接成功');
        //打开服务器
        app.listen(80);

        console.log('服务器已打开');
    }
});

