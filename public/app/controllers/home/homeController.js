app.controller('HomeController', function ($scope, homeService, $rootScope) {

    init();

    function init() {
        $rootScope.currentUser = {
            iduser: 1,
            idoffice: 1
        };
    }

});
