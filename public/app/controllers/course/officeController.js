app.controller('OfficeController', function ($scope, OfficeService, DestinationService) {
    init();
    function init() {
        getdestinations();
        getoffices();
        dataoffice();
        $('select').material_select();
    }

    function dataoffice() {
        $scope.editoffice = {
            id: 0,
            title: "",
            address: "",
            idorigin: 0,
            state: 1
        };
        $scope.selectedorigin = null;
    };

    function getoffices() {
        var response = OfficeService.getoffices();
        response.then(function (offices) {
            if (offices.errors && offices.errors.length > 0) {
                Materialize.toast(offices.message, 4000);
            }
            else { $scope.offices = offices; }
        })
    }

    function getdestinations() {
        var response = DestinationService.getdestinations();
        response.then(function (destinations) {
            if (destinations.errors && destinations.errors.length > 0) {
                Materialize.toast(destinations.message, 4000);
            }
            else {
                $scope.listdestination = destinations;
            }
        })
    }

    $scope.saveoffice = function () {
        $scope.editoffice;
        $scope.editoffice.idorigin = $scope.selectedorigin.id;
        if ($scope.editoffice.id == 0) {
            var response = OfficeService.saveoffice($scope.editoffice);
            response.then(function (offices) {
                if (offices.errors && offices.errors.length > 0) {
                    Materialize.toast(offices.message, 4000);
                }
                else { getoffices(); }
            })
        } else {
            var response = OfficeService.updateoffice($scope.editoffice);
            response.then(function (offices) {
                if (offices.errors && offices.errors.length > 0) {
                    Materialize.toast(offices.message, 4000);
                }
                else { getoffices(); }
            })
        }
    };

    $scope.deleteoffice = function () {
        var response = OfficeService.deleteoffice($scope.editoffice);
        response.then(function (offices) {
            if (offices.errors && offices.errors.length > 0) {
                Materialize.toast(offices.message, 4000);
            }
            else {
                dataoffice();
                getoffices();
            }
        })
    };

    $scope.selectedoffice = function (office, option) {
        $scope.officeselected = office;
        $scope.editoffice = angular.copy($scope.officeselected);
        $scope.editoffice.state = 2;

        if (option == 1) {
            $('#modaleditoffice').openModal();
            $('#title').val($scope.editoffice.title);
            $('#address').val($scope.editoffice.address);
            $('#idorigin').val($scope.editoffice.idorigin);
        } else {
            $('#modaldeleteoffice').openModal();
        }
    };

    $scope.validatecontrols = function () {
        return $scope.editoffice == null || $scope.editoffice.title.length == 0
            || $scope.editoffice.address.length == 0 || $('#idorigin').val().length == 0;
    };

    $scope.newoffice = function () {
        $('#modaleditoffice').openModal();
        dataoffice();
    };
});