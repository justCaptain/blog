var express = require('express');
var router = express.Router();
var Tags =require('../models/tags');
var Article = require('../models/article');
var moment = require('moment');

router.get('/',function(req,res){
    var page = req.query.page||1;
    var limit = 3;
    var pages = 0;
    Article.count().then(count =>{
        pages =  Math.ceil(count/limit);
        page = Math.min(page,pages);
        page = Math.max(page,1);
        Article.find({}).populate('tags').sort({'date':-1}).skip((page-1)*limit).limit(limit).then(articlesinfo=>{
            var nextbtn = true;
            var prebtn = true;
            if(page <= 1){
                prebtn = false;
            }
            if(page>= pages){
                nextbtn = false;
            }
            res.render('index',{articles:articlesinfo,page:page,pages:pages,prebtn:prebtn,nextbtn:nextbtn,moment:moment});
        });
    });
});
router.get('/tags',function(req,res){
    var q = req.query.q;
    if(!q){
        Tags.find().then(tagsinfo=>{
            res.render('taglist',{tags:tagsinfo});
        });
    }else{
        //q有值说明要返回特定标签的文章列表
        var ans = [];
        Tags.findById(q).then(tag=>{
            Article.find().populate('tags').sort({'date':-1}).then(articlesinfo=>{
                articlesinfo.forEach(article=>{
                    var isreturn = article.tags.some(item=>{
                        return item._id.toString() == q;
                    });
                    if(isreturn){
                        ans.push(article);
                    }
                });
                res.render('catego',{name:tag.name,articles:ans,moment:moment});
            });
        });
    }
});
router.get('/archive',function(req,res){
    var year = [];
    Article.find({}).populate('tags').sort({'date':-1}).then(articlesinfo=>{
        res.render('archive',{articles:articlesinfo,moment:moment});
    });
});
router.get('/article',function(req,res){
    var id = req.query.id;
    Article.findById(id).populate('tags').then(articleinfo=>{
        res.render('article',{article:articleinfo,moment:moment});
        articleinfo.views ++;
        articleinfo.save();
    });
});
router.get('/about',function(req,res){
    res.render('about');
});


module.exports = router;
