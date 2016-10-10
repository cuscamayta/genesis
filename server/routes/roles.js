var models = require('./../models');
var express = require('express');
var router = express.Router();

router.post('/create', function (request, response) {
  models.Role.create({
    title: request.body.title
  }).then(function (a, b) {
    response.send('test');
  });
});

router.get('/', function (request, response) {
 models.Role.findAll().then(function(roles) {
    response.send(roles);
  });
});

router.get('/:Role_id/destroy', function (request, response) {
  models.Role.destroy({
    where: {
      id: request.params.Role_id
    }
  }).then(function () {
    response.send('test');
  });
});

/*router.get('/:Role_id/update', function (req, res) {
  models.Role.update(
    { description = req.body.description},
    {
      where: {
      id: req.params.Role_id
    }}
  ).then(
    function(role) { response.send(role) },
    function(err) { response.send(err) }
  );
});*/

module.exports = router;