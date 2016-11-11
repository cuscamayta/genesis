var models = require('./../models');
var express = require('express');
var router = express.Router();
var common = require('./common');

router.post('/create', function (request, response) {
  models.Salesbook.create({
    type: request.body.type,
    numberorder: request.body.numberorder,
    numbercontrol: request.body.numbercontrol,
    numberid: request.body.numberid,
    fullname: request.body.fullname,
    numbersales: request.body.numbersales,
    numberinvoice: request.body.numberinvoice,
    dateregister: request.body.dateregister,
    amountinvoice: request.body.amountinvoice,
    amountinvoiceice: request.body.amountinvoiceice,
    amountinvoiceexento: request.body.amountinvoiceexento,
    amountinvoicenet: request.body.amountinvoicenet,
    amountoftax: request.body.amountoftax,
  }).then(function (res) {
    response.send(common.response(res, "Se guardo correctamente"));
  }).catch(function (err) {
    response.send(common.response(err.code, err.message, false));
  });
});

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