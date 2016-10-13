app.controller('CustomerController', function ($scope, CustomerService) {
    init();
    function init() {
        getcustomers();
        datacustomer();
    }

    function datacustomer() {
        $scope.editcustomer = {
            id: 0,
            numberid: '',
            firstname: '',
            lastname: '',
            email: null,
            state: 1
        };        
    };

    function getcustomers() {
        var response = CustomerService.getcustomers();
        response.then(function (customers) {
            if (customers.errors && customers.errors.length > 0) {
                Materialize.toast(customers.message, 4000);
            }
            else { $scope.customers = customers; }
        })
    }

    $scope.savecustomer = function () {
        $scope.editcustomer;
        if ($scope.editcustomer.id == 0) {
            var response = CustomerService.savecustomer($scope.editcustomer);
            response.then(function (customers) {
                if (customers.errors && customers.errors.length > 0) {
                    Materialize.toast(customers.message, 4000);
                }
                else { getcustomers(); }
            })
        } else {
            var response = CustomerService.updatecustomer($scope.editcustomer);
            response.then(function (customers) {
                if (customers.errors && customers.errors.length > 0) {
                    Materialize.toast(customers.message, 4000);
                }
                else { getcustomers(); }
            })
        }
    };

    $scope.deletecustomer = function () {
        var response = CustomerService.deletecustomer($scope.editcustomer);
        response.then(function (customers) {
            if (customers.errors && customers.errors.length > 0) {
                Materialize.toast(customers.message, 4000);
            }
            else {
                datacustomer();
                getcustomers();
            }
        })
    };

    $scope.selectedcustomer = function (customer, option) {
        $scope.customerselected = customer;
        $scope.editcustomer = angular.copy($scope.customerselected);
        $scope.editcustomer.state = 2;

        if (option == 1) {
            $('#modaleditcustomer').openModal();
            $('#numberid').val($scope.editcustomer.numberid);
            $('#firstname').val($scope.editcustomer.firstname);
            $('#lastname').val($scope.editcustomer.lastname);
            $('#email').val($scope.editcustomer.email);
        } else {
            $('#modaldeletecustomer').openModal();
        }
    };

    $scope.validatecontrols = function () {
        return $scope.editcustomer == null || $scope.editcustomer.numberid.length < 5
            || $scope.editcustomer.firstname.length == 0 || $scope.editcustomer.lastname.length == 0;
    };

    $scope.newcustomer = function () {
        $('#modaleditcustomer').openModal();
        datacustomer();
    };
});