var models = require('./../models');
var express = require('express');
var router = express.Router();

router.post('/create', function (request, response) {
  models.Office.create({
    title: request.body.title,
    address: request.body.address,
    phone: request.body.phone,
    detail: request.body.detail,
    idorigin: request.body.idorigin
  }).then(function (res) {
    response.send(res);
  }).catch(function (err) {
    response.send(err);
  });
});

router.post('/update', function (request, response) {
  models.Office.update({
    title: request.body.title,
    address: request.body.address,
    phone: request.body.phone,
    detail: request.body.detail,
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
  models.Office.findAll().then(function (res) {
    response.send(res);
  }).catch(function (err) {
    response.send(err);
  });
});

router.get('/forselect', function (request, response) {
  models.Office.findAll({
    attributes: ["id", "title"]
  }).then(function (res) {
    response.send(res);
  }).catch(function (err) {
    response.send(err);
  });
});

router.post('/destroy', function (request, response) {
  models.Office.destroy({
    where: { id: request.body.id }
  }).then(function (res) {
    response.send(res);
  }).catch(function (err) {
    response.send(err);
  });
});

module.exports = router;