'use strict';

var User = require('../models/userModel');

module.exports = function (router) {
    router.get('/', function (req, res) {
        res.render('login', {login: "Login"});
    });

    router.post('/', function(req, res) {
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
		            	res.location('/');
						res.redirect('/');
		            }
		            else {
		            	req.flash('error_login', 'Password does not match!');
		            	res.location('/login');
						res.redirect('/login');
		            }
		        });
			}
			else {
				req.flash('error_login', 'Email is not exist!');
				res.location('/login');
				res.redirect('/login');
			}
		});
	});
};
