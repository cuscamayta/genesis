app.controller('UserController', function ($scope, UserService) {


    init();
    function init() {
        //Aqui el codigo para usuario
        getusers();
    }

    function getusers() {
        var response = UserService.getusers();
        response.then(function (users) {
            $scope.users = users;
            // console.log(users);
        })
    }
});