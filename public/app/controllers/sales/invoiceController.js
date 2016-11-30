app.controller('InvoiceController', function ($scope, SaleService, $rootScope) {

    init();

    function init() { }

    $scope.generateprintinvoice = function () {
        $scope.filters = {};
        $scope.filters.idoffice = $rootScope.idoffice;
        $scope.filters.numberinvoice = 1;

        var response = SaleService.getinvoice($scope.filters);
        debugger;
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listsales = res.data;

                //printcodeqr("qrinvoice", "1234", "Buses Genesis",
                //$scope.editinvoice.numberinvoice,
                //$scope.editinvoice.numberorder,
                //$scope.editinvoice.date,
                //$scope.editinvoice.amount, response, $scope.editinvoice.limit);
            }
        });
    };

    function printcodeqr(element, numberid, businessname, numberinvoice, numberorder, dateinvoice,
        amountinvoice, codecontrol, datelimit) {
        $('#qrinvoice').qrcode({
            width: 100,
            height: 100,
            text: numberid + " | " +
            businessname + " | " +
            numberinvoice + " | " +
            numberorder + " | " +
            dateinvoice + " | " +
            amountinvoice + "Bs | " +
            codecontrol + " | " +
            datelimit
        });
    }
});