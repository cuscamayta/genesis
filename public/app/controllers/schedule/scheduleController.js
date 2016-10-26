app.controller('ScheduleController', function ($scope, ScheduleService, BusService, TravelService, DriverService) {
    init();
    function init() {
        getbuses();
        getdrivers();
        gettravels();
        getschedules();
        dataschedule();
        $('select').material_select();
        $("#dateregister").datepicker({ dateFormat: "dd/mm/yy", });
    }

    function dataschedule() {
        $scope.editschedule = {
            id: 0,
            dateregister: '',
            arrival: '',
            departure: '',
            detail: '',
            price: 0,
            idtravel: 0,
            idbus: 0,
            state: 1,
            details: []
        };
        $scope.selectedbus = null;
        $scope.selectedtravel = null;
        $scope.selecteddriver = null;

        $scope.editdetail = {
            drivertype: "",
            iddriver: 0,
            idschedule: 0
        }
    };

    function getschedules() {
        var response = ScheduleService.getschedules();
        response.then(function (schedules) {
            if (schedules.errors && schedules.errors.length > 0) {
                Materialize.toast(schedules.message, 4000);
            }
            else {
                $scope.schedules = schedules;
                $scope.schedulesdetails = schedules[0].Scheduledetails;
            }
        })
    }

    function getbuses() {
        var response = BusService.getbusesforselect();
        response.then(function (buses) {
            if (buses.errors && buses.errors.length > 0) {
                Materialize.toast(buses.message, 4000);
            }
            else {
                $scope.listbus = buses;
            }
        })
    }

    function gettravels() {
        var response = TravelService.gettravels();
        response.then(function (travels) {
            if (travels.errors && travels.errors.length > 0) {
                Materialize.toast(travels.message, 4000);
            }
            else {
                $scope.listtravel = travels;
            }
        })
    }

    function getdrivers() {
        var response = DriverService.getdriversforselect();
        response.then(function (drivers) {
            if (drivers.errors && drivers.errors.length > 0) {
                Materialize.toast(drivers.message, 4000);
            }
            else {
                $scope.listdriver = drivers;
            }
        })
    }

    $scope.saveschedule = function () {
        $scope.editschedule;
        $scope.editschedule.idbus = $scope.selectedbus.id;
        $scope.editschedule.idtravel = $scope.selectedtravel.id;
        if ($scope.editschedule.id == 0) {
            var response = ScheduleService.saveschedule($scope.editschedule);
            response.then(function (schedules) {
                if (schedules.errors && schedules.errors.length > 0) {
                    Materialize.toast(schedules.message, 4000);
                }
                else { getschedules(); }
            })
        } else {
            var response = ScheduleService.updateschedule($scope.editschedule);
            response.then(function (schedules) {
                if (schedules.errors && schedules.errors.length > 0) {
                    Materialize.toast(schedules.message, 4000);
                }
                else { getschedules(); }
            })
        }
    };

    $scope.deleteschedule = function () {
        var response = ScheduleService.deleteschedule($scope.editschedule);
        response.then(function (schedules) {
            if (schedules.errors && schedules.errors.length > 0) {
                Materialize.toast(schedules.message, 4000);
            }
            else {
                dataschedule();
                getschedules();
            }
        })
    };

    $scope.selectedschedule = function (schedule, option) {
        $scope.scheduleselected = schedule;
        $scope.editschedule = angular.copy($scope.scheduleselected);
        $scope.editschedule.state = 2;

        if (option == 1) {
            $('#modaleditschedule').openModal();
            $('#dateregister').val($scope.editschedule.dateregister);
            $('#price').val($scope.editschedule.price);
            $('#arrival').val($scope.editschedule.arrival);
            $('#departure').val($scope.editschedule.departure);
            $('#detail').val($scope.editschedule.detail);
            $('#idtravel').val($scope.editschedule.idtravel);
            $('#idbus').val($scope.editschedule.idbus);
        } else {
            $('#modaldeleteschedule').openModal();
        }
    };

    $scope.validatecontrols = function () {
        return $scope.editschedule == null || $scope.editschedule.dateregister.length < 10
            || $scope.editschedule.arrival.length == 0 || $scope.editschedule.departure.length == 0
            || $('#idbus').val() == 0 || $('#idtravel').val() == 0 || $scope.editschedule.price == 0;
    };

    $scope.newschedule = function () {
        $('#modaleditschedule').openModal();
        dataschedule();
    };

    $scope.newscheduledetail = function () {
        $scope.editdetail.drivertype = $("#type").val();
        $scope.editdetail.iddriver = $scope.selecteddriver.id;
        $scope.schedulesdetails.push($scope.editdetail);
    }

    $scope.deletescheduledetail = function () {
        if ($scope.editdetail.id) {
            var response = ScheduleService.deletescheduledetail($scope.editdetail);
            response.then(function (details) {
                if (details.errors && details.errors.length > 0) {
                    Materialize.toast(details.message, 4000);
                }
            })
        }else{
            
        }
    };
});