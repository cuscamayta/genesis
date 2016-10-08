app.service('UserService', function ($http,$q) {

    init();

    function init() {
        console.log('user service');
    }

    this.saveUser = function () {
        //codigo para guardar usuario
    }

    this.getusers = function () {
		var defer = $q.defer();
		$http.get('/users').success(function (response) {
			defer.resolve(response);
		});
		return defer.promise;
	};


});
