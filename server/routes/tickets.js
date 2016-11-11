var models = require('./../models');
var express = require('express');
var router = express.Router();
var common = require('./common');
var invoice = require('./codecontrol');

router.post('/create', function (request, response) {

  return models.sequelize.transaction(function (t) {

    var invoicenumber = getnumberinvoice(request.body.numberorder);

    var codecontrol = invoice.generateControlCode(
      request.body.numberorder, invoicenumber, request.body.nitci,
      request.body.dateregister, request.body.amount, request.body.controlkey
    );

    return models.Sale.create({
      dateregister: request.body.dateregister,
      price: request.body.price,
      arrival: request.body.arrival,
      departure: request.body.departure,
      detail: request.body.detail,
      idsalesbook: request.body.idsalesbook,
      idschedule: request.body.idschedule
    },
      { transaction: t }).then(function (res) {
        for (var i = 0; i < request.body.details.length; i++) {
          var tic = models.Ticket.create({
            numberid: request.body.numberidcustomer,
            fullaname: request.body.namecustumer,
            price: request.body.details[i].price,
            number: request.body.details[i].number,
            numberbaggage: request.body.details[i].numberbaggage,
            weightbaggage: request.body.details[i].weightbaggage,
            idbus: request.body.details[i].idbus,
            idcustomer: request.body.details[i].idcustomer,
            idschedule: request.body.details[i].idschedule,
          })

          return models.Salesdetail.create({
            price: request.body.details[i].price,
            number: request.body.details[i].number,
            detail: request.body.details[i].detail,
            idticket: tic.id,
            idsale: res.id
          }), { transaction: t };
        }
      });
  }).then(function (res) {
    response.send(common.response(null, "Se guardo correctamente"));
  }).catch(function (err) {
    response.send(common.response(err.code, err.message, false));
  });
});

router.get('/', function (request, response) {
  models.Sale.findAll().then(function (res) {
    response.send(common.response(res));
  }).catch(function (err) {
    response.send(common.response(err.code, err.message, false));
  });
});

router.post('/destroy', function (request, response) {
  models.Sale.destroy({
    where: { id: request.body.id }
  }).then(function () {
    response.send(common.response("", "Se elimino correctamente"));
  }).catch(function (err) {
    response.send(common.response(err.code, err.message, false));
  });
});

function getnumberinvoice(authorizationnumber) {
  models.Salesbooks.max('numberid', { where: { numberorder: authorizationnumber } }).then(function (max) {
    return max;
  }).catch(function (err) {
    return 0;
  });
}

module.exports = router;