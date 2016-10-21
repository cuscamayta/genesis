app.controller('InvoiceController', function ($scope, InvoiceService) {

    init();
    function init() {
        datainvoice();
        $('select').material_select();
        $("#transactiondate").datepicker({
            dateFormat: "dd/mm/yy",
            showButtonPanel: true,
            changeMonth: true,
            changeYear: true
        });
    }

    function datainvoice() {
        $scope.editinvoice = {
            id: 0,
            numberid: 0,
            numberorder: 0,
            numberinvoice: 0,
            controlkey: "",
            amount: 0,
            state: 1
        };
    };

    $scope.newinvoice = function () {
        $('#modaleditinvoice').openModal();
        datainvoice();
    };


    $scope.saveinvoice = function () {
        $scope.editinvoice.numberorder = 7904006306693;
        $scope.editinvoice.numberinvoice = 876814;
        $scope.editinvoice.numberid = 1665979;
        $scope.editinvoice.amount = 35958.6;
        $scope.editinvoice.date = "20080519";
        $scope.editinvoice.limit = "20100101"
        $scope.editinvoice.controlkey = "zZ7Z]xssKqkEf_6K9uH(EcV+%x+u[Cca9T%+_$kiLjT8(zr3T9b5Fx2xG-D+_EBS";

        var response = InvoiceService.generatecodecontrol($scope.editinvoice);

        response.then(function (invoice) {
            Materialize.toast(invoice, 4000);

            printcodeqr("qrinvoice", "1234", "Buses Genesis",
                $scope.editinvoice.numberinvoice,
                $scope.editinvoice.numberorder,
                $scope.editinvoice.date,
                $scope.editinvoice.amount, response, $scope.editinvoice.limit);
        })
    };

    function printcodeqr(element, numberid, businessname, numberinvoice, numberorder, dateinvoice,
        amountinvoice, codecontrol, datelimit) {
        $('#' + element).qrcode({
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