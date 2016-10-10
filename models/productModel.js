'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
	product_id: String,
	product_slug: String, 
	product_name: String, 
	price: Number,
	quantity: Number,
	descriptions: [],
	keyword: String, 
	details: [], 
	images: String,
	category_slug: String,
	rating: String,
	comments: String,
	created_at: Date, 
	updated_at: Date
});

productSchema.pre('save', function(next) {
	var currentDate = new Date();
	this.created_at = currentDate;
	this.updated_at = currentDate;
	next();
});

var Product = mongoose.model('Product', productSchema);

module.exports = Product;