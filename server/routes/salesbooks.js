var models = require('./../models');
var express = require('express');
var router = express.Router();
var common = require('./common');

router.get('/', function (request, response) {
  models.Salesbook.findAll().then(function (res) {
    response.send(common.response(res));
  }).catch(function (err) {
    response.send(common.response(err.code, err.message, false));
  });
});

router.post('/destroy', function (request, response) {
  models.Salesbook.destroy({
    where: { id: request.body.id }
  }).then(function () {
    response.send(common.response("", "Se elimino correctamente"));
  }).catch(function (err) {
    response.send(common.response(err.code, err.message, false));
  });
});

module.exports = router;