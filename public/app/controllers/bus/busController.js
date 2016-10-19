app.controller('BusController', function ($scope, BusService, BustypeService) {
    init();
    function init() {
        getbustypes();
        getbuses();
        databus();
        $('select').material_select();
    }

    function databus() {
        $scope.editbus = {
            id: 0,
            numberid: "",
            numberseats: 0,
            numberrows: 0,
            numberfloors: 0,
            color: "",
            model: "",
            make: "",
            detail: "",
            idbustype: 0,
            state: 1
        };
        $scope.selectedbustype = null;
    };

    function getbuses() {
        var response = BusService.getbuses();
        response.then(function (buses) {
            if (buses.errors && buses.errors.length > 0) {
                Materialize.toast(buses.message, 4000);
            }
            else { $scope.buses = buses; }
        })
    }

    function getbustypes() {
        var response = BustypeService.getbustypes();
        response.then(function (bustypes) {
            if (bustypes.errors && bustypes.errors.length > 0) {
                Materialize.toast(bustypes.message, 4000);
            }
            else {
                $scope.listbustype = bustypes;
            }
        })
    }

    $scope.savebus = function () {
        $scope.editbus;
        $scope.editbus.idbustype = $scope.selectedbustype.id;
        if ($scope.editbus.id == 0) {
            var response = BusService.savebus($scope.editbus);
            response.then(function (buses) {
                if (buses.errors && buses.errors.length > 0) {
                    Materialize.toast(buses.message, 4000);
                }
                else { getbuses(); }
            })
        } else {
            var response = BusService.updatebus($scope.editbus);
            response.then(function (buses) {
                if (buses.errors && buses.errors.length > 0) {
                    Materialize.toast(buses.message, 4000);
                }
                else { getbuses(); }
            })
        }
    };

    $scope.deletebus = function () {
        var response = BusService.deletebus($scope.editbus);
        response.then(function (buses) {
            if (buses.errors && buses.errors.length > 0) {
                Materialize.toast(buses.message, 4000);
            }
            else {
                databus();
                getbuses();
            }
        })
    };

    $scope.selectedbus = function (bus, option) {
        $scope.buseselected = bus;
        $scope.editbus = angular.copy($scope.buseselected);
        $scope.editbus.state = 2;

        if (option == 1) {
            $('#modaleditbus').openModal();
            $('#numberid').val($scope.editbus.numberid);
            $('#numberseats').val($scope.editbus.numberseats);
            $('#numberrows').val($scope.editbus.numberrows);
            $('#numberfloors').val($scope.editbus.numberfloors);
            $('#color').val($scope.editbus.color);
            $('#model').val($scope.editbus.model);
            $('#make').val($scope.editbus.make);
            $('#detail').val($scope.editbus.detail);
            $('#idbustype').val($scope.editbus.idbustype);
        } else {
            $('#modaldeletebus').openModal();
        }
    };

    $scope.validatecontrols = function () {
        return $scope.editbus == null || $scope.editbus.numberid.length < 4
            || $scope.editbus.numberseats.length == 0 || $scope.editbus.numberrows.length == 0
            || $scope.editbus.numberfloors.length == 0 || $scope.editbus.numberfloors.color == 0
            || $scope.editbus.model.length == 0 || $scope.editbus.make.color == 0;
    };

    $scope.newbus = function () {
        $('#modaleditbus').openModal();
        databus();
    };
});