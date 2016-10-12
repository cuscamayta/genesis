var models = require('./../models');
var express = require('express');
var router = express.Router();

router.post('/create', function (request, response) {
  models.User.create({
    username: request.body.username,
    firstname: request.body.firstname,
    lastname: request.body.lastname,
    password: request.body.password,
    email: request.body.email,
    idrole: request.body.idrole
  }).then(function (a) {
    response.send(a);
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
    }).then(function (a) {
      response.send(a);
    });
});

router.get('/', function (request, response) {
  models.User.findAll({
    include: [Role]
  }).then(function (users) {
    response.send(users);
  });
});

router.post('/destroy', function (request, response) {
  models.User.destroy({
    where: { id: request.body.id }
  }).then(function (a) {
    response.send(a);
  });
});

module.exports = router;