app.controller('InvalidateController', function ($scope, SalesbookService, OfficeService, TicketService, $rootScope) {
    init();

    function init() {
        getoffices();
        $scope.selectedsalebook = null;
        $scope.listsalebook = [];
        $scope.filters = {};

        $('#dateregister').daterangepicker({
            locale: { format: 'DD/MM/YYYY' },
            singleDatePicker: true,
            calender_style: "picker_4"
        }).on('apply.daterangepicker', function (ev, picker) {
            $scope.filters.dateregister = picker.startDate.format('DD/MM/YYYY');
        });
    }

    function getoffices() {
        var response = OfficeService.getofficesforselect();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listoffice = res.data;
            }
        });
    }

    $scope.getsalebooks = function () {
        $scope.filters.idoffice = $scope.selectedoffice.id;

        var response = SalesbookService.getsalesbooksforselect($scope.filters);
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listsalebook = res.data;
                $("#step-2").css("display", "block");
                $("#step-1").css("display", "none");
            }
        });
    };

    $scope.validatecontrols = function () {
        return $scope.filters == null || $scope.filters.dateregister == null
            || $scope.selectedoffice == null;
    };

    $scope.salebookselected = function (salebook) {
        $scope.selectedsalebook = salebook;
    };

    $scope.deletesalebook = function () {
        var response = TicketService.invalidateinvoice($scope.selectedsalebook);
        response.then(function (res) {
            if (!res.isSuccess) { toastr.error(res.message); }
            else {
                $("#modaldeletesalebook").modal("hide");
                $("#step-1").css("display", "block");
                $("#step-2").css("display", "none");
                $scope.selectedsalebook = null;
                $scope.listsalebook = [];
                toastr.success(res.message);
            }
        });
    };
});