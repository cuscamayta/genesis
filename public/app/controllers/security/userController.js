app.controller('UserController', function ($scope, UserService, RoleService) {
    init();
    function init() {
        getroles();
        getusers();
        datauser();
    }

    function datauser() {
        $scope.edituser = {
            id: 0,
            username: '',
            firstname: '',
            lastname: '',
            password: '',
            email: '',
            idrole: 0,
            state: 1
        };
    };

    function getusers() {
        var response = UserService.getusers();
        response.then(function (users) {
            $scope.users = users;
        })
    }

    function getroles() {
        var response = RoleService.getroles();
        response.then(function (roles) {
            $scope.listrole = roles;
        })
    }

    $scope.saveuser = function () {
        $scope.edituser;
        if ($scope.edituser.id == 0) {
            var response = UserService.saveuser($scope.edituser);
            response.then(function (users) {
                getusers();
            })
        } else {
            var response = UserService.updateuser($scope.edituser);
            response.then(function (users) {
                getusers();
            })
        }
    };

    $scope.deleteuser = function () {
        var response = UserService.deleteuser($scope.edituser);
        response.then(function (users) {
            datauser();
            getusers();
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