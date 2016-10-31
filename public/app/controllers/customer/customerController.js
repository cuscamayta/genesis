app.controller('CustomerController', function ($scope, CustomerService) {
   init();
    function init() {
        getcustomers();
        datacustomer();
    }

    function datacustomer() {
        $scope.editcustomer = {
            id: 0,
            state: 1
        };
    };

    function getcustomers() {
        var response = CustomerService.getcustomers();
        response.then(function (res) {
            if (res.isSuccess && !res.isSuccess) {
                toastr.error(res.message);
            }
            else { $scope.customers = res; }
        });
    }

    $scope.savecustomer = function () {
        $scope.editcustomer;
        if ($scope.editcustomer.id == 0) {
            var response = CustomerService.savecustomer($scope.editcustomer);
            response.then(function (res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getcustomers();
                    datacustomer();
                    toastr.success(res.message);
                }
            });
        } else {
            var response = CustomerService.updatecustomer($scope.editcustomer);
            response.then(function (res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getcustomers();
                    datacustomer();
                    toastr.success(res.message);
                }
            });
        }
        datacustomer();
    };

    $scope.deletecustomer = function () {
        var response = CustomerService.deletecustomer($scope.editcustomer);
        response.then(function (res) {
            if (!res.isSuccess) { toastr.error(res.message); }
            else {
                $("#modaldeletecustomer").modal("hide");                
                datacustomer();
                getcustomers();
                toastr.success(res.message);
            }
        });
    };

    $scope.selectedcustomer = function (customer, option) {
        $scope.customerselected = customer;
        $scope.editcustomer = angular.copy($scope.customerselected);
        $scope.editcustomer.state = 2;
    };

    $scope.validatecontrols = function () {
        return $scope.editcustomer == null || $scope.editcustomer.numberid == null
            || ($scope.editcustomer.numberid != null && $scope.editcustomer.numberid.length < 4)
            || $scope.editcustomer.firstname == null || $scope.editcustomer.lastname == null
            || $scope.editcustomer.email == null;
    };

    $scope.newcustomer = function () {
        datacustomer();
    };
});