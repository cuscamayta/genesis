var models = require('./../models');
var express = require('express');
var router = express.Router();

router.post('/create', function (request, response) {
  models.Bustype.create({
    title: request.body.title
  }).then(function (res) {
    response.send(res);
  }).catch(function (err) {
    response.send(err);
  });
});

router.post('/update', function (request, response) {
  models.Bustype.update({
    title: request.body.title
  }, {
      where: { id: request.body.id }
    }).then(function (res) {
      response.send(res);
    }).catch(function (err) {
      response.send(err);
    });
});

router.get('/', function (request, response) {
  models.Bustype.findAll().then(function (roles) {
    response.send(roles);
  }).catch(function (err) {
    response.send(err);
  });
});

router.post('/destroy', function (request, response) {
  models.Bustype.destroy({
    where: { id: request.body.id }
  }).then(function (res) {
    response.send(res);
  }).catch(function (err) {
    response.send(err);
  });
});

module.exports = router;