var mongoose = require('mongoose');
var articleSchema = require('../schemas/blogSchema');

module.exports = mongoose.model('article',articleSchema);