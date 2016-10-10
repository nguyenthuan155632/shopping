'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
	category_slug: String, 
	category_name: String, 
	created_at: Date, 
	updated_at: Date
});

categorySchema.pre('save', function(next) {
	var currentDate = new Date();
	this.created_at = currentDate;
	this.updated_at = currentDate;
	next();
});

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;