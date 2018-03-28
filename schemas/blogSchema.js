var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
    title: String,
    date: {type: Date, default: Date.now},
    content: String,
    description: String,
    views: Number, 
    tag: [String] 
});

module.exports = blogSchema;