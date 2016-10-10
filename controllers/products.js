'use strict';

var Product = require('../models/productModel');
var Category = require('../models/categoryModel');

module.exports = function (router) {
    router.get('/', function (req, res) {
        Product.find({}).sort({updated_at: -1}).exec(function(err, products) { 
            if(err) throw err;
            if(products) {
                var model = {
                    products: products
                };
                res.render('products', model);
            }   
            else {
                res.location('/');
                res.redirect('/');
            }
        });
    });

    router.get('/:category_slug', function (req, res) {
        Product.find({category_slug: req.params.category_slug}).sort({updated_at: -1}).exec(function(err, products) { 
    		if(err) throw err;
    		if(products) {
    			var model = {
    				products: products
    			};
    			res.render('products', model);
    		}	
    		else {
    			res.location('/products');
				res.redirect('/products');
    		}
    	});
    });

    router.get('/:category_slug/:product_slug', function (req, res) {
    	Product.findOne({product_slug: req.params.product_slug}, function(err, product) {
    		if(err) throw err;
    		if(product) {
    			Category.find({category_slug: product.category_slug}, function(err_cate, cate) {
	    			if(err_cate) throw err_cate;
	    			var cate_name = cate[0].category_name;
	    			var tag = product.keyword.split(",");
		    		// var d = product.created_at;
		    		// d.setUTCHours(d.getUTCHours() + 7);
		    		// var date = d.getFullYear()+'/'+(d.getMonth() + 1)+'/'+d.getDate();
		    		// var time = d.getHours()+':'+d.getMinutes();
		    		var model = {
		    			product: product,
		    			tag: tag,
		    			// date: date,
		    			// time: time,
		    			cate_name: cate_name
		    		};
		        	res.render('product-details', model);
	    		});	
    		}
    		else {
				res.location('/products');
				res.redirect('/products');
    		}
    	});
    });
};
