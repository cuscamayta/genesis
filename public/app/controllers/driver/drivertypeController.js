app.controller('DrivertypeController', function ($scope, DrivertypeService) {
    init();
    function init() {
        getdrivertypes();
        datadrivertype();
    }

    function datadrivertype() {
        $scope.editdrivertype = {
            id: 0,
            title: '',
            state: 1
        };
    };

    function getdrivertypes() {
        var response = DrivertypeService.getdrivertypes();
        response.then(function (drivertypes) {
            if (drivertypes.errors && drivertypes.errors.length > 0) {
                Materialize.toast(drivertypes.message, 4000);
            }
            else { $scope.drivertypes = drivertypes; }
        })
    }

    $scope.savedrivertype = function () {
        $scope.editdrivertype;
        if ($scope.editdrivertype.id == 0) {
            var response = DrivertypeService.savedrivertype($scope.editdrivertype);
            response.then(function (drivertypes) {
                if (drivertypes.errors && drivertypes.errors.length > 0) {
                    Materialize.toast(drivertypes.message, 4000);
                }
                else { getdrivertypes(); }
            })
        } else {
            var response = DrivertypeService.updatedrivertype($scope.editdrivertype);
            response.then(function (drivertypes) {
                if (drivertypes.errors && drivertypes.errors.length > 0) {
                    Materialize.toast(drivertypes.message, 4000);
                }
                else { getdrivertypes(); }
            })
        }
    };

    $scope.deletedrivertype = function () {
        var response = DrivertypeService.deletedrivertype($scope.editdrivertype);
        response.then(function (drivertypes) {
            if (drivertypes.errors && drivertypes.errors.length > 0) {
                customer
            }
            else {
                datadrivertype();
                getdrivertypes();
            }
        })
    };

    $scope.selecteddrivertype = function (drivertype, option) {
        $scope.drivertypeselected = drivertype;
        $scope.editdrivertype = angular.copy($scope.drivertypeselected);
        $scope.editdrivertype.state = 2;

        if (option == 1) {
            $('#modaleditdrivertype').openModal();
            $('#title').val($scope.editdrivertype.title);
        } else {
            $('#modaldeletedrivertype').openModal();
        }
    };

    $scope.validatecontrols = function () {
        return $scope.editdrivertype == null || $scope.editdrivertype.title.length < 3;
    };

    $scope.newdrivertype = function () {
        $('#modaleditdrivertype').openModal();
        datadrivertype();
    };
});