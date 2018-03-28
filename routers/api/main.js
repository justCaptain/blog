
var express = require('express');
var router = express.Router();
var tags = require('../../models/tags');

router.post('/addtag',function(req,res){
    console.log(req.body);
    var newTag = new tags({name: req.body.tagname});
    newTag.save(function(err){
        if(err)
            console.lot('保存标签错误');
        else{
            console.log('保存标签成功');
        }
    })
    res.send({code: 1, message: '数据库出错'});
});

module.exports = router;