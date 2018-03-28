var mongoose = require('mongoose');
var tagSchema = require('../schemas/tagSchema');

module.exports = mongoose.model('tags',tagSchema);
