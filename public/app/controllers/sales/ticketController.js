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

        var n = $scope.ticketdetails.where(function (item) {
            return item.fullName == $scope.namecustomer && item.numberseat == $scope.selectedseat;
        });

        if (n.length == 0) {
            $scope.editdetail.numberseat = $scope.selectedseat;
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
        }
    };

    $scope.deleteticketdetail = function (item) {
        $scope.ticketdetails.remove(item);
        $scope.sumTotal = $scope.ticketdetails.sum(function (item) {
            return item.price;
        });
    };

    $scope.selectedtravelchange = function () {
        getschedules();
    };

    $scope.scheduleselected = function (schedule) {
        $scope.seatlist = [];
        $scope.selectedschedule = schedule;
        $scope.price = schedule.price;

        for (var i = 0; i < schedule.Bus.numberseats; i++) {
            $scope.seatlist.push(i + 1);
        }

        $("#step-2").css("display", "block");
        $("#step-1").css("display", "none");
    };

    $scope.selectedticketseat = function (item) {
        $scope.selectedseat = item;
        $("#modaleditcustomer").modal("show");
    }

    $scope.copyticketdetail = function (item) {
        $scope.editticket.nameinvoice = item.fullName;
        $scope.editticket.numbernitinvoice = parseInt(item.numberid);
    };
});