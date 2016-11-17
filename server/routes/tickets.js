var models = require('./../models');
var express = require('express');
var router = express.Router();
var common = require('./common');
var invoice = require('./codecontrol');
var moment = require("moment");

function createsalesbook(request, codecontrol, numberinvoice) {
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

function createsale(request, res) {
  return {
    dateregister: request.body.dateregister,
    arrival: request.body.arrival,
    departure: request.body.departure,
    detail: request.body.detail,
    idsalesbook: res.id,
    idschedule: request.body.idschedule
  };
}

function createticket(request, i) { 
  return {
    numberid: request.body.details[i].numberid,
    fullname: request.body.details[i].fullName,
    price: request.body.details[i].price,
    number: request.body.details[i].numberseat,
    numberbaggage: request.body.details[i].numberbaggage,
    weightbaggage: request.body.details[i].weightbaggage,
    idbus: request.body.details[i].idbus,
    idschedule: request.body.details[i].idschedule,    
  };
}

function createdetailsales(request, i, tic, res) {
  return {
    price: request.body.details[i].price,
    number: request.body.details[i].numberseat,
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

function getdatesinvoice(orderbook, request) {
  return {
    deadline: orderbook.deadline.split("/")[2] + "/" + orderbook.deadline.split("/")[1] + "/" + orderbook.deadline.split("/")[0],
    datecurrent: request.body.dateregister.split("/")[2] + "/" + request.body.dateregister.split("/")[1] + "/" + request.body.dateregister.split("/")[0]
  }
}

router.post('/create', function (request, response) {
  return models.sequelize.transaction(function (t) {
    return models.Orderbook.findOne({ where: { numberorder: request.body.numberorder } }, { transaction: t })
      .then(function (orderbook) {
        var datesInvoice = getdatesinvoice(orderbook, request);

        if (moment(datesInvoice.datecurrent).isAfter(datesInvoice.deadline)) {
          response.send(common.response(null, "Libro de orden vencido", false));
        } else {
          return models.Salesbook.max('numberinvoice', { where: { numberorder: request.body.numberorder } }, { transaction: t })
            .then(function (nroinvoice) {

              if (!nroinvoice) nroinvoice = 0
              var numberinvoice = (nroinvoice + 1),
                controlcode = codecontrol(request, numberinvoice);

              return models.Salesbook.create(createsalesbook(request, controlcode, numberinvoice), { transaction: t })
                .then(function (salebook) {
                  return models.Sale.create(createsale(request, salebook), { transaction: t }).then(function (sale) {

                    for (var i = 0; i < request.body.details.length; i++) {
                      return models.Ticket.create(createticket(request, i), { transaction: t }).then(function (tic) {
                        console.log(tic);
                        console.log(i);
                        return models.Salesdetail.create(createdetailsales(request, i, tic, sale), { transaction: t })
                         .then(function (res) {
                         });
                      }, { transaction: t })
                    }
                  }, { transaction: t })

                }, { transaction: t })

            }, { transaction: t });
        }
      })
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