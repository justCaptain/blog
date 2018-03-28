
var express = require('express');
var router = express.Router();

//处理管理员主页路由
router.get('/',function(req,res){
    res.render('main');
});
router.get('/main',function(req,res){
    res.render('main');
});
// 管理增加文章页面路由
router.get('/addarticle',function(req,res){
    res.render('addarticle');
});
// 管理增加标签页面路由
router.get('/addtag',function(req,res){
    res.render('addtag');
})
//管理修改文章页面路由
router.get('/update',function(req,res){
    res.render('update');
});

module.exports = router;