'use strict';

module.exports = function (router) {
    router.get('/', function(req, res) {
		req.session.reset();
		res.location('/login');
		res.redirect('/login');
	});
};
