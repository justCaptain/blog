var express = require('express');
var router = express.Router();
var Article = require('../models/article');
var Tags =require('../models/tags');

router.get('/',function(req,res){
    Article.find({}).then(articlesinfo=>{
        var articles = [];
        articlesinfo.forEach(item=>{
            var tmp = {};
            tmp.title = item.title;
            tmp.date = item.date;
            tmp.summary = item.summary;
            var tmptg = [];

            item.tags.forEach(tag=>{
                Tags.findOne({name:tag}).then(tmp=>{
                    if(tmp){
                        var x = {};
                        x._id = tmp._id;
                        x.name = tmp.name;
                        tmptg.push(x);
                    }
                    return tmptg;
                }).then(tmptg=>{
                    if(tmptg.length == item.tags.length){
                        console.log('here');
                        tmp.tags =tmptg;
                        articles.push(tmp);
                    }
                    return articles;
                }).then(articles=>{
                    console.log(articles.length);
                    if (articles.length == articlesinfo.length){
                        res.render('index',{articles:articles});
                    }
                });
            });
        });
        
    });
    
});
router.get('/tags',function(req,res){
    res.render('tags');
});
router.get('/archive',function(req,res){
    res.render('archive');
});
router.get('/article',function(req,res){
    res.render('article');
});
router.get('/about',function(req,res){
    res.render('about');
});


module.exports = router;
