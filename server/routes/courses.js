var models = require('./../models');
var express = require('express');
var router = express.Router();

router.post('/create', function (request, response) {
  models.Course.create({
    numberid: request.body.numberid,
    detail: request.body.detail,
    iddrivertype: request.body.iddrivertype,
    idorigin: request.body.idorigin
  }).then(function (res) {
    response.send(res);
  }).catch(function (err) {
    response.send(err);
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
      response.send(res);
    }).catch(function (err) {
      response.send(err);
    });
});

router.get('/', function (request, response) {
  models.Course.findAll().then(function (users) {
    response.send(users);
  }).catch(function (err) {
    response.send(err);
  });
});

router.post('/destroy', function (request, response) {
  models.Course.destroy({
    where: { id: request.body.id }
  }).then(function (res) {
    response.send(res);
  }).catch(function (err) {
    response.send(err);
  });
});

module.exports = router;