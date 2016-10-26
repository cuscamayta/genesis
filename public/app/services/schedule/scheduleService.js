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

    this.savescheduledetail = function (schedule) {
        var defer = $q.defer();
        $http.post('/scheduledetails/create', schedule).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.updatescheduledetail = function (schedule) {
        var defer = $q.defer();
        $http.post('/scheduledetails/update', schedule).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getscheduledetails = function () {
        var defer = $q.defer();
        $http.get('/scheduledetails').success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deletescheduledetail = function (schedule) {
        var defer = $q.defer();
        $http.post('/scheduledetails/destroy', schedule).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deletescheduledetailbyheader = function (schedule) {
        var defer = $q.defer();
        $http.post('/scheduledetails/destroybyheader', schedule).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});