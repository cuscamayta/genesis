app.controller('HomeController', function ($scope, SaleService, $rootScope) {

    init();

    function init() {
        getcountpassenger();
        getcountuser();
        getcountpassengercurrent();
    }

    function getcountpassenger() {
        var response = SaleService.getcountpassenger();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.countpassenger = res.data;
            }
        });
    }

    function getcountpassengercurrent() {
        $scope.filters = {};       
        $scope.filters.currentdate =  moment();
        var response = SaleService.getcountpassengercurrent($scope.filters);
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.countpassengercurrent = res.data;
            }
        });
    }

    function getcountuser() {
        var response = SaleService.getcountuser();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.countuser = res.data;
            }
        });
    }
});