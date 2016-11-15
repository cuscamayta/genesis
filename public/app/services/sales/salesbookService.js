app.service('SalesbookService', function ($http, $q) {

    init();

    function init() {
    }

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