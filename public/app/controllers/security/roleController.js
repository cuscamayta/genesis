app.controller('RoleController', function ($scope, RoleService, $filter) {
    init();
    function init() {
        getroles();
        datarole();
    }

    function datarole() {
        $scope.editrole = {
            id: 0,
            title: '',
            state: 1
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
                    toastr.success(res.message);
                }
            });
        } else {
            var response = RoleService.updaterole($scope.editrole);
            response.then(function (res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getroles();
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
                toastr.success(res.message);
                datarole();
                getroles();
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

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.q = '';

    $scope.getData = function () {
        return $filter('filter')($scope.roles, $scope.q)
    }

    $scope.numberOfPages = function () {
        return Math.ceil($scope.getData().length / $scope.pageSize);
    }
});


app.filter('startFrom', function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    }
});