app.controller('PermitController', function($scope, PermitService, RoleService, PageService) {
    init();
    function init() {
        getroles();
        getpages();
        getpermits();
        datapermit();
    }

    function datapermit() {
        $scope.editpermit = {
            id: 0,
            state: 1
        };
        $scope.selectedpage = null;
    };

    function getpermits() {
        var response = PermitService.getpermits();
        response.then(function(res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else { $scope.permits = res.data; }
        });
    }

    function getroles() {
        var response = RoleService.getroles();
        response.then(function(res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listrole = res.data;
            }
        });
    }

    function getpages() {
        var response = PageService.getpages();
        response.then(function(res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listpage = res.data;
            }
        });
    }

    $scope.savepermit = function() {
        $scope.editpermit;

        var n = $scope.permits.where(function(item) {
            return item.idrole == $scope.selectedrole.id && item.idpage == $scope.selectedpage.id;
        });

        if (n.length == 0) {
            $scope.editpermit.idrole = $scope.selectedrole.id;
            $scope.editpermit.idpage = $scope.selectedpage.id;
            if ($scope.editpermit.id == 0) {
                var response = PermitService.savepermit($scope.editpermit);
                response.then(function(res) {
                    if (!res.isSuccess) { toastr.error(res.message); }
                    else {
                        getpermits();
                        datapermit();
                        toastr.success(res.message);
                    }
                });
            }
            datapermit();
        }
        else {
            toastr.warning("Página ya fue asignada al rol");
        }
    };

    $scope.deletepermit = function() {
        var response = PermitService.deletepermit($scope.editpermit);
        response.then(function(res) {
            if (!res.isSuccess) { toastr.error(res.message); }
            else {
                $("#modaldeletepermit").modal("hide");
                datapermit();
                getpermits();
                toastr.success(res.message);
            }
        });
    };

    $scope.selectedpermit = function(permit, option) {
        $scope.permitselected = permit;
        $scope.editpermit = angular.copy($scope.permitselected);
        $scope.editpermit.state = 2;
    };

    $scope.validatecontrols = function() {
        return $scope.editpermit == null
            || $scope.selectedrole == null || $scope.selectedpage == null;
    };

    $scope.newpermit = function() {
        datapermit();
    };
});