app.controller('BustypeController', function ($scope, BustypeService) {
    init();
    function init() {
        getbustypes();
        databustype();
    }

    function databustype() {
        $scope.editbustype = {
            id: 0,
            state: 1
        };
    };

    function getbustypes() {
        var response = BustypeService.getbustypes();
        response.then(function (res) {
            if (res.isSuccess && !res.isSuccess) {
                toastr.error(res.message);
            }
            else { $scope.bustypes = res; }
        });
    }

    $scope.savebustype = function () {
        $scope.editbustype;
        if ($scope.editbustype.id == 0) {
            var response = BustypeService.savebustype($scope.editbustype);
            response.then(function (res) {
                if (!res.isSuccess) {
                    toastr.error(res.message);
                }
                else { getbustypes(); }
            });
        } else {
            var response = BustypeService.updatebustype($scope.editbustype);
            response.then(function (res) {
                if (!res.isSuccess) {
                    toastr.error(res.message);
                }
                else { getbustypes(); }
            });
        }
    };

    $scope.deletebustype = function () {
        var response = BustypeService.deletebustype($scope.editbustype);
        response.then(function (res) {
            if (!res.isSuccess) { toastr.error(res.message); }
            else {
                $("#modaldeletebustype").modal("hide");
                toastr.success(res.message);
                databustype();
                getbustypes();
            }
        })
    };

    $scope.selectedbustype = function (bustype, option) {
        $scope.bustypeselected = bustype;
        $scope.editbustype = angular.copy($scope.bustypeselected);
        $scope.editbustype.state = 2;
    };

    $scope.validatecontrols = function () {
        return $scope.editbustype == null || $scope.editbustype.title == null
            || ($scope.editbustype.title != null && $scope.editbustype.title.length < 4)
    };

    $scope.newbustype = function () {
        databustype();
    };
});