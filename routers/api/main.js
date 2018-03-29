
var express = require('express');
var router = express.Router();
var tags = require('../../models/tags');

/**
 * 统一返回格式
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
    tags.findOne({'name' : tagname}).then((result)=>{
        if(result != null){
            //不空说明标签已存在
            responseData.code = 1;
            responseData.message = '标签已存在';
        }else{
            //空说明标签不存在,执行保存
            var newTag = new tags({name:tagname});
            newTag.save().then((result) => {
                //保存成功
                responseData.code = 0;
                responseData.message = '标签保存成功';
            }).catch((err) =>{
                console.log(err);
                responseData.code = 2;
                responseData.message = '标签保存失败';
            });
        }
        res.json(responseData);
    });
});

module.exports = router;