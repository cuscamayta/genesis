app.service('UserService', function ($http,$q) {

    init();

    function init() {
    }

    this.saveUser = function () {
    }

    this.getusers = function () {
		var defer = $q.defer();
		$http.get('/users').success(function (response) {
			defer.resolve(response);
		});
		return defer.promise;
	};


});
