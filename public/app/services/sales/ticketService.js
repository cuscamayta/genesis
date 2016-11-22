app.service('TicketService', function ($http, $q) {

    init();

    function init() {
    }

    this.saveticket = function (ticket) {
        var defer = $q.defer();
        $http.post('/tickets/create', ticket).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.gettickets = function () {
        var defer = $q.defer();
        $http.post('/tickets').success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getticketsformanifest = function (schedule) {
        var defer = $q.defer();
        $http.post('/tickets/formanifest', schedule).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deleteticket = function (ticket) {
        var defer = $q.defer();
        $http.post('/tickets/destroy', ticket).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});