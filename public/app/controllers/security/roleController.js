app.controller('RoleController', function ($scope, RoleService) {
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
        response.then(function (roles) {
            $scope.roles = roles;
        })
    }

    $scope.saverole = function () {
        $scope.editrole;
        if ($scope.editrole.id == 0) {
            var response = RoleService.saverole($scope.editrole);
            response.then(function (roles) {
                $scope.roles = roles;
            })
        } else {
            var response = RoleService.updaterole();
            response.then(function (roles) {
                $scope.roles = roles;
            })
        }
    };

    $scope.deleterole = function () {
        $scope.editrole;
        var response = RoleService.deleterole($scope.editrole.id);
        response.then(function (roles) {
            $scope.roles = roles;
        })
    };

    $scope.selectedrole = function (role, option) {
        $scope.roleselected = role;
        $scope.editrole = angular.copy($scope.roleselected);
        $scope.editrole.state = 2;

        if (option == 1) {
            $('#modaleditrole').openModal();
            $('#title').val($scope.editrole.title);
        } else {
            $('#modaldeleterole').openModal();
        }
    };

    $scope.validatecontrols = function () {
        return $scope.editrole == null || $scope.editrole.title.length < 3;
    };

    $scope.newrole = function () {
        $('#modaleditrole').openModal();
        datarole();
    };
});