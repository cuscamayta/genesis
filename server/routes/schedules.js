var models = require('./../models');
var express = require('express');
var router = express.Router();

router.post('/create', function (request, response) {
  models.Schedule.create({
    dateregister: request.body.dateregister,
    arrival: request.body.arrival,
    departure: request.body.departure,
    detail: request.body.detail,
    iddriver: request.body.iddriver,
    idtravel: request.body.idtravel
  }).then(function (res) {
    response.send(res);
  }).catch(function (err) {
    response.send(err);
  });
});

router.post('/update', function (request, response) {
  models.Schedule.update({
    dateregister: request.body.dateregister,
    arrival: request.body.arrival,
    departure: request.body.departure,
    detail: request.body.detail,
    iddriver: request.body.iddriver,
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
  models.Schedule.findAll().then(function (schedules) {
    response.send(schedules);
  }).catch(function (err) {
    response.send(err);
  });
});

router.post('/destroy', function (request, response) {
  models.Schedule.destroy({
    where: { id: request.body.id }
  }).then(function (res) {
    response.send(res);
  }).catch(function (err) {
    response.send(err);
  });
});

module.exports = router;