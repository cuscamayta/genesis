app.controller('ManifestController', function ($scope, TicketService, ScheduleService, TravelService, $rootScope) {
    init();

    function init() {
        $scope.showblack = true;
        gettravels();
        $scope.selectedschedule = null;
        $scope.listtickets = [];
    }

    function gettravels() {
        var response = TravelService.gettravels();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listtravel = res.data;
            }
        });
    }

    function getschedules() {
        var response = ScheduleService.getschedulesforselect($scope.selectedtravel);
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else { $scope.listschedule = res.data; }
        });
    }

    $scope.selectedtravelchange = function () {
        getschedules();
    };

    $scope.scheduleselected = function (schedule) {
        $scope.selectedschedule = schedule;

        var response = TicketService.getticketsformanifest($scope.selectedschedule);
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.showblack = false;
                $scope.listticket = res.data;
                $("#step-2").css("display", "block");
                $("#step-1").css("display", "none");
            }
        });
    };

    $scope.back = function () {
        $scope.showblack = true;
        $("#step-2").css("display", "none");
        $("#step-1").css("display", "block");
    };
});