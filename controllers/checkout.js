'use strict';

var CheckoutModel = require('../models/checkout');

module.exports = function (router) {
    var model = new CheckoutModel();
    router.get('/', function (req, res) {
        res.render('checkout', model);
    });
};
