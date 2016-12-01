app.controller('InvoiceController', function ($scope, SaleService, $rootScope) {

    init();

    function init() { }

    $scope.generateprintinvoice = function () {
        $scope.filters = {};
        $scope.filters.idoffice = $rootScope.idoffice;
        $scope.filters.numberinvoice = 1;

        var response = SaleService.getinvoice($scope.filters);
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                debugger;
                $scope.datainvoice = {};
                $scope.datainvoice.titleCompany = res.data.setting.title;
                $scope.datainvoice.numberidCompany = res.data.setting.numberid;
                $scope.datainvoice.noteCompany = res.data.setting.note;
                $scope.datainvoice.titleOffice = res.data.invoice.Office.title;
                $scope.datainvoice.phoneOffice = res.data.invoice.Office.phone;
                $scope.datainvoice.addressOffice = res.data.invoice.Office.address;
                $scope.datainvoice.detailOffice = res.data.invoice.Office.detail;
                $scope.datainvoice.numberInvoice = res.data.invoice.numberinvoice;
                $scope.datainvoice.numberorderInvoice = res.data.invoice.numberorder;
                $scope.datainvoice.dateInvoice = moment(res.data.invoice.dateregister).format("DD/MM/YYYY");
                $scope.datainvoice.nameInvoice = res.data.invoice.fullname;
                $scope.datainvoice.numbernitInvoice = res.data.invoice.numberid;
                $scope.datainvoice.codecontrolInvoice = res.data.invoice.numbercontrol;
                $scope.datainvoice.totalInvoice = res.data.invoice.amountinvoice;

                

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