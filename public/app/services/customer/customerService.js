app.service('CustomerService', function ($http, $q) {

    init();

    function init() {
    }

    this.savecustomer = function (customer) {
        var defer = $q.defer();
        $http.post('/customers/create', customer).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.updatecustomer = function (customer) {
        var defer = $q.defer();
        $http.post('/customers/update', customer).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getcustomers = function () {
        var defer = $q.defer();
        $http.get('/customers').success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deletecustomer = function (customer) {
        var defer = $q.defer();
        $http.post('/customers/destroy', customer).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});