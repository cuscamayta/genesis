app.controller('DriverController', function ($scope, DriverService, DrivertypeService) {
    init();
    function init() {
        getdrivertypes();
        getdrivers();
        datadriver();

        $("#birthdate").datepicker({ dateFormat: "dd/mm/yy", });
    }

    function datadriver() {
        $scope.editdriver = {
            id: 0,
            numberid: '',
            firstname: '',
            lastname: '',
            birthdate: null,
            iddrivertype: 0,
            state: 1
        };
        $scope.selecteddrivertype = null;
    };

    function getdrivers() {
        var response = DriverService.getdrivers();
        response.then(function (drivers) {
            if (drivers.errors && drivers.errors.length > 0) {
                Materialize.toast(drivers.message, 4000);
            }
            else {                
                $scope.drivers = drivers;
                /*if($scope.drivers[0].birthdate){
                    $scope.drivers[0].birthdate = moment($scope.drivers.birthdate).format('DD/MM/YYYY');
                }*/
            }
        })
    }

    function getdrivertypes() {
        var response = DrivertypeService.getdrivertypes();
        response.then(function (drivertypes) {
            if (drivertypes.errors && drivertypes.errors.length > 0) {
                Materialize.toast(drivertypes.message, 4000);
            }
            else {
                $scope.listdrivertype = drivertypes;
            }
        })
    }

    $scope.savedriver = function () {
        $scope.editdriver;
        $scope.editdriver.iddrivertype = $scope.selecteddrivertype.id;
        if ($scope.editdriver.id == 0) {
            var response = DriverService.savedriver($scope.editdriver);
            response.then(function (drivers) {
                if (drivers.errors && drivers.errors.length > 0) {
                    Materialize.toast(drivers.message, 4000);
                }
                else { getdrivers(); }
            })
        } else {
            var response = DriverService.updatedriver($scope.editdriver);
            response.then(function (drivers) {
                if (drivers.errors && drivers.errors.length > 0) {
                    Materialize.toast(drivers.message, 4000);
                }
                else { getdrivers(); }
            })
        }
    };

    $scope.deletedriver = function () {
        var response = DriverService.deletedriver($scope.editdriver);
        response.then(function (drivers) {
            if (drivers.errors && drivers.errors.length > 0) {
                Materialize.toast(drivers.message, 4000);
            }
            else {
                datadriver();
                getdrivers();
            }
        })
    };

    $scope.selecteddriver = function (driver, option) {
        $scope.driverselected = driver;
        $scope.editdriver = angular.copy($scope.driverselected);
        $scope.editdriver.state = 2;

        if (option == 1) {
            $('#modaleditdriver').openModal();
            $('#numberid').val($scope.editdriver.numberid);
            $('#firstname').val($scope.editdriver.firstname);
            $('#lastname').val($scope.editdriver.lastname);
            $('#birthdate').val($scope.editdriver.birthdate);
            $('#iddrivertype').val($scope.editdriver.iddrivertype);
        } else {
            $('#modaldeletedriver').openModal();
        }
    };

    $scope.validatecontrols = function () {
        return $scope.editdriver == null || $scope.editdriver.numberid.length < 4
            || $scope.editdriver.firstname.length == 0 || $scope.editdriver.lastname.length == 0;
    };

    $scope.newdriver = function () {
        $('#modaleditdriver').openModal();
        datadriver();
    };
});