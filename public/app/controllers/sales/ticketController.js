app.controller('TicketController', function ($scope, TicketService, ScheduleService, TravelService, $rootScope, SaleService) {
    init();

    function init() {
        gettravels();
        dataticket();

        //  var image = $('#imgTest');
        //     image.mapster(
        //     {
        //         fillOpacity: 0.4,
        //         fillColor: "050101"
        //     }
        //     );
        $('#dateregister').daterangepicker({
            locale: { format: 'DD/MM/YYYY' },
            singleDatePicker: true,
            showDropdowns: false,
            calender_style: "picker_4",
        }).on('apply.daterangepicker', function (ev, picker) {
            $scope.headerticket.dateregister = picker.startDate.format('DD/MM/YYYY');
        });

        $("#invoice-file").hide();
    }

    function dataticket() {
        $scope.headerticket = {
            id: 0,
            state: 1,
            details: []
        };
        $scope.selectedbus = null;
        $scope.selectedschedule = null;
        $scope.listtickets = [];
        $scope.listseats = [];

        $scope.detailticket = {
            state: "0"
        }

        defaultvalue();
    };

    function gettravels() {
        var response = TravelService.gettravels();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listtravel = res.data;
            }
        });
    }

    function getschedules() {
        var response = ScheduleService.getschedulesforselect($scope.selectedtravel);
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else { $scope.listschedule = res.data; }
        });
    }

    $scope.saveticket = function () {
        $scope.headerticket;
        $scope.headerticket.idschedule = $scope.selectedschedule.id;
        $scope.headerticket.arrival = $scope.selectedschedule.arrival;
        $scope.headerticket.departure = $scope.selectedschedule.departure;
        $scope.headerticket.detail = $scope.selectedschedule.detail;
        $scope.headerticket.details = $scope.listtickets;
        $scope.headerticket.iduser = $rootScope.currentUser.user.id;

        $scope.headerticket.idoffice = $rootScope.idoffice;
        $scope.headerticket.amountinvoice = $scope.sumTotal;

        if ($scope.headerticket.id == 0) {
            var response = TicketService.saveticket($scope.headerticket);
            response.then(function (res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    toastr.success(res.message);
                    $scope.listtickets = null;
                    $scope.headerticket.numbernitinvoice = null;
                    $scope.headerticket.nameinvoice = null;
                    $scope.sumTotal = 0;
                    $scope.listtickets = [];
                    defaultvalue();

                    generateprintinvoice(res.data);
                }
            });
        }
        $("#modaleditticket").modal("hide");
    };

    $scope.validatecontrols = function () {
        return $scope.headerticket == null || $scope.headerticket.dateregister == null
            || $scope.headerticket.nameinvoice == null || $scope.headerticket.numbernitinvoice == null
            || $scope.listtickets == null
            || ($scope.listtickets != null && $scope.listtickets.length < 1);
    };

    $scope.validatecontrolsdetail = function () {
        return $scope.namecustomer == null || $scope.selectedseat == null || $scope.numberidcustomer == null
            || $scope.numberbaggage == null || $scope.weightbaggage == null;
    };

    $scope.newticketdetail = function () {
        $scope.detailticket = {};
        $scope.selectedseat.available = 1;
        $scope.detailticket.numberseat = $scope.selectedseat.number;
        $scope.detailticket.numberid = $scope.numberidcustomer.toUpperCase();
        $scope.detailticket.fullName = $scope.namecustomer.toUpperCase();
        $scope.detailticket.price = $scope.price;
        $scope.detailticket.numberbaggage = $scope.numberbaggage;
        $scope.detailticket.weightbaggage = $scope.weightbaggage;
        $scope.detailticket.idbus = $scope.selectedschedule.idbus;
        $scope.detailticket.idschedule = $scope.selectedschedule.id;
        $scope.detailticket.iduser = $rootScope.currentUser.iduser;
        $scope.listtickets.push($scope.detailticket);
        $scope.sumTotal = $scope.listtickets.sum(function (item) {
            return parseInt(item.price);
        });
        $("#modaleditcustomer").modal("hide");
    };

    $scope.deleteticketdetail = function (item) {
        $scope.selectedseat.available = 0;
        $scope.listtickets.remove(item);
        $scope.sumTotal = $scope.listtickets.sum(function (item) {
            return item.price;
        });
    };

    $scope.selectedtravelchange = function () {
        getschedules();
    };

    $scope.scheduleselected = function (schedule) {
        $scope.selectedschedule = schedule;
        $scope.price = schedule.price;
        $scope.headerticket.dateregister = schedule.dateregister;

        for (var i = 0; i < schedule.Bus.numberseats; i++) {
            $scope.seatlist = {};
            var n = schedule.Tickets.where(function (item) {
                return item.number == i + 1;
            });

            $scope.seatlist.number = i + 1;
            if (n.length == 0) {
                $scope.seatlist.available = 0;
            } else {
                $scope.seatlist.available = 1;
            }
            $scope.listseats.push($scope.seatlist);
        }

        $scope.bustypepath = schedule.Bus.Bustype.path;
        $("#step-2").css("display", "block");
        $("#step-1").css("display", "none");

        setTimeout(function () {
            $("area").unbind('click').click(function (e) {
                e.preventDefault();
                var numberseatselected = e.currentTarget.attributes.name.nodeValue;

                var seatselected = $scope.listseats.where(function (item) {
                    return item.number == numberseatselected;
                });
                if (seatselected && seatselected.length > 0) {
                    selectedticketseat(seatselected.first());
                }

            });
        }, 500);
    };

    function selectedticketseat(item) {
        if (item && item.available == 0) {
            $scope.selectedseat = item;
            $scope.numberidcustomer = null;
            $scope.namecustomer = null;
            $scope.numberbaggage = null;
            $scope.weightbaggage = null;
            $scope.$apply();
            $("#modaleditcustomer").modal("show");
        } else {
            toastr.warning("El asiento numero " + item.number + " ya fue asignado");
        }
    }

    $scope.copyticketdetail = function (item) {
        $scope.headerticket.nameinvoice = item.fullName;
        $scope.headerticket.numbernitinvoice = parseInt(item.numberid);
    };

    function defaultvalue() {
        $scope.headerticket.numbernitinvoice = 0;
        $scope.headerticket.nameinvoice = "SIN NOMBRE";
    };


    function generateprintinvoice(nroinvoiceprint) {
        $scope.filters = {};
        $scope.filters.idoffice = $rootScope.idoffice;
        $scope.filters.numberinvoice = nroinvoiceprint;

        var response = SaleService.getinvoice($scope.filters);
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.datainvoice = {};

                if (res.data.invoice) {
                    $scope.datainvoice.titleCompany = res.data.setting.title;
                    $scope.datainvoice.numberidCompany = res.data.setting.numberid;
                    $scope.datainvoice.noteCompany = res.data.setting.note;
                    $scope.datainvoice.titleOffice = res.data.invoice.Office.title;
                    $scope.datainvoice.phoneOffice = res.data.invoice.Office.phone;
                    $scope.datainvoice.addressOffice = res.data.invoice.Office.address;
                    $scope.datainvoice.detailOffice = res.data.invoice.Office.detail;
                    $scope.datainvoice.numberInvoice = res.data.invoice.numberinvoice;
                    $scope.datainvoice.numberorderInvoice = res.data.invoice.numberorder;
                    $scope.datainvoice.dateInvoice = res.data.invoice.dateregister;
                    $scope.datainvoice.nameInvoice = res.data.invoice.fullname;
                    $scope.datainvoice.numbernitInvoice = res.data.invoice.numberid;
                    $scope.datainvoice.codecontrolInvoice = res.data.invoice.numbercontrol;
                    $scope.datainvoice.totalInvoice = res.data.invoice.amountinvoice;
                    $scope.datainvoice.deadlineOrder = res.data.orderbook.deadline;
                    $scope.datainvoice.total = res.data.invoice.Sales.first().total;
                    $scope.datainvoice.deadline = res.data.orderbook.deadline;
                    $scope.datainvoice.date = res.data.invoice.Sales.first().Schedule.dateregister;
                    $scope.datainvoice.arrival = res.data.invoice.Sales.first().Schedule.arrival;
                    $scope.datainvoice.departure = res.data.invoice.Sales.first().Schedule.departure;
                    $scope.detailinvoice = res.data.invoice.Sales.first().Tickets;
                    var totalformat = parseFloat(Math.round(res.data.invoice.Sales.first().total * 100) / 100).toFixed(2);
                    $scope.datainvoice.totalliteral = Convertir(totalformat);

                    printcodeqr("qrinvoice", $scope.datainvoice.numberidCompany, $scope.datainvoice.titleCompany,
                        $scope.datainvoice.numberInvoice, $scope.datainvoice.numberorderInvoice, $scope.datainvoice.date,
                        $scope.datainvoice.totalInvoice, $scope.datainvoice.codecontrolInvoice, $scope.datainvoice.deadlineOrder);
                    Print();
                }
            }
        });
    };

    function printcodeqr(element, numberid, businessname, numberinvoice,
        numberorder, dateinvoice, amountinvoice, codecontrol, datelimit) {
        $('#qrinvoice').qrcode({
            width: 100,
            height: 100,
            text: numberid + " | " +
            businessname + " | " +
            numberinvoice + " | " +
            numberorder + " | " +
            dateinvoice + " | " +
            amountinvoice + "Bs | " +
            codecontrol + " | " +
            datelimit
        });
    }
});