var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
    title: String,
    date: {type: Date, default: Date.now},
    content: String,
    summary: String,
    views: {type:Number,default:0}, 
    tags: [{ type: String ,default: '123'}]
});

module.exports = blogSchema;