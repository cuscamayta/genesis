var models = require('./../models');
var express = require('express');
var router = express.Router();

router.post('/create', function (request, response) {
    models.Customer.create({
        numberid: request.body.numberid,
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        email: request.body.email,
    }).then(function (res) {
        response.send(res);
    }).catch(function (err) {
        response.send(err);
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
            response.send(res);
        }).catch(function (err) {
            response.send(err);
        });
});

router.get('/', function (request, response) {
    models.Customer.findAll().then(function (customers) {
        response.send(customers);
    }).catch(function (err) {
        response.send(err);
    });
});

router.post('/destroy', function (request, response) {
    models.Customer.destroy({
        where: { id: request.body.id }
    }).then(function (res) {
        response.send(res);
    }).catch(function (err) {
        response.send(err);
    });
});

module.exports = router;