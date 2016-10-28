var models = require('./../models');
var express = require('express');
var router = express.Router();
var common = require('./common');

router.post('/create', function (request, response) {
    models.Customer.create({
        numberid: request.body.numberid,
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        email: request.body.email,
    }).then(function (res) {
        response.send(common.response(res, "Se guardo correctamente"));
    }).catch(function (err) {
        response.send(common.response(err.code, err.message, false));
    });
});

router.post('/update', function (request, response) {
    models.Customer.update({
        numberid: request.body.numberid,
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        email: request.body.email
    }, {
            where: { id: request.body.id }
        }).then(function (res) {
            response.send(common.response(res, "Se guardo correctamente"));
        }).catch(function (err) {
            response.send(common.response(err.code, err.message, false));
        });
});

router.get('/', function (request, response) {
    models.Customer.findAll().then(function (customers) {
        response.send(customers);
    }).catch(function (err) {
        response.send(common.response(err.code, err.message, false));
    });
});

router.post('/destroy', function (request, response) {
    models.Customer.destroy({
        where: { id: request.body.id }
    }).then(function () {
        response.send(common.response("", "Se elimino correctamente"));
    }).catch(function (err) {
        response.send(common.response(err.code, err.message, false));
    });
});

module.exports = router;