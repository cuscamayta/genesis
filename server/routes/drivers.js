var models = require('./../models');
var express = require('express');
var router = express.Router();

router.post('/create', function (request, response) {
  models.Driver.create({
    numberid: request.body.numberid,
    firstname: request.body.firstname,
    lastname: request.body.lastname,
    birthdate: request.body.birthdate,
    iddrivertype: request.body.iddrivertype
  }).then(function (res) {
    response.send(res);
  }).catch(function (err) {
    response.send(err);
  });
});

router.post('/update', function (request, response) {
  models.Driver.update({
    numberid: request.body.numberid,
    firstname: request.body.firstname,
    lastname: request.body.lastname,
    birthdate: request.body.birthdate,
    iddrivertype: request.body.iddrivertype
  }, {
      where: { id: request.body.id }
    }).then(function (res) {
      response.send(res);
    }).catch(function (err) {
      response.send(err);
    });
});

router.get('/', function (request, response) {
  models.Driver.findAll().then(function (drivers) {
    response.send(drivers);
  }).catch(function (err) {
    response.send(err);
  });
});

router.get('/forselect', function (request, response) {
  models.Driver.findAll({
    attributes: ["id", "firstname" , "lastname"],
    order: [["firstname","ASC"]]
  }).then(function (res) {
    response.send(res);
  }).catch(function (err) {
    response.send(err);
  });
});

router.post('/destroy', function (request, response) {
  models.Driver.destroy({
    where: { id: request.body.id }
  }).then(function (res) {
    response.send(res);
  }).catch(function (err) {
    response.send(err);
  });
});

module.exports = router;