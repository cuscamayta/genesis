app.controller('OrderbookController', function ($scope, OrderbookService, OfficeService) {
    init();
    function init() {
        getoffices();
        getorderbooks();
        dataorderbook();

        $('#dateofissue').daterangepicker({
            singleDatePicker: true,
            calender_style: "picker_4"
        }, function (start, end, label) {
            console.log(start.toISOString(), end.toISOString(), label);
        });

        $('#deadline').daterangepicker({
            singleDatePicker: true,
            calender_style: "picker_4"
        }, function (start, end, label) {
            console.log(start.toISOString(), end.toISOString(), label);
        });
    }

    function dataorderbook() {
        $scope.editorderbook = {
            id: 0,
            state: 1
        };
        $scope.selectedoffice = null;
    };

    function getorderbooks() {
        var response = OrderbookService.getorderbooks();
        response.then(function (res) {
            if (res.isSuccess && !res.isSuccess) {
                toastr.error(res.message);
            }
            else { $scope.orderbooks = res; }
        });
    }

    function getoffices() {
        var response = OfficeService.getoffices();
        response.then(function (res) {
            if (res.isSuccess && !res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listoffice = res;
            }
        });
    }

    $scope.saveorderbook = function () {
        $scope.editorderbook;
        $scope.editorderbook.idoffice = $scope.selectedoffice.id;
        $scope.editorderbook.type = $("#type").val();
        $scope.editorderbook.status = $("#status").val();
        $scope.editorderbook.dateofissue = $("#dateofissue").val();
        $scope.editorderbook.deadline = $("#deadline").val();

        if ($scope.editorderbook.id == 0) {
            var response = OrderbookService.saveorderbook($scope.editorderbook);
            response.then(function (res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getorderbooks();
                    dataorderbook();
                    toastr.success(res.message);
                }
            });
        } else {
            var response = OrderbookService.updateorderbook($scope.editorderbook);
            response.then(function (res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getorderbooks();
                    dataorderbook();
                    toastr.success(res.message);
                }
            });
        }
        $("#modaleditorderbook").modal("hide");
        dataorderbook();
    };

    $scope.deleteorderbook = function () {
        var response = OrderbookService.deleteorderbook($scope.editorderbook);
        response.then(function (res) {
            if (!res.isSuccess) { toastr.error(res.message); }
            else {
                $("#modaldeleteorderbook").modal("hide");
                dataorderbook();
                getorderbooks();
                toastr.success(res.message);
            }
        });
    };

    $scope.selectedorderbook = function (orderbook, option) {
        $scope.orderbookselected = orderbook;
        $scope.editorderbook = angular.copy($scope.orderbookselected);
        $scope.editorderbook.state = 2;

        $("#type").val($scope.editorderbook.type);
        $("#status").val($scope.editorderbook.status);

        if ($scope.listoffice) {
            for (var i = 0; i < $scope.listoffice.length; i++) {
                if ($scope.listoffice[i].id == $scope.editorderbook.idoffice) {
                    $scope.selectedoffice = $scope.listoffice[i];
                }
            }
        }
    };

    $scope.validatecontrols = function () {
        return $scope.editorderbook == null || $scope.editorderbook.numberorder == null
            || ($scope.editorderbook.numberorder != null && $scope.editorderbook.numberorder.length < 4)
            || $scope.editorderbook.controlkey == null || $scope.editorderbook.numberinit == null
            || $scope.editorderbook.numberend == null || $scope.editorderbook.numberinvoice == null
            || $scope.editorderbook.numberid == null || $scope.selectedoffice == null
            || $("#deadline").val() == null || $("#dateofissue").val() == null
            || $("#type").val() == null || $("#status").val() == null;
    };

    $scope.neworderbook = function () {
        dataorderbook();
    };
});