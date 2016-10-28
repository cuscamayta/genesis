var models = require('./../models');
var express = require('express');
var router = express.Router();
var common = require('./common');

router.post('/create', function (request, response) {
  models.Course.create({
    numberid: request.body.numberid,
    detail: request.body.detail,
    iddrivertype: request.body.iddrivertype,
    idorigin: request.body.idorigin
  }).then(function (res) {
    response.send(common.response(res, "Se guardo correctamente"));
  }).catch(function (err) {
    response.send(common.response(err.code, err.message, false));
  });
});

router.post('/update', function (request, response) {
  models.Course.update({
    numberid: request.body.numberid,
    detail: request.body.detail,
    iddrivertype: request.body.iddrivertype,
    idorigin: request.body.idorigin
  }, {
      where: { id: request.body.id }
    }).then(function (res) {
      response.send(common.response(res, "Se guardo correctamente"));
    }).catch(function (err) {
      response.send(common.response(err.code, err.message, false));
    });
});

router.get('/', function (request, response) {
  models.Course.findAll().then(function (res) {
    response.send(res);
  }).catch(function (err) {
    response.send(common.response(err.code, err.message, false));
  });
});

router.post('/destroy', function (request, response) {
  models.Course.destroy({
    where: { id: request.body.id }
  }).then(function () {
    response.send(common.response("", "Se elimino correctamente"));
  }).catch(function (err) {
    response.send(common.response(err.code, err.message, false));
  });
});

module.exports = router;