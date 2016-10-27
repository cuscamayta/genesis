var models = require('./../models');
var express = require('express');
var router = express.Router();
var common = require('./common');

router.post('/create', function (request, response) {
  models.User.create({
    username: request.body.username,
    firstname: request.body.firstname,
    lastname: request.body.lastname,
    password: request.body.password,
    email: request.body.email,
    idrole: request.body.idrole
  }).then(function (res) {
    response.send(common.response(res, "Se guardo correctamente"));
  }).catch(function (err) {
    response.send(common.response(err.code, err.message, false));
  });
});

router.post('/update', function (request, response) {
  models.User.update({
    username: request.body.username,
    firstname: request.body.firstname,
    lastname: request.body.lastname,
    password: request.body.password,
    email: request.body.email,
    idrole: request.body.idrole
  }, {
      where: { id: request.body.id }
    }).then(function (res) {
      response.send(common.response(res, "Se guardo correctamente"));
    }).catch(function (err) {
      response.send(common.response(err.code, err.message, false));
    });
});

router.get('/', function (request, response) {
  models.User.findAll().then(function (res) {
    response.send(res);
  }).catch(function (err) {
    response.send(common.response(err.code, err.message, false));
  });
});

router.post('/destroy', function (request, response) {
  models.User.destroy({
    where: { id: request.body.id }
  }).then(function () {
    response.send(common.response("", "Se elimino correctamente"));
  }).catch(function (err) {
    response.send(common.response(err.code, err.message, false));
  });
});

module.exports = router;