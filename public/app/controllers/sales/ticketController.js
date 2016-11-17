app.controller('TicketController', function ($scope, TicketService, ScheduleService, TravelService) {
    init();

    function init() {
        gettravels();
        dataticket();

        $('#dateregister').daterangepicker({
            locale: { format: 'DD/MM/YYYY' },
            singleDatePicker: true,
            showDropdowns: false,
            calender_style: "picker_4",
        }).on('apply.daterangepicker', function (ev, picker) {
            $scope.editticket.dateregister = picker.startDate.format('DD/MM/YYYY');
        });
    }

    function dataticket() {
        $scope.editticket = {
            id: 0,
            state: 1,
            details: []
        };
        $scope.selectedbus = null;
        $scope.selectedschedule = null;
        $scope.ticketdetails = [];
        $scope.listtickets = [];

        $scope.editdetail = {
            state: "0"
        }
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
        $scope.editticket;
        $scope.editticket.idschedule = $scope.selectedschedule.id;
        $scope.editticket.arrival = $scope.selectedschedule.arrival;
        $scope.editticket.departure = $scope.selectedschedule.departure;
        $scope.editticket.detail = $scope.selectedschedule.detail;
        $scope.editticket.details = $scope.ticketdetails;

        $scope.editticket.numberorder = 700400168524;
        $scope.editticket.numbernit = 123;
        $scope.editticket.type = 1;
        $scope.editticket.controlkey = "21a2s545as4df654s";
        $scope.editticket.amountinvoice = $scope.sumTotal;

        if ($scope.editticket.id == 0) {
            var response = TicketService.saveticket($scope.editticket);
            response.then(function (res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    toastr.success(res.message);
                    $scope.ticketdetails = null;
                    $scope.editticket.numbernitinvoice = null;
                    $scope.editticket.nameinvoice = null;
                }
            });
        }
        $("#modaleditticket").modal("hide");
    };

    $scope.validatecontrols = function () {
        return $scope.editticket == null || $scope.editticket.dateregister == null
            || $scope.editticket.nameinvoice == null || $scope.editticket.numbernitinvoice == null
            || $scope.ticketdetails == null
            || ($scope.ticketdetails != null && $scope.ticketdetails.length < 1);
    };

    $scope.validatecontrolsdetail = function () {
        return $scope.namecustomer == null || $scope.selectedseat == null || $scope.numberidcustomer == null
            || $scope.numberbaggage == null || $scope.weightbaggage == null;
    };

    $scope.newticketdetail = function () {
        $scope.editdetail = {};
        $scope.selectedseat.status = 1;
        $scope.editdetail.numberseat = $scope.selectedseat.number;
        $scope.editdetail.numberid = $scope.numberidcustomer.toUpperCase();
        $scope.editdetail.fullName = $scope.namecustomer.toUpperCase();
        $scope.editdetail.price = $scope.price;
        $scope.editdetail.numberbaggage = $scope.numberbaggage;
        $scope.editdetail.weightbaggage = $scope.weightbaggage;
        $scope.editdetail.idbus = $scope.selectedschedule.idbus;
        $scope.editdetail.idschedule = $scope.selectedschedule.id;
        $scope.ticketdetails.push($scope.editdetail);
        $scope.sumTotal = $scope.ticketdetails.sum(function (item) {
            return parseInt(item.price);
        });
        $("#modaleditcustomer").modal("hide");
    };

    $scope.deleteticketdetail = function (item) {
        $scope.selectedseat.status = 0;
        $scope.ticketdetails.remove(item);
        $scope.sumTotal = $scope.ticketdetails.sum(function (item) {
            return item.price;
        });
    };

    $scope.selectedtravelchange = function () {
        getschedules();
    };

    $scope.scheduleselected = function (schedule) {
        $scope.selectedschedule = schedule;
        $scope.price = schedule.price;
        $scope.editticket.dateregister = schedule.dateregister;

        for (var i = 0; i < schedule.Bus.numberseats; i++) {
            $scope.seatlist = {};
            var n = schedule.Tickets.where(function (item) {
                return item.number == i + 1;
            });

            $scope.seatlist.number = i + 1;
            if (n.length == 0) {
                $scope.seatlist.status = 0;
            } else {
                $scope.seatlist.status = 1;
            }
            $scope.listtickets.push($scope.seatlist);
        }

        $("#step-2").css("display", "block");
        $("#step-1").css("display", "none");
    };

    $scope.selectedticketseat = function (item) {
        if (item.status == 0) {
            $scope.selectedseat = item;
            $scope.numberidcustomer = null;
            $scope.namecustomer = null;
            $scope.numberbaggage = null;
            $scope.weightbaggage = null;
            $("#modaleditcustomer").modal("show");
        } else {
            toastr.warning("El asiento numero " + item.number + " ya fue asignado");
        }
    }

    $scope.copyticketdetail = function (item) {
        $scope.editticket.nameinvoice = item.fullName;
        $scope.editticket.numbernitinvoice = parseInt(item.numberid);
    };
});