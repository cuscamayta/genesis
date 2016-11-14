app.controller('TicketController', function ($scope, TicketService, ScheduleService, TravelService) {
    init();

    function init() {
        gettravels();
        dataticket();

        $('#dateregister').daterangepicker({
            locale: { format: 'DD/MM/YYYY' },
            singleDatePicker: true,
            showDropdowns: true,
            calender_style: "picker_4"
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
        $scope.editticket.details = $scope.ticketdetails;

        $scope.editticket.nitci = 5635467;
        $scope.editticket.numberorder = 7904006306693;
        $scope.editticket.amount = $scope.sumTotal;
        $scope.editticket.limit = "20100101"
        $scope.editticket.controlkey = "zZ7Z]xssKqkEf_6K9uH(EcV+%x+u[Cca9T%+_$kiLjT8(zr3T9b5Fx2xG-D+_EBS";

        if ($scope.editticket.id == 0) {
            var response = TicketService.saveticket($scope.editticket);
            response.then(function (res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    dataticket();
                    toastr.success(res.message);
                }
            });
        }
        $("#modaleditticket").modal("hide");
        dataticket();
    };

    $scope.validatecontrols = function () {
        return $scope.editticket == null || $scope.editticket.dateregister == null
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
        $scope.editdetail.numberid = $scope.numberidcustomer;
        $scope.editdetail.fullName = $scope.namecustomer;
        $scope.editdetail.price = $scope.price;
        $scope.editdetail.numberbaggage = $scope.numberbaggage;
        $scope.editdetail.weightbaggage = $scope.weightbaggage;
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