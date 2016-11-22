app.service('SaleService', function ($http, $q) {

    init();

    function init() {
    }   

    this.getsales = function () {
        var defer = $q.defer();
        $http.post('/sales').success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getdailycash = function (filters) {
        var defer = $q.defer();
        $http.post('/sales/dailycash', filters).success(function (response) {
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