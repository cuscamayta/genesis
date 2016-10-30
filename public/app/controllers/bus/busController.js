app.controller('BusController', function ($scope, BusService, BustypeService) {
    init();
    function init() {
        getbustypes();
        getbuses();
        databus();
    }

    function databus() {
        $scope.editbus = {
            id: 0,
            state: 1
        };
        $scope.selectedbustype = null;
    };

    function getbuses() {
        var response = BusService.getbuses();
        response.then(function (res) {
            if (res.isSuccess && !res.isSuccess) {
                toastr.error(res.message);
            }
            else { $scope.buses = res; }
        });
    }

    function getbustypes() {
        var response = BustypeService.getbustypes();
        response.then(function (res) {
            if (res.isSuccess && !res.isSuccess) {
                toastr.error(res.message);
            }
            else { $scope.listbustype = res; }
        });
    }

    $scope.savebus = function () {
        $scope.editbus;
        $scope.editbus.idbustype = $scope.selectedbustype.id;
        if ($scope.editbus.id == 0) {
            var response = BusService.savebus($scope.editbus);
            response.then(function (res) {
                if (!res.isSuccess) {
                    toastr.error(res.message);
                }
                else {
                    getbuses();
                    databus();
                    toastr.success(res.message);
                }
            });
        } else {
            var response = BusService.updatebus($scope.editbus);
            response.then(function (res) {
                if (!res.isSuccess) {
                    toastr.error(res.message);
                }
                else {
                    getbuses();
                    databus();
                    toastr.success(res.message);
                }
            });
        }
    };

    $scope.deletebus = function () {
        var response = BusService.deletebus($scope.editbus);
        response.then(function (res) {
            if (!res.isSuccess) { toastr.error(res.message); }
            else {
                $("#modaldeletebus").modal("hide");                
                databus();
                getbuses();
                toastr.success(res.message);
            }
        })
    };

    $scope.selectedbus = function (bus, option) {
        $scope.buseselected = bus;
        $scope.editbus = angular.copy($scope.buseselected);
        $scope.editbus.state = 2;

        if ($scope.listbustype) {
            for (var i = 0; i < $scope.listbustype.length; i++) {
                if ($scope.listbustype[i].id == $scope.editbus.idbustype) {
                    $scope.selectedbustype = $scope.listbustype[i];
                }
            }
        }
    };

    $scope.validatecontrols = function () {
        return $scope.editbus == null || $scope.editbus.numberid == null
            || ($scope.editbus.numberid != null && $scope.editbus.numberid.length < 4)
            || $scope.editbus.numberseats == null || $scope.editbus.numberrows == null
            || $scope.editbus.numberfloors == null || $scope.editbus.numberfloors == null
            || $scope.editbus.model == null || $scope.editbus.make == null
            || $scope.selectedbustype == null;
    };

    $scope.newbus = function () {
        databus();
    };
});