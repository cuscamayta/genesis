app.controller('TicketController', function ($scope, SaleService, ScheduleService, CustomerService) {
    init();

    function init() {
        getschedules();
        getcustomers();
        getsales();
        datasale();

        $('#dateregister').daterangepicker({
            singleDatePicker: true,
            calender_style: "picker_4"
        }, function (start, end, label) {
        });

        $('#wizard').smartWizard();
        $('.buttonNext').addClass('btn btn-success');
        $('.buttonPrevious').addClass('btn btn-primary');
        $('.buttonFinish').addClass('btn btn-default');
    }

    function datasale() {
        $scope.editsale = {
            id: 0,
            state: 1,
            details: []
        };
        $scope.selectedbus = null;
        $scope.selectedschedule = null;
        $scope.selectedcustomer = null;
        $scope.salesdetails = [];

        $scope.editdetail = {
            state: "0"
        }
    };

    function getsales() {
        var response = SaleService.getsales();
        response.then(function (res) {
            if (res.isSuccess && !res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.sales = res;
            }
        });
    }

    function getschedules() {
        var response = ScheduleService.getschedules();
        response.then(function (res) {
            if (res.isSuccess && !res.isSuccess) {
                toastr.error(res.message);
            }
            else { $scope.listschedule = res; }
        });
    }

    function getcustomers() {
        var response = CustomerService.getcustomers();
        response.then(function (res) {
            if (res.isSuccess && !res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listcustomer = res;
            }
        });
    }

    $scope.savesale = function () {
        $scope.editsale;
        $scope.editsale.dateregister = $("#dateregister").val();
        $scope.editsale.idbus = $scope.selectedbus.id;
        $scope.editsale.idschedule = $scope.selectedschedule.id;
        $scope.editsale.details = $scope.salesdetails;
        if ($scope.editsale.id == 0) {
            var response = SaleService.savesale($scope.editsale);
            response.then(function (res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getsales();
                    datasale();
                    toastr.success(res.message);
                }
            });
        } else {
            var response = SaleService.updatesale($scope.editsale);
            response.then(function (res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getsales();
                    datasale();
                    toastr.success(res.message);
                }
            });
        }
        $("#modaleditsale").modal("hide");
        datasale();
    };

    $scope.deletesale = function () {
        var response = SaleService.deletesale($scope.editsale);
        response.then(function (res) {
            if (!res.isSuccess) { toastr.error(res.message); }
            else {
                $("#modaldeletesale").modal("hide");
                datasale();
                getsales();
                toastr.success(res.message);
            }
        });
    };

    $scope.selectedsale = function (sale, option) {
        $scope.saleselected = sale;
        $scope.editsale = angular.copy($scope.saleselected);
        $scope.editsale.state = 2;

        if ($scope.listschedule) {
            for (var i = 0; i < $scope.listschedule.length; i++) {
                if ($scope.listschedule[i].id == $scope.editsale.idschedule) {
                    $scope.selectedschedule = $scope.listschedule[i];
                }
            }
        }

        if ($scope.listbus) {
            for (var i = 0; i < $scope.listbus.length; i++) {
                if ($scope.listbus[i].id == $scope.editsale.idbus) {
                    $scope.selectedbus = $scope.listbus[i];
                }
            }
        }

        if ($scope.sales) {
            for (var i = 0; i < $scope.sales.length; i++) {
                if ($scope.sales[i].id == $scope.editsale.id) {
                    $scope.salesdetails = $scope.sales[i].Saledetails;

                    if ($scope.salesdetails) {
                        for (var j = 0; j < $scope.salesdetails.length; j++) {
                            $scope.salesdetails[j].fullName = $scope.salesdetails[j].Customer.fullName;
                        }
                    }
                }
            }
        }
    };

    $scope.validatecontrols = function () {
        return $scope.editsale == null || $("#dateregister").val() == null
            || $scope.editsale.arrival == null || $scope.editsale.departure == null
            || $scope.editsale.price == null || $scope.selectedschedule == null
            || $scope.selectedbus == null || $scope.salesdetails == null
            || ($scope.salesdetails != null && $scope.salesdetails.length < 1);
    };

    $scope.validatecontrolsdetail = function () {
        return $scope.editdetail == null || $("#type").val() == null
            || $scope.selectedcustomer == null;
    };

    $scope.newsale = function () {
        datasale();
    };

    $scope.newsaledetail = function () {
        $scope.editdetail = {};

        var n = $scope.salesdetails.where(function (item) {
            return item.idcustomer == $scope.selectedcustomer.id && item.customertype == $("#type").val();
        });

        if (n.length == 0) {
            $scope.editdetail.customertype = $("#type").val();
            $scope.editdetail.idcustomer = $scope.selectedcustomer.id;
            $scope.editdetail.fullName = $scope.selectedcustomer.fullName;
            $scope.editdetail.state = 1;
            $scope.salesdetails.push($scope.editdetail);
        }
    }

    $scope.deletesaledetail = function (item) {
        item.state = 0;
    };

    $scope.selectedschedulechange = function () {
        $scope.editsale.arrival = $scope.selectedschedule.arrival;
        $scope.editsale.departure = $scope.selectedschedule.departure;
    }
});