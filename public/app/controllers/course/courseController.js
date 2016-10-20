app.controller('CourseController', function ($scope, CourseService, DestinationService) {
    init();
    function init() {
        getdestinations();
        getcourses();
        datacourse();
        $('select').material_select();
    }

    function datacourse() {
        $scope.editcourse = {
            id: 0,
            numberid: "",
            detail: "",
            iddestination: 0,
            idorigin: 0,
            state: 1
        };
        $scope.selecteddestination = null;
        $scope.selectedorigin = null;
    };

    function getcourses() {
        var response = CourseService.getcourses();
        response.then(function (courses) {
            if (courses.errors && courses.errors.length > 0) {
                Materialize.toast(courses.message, 4000);
            }
            else { $scope.courses = courses; }
        })
    }

    function getdestinations() {
        var response = DestinationService.getdestinations();
        response.then(function (destinations) {
            if (destinations.errors && destinations.errors.length > 0) {
                Materialize.toast(destinations.message, 4000);
            }
            else {
                $scope.listdestination = destinations;
            }
        })
    }

    $scope.savecourse = function () {
        $scope.editcourse;
        $scope.editcourse.iddestination = $scope.selecteddestination.id;
        $scope.editcourse.idorigin = $scope.selectedorigin.id;
        if ($scope.editcourse.id == 0) {
            var response = CourseService.savecourse($scope.editcourse);
            response.then(function (courses) {
                if (courses.errors && courses.errors.length > 0) {
                    Materialize.toast(courses.message, 4000);
                }
                else { getcourses(); }
            })
        } else {
            var response = CourseService.updatecourse($scope.editcourse);
            response.then(function (courses) {
                if (courses.errors && courses.errors.length > 0) {
                    Materialize.toast(courses.message, 4000);
                }
                else { getcourses(); }
            })
        }
    };

    $scope.deletecourse = function () {
        var response = CourseService.deletecourse($scope.editcourse);
        response.then(function (courses) {
            if (courses.errors && courses.errors.length > 0) {
                Materialize.toast(courses.message, 4000);
            }
            else {
                datacourse();
                getcourses();
            }
        })
    };

    $scope.selectedcourse = function (course, option) {
        $scope.courseselected = course;
        $scope.editcourse = angular.copy($scope.courseselected);
        $scope.editcourse.state = 2;

        if (option == 1) {
            $('#modaleditcourse').openModal();
            $('#numberid').val($scope.editcourse.numberid);
            $('#detail').val($scope.editcourse.detail);
            $('#iddestination').val($scope.editcourse.iddestination);
            $('#idorigin').val($scope.editcourse.idorigin);
        } else {
            $('#modaldeletecourse').openModal();
        }
    };

    $scope.validatecontrols = function () {
        return $scope.editcourse == null || $scope.editcourse.numberid.length < 4
            || $scope.editcourse.detail.length == 0 || $('#iddestination').val().length == 0
            || $('#idorigin').val().length == 0;
    };

    $scope.newcourse = function () {
        $('#modaleditcourse').openModal();
        datacourse();
    };
});