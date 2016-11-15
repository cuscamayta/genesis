var models = require('./../models');
var express = require('express');
var router = express.Router();
var common = require('./common');
var invoice = require('./codecontrol');
var moment = require("moment");

function createSalesBook(request, codecontrol, numberinvoice) {
  return {
    type: request.body.type,
    numberorder: request.body.numberorder,
    numbercontrol: codecontrol,
    numberid: request.body.numbernitinvoice,
    fullname: request.body.nameinvoice,
    numberinvoice: numberinvoice,
    dateregister: request.body.dateregister,
    amountinvoice: request.body.amountinvoice,
    amountinvoiceice: 0,
    amountinvoiceexento: 0,
    amountinvoicenet: (request.body.amountinvoice - (request.body.amountinvoice * 0.13)),
    amountoftax: (request.body.amountinvoice * 0.13)

  };
}

function createSale(request, res) {
  return {
    dateregister: request.body.dateregister,
    arrival: request.body.arrival,
    departure: request.body.departure,
    detail: request.body.detail,
    idsalesbook: res.id,
    idschedule: request.body.idschedule
  };
}

function createTicket(request, i) {
  return {
    numberid: request.body.details[i].numberidcustomer,
    fullaname: request.body.details[i].namecustumer,
    price: request.body.details[i].price,
    number: request.body.details[i].number,
    numberbaggage: request.body.details[i].numberbaggage,
    weightbaggage: request.body.details[i].weightbaggage,
    idbus: request.body.details[i].idbus,
    idschedule: request.body.details[i].idschedule,
  };
}

function createDetailSales(request, i, tic, res) {
  return {
    price: request.body.details[i].price,
    number: request.body.details[i].number,
    detail: request.body.details[i].detail,
    idticket: tic.id,
    idsale: res.id
  };
}


function codecontrol(request, numberinvoice) {
  var dateinvoice = request.body.dateregister.split("/")[2] + request.body.dateregister.split("/")[1] + request.body.dateregister.split("/")[0];

  return invoice.generateControlCode(
    request.body.numberorder.toString(), numberinvoice, request.body.numbernit,
    dateinvoice, request.body.amountinvoice, request.body.controlkey
  );
}

function getDatesInvoice(orderbook, request) {
  return {
    dateone: orderbook.deadline.split("/")[2] + "/" + orderbook.deadline.split("/")[1] + "/" + orderbook.deadline.split("/")[0],
    datetwo: request.body.dateregister.split("/")[2] + "/" + request.body.dateregister.split("/")[1] + "/" + request.body.dateregister.split("/")[0]
  }
}

router.post('/create', function (request, response) {
  return models.sequelize.transaction(function (t) {
    return models.Orderbook.findOne({ where: { numberorder: request.body.numberorder } }, { transaction: t })
      .then(function (orderbook) {
        var datesInvoice = getDatesInvoice(orderbook, request);

        if (moment(datesInvoice.datetwo).isAfter(datesInvoice.dateone)) {
          response.send(common.response(null, "Libro de orden vencido", false));
        } else {
          return models.Salesbook.max('numberinvoice', { where: { numberorder: request.body.numberorder } }, { transaction: t })
            .then(function (res) {

              if (!res) res = 0
              var numberinvoice = (res + 1),
                controlcode = codecontrol(request, numberinvoice);

              return models.Salesbook.create(createSalesBook(request, controlcode, numberinvoice), { transaction: t })
                .then(function (res) {
                  return models.Sale.create(createSale(request, res), { transaction: t }).then(function (res) {

                    for (var i = 0; i < request.body.details.length; i++) {
                      var tic = models.Ticket.create(createTicket(request, i), { transaction: t }).then(function (res) {
                        return models.Salesdetail.create(createDetailSales(request, i, tic, res), { transaction: t });
                      }, { transaction: t })
                    }
                  }, { transaction: t })

                }, { transaction: t })

            }, { transaction: t });
        }
      })

    //**tranasaction end
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

module.exports = router;