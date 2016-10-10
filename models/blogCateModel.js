'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogCateSchema = new Schema({
	blog_cate_slug: String, 
	blog_cate_name: String, 
	created_at: Date, 
	updated_at: Date
});

blogCateSchema.pre('save', function(next) {
	var currentDate = new Date();
	this.created_at = currentDate;
	this.updated_at = currentDate;
	next();
});

var BlogCate = mongoose.model('BlogCate', blogCateSchema);

module.exports = BlogCate;