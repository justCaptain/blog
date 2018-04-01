
var express = require('express');
var router = express.Router();
var Tags = require('../models/tags');
var Article = require('../models/article');
/**
 * 统一返回格式
 * code : 状态码
 * message : 错误信息
 */
var responseData;
router.use(function(req,res,next){
    responseData = {
        code : 0,
        message : ''
    };
    next();
});

router.post('/admin/addtag',function(req,res){
    var tagname = req.body.tagname;

    //查找是否已有此tag标签
    Tags.findOne({'name' : tagname}).then((taginfo)=>{
        if(taginfo != null){
            //不空说明标签已存在
            responseData.code = 1;
            responseData.message = '标签已存在';
            res.json(responseData);
            return ;
        }else{
            //空说明标签不存在,执行保存
            var newTag = new Tags({name:tagname});
            return newTag.save();
        }
    }).then((newtaginfo) => {
        if(newtaginfo){
            //保存成功，返回成功信息
            responseData.code = 0;
            responseData.message = '标签保存成功';
            res.json(responseData);
        }else{
            //保存失败
            console.log('标签保存失败');
        }
    });
});

router.post('/admin/deletetag',function(req,res){
    var tagname = req.body.tagname;

    //查找是否有此tag
    Tags.findOne({name : tagname}).then((taginfo)=>{
        // taginfo 空说明没有此tag
        if(taginfo == null){
            responseData.code = 1;
            responseData.message = '标签不存在';
            res.json(responseData);
            return ;
        }else{
            //找到此标签，执行删除操作
            return taginfo.remove();
        }
    }).then((newtaginfo)=>{
        if(newtaginfo){
            //删除成功
            responseData.message = '标签删除成功';
            responseData.code = 0;
            res.json(responseData);
        }else{
            //删除失败
            console.log('标签删除失败');
        }
    });
});

router.post('/admin/addarticle',function(req,res){
    var data = req.body;
    var article = new Article({title:data.title,summary:data.summary,content:data.content,tags:data.tags});
    //保存博客
    article.save().then((result)=>{
        if(result){
            responseData.code = 0;
            responseData.message = '博客保存成功';
            res.json(responseData);
        }else{
            responseData.code = 2;
            responseData.message = '博客保存失败';
            res.json(responseData);
        }
    });
});

router.post('/admin/update',function(req,res){
    var data = req.body;
    Article.findById(data.articleid).then((result)=>{
        //未找到该记录
        if(result == null){
            responseData.code = 1;
            responseData.message = '未找到该记录';
            res.json(responseData);
            return;
        }
        //找到该记录
        else{
            Article.update({_id:data.articleid},{title:data.title,tags:data.tags,summary:data.summary,content:data.content}, { multi: true })
                .then((result)=>{
                    responseData.code = 0;
                    responseData.message = '修改文章成功';
                    res.json(responseData);
                    return ;
                });
        }
    }).catch((err)=>{
        console.log('查询失败: '+ err.reason);
        responseData.code = 1;
        responseData.message = '查询该记录失败';
        res.json(responseData);
    });
});

router.post('/admin/deleteblog',function(req,res){
    var articleid = req.body.blogid;
    Article.remove({_id:articleid}).then(result=>{
        if(result.ok == 1){
            res.send({code:0});
        }else{
            res.send({code:-1});
        }
    });
})

module.exports = router;