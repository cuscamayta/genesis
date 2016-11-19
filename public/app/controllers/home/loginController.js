app.controller('LoginController', function ($scope, LoginService, $localStorage, $location) {
    init();
    function init() {
        $scope.user = {};
    }

    $scope.login = function () {
        LoginService.loginUser($scope.user).then(function (responseData) {
            console.log(responseData);
            $localStorage.token = responseData.data.token;
            //armar el menu dinamicamente segun el rol del usuario
            $location.path('/home');
        })
    }
});