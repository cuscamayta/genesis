var models = require('./../models');
var express = require('express');
var router = express.Router();

router.post('/create', function (request, response) {
  models.Orderbook.create({
    type: request.body.type,
    status: request.body.status,
    numberorder: request.body.numberorder,
    numberid: request.body.numberid,
    controlkey: request.body.controlkey,
    numberinit: request.body.numberinit,
    numberend: request.body.numberend,
    numberinvoice: request.body.numberinvoice,
    dateofissue: request.body.dateofissue,
    deadline: request.body.deadline,
    idoffice: request.body.idoffice,
  }).then(function (res) {
    response.send(res);
  }).catch(function (err) {
    response.send(err);
  });
});

router.post('/update', function (request, response) {
  models.Orderbook.update({
    type: request.body.type,
    status: request.body.status,
    numberorder: request.body.numberorder,
    numberid: request.body.numberid,
    controlkey: request.body.controlkey,
    numberinit: request.body.numberinit,
    numberend: request.body.numberend,
    numberinvoice: request.body.numberinvoice,
    dateofissue: request.body.dateofissue,
    deadline: request.body.deadline,
    idoffice: request.body.idoffice,
  }, {
      where: { id: request.body.id }
    }).then(function (res) {
      response.send(res);
    }).catch(function (err) {
      response.send(err);
    });
});

router.post('/updatestatus', function (request, response) {
  models.Orderbook.update({
    status: request.body.status,
  }, {
      where: { id: request.body.id }
    }).then(function (res) {
      response.send(res);
    }).catch(function (err) {
      response.send(err);
    });
});

router.post('/updatenumberinvoice', function (request, response) {
  models.Orderbook.update({
    numberinvoice: request.body.numberinvoice,
  }, {
      where: { id: request.body.id }
    }).then(function (res) {
      response.send(res);
    }).catch(function (err) {
      response.send(err);
    });
});

router.get('/', function (request, response) {
  models.Orderbook.findAll().then(function (Orderbooks) {
    response.send(Orderbooks);
  }).catch(function (err) {
    response.send(err);
  });
});

router.post('/getbyid', function (request, response) {
  models.Orderbook.findOne({
    where: { id: request.body.id }
  }).then(function (res) {
    response.send(res);
  }).catch(function (err) {
    response.send(err);
  });
});

router.post('/getbystatusandtype', function (request, response) {
  models.Orderbook.findOne({
    where: { status: request.body.status, type: request.body.type }
  }).then(function (res) {
    response.send(res);
  }).catch(function (err) {
    response.send(err);
  });
});

router.post('/getbynumberinvoiceandnumberorder', function (request, response) {
  models.Orderbook.findOne({
    where: { numberorder: request.body.numberorder, numberinvoice: request.body.numberinvoice }
  }).then(function (res) {
    response.send(res);
  }).catch(function (err) {
    response.send(err);
  });
});

router.post('/destroy', function (request, response) {
  models.Orderbook.destroy({
    where: { id: request.body.id }
  }).then(function (res) {
    response.send(res);
  }).catch(function (err) {
    response.send(err);
  });
});

module.exports = router;