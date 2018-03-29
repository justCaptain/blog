var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema({
    name: String,
    articleid: [{type:String,default:''}]
});