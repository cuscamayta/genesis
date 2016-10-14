app.controller('DestinationController', function ($scope, DestinationService) {
    init();
    function init() {
        getdestinations();
        datadestination();
    }

    function datadestination() {
        $scope.editdestination = {
            id: 0,
            title: '',
            state: 1
        };
    };

    function getdestinations() {
        var response = DestinationService.getdestinations();
        response.then(function (destinations) {
            if (destinations.errors && destinations.errors.length > 0) {
                Materialize.toast(destinations.message, 4000);
            }
            else { $scope.destinations = destinations; }
        })
    }

    $scope.savedestination = function () {
        $scope.editdestination;
        if ($scope.editdestination.id == 0) {
            var response = DestinationService.savedestination($scope.editdestination);
            response.then(function (destinations) {
                if (destinations.errors && destinations.errors.length > 0) {
                    Materialize.toast(destinations.message, 4000);
                }
                else { getdestinations(); }
            })
        } else {
            var response = DestinationService.updatedestination($scope.editdestination);
            response.then(function (destinations) {
                if (destinations.errors && destinations.errors.length > 0) {
                    Materialize.toast(destinations.message, 4000);
                }
                else { getdestinations(); }
            })
        }
    };

    $scope.deletedestination = function () {
        var response = DestinationService.deletedestination($scope.editdestination);
        response.then(function (destinations) {
            if (destinations.errors && destinations.errors.length > 0) {
                customer
            }
            else {
                datadestination();
                getdestinations();
            }
        })
    };

    $scope.selecteddestination = function (destination, option) {
        $scope.destinationselected = destination;
        $scope.editdestination = angular.copy($scope.destinationselected);
        $scope.editdestination.state = 2;

        if (option == 1) {
            $('#modaleditdestination').openModal();
            $('#title').val($scope.editdestination.title);
        } else {
            $('#modaldeletedestination').openModal();
        }
    };

    $scope.validatecontrols = function () {
        return $scope.editdestination == null || $scope.editdestination.title.length < 3;
    };

    $scope.newdestination = function () {
        $('#modaleditdestination').openModal();
        datadestination();
    };
});