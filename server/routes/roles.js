var models = require('./../models');
var express = require('express');
var router = express.Router();

router.post('/create', function (request, response) {
  models.Role.create({
    title: request.body.title
  }).then(function (a) {
    response.send(a);
  });
});

router.post('/update', function (request, response) {
  models.Role.update({
    title: request.body.title
  }, {
      where: { id: request.body.id }
    }).then(function (a) {
      response.send(a);
    });
});

router.get('/', function (request, response) {
  models.Role.findAll().then(function (roles) {
    response.send(roles);
  });
});

router.post('/destroy', function (request, response) {
  models.Role.destroy({
    where: { id: request.body.id }
  }).then(function (a) {
    response.send(a);
  });
});

module.exports = router;