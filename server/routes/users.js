var models = require('./../models');
var express = require('express');
var router = express.Router();



router.post('/create', function (req, res) {
  models.User.create({
    username: req.body.username
  }).then(function () {
    res.send('test');
  });
});

router.get('/', function (request, response) {
 models.User.findAll({
    include: [ models.Task ]
  }).then(function(users) {
    response.send(users);
  });
})

router.get('/:user_id/destroy', function (req, res) {
  models.User.destroy({
    where: {
      id: req.params.user_id
    }
  }).then(function () {
    res.send('');
  });
});

router.post('/:user_id/tasks/create', function (req, res) {
  models.Task.create({
    title: req.body.title,
    UserId: req.params.user_id
  }).then(function () {
    res.send('');
  });
});

router.get('/:user_id/tasks/:task_id/destroy', function (req, res) {
  models.Task.destroy({
    where: {
      id: req.params.task_id
    }
  }).then(function () {
    res.send('');
  });
});


module.exports = router;
