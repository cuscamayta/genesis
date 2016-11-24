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

    this.getticketsformanifest = function (schedule) {
        var defer = $q.defer();
        $http.post('/tickets/formanifest', schedule).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.invalidateinvoice = function (invoice) {
        var defer = $q.defer();
        $http.post('/tickets/invalidate', invoice).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});