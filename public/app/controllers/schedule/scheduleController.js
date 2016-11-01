app.controller('ScheduleController', function ($scope, ScheduleService, BusService, TravelService, DriverService) {
    init();
    function init() {
        getbuses();
        gettravels();
        getdrivers();
        getschedules();
        dataschedule();

        $('#dateregister').daterangepicker({
            singleDatePicker: true,
            calender_style: "picker_4"
        }, function (start, end, label) {
            //console.log(start.toISOString(), end.toISOString(), label);
        });
    }

    function dataschedule() {
        $scope.editschedule = {
            id: 0,
            state: 1,
            details: []
        };
        $scope.selectedbus = null;
        $scope.selectedtravel = null;
        $scope.selecteddriver = null;
        $scope.schedulesdetails = [];

        $scope.editdetail = {}
    };

    function getschedules() {
        var response = ScheduleService.getschedules();
        response.then(function (res) {
            if (res.isSuccess && !res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.schedules = res;
                $scope.schedulesdetails = res[0].Scheduledetails;
            }
        });
    }

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

    function getdrivers() {
        var response = DriverService.getdriversforselect();
        response.then(function (res) {
            if (res.isSuccess && !res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listdriver = res;
            }
        });
    }

    function getbuses() {
        var response = BusService.getbusesforselect();
        response.then(function (res) {
            if (res.isSuccess && !res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listbus = res;
            }
        });
    }

    $scope.saveschedule = function () {
        $scope.editschedule;
        $scope.editschedule.dateregister = $("#dateregister").val();
        $scope.editschedule.idbus = $scope.selectedbus.id;
        $scope.editschedule.idtravel = $scope.selectedtravel.id;
        if ($scope.editschedule.id == 0) {
            var response = ScheduleService.saveschedule($scope.editschedule);
            response.then(function (res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getschedules();
                    dataschedule();
                    toastr.success(res.message);
                }
            });
        } else {
            var response = ScheduleService.updateschedule($scope.editschedule);
            response.then(function (res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getschedules();
                    dataschedule();
                    toastr.success(res.message);
                }
            });
        }
        $("#modaleditschedule").modal("hide");
        dataschedule();
    };

    $scope.deleteschedule = function () {
        var response = ScheduleService.deleteschedule($scope.editschedule);
        response.then(function (res) {
            if (!res.isSuccess) { toastr.error(res.message); }
            else {
                $("#modaldeleteschedule").modal("hide");
                dataschedule();
                getschedules();
                toastr.success(res.message);
            }
        });
    };

    $scope.selectedschedule = function (schedule, option) {
        $scope.scheduleselected = schedule;
        $scope.editschedule = angular.copy($scope.scheduleselected);
        $scope.editschedule.state = 2;

        if ($scope.listtravel) {
            for (var i = 0; i < $scope.listtravel.length; i++) {
                if ($scope.listtravel[i].id == $scope.editschedule.idtravel) {
                    $scope.selectedtravel = $scope.listtravel[i];
                }
            }
        }
    };

    $scope.validatecontrols = function () {
        return $scope.editschedule == null || $("#dateregister").val() == null
            || $scope.editschedule.arrival == null || $scope.editschedule.departure == null
            || $scope.editschedule.price == null || $scope.selectedtravel == null
            || $scope.selectedbus == null;
    };

    $scope.validatecontrolsdetail = function () {
        return $scope.editdetail == null || $("#type").val() == null
            || $scope.selecteddriver == null;
    };

    $scope.newschedule = function () {
        dataschedule();
    };

    $scope.newscheduledetail = function () {
        $scope.editdetail = {};

        var n = $scope.schedulesdetails.where(function (item) {
            return item.iddriver == $scope.selecteddriver.id && item.drivertype == $("#type").val();
        });

        if (n.length == 0) {
            $scope.editdetail.drivertype = $("#type").val();
            $scope.editdetail.iddriver = $scope.selecteddriver.id;
            $scope.editdetail.fullName = $scope.selecteddriver.fullName;
            $scope.schedulesdetails.push($scope.editdetail);
        }
    }

    $scope.deletescheduledetail = function (item) {
        $scope.schedulesdetails.remove(item);
    };

    $scope.selectedtravelchange = function () {
        $scope.editschedule.arrival = $scope.selectedtravel.arrival;
        $scope.editschedule.departure = $scope.selectedtravel.departure;
    }
});