'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
	blog_slug: String, 
	title: String, 
	description: [],
	keyword: String,
	content: [],
	comments: String, 
	blog_cate_slug: String,
	image: String,
	created_at: Date, 
	updated_at: Date
});

blogSchema.pre('save', function(next) {
	var currentDate = new Date();
	this.created_at = currentDate;
	this.updated_at = currentDate;
	next();
});

var Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;