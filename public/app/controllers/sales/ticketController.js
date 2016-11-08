app.controller('TicketController', function ($scope, TicketService, ScheduleService, CustomerService, TravelService) {
    init();

    function init() {
        gettravels();
        getcustomers();
        dataticket();

        $('#dateregister').daterangepicker({
            singleDatePicker: true,
            calender_style: "picker_4"
        }, function (start, end, label) {
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
        $scope.selectedcustomer = null;
        $scope.ticketdetails = [];

        $scope.editdetail = {
            state: "0"
        }
    };

    function gettravels() {
        var response = TravelService.gettravels();
        response.then(function (res) {
            if (res.isSuccess && !res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listtravel = res;
            }
        });
    }

    function getschedules() {
        var response = ScheduleService.getschedulesforselect($scope.selectedtravel);
        response.then(function (res) {
            if (res.isSuccess && !res.isSuccess) {
                toastr.error(res.message);
            }
            else { $scope.listschedule = res; }
        });
    }

    function getcustomers() {
        var response = CustomerService.getcustomers();
        response.then(function (res) {
            if (res.isSuccess && !res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listcustomer = res;
            }
        });
    }

    $scope.saveticket = function () {
        $scope.editticket;
        $scope.editticket.dateregister = $("#dateregister").val();
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
        return $scope.editticket == null || $("#dateregister").val() == null
            || $scope.selectedcustomer == null
            || $scope.ticketdetails == null
            || ($scope.ticketdetails != null && $scope.ticketdetails.length < 1);
    };

    $scope.validatecontrolsdetail = function () {
        return $scope.selectedcustomer == null || $scope.selectedseat == null;
    };

    $scope.newticketdetail = function () {
        $scope.editdetail = {};

        var n = $scope.ticketdetails.where(function (item) {
            return item.idcustomer == $scope.selectedcustomer.id && item.numberseat == $scope.selectedseat;
        });

        if (n.length == 0) {
            $scope.editdetail.numberseat = $scope.selectedseat;
            $scope.editdetail.idcustomer = $scope.selectedcustomer.id;
            $scope.editdetail.numberid = $scope.selectedcustomer.numberid;
            $scope.editdetail.fullName = $scope.selectedcustomer.fullName;
            $scope.editdetail.price = $scope.price;
            $scope.ticketdetails.push($scope.editdetail);
            $scope.sumTotal = $scope.ticketdetails.sum(function (item) {
                return parseInt(item.price);
            });
            $("#modaleditcustomer").modal("hide");
        }
    }

    $scope.deleteticketdetail = function (item) {
        $scope.ticketdetails.remove(item);
        $scope.sumTotal = $scope.ticketdetails.sum(function (item) {
            return item.price;
        });
    };

    $scope.selectedtravelchange = function () {
        getschedules();
    }

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