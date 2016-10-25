var models = require('./../models');
var express = require('express');
var router = express.Router();

router.post('/create', function (request, response) {
  models.Travel.create({
    numberid: request.body.numberid,
    detail: request.body.detail,
    idbus: request.body.idbus,
    idcourse: request.body.idcourse,
    idtravel: request.body.idtravel
  }).then(function (res) {
    response.send(res);
  }).catch(function (err) {
    response.send(err);
  });
});

router.post('/update', function (request, response) {
  models.Travel.update({
    numberid: request.body.numberid,
    detail: request.body.detail,
    idbus: request.body.idbus,
    idcourse: request.body.idcourse,
    idtravel: request.body.idtravel
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