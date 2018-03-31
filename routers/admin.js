
var express = require('express');
var router = express.Router();

//处理管理员主页路由
router.get('/',function(req,res){
    res.render('main');
});
router.get('/main',function(req,res){
    res.render('main');
});
// 管理添加文章页面路由
router.get('/addarticle',function(req,res){
    res.render('addarticle',{tags:['node','javascript','java','C#']});
});
// 管理标签管理页面路由
router.get('/tag',function(req,res){
    res.render('tag');
})
//管理修改文章页面路由
router.get('/update',function(req,res){
    res.render('update',{title:'这是传奇',summary:'这是简介',content:'这是内容',tags:[{name:'sfdfasdf',check:true},{name:'NodeJs',check:false}]});
});

module.exports = router;