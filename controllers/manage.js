'use strict';

var Category 	= require('../models/categoryModel');
var Product 	= require('../models/productModel');
var BlogCate 	= require('../models/blogCateModel');
var Blog 		= require('../models/blogModel');
var User 		= require('../models/userModel');

module.exports = function (router) {

	var requireLogin = function(req, res, next) {
		if (!req.user) {
			res.redirect('/manage/login');
		} else {
			next();
		}
	};

	router.get('/', requireLogin, function(req, res, next) {
		res.render('manage/index');
	});

	/************************************ CATEGORIES **************************************/

	router.get('/categories', requireLogin, function(req, res, next) {
		Category.find({}, function(err, categories) {
			if(err) {
				console.log(err);
			}
			var model = {
				categories: categories
			};
			res.render('manage/categories/index', model);
		});
	});

	router.get('/categories/add', requireLogin, function(req, res, next) {
		var model = {categories: {}};
		res.render('manage/categories/add', model);
	});

	router.post('/categories/add', requireLogin, function(req, res, next) {
		var category_slug = req.body.category_slug && req.body.category_slug.trim();
		var category_name = req.body.category_name && req.body.category_name.trim();

		var newCategory = new Category({
			category_slug: category_slug,
			category_name: category_name
		});

		newCategory.save(function(err) {
			if(err) {
				console.log(err);
				req.flash('error', 'err');
				res.location('/manage/categories');
				res.redirect('/manage/categories');
			}
			else {
				req.flash('success', 'Category Added!');
				res.location('/manage/categories');
				res.redirect('/manage/categories');
			}
		});
	});

	router.delete('/categories/delete/:id', requireLogin, function(req, res) {
		Category.remove({_id: req.params.id}, function(err) {
			if(err) {
				console.log(err); 
			}
			req.flash('success', 'Category deleted!');
			res.location('/manage/categories');
			res.redirect('/manage/categories');
		});
	});

	router.get('/categories/edit/:id', requireLogin, function(req, res) {
		Category.find({_id: req.params.id}, function(err, category) {
			if(err) {
				console.log(err); 
			}
			var model = {
				category: category
			};
			res.render('manage/categories/edit', model);
		});
	});
	
	router.post('/categories/edit/:id', requireLogin, function(req, res) {
		var category_slug = req.body.category_slug && req.body.category_slug.trim();
		var category_name = req.body.category_name && req.body.category_name.trim();

		var currentDate = new Date();

		Category.findOneAndUpdate({_id: req.params.id}, {$set: {category_slug: category_slug, category_name: category_name, updated_at: currentDate}}, function(err, category) {
			if(err) {
				console.log(err); 
				req.flash('error', err);
				res.location('/manage/categories');
				res.redirect('/manage/categories');
			}
			else {
				Product.findOneAndUpdate({category_slug: category.category_slug}, {$set: {category_slug: category_slug}}, function(err_prod, product) {
					if(err_prod) {
						console.log(err_prod); 
						req.flash('error', err_prod);
						res.location('/manage/categories');
						res.redirect('/manage/categories');
					}
					else {
						req.flash('success', 'Category Edited!');
						res.location('/manage/categories');
						res.redirect('/manage/categories');
					}
				});
			}
		});
	});

	/************************************ PRODUCTS **************************************/

	router.get('/products', requireLogin, function(req, res, next) {
		Product.find({}, function(err, products) {
			if(err) {
				console.log(err);
			}
			var model = {
				products: products
			};
			res.render('manage/products/index', model);
		});
	});

	router.get('/products/add', requireLogin, function(req, res) {
		Category.find({}, function(err, categories) {
			if(err) {
				console.log(err);
			}
			var model = {
				categories: categories
			};
			res.render('manage/products/add', model);
		});
	});

	router.post('/products/add', requireLogin, function(req, res) {
		var product_id 		= req.body.product_id && req.body.product_id.trim();
		var product_slug 	= req.body.product_slug && req.body.product_slug.trim();
		var product_name 	= req.body.product_name && req.body.product_name.trim();
		var price 			= req.body.price && req.body.price.trim();
		var quantity 		= req.body.quantity && req.body.quantity.trim();
		var descriptions 	= req.body.descriptions && req.body.descriptions.trim();
		var keyword 		= req.body.keyword && req.body.keyword.trim();
		var details 		= req.body.details && req.body.details.trim();
		var images 			= req.body.images && req.body.images.trim();
		var category_slug 	= req.body.category_slug && req.body.category_slug.trim();

		var newProduct = new Product({
			product_id: product_id,
			product_slug: product_slug,
			product_name: product_name,
			price: price,
			quantity: quantity,
			descriptions: descriptions,
			keyword: keyword,
			details: details,
			images: images,
			category_slug: category_slug,
			rating: category_slug,
			comments: ""
		});

		newProduct.save(function(err) {
			if(err) {
				console.log('save error', err);
				req.flash('error', err);
				res.location('/manage/products');
				res.redirect('/manage/products');
			}
			else {
				req.flash('success', 'Product Added!');
				res.location('/manage/products');
				res.redirect('/manage/products');
			}
		});
	});

	router.delete('/products/delete/:id', requireLogin, function(req, res) {
		Product.remove({_id: req.params.id}, function(err) {
			if(err) {
				console.log(err); 
			}
			req.flash('success', 'Product deleted!');
			res.location('/manage/products');
			res.redirect('/manage/products');
		});
	});

	router.get('/products/edit/:id', requireLogin, function(req, res) {
		Product.find({_id: req.params.id}, function(err, product) {
			if(err) {
				console.log(err); 
			}
			if(product) {
				Category.find({}, function(err_ca, categories) {
					if(err_ca) { console.log(err_ca) }
					for(var i = 0; i < categories.length; i++) {
						if(categories[i].category_slug == product[0].category_slug) {
							categories[i]["selected"] = "selected";
						}
						else {
							categories[i]["selected"] = "";
						}
					}
					var model = {
						product: product,
						categories: categories
					};	
					res.render('manage/products/edit', model);
				});	
			}
			else {
				res.location('/manage/products');
				res.redirect('/manage/products');
			}
		});
	});

	router.post('/products/edit/:id', requireLogin, function(req, res) {
		var product_id 		= req.body.product_id && req.body.product_id.trim();
		var product_slug 	= req.body.product_slug && req.body.product_slug.trim();
		var product_name 	= req.body.product_name && req.body.product_name.trim();
		var price 			= req.body.price && req.body.price.trim();
		var quantity 		= req.body.quantity && req.body.quantity.trim();
		var descriptions 	= req.body.descriptions && req.body.descriptions.trim();
		var keyword 		= req.body.keyword && req.body.keyword.trim();
		var details 		= req.body.details && req.body.details.trim();
		var images 			= req.body.images && req.body.images.trim();
		var category_slug 	= req.body.category_slug && req.body.category_slug.trim();

		var currentDate = new Date();

		Product.findOneAndUpdate({_id: req.params.id}, {$set: {product_id: product_id, product_slug: product_slug, product_name: product_name, price: price, quantity: quantity, descriptions: descriptions, keyword: keyword, details: details, images: images, category_slug: category_slug, updated_at: currentDate}}, function(err, category) {
			if(err) {
				console.log(err); 
				req.flash('error', err);
				res.location('/manage/products');
				res.redirect('/manage/products');
			}
			else {
				req.flash('success', 'Product Edited!');
				res.location('/manage/products');
				res.redirect('/manage/products');
			}
		});
	});

	/************************************ BLOG CATEGORY **************************************/

	router.get('/blog_cate', requireLogin, function(req, res, next) {
		BlogCate.find({}, function(err, blog_cate) {
			if(err) {
				console.log(err);
			}
			var model = {
				blog_cate: blog_cate
			};
			res.render('manage/blog_cate/index', model);
		});
	});

	router.get('/blog_cate/add', function(req, res, next) {
		var model = {blog_cate: {}};
		res.render('manage/blog_cate/add', model);
	});

	router.post('/blog_cate/add', requireLogin, function(req, res, next) {
		var blog_cate_slug = req.body.blog_cate_slug && req.body.blog_cate_slug.trim();
		var blog_cate_name = req.body.blog_cate_name && req.body.blog_cate_name.trim();

		var newBlogCate = new BlogCate({
			blog_cate_slug: blog_cate_slug,
			blog_cate_name: blog_cate_name
		});

		newBlogCate.save(function(err) {
			if(err) {
				console.log(err);
				req.flash('error', 'err');
				res.location('/manage/blog_cate');
				res.redirect('/manage/blog_cate');
			}
			else {
				req.flash('success', 'Blog Category Added!');
				res.location('/manage/blog_cate');
				res.redirect('/manage/blog_cate');
			}
		});
	});

	router.delete('/blog_cate/delete/:id', requireLogin, function(req, res) {
		BlogCate.remove({_id: req.params.id}, function(err) {
			if(err) {
				console.log(err); 
			}
			req.flash('success', 'Blog Category deleted!');
			res.location('/manage/blog_cate');
			res.redirect('/manage/blog_cate');
		});
	});

	router.get('/blog_cate/edit/:id', requireLogin, function(req, res) {
		BlogCate.find({_id: req.params.id}, function(err, blog_cate) {
			if(err) {
				console.log(err); 
			}
			var model = {
				blog_cate: blog_cate
			};
			res.render('manage/blog_cate/edit', model);
		});
	});

	router.post('/blog_cate/edit/:id', requireLogin, function(req, res) {
		var blog_cate_slug = req.body.blog_cate_slug && req.body.blog_cate_slug.trim();
		var blog_cate_name = req.body.blog_cate_name && req.body.blog_cate_name.trim();

		var currentDate = new Date();

		BlogCate.findOneAndUpdate({_id: req.params.id}, {$set: {blog_cate_slug: blog_cate_slug, blog_cate_name: blog_cate_name, updated_at: currentDate}}, function(err, blog_cate) {
			if(err) {
				console.log(err); 
				req.flash('error', err);
				res.location('/manage/blog_cate');
				res.redirect('/manage/blog_cate');
			}
			else {
				Blog.findOneAndUpdate({blog_cate_slug: blog_cate.blog_cate_slug}, {$set: {blog_cate_slug: blog_cate_slug}}, function(err_prod, blog) {
					if(err_prod) {
						console.log(err_prod); 
						req.flash('error', err_prod);
						res.location('/manage/blog_cate');
						res.redirect('/manage/blog_cate');
					}
					else {
						console.log(blog);
						req.flash('success', 'Blog Category Edited!');
						res.location('/manage/blog_cate');
						res.redirect('/manage/blog_cate');
					}
				});
			}
		});
	});

	/************************************ BLOG **************************************/

	router.get('/blogs', requireLogin, function(req, res, next) {
		Blog.find({}, function(err, blogs) {
			if(err) {
				console.log(err);
			}
			var model = {
				blogs: blogs
			};
			res.render('manage/blogs/index', model);
		});
	});

	router.get('/blogs/add', requireLogin, function(req, res) {
		BlogCate.find({}, function(err, blog_cate) {
			if(err) {
				console.log(err);
			}
			var model = {
				blog_cate: blog_cate
			};
			res.render('manage/blogs/add', model);
		});
	});

	router.post('/blogs/add', requireLogin, function(req, res) {
		var blog_slug 		= req.body.blog_slug && req.body.blog_slug.trim();
		var title 			= req.body.title && req.body.title.trim();
		var description 	= req.body.description && req.body.description.trim();
		var keyword 		= req.body.keyword && req.body.keyword.trim();
		var content 		= req.body.content && req.body.content.trim();
		var blog_cate_slug 	= req.body.blog_cate_slug && req.body.blog_cate_slug.trim();
		var image 			= req.body.image && req.body.image.trim();

		var newBlog = new Blog({
			blog_slug: blog_slug,
			title: title,
			description: description,
			keyword: keyword,
			content: content,
			blog_cate_slug: blog_cate_slug,
			image: image,
			comments: ""
		});

		newBlog.save(function(err) {
			if(err) {
				console.log('save error', err);
				req.flash('error', err);
				res.location('/manage/blogs');
				res.redirect('/manage/blogs');
			}
			else {
				req.flash('success', 'Blog Added!');
				res.location('/manage/blogs');
				res.redirect('/manage/blogs');
			}
		});
	});

	router.delete('/blogs/delete/:id', requireLogin, function(req, res) {
		Blog.remove({_id: req.params.id}, function(err) {
			if(err) {
				console.log(err); 
			}
			req.flash('success', 'Blog deleted!');
			res.location('/manage/blogs');
			res.redirect('/manage/blogs');
		});
	});

	router.get('/blogs/edit/:id', requireLogin, function(req, res) {
		Blog.find({_id: req.params.id}, function(err, blog) {
			if(err) {
				console.log(err); 
			}
			if(blog) {
				BlogCate.find({}, function(err_ca, blog_cate) {
					if(err_ca) { console.log(err_ca) }
					for(var i = 0; i < blog_cate.length; i++) {
						if(blog_cate[i].blog_cate_slug == blog[0].blog_cate_slug) {
							blog_cate[i]["selected"] = "selected";
						}
						else {
							blog_cate[i]["selected"] = "";
						}
					}
					var model = {
						blog: blog,
						blog_cate: blog_cate
					};	
					res.render('manage/blogs/edit', model);
				});
			}
			else {
				res.location('/manage/blogs');
				res.redirect('/manage/blogs');	
			}
		});
	});

	router.post('/blogs/edit/:id', requireLogin, function(req, res) {
		var blog_slug 		= req.body.blog_slug && req.body.blog_slug.trim();
		var title 			= req.body.title && req.body.title.trim();
		var description 	= req.body.description && req.body.description.trim();
		var keyword 		= req.body.keyword && req.body.keyword.trim();
		var content 		= req.body.content && req.body.content.trim();
		var blog_cate_slug 	= req.body.blog_cate_slug && req.body.blog_cate_slug.trim();
		var image 			= req.body.image && req.body.image.trim();

		var currentDate = new Date();

		Blog.findOneAndUpdate({_id: req.params.id}, {$set: {blog_slug: blog_slug, title: title, description: description, keyword: keyword, content: content, blog_cate_slug: blog_cate_slug, image: image, updated_at: currentDate}}, function(err, blog) {
			if(err) {
				console.log(err); 
				req.flash('error', err);
				res.location('/manage/blogs');
				res.redirect('/manage/blogs');
			}
			else {
				req.flash('success', 'Blog Edited!');
				res.location('/manage/blogs');
				res.redirect('/manage/blogs');
			}
		});
	});

	/************************************ USER **************************************/

	router.get('/users', requireLogin, function(req, res) {
		User.find({}, function(err, users) {
			if(err) {
				console.log(err);
			}
			var model = {
				users: users
			};
			res.render('manage/users', model);
		});
	});

	router.get('/login', function(req, res) {
		res.render('manage/login', {login: "Management Login"});
	});

	router.post('/login', function(req, res) {
		var email 				= req.body.email && req.body.email.trim();
		var password 			= req.body.password && req.body.password.trim();

		User.findOne({email: email}, function(err, user) {
			if(err) {
				console.log(err);
			}
			if(user) {
				user.comparePassword(password, function(err, isMatch) {
		            if (err) throw err;
		            if(isMatch) {
		            	req.session.user = user;
		            	res.location('/manage');
						res.redirect('/manage');
		            }
		            else {
		            	req.flash('error', 'Password does not match!');
		            	res.location('/manage/login');
						res.redirect('/manage/login');
		            }
		        });
			}
			else {
				req.flash('error', 'Email is not exist!');
				res.location('/manage/login');
				res.redirect('/manage/login');
			}
		});
	});

	router.get('/signup', requireLogin, function(req, res) {
		res.render('manage/signup', {signup: "Sign Up"})
	});

	router.post('/signup', requireLogin, function(req, res) {
		var email 				= req.body.email && req.body.email.trim();
		var password 			= req.body.password && req.body.password.trim();
		var admin 				= req.body.admin && req.body.admin.trim();
		var address 			= req.body.address && req.body.address.trim();
		var phone 				= req.body.phone && req.body.phone.trim();
		var birthday 			= req.body.birthday && req.body.birthday.trim();
		var sex 				= req.body.sex && req.body.sex.trim();

		var newUser = new User({
			email: email,
			password: password,
			admin: admin,
			address: address,
			phone: phone,
			birthday: birthday,
			sex: sex
		});

		User.findOne({email: email}, function(err, user) {
			if(err) {
				console.log(err); 
			} 
			if(user) {
				var model = {
					admin: admin,
					address: address,
					phone: phone,
					birthday: birthday,
					sex: sex
				}
				req.flash('error', 'Email is exist!');
				res.locals.error = req.flash();
				res.render('manage/signup', model);
			}
			else {
				newUser.save(function(err) {
					if(err) {
						console.log('save error', err);
						req.flash('error', err);
						res.location('/manage/users');
						res.redirect('/manage/users');
					}
					else {
						req.flash('success', 'User Added!');
						res.location('/manage/users');
						res.redirect('/manage/users');
					}
				});
			}
		});
	});

	router.delete('/users/delete/:id', requireLogin, function(req, res) {
		User.remove({_id: req.params.id}, function(err) {
			if(err) {
				console.log(err); 
			}
			req.flash('success', 'User deleted!');
			res.location('/manage/users');
			res.redirect('/manage/users');
		});
	});

	router.get('/users/edit/:id', requireLogin, function(req, res) {
		User.find({_id: req.params.id}, function(err, user) {
			if(err) {
				console.log(err); 
			}
			var model = {
				user: user
			};	
			res.render('manage/edit', model);
		});
	});

	router.post('/users/edit/:id', requireLogin, function(req, res) {
		var password 			= req.body.password && req.body.password.trim();
		var admin 				= req.body.admin && req.body.admin.trim();
		var address 			= req.body.address && req.body.address.trim();
		var phone 				= req.body.phone && req.body.phone.trim();
		var birthday 			= req.body.birthday && req.body.birthday.trim();
		var sex 				= req.body.sex && req.body.sex.trim();

		User.findOne({_id: req.params.id}, function(err, user) {
			if(password != "") {
				user.password = password;
			}
			user.admin = admin;
			user.address = address;
			user.phone = phone;
			user.birthday = birthday;
			user.sex = sex;
			user.save(function(err_save) {
				if (err_save) throw err_save;
				req.flash('success', 'User Edited!');
				res.location('/manage/users');
				res.redirect('/manage/users');
			});
		});
	});

	router.get('/logout', function(req, res) {
		req.session.reset();
		res.location('/manage/login');
		res.redirect('/manage/login');
	});
};


