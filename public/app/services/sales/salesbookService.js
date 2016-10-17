app.service('SalesbookService', function ($http, $q) {

    init();

    function init() {
    }

    this.savesalesbook = function (salesbook) {
        var defer = $q.defer();
        $http.post('/salesbooks/create', salesbook).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.updatesalesbook = function (salesbook) {
        var defer = $q.defer();
        $http.post('/salesbooks/update', salesbook).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getsalesbooks = function () {
        var defer = $q.defer();
        $http.get('/salesbooks').success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deletesalesbook = function (salesbook) {
        var defer = $q.defer();
        $http.post('/salesbooks/destroy', salesbook).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});