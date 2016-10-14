app.controller('BustypeController', function ($scope, BustypeService) {
    init();
    function init() {
        getbustypes();
        databustype();
    }

    function databustype() {
        $scope.editbustype = {
            id: 0,
            title: '',
            state: 1
        };
    };

    function getbustypes() {
        var response = BustypeService.getbustypes();
        response.then(function (bustypes) {
            if (bustypes.errors && bustypes.errors.length > 0) {
                Materialize.toast(bustypes.message, 4000);
            }
            else { $scope.bustypes = bustypes; }
        })
    }

    $scope.savebustype = function () {
        $scope.editbustype;
        if ($scope.editbustype.id == 0) {
            var response = BustypeService.savebustype($scope.editbustype);
            response.then(function (bustypes) {
                if (bustypes.errors && bustypes.errors.length > 0) {
                    Materialize.toast(bustypes.message, 4000);
                }
                else { getbustypes(); }
            })
        } else {
            var response = BustypeService.updatebustype($scope.editbustype);
            response.then(function (bustypes) {
                if (bustypes.errors && bustypes.errors.length > 0) {
                    Materialize.toast(bustypes.message, 4000);
                }
                else { getbustypes(); }
            })
        }
    };

    $scope.deletebustype = function () {
        var response = BustypeService.deletebustype($scope.editbustype);
        response.then(function (bustypes) {
            if (bustypes.errors && bustypes.errors.length > 0) {
                customer
            }
            else {
                databustype();
                getbustypes();
            }
        })
    };

    $scope.selectedbustype = function (bustype, option) {
        $scope.bustypeselected = bustype;
        $scope.editbustype = angular.copy($scope.bustypeselected);
        $scope.editbustype.state = 2;

        if (option == 1) {
            $('#modaleditbustype').openModal();
            $('#title').val($scope.editbustype.title);
        } else {
            $('#modaldeletebustype').openModal();
        }
    };

    $scope.validatecontrols = function () {
        return $scope.editbustype == null || $scope.editbustype.title.length < 3;
    };

    $scope.newbustype = function () {
        $('#modaleditbustype').openModal();
        databustype();
    };
});