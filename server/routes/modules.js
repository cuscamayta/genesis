var models = require('./../models');
var express = require('express');
var router = express.Router();
var common = require('./common');

router.post('/create', function (request, response) {
    models.Module.create({
        title: request.body.title,
        class: request.body.class
    }).then(function (res) {
        response.send(common.response(res, "Se guardo correctamente"));
    }).catch(function (err) {
        response.send(common.response(err.code, err.message, false));
    });
});

router.post('/update', function (request, response) {
    models.Module.update({
        title: request.body.title,
        class: request.body.class
    }, {
            where: { id: request.body.id }
        }).then(function (res) {
            response.send(common.response(res, "Se guardo correctamente"));
        }).catch(function (err) {
            response.send(common.response(err.code, err.message, false));
        });
});

router.get('/', function (request, response) {
    models.Module.findAll().then(function (res) {
        response.send(common.response(res));
    }).catch(function (err) {
        response.send(common.response(err.code, err.message, false));
    });
});

router.post('/destroy', function (request, response) {
    models.Module.destroy({
        where: { id: request.body.id }
    }).then(function () {
        response.send(common.response("", "Se elimino correctamente"));
    }).catch(function (err) {
        response.send(common.response(err.code, err.message, false));
    });
});

module.exports = router;