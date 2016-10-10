'use strict';

var CartModel = require('../models/cart');

module.exports = function (router) {
    var model = new CartModel();
    router.get('/', function (req, res) {
        res.render('cart', model);
    });
};
