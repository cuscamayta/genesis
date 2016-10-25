var models = require('./../models');
var express = require('express');
var router = express.Router();

router.post('/create', function (request, response) {
  models.Scheduledetail.create({
    drivertype: request.body.drivertype,
    iddriver: request.body.iddriver,
    idschedule: request.body.idschedule
  }).then(function (res) {
    response.send(res);
  }).catch(function (err) {
    response.send(err);
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
      response.send(res);
    }).catch(function (err) {
      response.send(err);
    });
});

router.get('/', function (request, response) {
  models.Scheduledetail.findAll().then(function (schedules) {
    response.send(schedules);
  }).catch(function (err) {
    response.send(err);
  });
});

router.post('/destroy', function (request, response) {
  models.Scheduledetail.destroy({
    where: { id: request.body.id }
  }).then(function (res) {
    response.send(res);
  }).catch(function (err) {
    response.send(err);
  });
});

module.exports = router;