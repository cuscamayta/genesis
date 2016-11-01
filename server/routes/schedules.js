var models = require('./../models');
var express = require('express');
var router = express.Router();
var common = require('./common');

router.post('/create', function (request, response) {
  models.Schedule.create({
    dateregister: request.body.dateregister,
    price: request.body.price,
    arrival: request.body.arrival,
    departure: request.body.departure,
    detail: request.body.detail,
    idbus: request.body.idbus,
    idtravel: request.body.idtravel
  }).then(function (res) {
    response.send(common.response(res, "Se guardo correctamente"));
  }).catch(function (err) {
    response.send(common.response(err.code, err.message, false));
  });
});

router.post('/update', function (request, response) {
  models.Schedule.update({
    dateregister: request.body.dateregister,
    price: request.body.price,
    arrival: request.body.arrival,
    departure: request.body.departure,
    detail: request.body.detail,
    idbus: request.body.idbus,
    idtravel: request.body.idtravel
  }, {
      where: { id: request.body.id }
    }).then(function (res) {
      response.send(common.response(res, "Se guardo correctamente"));
    }).catch(function (err) {
      response.send(common.response(err.code, err.message, false));
    });
});

router.get('/', function (request, response) {
  models.Schedule.findAll({
    include: [models.Scheduledetail]
  }).then(function (schedules) {
    response.send(schedules);
  }).catch(function (err) {
    response.send(common.response(err.code, err.message, false));
  });
});

router.post('/destroy', function (request, response) {
  models.Schedule.destroy({
    where: { id: request.body.id }
  })
  models.Scheduledetail.destroy({
    where: { idschedule: request.body.id }
  }).then(function () {
    response.send(common.response("", "Se elimino correctamente"));
  }).catch(function (err) {
    response.send(common.response(err.code, err.message, false));
  });
});

module.exports = router;