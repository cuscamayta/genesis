app.controller('LoginController', function($scope, LoginService, $localStorage, $location, $rootScope, UserofficeService, PermitService, $timeout) {
    init();
    function init() {
        $scope.user = {};
    }

    $scope.login = function() {
        LoginService.loginUser($scope.user).then(function(responseData) {
            if (responseData.data.id > 0) {

                var response = UserofficeService.getuserofficesforselect(responseData.data);
                response.then(function(res) {
                    if (!res.isSuccess) {
                        toastr.error(res.message);
                    }
                    else {
                        $scope.listoffice = res.data;
                        if ($scope.listoffice.length == 0) {
                            toastr.warning("El usuario " + responseData.data.username + " no tiene sucursal asignada");
                        } else {

                            $scope.tokentemp = responseData.data.token;
                            $scope.user.fullnameuser = responseData.data.firstname + " " + responseData.data.lastname;
                            $scope.user.roleuser = responseData.data.Role.title;
                            $rootScope.roleid = responseData.data.Role.id;

                            if ($scope.listoffice.length > 1) {
                                $("#step-2").css("display", "block");
                                $("#step-1").css("display", "none");
                            }
                            else {
                                $localStorage.token = responseData.data.token;
                                $rootScope.currentUser = $scope.user;
                                $rootScope.fullnameuser = $scope.user.fullnameuser;
                                $rootScope.roleuser = $scope.user.roleuser;
                                $rootScope.currentUser.idoffice = $scope.listoffice[0].idoffice;
                                $rootScope.currentUser.nameoffice = $scope.listoffice[0].title;
                                getpermitsforrole();
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

    $scope.validatecontrols = function() {
        return $scope.user == null || $scope.user.username == null || $scope.user.password == null;
    };

    $rootScope.isLoginPage = function() {
        if (!$rootScope.currentUser)
            return { "margin-left": 0 };
    };

    $scope.validateoffice = function() {
        return $scope.selectedoffice == null;
    };

    $scope.getmenu = function() {
        $localStorage.token = $scope.tokentemp;
        $rootScope.currentUser = $scope.user;
        $rootScope.fullnameuser = $scope.user.fullnameuser;
        $rootScope.roleuser = $scope.user.roleuser;
        $rootScope.currentUser.idoffice = $scope.selectedoffice.id;
        $rootScope.currentUser.nameoffice = $scope.selectedoffice.Office.title;
        getpermitsforrole();
        $location.path('/home');
    };

    $rootScope.logout = function() {
        $localStorage.token = null;
        $rootScope.currentUser = null;
    };

    $scope.changepass = function() {
        if ($scope.pass.passcurrent === $rootScope.currentUser.password) {
            $scope.pass.username = $rootScope.currentUser.username;
            LoginService.changepass($scope.pass).then(function(res) {
                if (!res.type) {
                    toastr.error(res.data);
                } else {
                    $scope.pass = null;
                    toastr.success(res.data);
                    $rootScope.currentUser.password = $scope.pass.passnew;
                }
            });
        } else {
            toastr.warning("Contraseña actual no es la correcta");
        }
    };

    $scope.validatecontrolspass = function() {
        return $scope.pass == null || $scope.pass.passcurrent == null || $scope.pass.passnew == null;
    };

    function getpermitsforrole() {
        var response = PermitService.getpermitsforrole({ idrole: $rootScope.roleid });

        response.then(function(res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                var listpages = res.data.select(function(item) {
                    item.Page.moduleName = item.Page.Module.title;
                    return item.Page;
                });

                var resultPages = listpages.groupBy(function(page) {
                    return page.moduleName;
                })
                $rootScope.listmenupermit = resultPages.select(function(item) {
                    return {
                        moduleName: item.key,
                        moduleClass: item.first().Module.class,
                        pages: item.select(function(page) {
                            return {
                                path: page.path,
                                title: page.title
                            };
                        })
                    }
                });
                $timeout($enableSideBar, 500);
            }
        });
    }
});