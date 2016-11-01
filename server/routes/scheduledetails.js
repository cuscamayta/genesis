var models = require('./../models');
var express = require('express');
var router = express.Router();
var common = require('./common');

router.post('/create', function (request, response) {
  models.Scheduledetail.create({
    drivertype: request.body.drivertype,
    iddriver: request.body.iddriver,
    idschedule: request.body.idschedule
  }).then(function (res) {
    response.send(common.response(res, "Se guardo correctamente"));
  }).catch(function (err) {
    response.send(common.response(err.code, err.message, false));
  });
});

router.post('/update', function (request, response) {
  models.Scheduledetail.update({
    drivertype: request.body.drivertype,
    iddriver: request.body.iddriver,
    idschedule: request.body.idschedule
  }, {
      where: { id: request.body.id }
    }).then(function (res) {
      response.send(common.response(res, "Se guardo correctamente"));
    }).catch(function (err) {
      response.send(common.response(err.code, err.message, false));
    });
});

router.get('/', function (request, response) {
  models.Scheduledetail.findAll().then(function (schedules) {
    response.send(schedules);
  }).catch(function (err) {
    response.send(common.response(err.code, err.message, false));
  });
});

router.post('/destroybyheader', function (request, response) {
  models.Scheduledetail.destroy({
    where: { idschedule: request.body.id }
  }).then(function () {
    response.send(common.response("", "Se elimino correctamente"));
  }).catch(function (err) {
    response.send(common.response(err.code, err.message, false));
  });
});

module.exports = router;