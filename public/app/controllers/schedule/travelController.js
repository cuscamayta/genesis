app.controller('TravelController', function ($scope, TravelService, BusService, CourseService) {
    init();
    function init() {
        getbuses();
        getcourses();
        gettravels();
        datatravel();
        $('select').material_select();
    }

    function datatravel() {
        $scope.edittravel = {
            id: 0,
            numberid: '',
            detail: null,
            idbus: 0,
            state: 1
        };
        $scope.selectedbus = null;
        $scope.selectedcourse = null;
    };

    function gettravels() {
        var response = TravelService.gettravels();
        response.then(function (travels) {
            if (travels.errors && travels.errors.length > 0) {
                Materialize.toast(travels.message, 4000);
            }
            else { $scope.travels = travels; }
        })
    }

    function getbuses() {
        var response = BusService.getbuses();
        response.then(function (buses) {
            if (buses.errors && buses.errors.length > 0) {
                Materialize.toast(buses.message, 4000);
            }
            else {
                $scope.listbus = buses;
            }
        })
    }

    function getcourses() {
        var response = CourseService.getcourses();
        response.then(function (course) {
            if (course.errors && course.errors.length > 0) {
                Materialize.toast(course.message, 4000);
            }
            else {
                $scope.listcourse = course;
            }
        })
    }

    $scope.savetravel = function () {
        $scope.edittravel;
        $scope.edittravel.idbus = $scope.selectedbus.id;
        $scope.edittravel.idcourse = $scope.selectedcourse.id;
        if ($scope.edittravel.id == 0) {
            var response = TravelService.savetravel($scope.edittravel);
            response.then(function (travels) {
                if (travels.errors && travels.errors.length > 0) {
                    Materialize.toast(travels.message, 4000);
                }
                else { gettravels(); }
            })
        } else {
            var response = TravelService.updatetravel($scope.edittravel);
            response.then(function (travels) {
                if (travels.errors && travels.errors.length > 0) {
                    Materialize.toast(travels.message, 4000);
                }
                else { gettravels(); }
            })
        }
    };

    $scope.deletetravel = function () {
        var response = TravelService.deletetravel($scope.edittravel);
        response.then(function (travels) {
            if (travels.errors && travels.errors.length > 0) {
                Materialize.toast(travels.message, 4000);
            }
            else {
                datatravel();
                gettravels();
            }
        })
    };

    $scope.selectedtravel = function (travel, option) {
        $scope.travelselected = travel;
        $scope.edittravel = angular.copy($scope.travelselected);
        $scope.edittravel.state = 2;

        if (option == 1) {
            $('#modaledittravel').openModal();
            $('#numberid').val($scope.edittravel.numberid);
            $('#detail').val($scope.edittravel.detail);
            $('#idbus').val($scope.edittravel.idbus);
            $('#idcourse').val($scope.edittravel.idcourse);
            $('#idbus').val($scope.edittravel.idbus);
        } else {
            $('#modaldeletetravel').openModal();
        }
    };

    $scope.validatecontrols = function () {
        return $scope.edittravel == null || $scope.edittravel.numberid.length == 0
            || $('#idbus').val().length == 0 || $('#idcourse').val().length == 0;
    };

    $scope.newtravel = function () {
        $('#modaledittravel').openModal();
        datatravel();
    };
});