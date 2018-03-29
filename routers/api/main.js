
var express = require('express');
var router = express.Router();
var tags = require('../../models/tags');

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

router.post('/addtag',function(req,res){
    var tagname = req.body.tagname;

    //查找是否已有此tag标签
    tags.findOne({'name' : tagname}).then((taginfo)=>{
        if(taginfo != null){
            //不空说明标签已存在
            responseData.code = 1;
            responseData.message = '标签已存在';
            res.json(responseData);
            return ;
        }else{
            //空说明标签不存在,执行保存
            var newTag = new tags({name:tagname});
            return newTag.save();
        }
    }).then((newtaginfo) => {
        if(newtaginfo!=null){
            //保存成功，返回成功信息
            responseData.code = 0;
            responseData.message = '标签保存成功';
        }else{
            //保存失败
            console.log('标签保存失败');
            responseData.code  = 4;
            responseData.message = '标签保存失败';
        }
        res.json(responseData);
    });
});

router.post('/deletetag',function(req,res){
    var tagname = req.body.tagname;

    //查找是否有此tag
    tags.findOne({name : tagname}).then((taginfo)=>{
        // taginfo 空说明没有此tag
        if(taginfo == null){
            responseData.code = 1;
            responseData.message = '标签不存在';
            res.json(responseData);
        }else{
            //找到此标签，执行删除操作
            return taginfo.remove();
        }
    }).then((newtaginfo)=>{
        if(newtaginfo){
            //删除成功
            responseData.message = '标签删除成功';
            responseData.code = 0;
        }else{
            //删除失败
            console.log('标签删除失败');
            responseData.code = 4;
            responseData.message = '标签删除失败';
        }
        res.json(responseData);
    });
});

module.exports = router;