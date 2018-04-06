var express = require('express');
var router = express.Router();
var Tags =require('../models/tags');
var Article = require('../models/article');


router.get('/',function(req,res){
    var page = req.query.page||1;
    var limit = 3;
    var pages = 0;
    Article.count().then(count =>{
        pages =  Math.ceil(count/limit);
        page = Math.min(page,pages);
        page = Math.max(page,1);
        Article.find({}).populate('tags').skip((page-1)*limit).limit(limit).then(articlesinfo=>{
            var nextbtn = true;
            var prebtn = true;
            if(page <= 1){
                prebtn = false;
            }
            if(page>= pages){
                nextbtn = false;
            }
            res.render('index',{articles:articlesinfo,page:page,pages:pages,prebtn:prebtn,nextbtn:nextbtn});
        });
    });
});
router.get('/tags',function(req,res){
    var q = req.query.q;
    console.log(q);
    if(!q)
        res.render('taglist');
    else{
        
    }
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
