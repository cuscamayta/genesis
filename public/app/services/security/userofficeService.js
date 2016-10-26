app.service('UserofficeService', function ($http, $q) {

    init();

    function init() {
    }

    this.saveuseroffice = function (useroffice) {
        var defer = $q.defer();
        $http.post('/useroffices/create', useroffice).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.updateuseroffice = function (useroffice) {
        var defer = $q.defer();
        $http.post('/useroffices/update', useroffice).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getuseroffices = function () {
        var defer = $q.defer();
        $http.get('/useroffices').success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deleteuseroffice = function (useroffice) {
        var defer = $q.defer();
        $http.post('/useroffices/destroy', useroffice).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});