
var express = require('express');
var router = express.Router();
var Tags = require('../models/tags');
var Article = require('../models/article');


//处理管理员主页路由
router.get('/',function(req,res){
    var page = req.query.page||1;
    var limit = 3;
    var pages = 0;

    Article.count().then(count=>{
        pages =  Math.ceil(count/limit);
        page = Math.min(page,pages);
        page = Math.max(page,1);

        Article.find({}).skip( (page-1)*limit ).limit(limit).then(articlesinfo=>{
            var articles = [];
            articlesinfo.forEach(articleinfo=>{
                articles.push(articleinfo);
            });
            var prebtn = true;
            var nextbtn = true;
            if(page == 1){
                prebtn = false;
            }
            if(page == pages){
                nextbtn =  false;
            }
            res.render('admin',{article:articles,page:page,prebtn:prebtn,nextbtn:nextbtn});
        });
    });
});


// 管理添加文章页面路由
router.get('/addarticle',function(req,res){
    var tags = [];
    Tags.find({}).then((tagsinfo) =>{
        //找到所有的标签
        tagsinfo.forEach((k)=>{
            tags.push(k);
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
    //根据q获取文章
    var id = req.query.q;
    var articletag = [];
    Article.findById(id).then(article=>{
        //找到该文章
        var title = article.title;
        var summary = article.summary;
        var content = article.content;
        
        Tags.find({}).then( (tagsinfo)=>{
            //找到所有标签
            tagsinfo.forEach((tag)=>{
                //对于每一个标签
                var tmp = {};
                tmp.name = tag.name;
                tmp._id = tag._id;
                tmp.check = false;
                if(article.tags!=null){
                    article.tags.forEach(item=>{
                        //跟文章的标签比较,若相同,check = true
                        if(item.toString() === tmp._id.toString()){
                            tmp.check = true;
                        }
                    });
                }
                articletag.push(tmp);
            }); 
            //弄好标签就渲染出来
            res.render('update',{articleid: id,title:title,summary:summary,content:content,tags:articletag});
        }).catch(err=>{
            console.log('err: '+ err);
            res.render('404');
        })
    }).catch(err=>{
        console.log('err: '+ err);
        res.render('404');
    });
});

module.exports = router;