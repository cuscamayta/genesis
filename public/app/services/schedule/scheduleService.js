app.service('ScheduleService', function ($http, $q) {

    init();

    function init() {
    }

    this.saveschedule = function (schedule) {
        var defer = $q.defer();
        $http.post('/schedules/create', schedule).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.updateschedule = function (schedule) {
        var defer = $q.defer();
        $http.post('/schedules/update', schedule).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getschedules = function () {
        var defer = $q.defer();
        $http.get('/schedules').success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deleteschedule = function (schedule) {
        var defer = $q.defer();
        $http.post('/schedules/destroy', schedule).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});