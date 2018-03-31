
var express = require('express');
var router = express.Router();
var Tags = require('../models/tags');
var Article = require('../models/article');

//处理管理员主页路由
router.get('/',function(req,res){
    res.render('main');
});
router.get('/main',function(req,res){
    res.render('main');
});
// 管理添加文章页面路由
router.get('/addarticle',function(req,res){
    var tags = [];
    Tags.find({}).then((tagsinfo) =>{
        tagsinfo.forEach((k)=>{
            tags.push(k.name);
        });
        res.render('addarticle',{tags:tags});
    });
});
// 管理标签管理页面路由
router.get('/tag',function(req,res){
    res.render('tag');
})
//管理修改文章页面路由
router.get('/update',function(req,res){
    var id = req.query.q;
    console.log(id);
    var articletag = [];
    Article.findById(id).then(article=>{
        Tags.find({}).then( (tagsinfo)=>{
            var tmp = {};
            tagsinfo.forEach((tag)=>{
                tmp.name = tag.name;
                tmp.check = false;
                article.tags.forEach(item=>{
                    if(item == tmp.name){
                        tmp.check = true;
                    }
                });
                articletag.push(tmp);
            });
            console.log(articletag);
        });
    });
    
    
    res.render('update',{articleid: '5abf1f1b58ce65198c41fd6f',title:'这是传奇',summary:'这是简介',content:'这是内容',tags:[{name:'sfdfasdf',check:true},{name:'NodeJs',check:false}]});
});

module.exports = router;