'use strict';

var User = require('../models/userModel');

module.exports = function (router) {
    
    router.post('/', function(req, res) {
		var email 				= req.body.email && req.body.email.trim();
		var password 			= req.body.password && req.body.password.trim();
		var address 			= req.body.address && req.body.address.trim();
		var phone 				= req.body.phone && req.body.phone.trim();
		var birthday 			= req.body.birthday && req.body.birthday.trim();
		var sex 				= req.body.sex && req.body.sex.trim();

		var newUser = new User({
			email: email,
			password: password,
			admin: "user",
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
					address: address,
					phone: phone,
					birthday: birthday,
					sex: sex
				}
				req.flash('error_signup', 'Email is exist!');
				res.locals.error_signup = req.flash();
				res.render('login', model);
			}
			else {
				newUser.save(function(err) {
					if(err) {
						console.log('save error', err);
						req.flash('error_signup', err);
						res.location('/login');
						res.redirect('/login');
					}
					else {
						req.flash('success_signup', 'Signup successfully!');
						res.location('/login');
						res.redirect('/login');
					}
				});
			}
		});
	});
};
