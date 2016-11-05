app.service('SaleService', function ($http, $q) {

    init();

    function init() {
    }

    this.savesalesbook = function (salesbook) {
        var defer = $q.defer();
        $http.post('/sales/create', salesbook).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getsales = function () {
        var defer = $q.defer();
        $http.get('/sales').success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deletesalesbook = function (salesbook) {
        var defer = $q.defer();
        $http.post('/sales/destroy', salesbook).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});