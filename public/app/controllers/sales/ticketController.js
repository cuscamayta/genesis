app.controller('TicketController', function ($scope, TicketService, ScheduleService, TravelService, $rootScope) {
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
            $scope.headerticket.dateregister = picker.startDate.format('DD/MM/YYYY');
        });
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
        $scope.headerticket.iduser = $rootScope.currentUser.iduser;

        $scope.headerticket.idoffice = $rootScope.currentUser.idoffice;
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

        $("#step-2").css("display", "block");
        $("#step-1").css("display", "none");
    };

    $scope.selectedticketseat = function (item) {
        if (item.available == 0) {
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
        $scope.headerticket.nameinvoice = item.fullName;
        $scope.headerticket.numbernitinvoice = parseInt(item.numberid);
    };

    function defaultvalue() {
        $scope.headerticket.numbernitinvoice = 0;
        $scope.headerticket.nameinvoice = "SIN NOMBRE";
    };
});