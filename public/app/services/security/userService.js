app.service('UserService', function ($http, $q) {

    init();

    function init() {
    }

    this.saveuser = function (user) {
        var defer = $q.defer();
        $http.post('/users/create', user).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.updateuser = function (user) {
        var defer = $q.defer();
        $http.post('/users/update', user).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getusers = function () {
        var defer = $q.defer();
        $http.get('/users').success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deleteuser = function (user) {
        var defer = $q.defer();
        $http.post('/users/destroy', user).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});