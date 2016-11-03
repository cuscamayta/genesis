app.controller('RoleController', function ($scope, RoleService, $filter) {
    init();
    function init() {
        getroles();
        datarole();
    }

    $scope.currentPage = 1;
    $scope.pageSize = 10;
    function datarole() {
        $scope.editrole = {
            id: 0,
            state: 1,
            title: ''
        };
    };

    function getroles() {
        var response = RoleService.getroles();
        response.then(function (res) {
            if (res.isSuccess && !res.isSuccess) {
                toastr.error(res.message);
            }
            else { $scope.roles = res; }
        });
    }

    $scope.saverole = function () {
        $scope.editrole;
        if ($scope.editrole.id == 0) {
            var response = RoleService.saverole($scope.editrole);
            response.then(function (res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getroles();
                    datarole();
                    toastr.success(res.message);
                }
            });
        } else {
            var response = RoleService.updaterole($scope.editrole);
            response.then(function (res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getroles();
                    datarole();
                    toastr.success(res.message);
                }
            });
        }
    };

    $scope.deleterole = function () {
        var response = RoleService.deleterole($scope.editrole);
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $("#modaldeleterole").modal("hide");
                datarole();
                getroles();
                toastr.success(res.message);
            }
        });
    };

    $scope.selectedrole = function (role, option) {
        $scope.roleselected = role;
        $scope.editrole = angular.copy($scope.roleselected);
        $scope.editrole.state = 2;

        if (option == 1) {
            $('#title').val($scope.editrole.title);
        }
    };

    $scope.validatecontrols = function () {
        return $scope.editrole == null || $scope.editrole.title.length < 3;
    };

    $scope.newrole = function () {
        datarole();
    };  
});