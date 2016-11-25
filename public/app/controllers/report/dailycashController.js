app.controller('DailycashController', function ($scope, SaleService, UserService, $rootScope) {
    init();

    function init() {
        getusers();
        $scope.selectedschedule = null;
        $scope.lissales = [];

        $scope.filters = {};

        $('#dateregister').daterangepicker({
            locale: { format: 'DD/MM/YYYY' },
            singleDatePicker: true,
            showDropdowns: true,
            calender_style: "picker_4"
        }).on('apply.daterangepicker', function (ev, picker) {
            $scope.filters.dateregister = picker.startDate.format('DD/MM/YYYY');
        });
    }

    function getusers() {
        var response = UserService.getusersforselect();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listuser = res.data;
            }
        });
    }

    $scope.generatedailycash = function () {
        $scope.filters.iduser = $scope.selecteduser.id;

        var response = SaleService.getdailycash($scope.filters);
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.lissales = res.data;
            }
        });
    };

    $scope.validatecontrols = function () {
        return $scope.filters == null || $scope.filters.dateregister == null
            || $scope.selecteduser == null;
    };
});