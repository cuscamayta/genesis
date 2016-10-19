app.controller('UserController', function ($scope, UserService, RoleService) {
    init();
    function init() {
        getroles();
        getusers();
        datauser();
        $('select').material_select();
    }

    function datauser() {
        $scope.edituser = {
            id: 0,
            username: '',
            firstname: '',
            lastname: '',
            password: '',
            email: null,
            idrole: 0,
            state: 1
        };
        $scope.selectedrole = null;
    };

    function getusers() {
        var response = UserService.getusers();
        response.then(function (users) {
            if (users.errors && users.errors.length > 0) {
                Materialize.toast(users.message, 4000);
            }
            else { $scope.users = users; }
        })
    }

    function getroles() {
        var response = RoleService.getroles();
        response.then(function (roles) {
            if (roles.errors && roles.errors.length > 0) {
                Materialize.toast(roles.message, 4000);
            }
            else {
                $scope.listrole = roles;
            }
        })
    }

    $scope.saveuser = function () {
        $scope.edituser;
        $scope.edituser.idrole = $scope.selectedrole.id;
        if ($scope.edituser.id == 0) {
            var response = UserService.saveuser($scope.edituser);
            response.then(function (users) {
                if (users.errors && users.errors.length > 0) {
                    Materialize.toast(users.message, 4000);
                }
                else { getusers(); }
            })
        } else {
            var response = UserService.updateuser($scope.edituser);
            response.then(function (users) {
                if (users.errors && users.errors.length > 0) {
                    Materialize.toast(users.message, 4000);
                }
                else { getusers(); }
            })
        }
    };

    $scope.deleteuser = function () {
        var response = UserService.deleteuser($scope.edituser);
        response.then(function (users) {
            if (users.errors && users.errors.length > 0) {
                Materialize.toast(users.message, 4000);
            }
            else {
                datauser();
                getusers();
            }
        })
    };

    $scope.selecteduser = function (user, option) {
        $scope.userselected = user;
        $scope.edituser = angular.copy($scope.userselected);
        $scope.edituser.state = 2;

        if (option == 1) {
            $('#modaledituser').openModal();
            $('#username').val($scope.edituser.username);
            $('#firstname').val($scope.edituser.firstname);
            $('#lastname').val($scope.edituser.lastname);
            $('#password').val($scope.edituser.password);
            $('#email').val($scope.edituser.email);
            $('#idrole').val($scope.edituser.idrole);
        } else {
            $('#modaldeleteuser').openModal();
        }
    };

    $scope.validatecontrols = function () {
        return $scope.edituser == null || $scope.edituser.username.length < 4
            || $scope.edituser.firstname.length == 0 || $scope.edituser.lastname.length == 0
            || $scope.edituser.password.length == 0;
    };

    $scope.newuser = function () {
        $('#modaledituser').openModal();
        datauser();
    };
});