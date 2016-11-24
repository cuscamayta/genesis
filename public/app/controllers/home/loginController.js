app.controller('LoginController', function ($scope, LoginService, $localStorage, $location, $rootScope, UserofficeService) {
    init();
    function init() {
        $scope.user = {};
    }

    $scope.login = function () {
        LoginService.loginUser($scope.user).then(function (responseData) {
            if (responseData.data.id > 0) {

                var response = UserofficeService.getuserofficesforselect(responseData.data);
                response.then(function (res) {
                    if (!res.isSuccess) {
                        toastr.error(res.message);
                    }
                    else {
                        $scope.listoffice = res.data;
                        if ($scope.listoffice.length == 0) {
                            toastr.warning("El usuario " + responseData.data.username + " no tiene sucursal asignada");
                        } else {

                            $scope.tokentemp = responseData.data.token;

                            if ($scope.listoffice.length > 1) {
                                $("#step-2").css("display", "block");
                                $("#step-1").css("display", "none");
                            }
                            else {
                                $localStorage.token = responseData.data.token;
                                $rootScope.currentUser = $scope.user;
                                $rootScope.currentUser.idoffice = $scope.listoffice[0].idoffice;
                                $location.path('/home');
                            }
                        }
                    }
                });
            } else {
                toastr.error(responseData.data);
            }
        })
    };

    $scope.validatecontrols = function () {
        return $scope.user == null || $scope.user.username == null || $scope.user.password == null;
    };

    $rootScope.isLoginPage = function () {
        if (!$rootScope.currentUser)
            return { "margin-left": 0 };
    };

    $scope.validateoffice = function () {
        return $scope.selectedoffice == null;
    };

    $scope.getmenu = function () {
        $localStorage.token = $scope.tokentemp;
        $rootScope.currentUser = $scope.user;
        $rootScope.currentUser.idoffice = $scope.selectedoffice.id;
        $location.path('/home');
    };

    $rootScope.logout = function () {
        $localStorage.token = null;
        $rootScope.currentUser = null;
    };
});