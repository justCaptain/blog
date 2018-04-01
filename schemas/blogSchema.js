var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tagSchema = require('./tagSchema');
var blogSchema = new Schema({
    title: String,
    date: {type: Date, default: Date.now},
    content: String,
    summary: String,
    views: {type:Number,default:0}, 
    tags: [{ type: String ,ref:tagSchema} ]
});

module.exports = blogSchema;