var models = require('./../models');
var express = require('express');
var router = express.Router();

router.post('/create', function (request, response) {
  models.Bus.create({
    numberid: request.body.numberid,
    numberseats: request.body.numberseats,
    numberrows: request.body.numberrows,
    numberfloors: request.body.numberfloors,
    color: request.body.color,
    model: request.body.model,
    make: request.body.make,
    detail: request.body.detail,
    idbustype: request.body.idbustype
  }).then(function (res) {
    response.send(res);
  }).catch(function (err) {
    response.send(err);
  });
});

router.post('/update', function (request, response) {
  models.Bus.update({
    numberid: request.body.numberid,
    numberseats: request.body.numberseats,
    numberrows: request.body.numberrows,
    numberfloors: request.body.numberfloors,
    color: request.body.color,
    model: request.body.model,
    make: request.body.make,
    detail: request.body.detail,
    idbustype: request.body.idbustype
  }, {
      where: { id: request.body.id }
    }).then(function (res) {
      response.send(res);
    }).catch(function (err) {
      response.send(err);
    });
});

router.get('/', function (request, response) {
  models.Bus.findAll().then(function (res) {
    response.send(res);
  }).catch(function (err) {
    response.send(err);
  });
});

router.post('/destroy', function (request, response) {
  models.Bus.destroy({
    where: { id: request.body.id }
  }).then(function (res) {
    response.send(res);
  }).catch(function (err) {
    response.send(err);
  });
});

module.exports = router;