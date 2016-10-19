app.controller('OrderbookController', function ($scope, OrderbookService) {
    init();
    function init() {
        getorderbooks();
        dataorderbook();
         $('select').material_select();
         $("#dateofissue").datepicker({ dateFormat: "dd/mm/yy" });
         $("#deadline").datepicker({ dateFormat: "dd/mm/yy" });
    }

    function dataorderbook() {
        $scope.editorderbook = {
            id: 0,
            type: 0,
            status: 0,
            numberorder: 0,
            numberid: 0,
            controlkey: "",
            numberinit: 0,
            numberend: 0,
            numberinvoice: 0,
            dateofissue: "",
            deadline: "",
            state: 1
        };
    };

    function getorderbooks() {
        var response = OrderbookService.getorderbooks();
        response.then(function (orderbooks) {
            if (orderbooks.errors && orderbooks.errors.length > 0) {
                Materialize.toast(orderbooks.message, 4000);
            }
            else { $scope.orderbooks = orderbooks; }
        })
    }

    $scope.saveorderbook = function () {
        $scope.editorderbook;
        $scope.editorderbook.type = $("#type").val();
        $scope.editorderbook.status = $("#status").val();
        $scope.editorderbook.dateofissue = $("#dateofissue").val();
        $scope.editorderbook.deadline = $("#deadline").val();
        if ($scope.editorderbook.id == 0) {
            var response = OrderbookService.saveorderbook($scope.editorderbook);
            response.then(function (orderbooks) {
                if (orderbooks.errors && orderbooks.errors.length > 0) {
                    Materialize.toast(orderbooks.message, 4000);
                }
                else { getorderbooks(); }
            })
        } else {
            var response = OrderbookService.updateorderbook($scope.editorderbook);
            response.then(function (orderbooks) {
                if (orderbooks.errors && orderbooks.errors.length > 0) {
                    Materialize.toast(orderbooks.message, 4000);
                }
                else { getorderbooks(); }
            })
        }
    };

    $scope.deleteorderbook = function () {
        var response = OrderbookService.deleteorderbook($scope.editorderbook);
        response.then(function (orderbooks) {
            if (orderbooks.errors && orderbooks.errors.length > 0) {
                customer
            }
            else {
                dataorderbook();
                getorderbooks();
            }
        })
    };

    $scope.selectedorderbook = function (orderbook, option) {
        $scope.orderbookselected = orderbook;
        $scope.editorderbook = angular.copy($scope.orderbookselected);
        $scope.editorderbook.state = 2;

        if (option == 1) {
            $('#modaleditorderbook').openModal();
            $('#type').val($scope.editorderbook.type);
            $('#status').val($scope.editorderbook.status);
            $('#numberorder').val($scope.editorderbook.numberorder);
            $('#numberid').val($scope.editorderbook.numberid);
            $('#controlkey').val($scope.editorderbook.controlkey);
            $('#numberinit').val($scope.editorderbook.numberinit);
            $('#numberend').val($scope.editorderbook.numberend);
            $('#numberinvoice').val($scope.editorderbook.numberinvoice);
            $('#dateofissue').val($scope.editorderbook.dateofissue);
            $('#deadline').val($scope.editorderbook.deadline);
        } else {
            $('#modaldeleteorderbook').openModal();
        }
    };

    $scope.validatecontrols = function () {
        return $scope.editorderbook == null || $("#type").val() == 0
            || $("#status").val() == 0 || $scope.editorderbook.numberorder.length == 0
            || $scope.editorderbook.numberid.length == 0 || $scope.editorderbook.controlkey.length == 0
            || $scope.editorderbook.numberinit.length == 0 || $scope.editorderbook.numberend.length == 0
            || $scope.editorderbook.numberinvoice.length == 0 || $("#dateofissue").val().length == 0
            || $("#deadline").val().length == 0;
    };

    $scope.neworderbook = function () {
        $('#modaleditorderbook').openModal();
        dataorderbook();
    };
});