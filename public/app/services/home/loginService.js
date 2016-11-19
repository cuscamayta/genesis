app.service('LoginService', function ($q, $http) {

    this.loginUser = function (user) {
        var defer = $q.defer();
        $http.post('/security/authenticate', user).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    }

})