'use strict';

var IndexModel = require('../models/index');

module.exports = function (router) {
    var model = new IndexModel();
    router.get('/', function (req, res) {
        res.render('index', model);
    });

    router.get('/404', function (req, res) {
        res.render('errors/404', model);
    });
};
