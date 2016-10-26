var models = require('./../models');
var express = require('express');
var router = express.Router();

router.post('/create', function (request, response) {
  models.Travel.create({
    numberid: request.body.numberid,
    arrival: request.body.arrival,
    departure: request.body.departure,
    detail: request.body.detail,
    idcourse: request.body.idcourse
  }).then(function (res) {
    response.send(res);
  }).catch(function (err) {
    response.send(err);
  });
});

router.post('/update', function (request, response) {
  models.Travel.update({
    numberid: request.body.numberid,
    arrival: request.body.arrival,
    departure: request.body.departure,
    detail: request.body.detail,
    idcourse: request.body.idcourse
  }, {
      where: { id: request.body.id }
    }).then(function (res) {
      response.send(res);
    }).catch(function (err) {
      response.send(err);
    });
});

router.get('/', function (request, response) {
  models.Travel.findAll().then(function (travels) {
    response.send(travels);
  }).catch(function (err) {
    response.send(err);
  });
});

router.post('/destroy', function (request, response) {
  models.Travel.destroy({
    where: { id: request.body.id }
  }).then(function (res) {
    response.send(res);
  }).catch(function (err) {
    response.send(err);
  });
});

module.exports = router;