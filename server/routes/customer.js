var models = require('./../models');
var express = require('express');
var router = express.Router();

router.post('/create', function (request, response) {
    models.Customer.create({
        numberid: request.body.numberid,
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        email: request.body.email,
    }).then(function (a) {
        response.send(a);
    });
});

router.post('/update', function (request, response) {
    models.Customer.update({
        numberid: request.body.numberid,
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        email: request.body.email,
    }, {
            where: { id: request.body.id }
        }).then(function (a) {
            response.send(a);
        });
});

router.get('/', function (request, response) {
    models.Customer.findAll().then(function (customers) {
        response.send(customers);
    });
});

router.post('/destroy', function (request, response) {
    models.Customer.destroy({
        where: { id: request.body.id }
    }).then(function (a) {
        response.send(a);
    });
});

module.exports = router;