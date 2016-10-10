'use strict';

var Blog = require('../models/blogModel');
var BlogCate = require('../models/blogCateModel');

module.exports = function (router) {
    router.get('/', function (req, res) {
        Blog.find({}).sort({updated_at: -1}).exec(function(err, blogs) { 
            if(err) throw err;
            if(blogs) {
                for(var i = 0; i < blogs.length; i++) {
                    var d = blogs[i].created_at;
                    d.setUTCHours(d.getUTCHours() + 7);
                    var date = d.getFullYear()+'/'+(d.getMonth() + 1)+'/'+d.getDate();
                    var time = d.getHours()+':'+d.getMinutes();
                    blogs[i]["date"] = date;
                    blogs[i]["time"] = time;
                }
                var model = {
                    blogs: blogs
                };
                res.render('blogs', model);
            }   
            else {
                res.location('/');
                res.redirect('/');
            }
        });
    });

    router.get('/:blog_cate_slug', function (req, res) {
        Blog.find({blog_cate_slug: req.params.blog_cate_slug}).sort({updated_at: -1}).exec(function(err, blogs) { 
    		if(err) throw err;
    		if(blogs) {
    			for(var i = 0; i < blogs.length; i++) {
    				var d = blogs[i].created_at;
    				d.setUTCHours(d.getUTCHours() + 7);
    				var date = d.getFullYear()+'/'+(d.getMonth() + 1)+'/'+d.getDate();
    				var time = d.getHours()+':'+d.getMinutes();
    				blogs[i]["date"] = date;
    				blogs[i]["time"] = time;
    			}
    			var model = {
    				blogs: blogs
    			};
    			res.render('blogs', model);
    		}	
    		else {
    			res.location('/blogs');
				res.redirect('/blogs');
    		}
    	});
    });

    router.get('/:blog_cate_slug/:blog_slug', function (req, res) {
    	Blog.findOne({blog_slug: req.params.blog_slug}, function(err, blog) {
    		if(err) throw err;
    		if(blog) {
    			BlogCate.find({blog_cate_slug: blog.blog_cate_slug}, function(err_cate, blog_cate) {
	    			if(err_cate) throw err_cate;
	    			var cate_name = blog_cate[0].blog_cate_name;
	    			var tag = blog.keyword.split(",");
		    		var d = blog.created_at;
		    		d.setUTCHours(d.getUTCHours() + 7);
		    		var date = d.getFullYear()+'/'+(d.getMonth() + 1)+'/'+d.getDate();
		    		var time = d.getHours()+':'+d.getMinutes();
		    		var model = {
		    			blog: blog,
		    			tag: tag,
		    			date: date,
		    			time: time,
		    			cate_name: cate_name
		    		};
		        	res.render('blog-details', model);
	    		});	
    		}
    		else {
				res.location('/blogs');
				res.redirect('/blogs');
    		}
    	});
    });
};
