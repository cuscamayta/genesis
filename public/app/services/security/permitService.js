app.service('PermitService', function ($http, $q) {

    init();

    function init() {
    }

    this.savepermit = function (permit) {
        var defer = $q.defer();
        $http.post('/permits/create', permit).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getpermits = function () {
        var defer = $q.defer();
        $http.get('/permits').success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deletepermit = function (permit) {
        var defer = $q.defer();
        $http.post('/permits/destroy', permit).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});