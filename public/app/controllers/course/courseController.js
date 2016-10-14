app.controller('CourseController', function ($scope, CourseService, DestinationService) {
    init();
    function init() {
        getroles();
        getcourses();
        datacourse();
    }

    function datacourse() {
        $scope.editcourse = {
            id: 0,
            coursename: '',
            email: null,
            idrole: 0,
            state: 1
        };
        $scope.selectedrole = null;
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

    function getroles() {
        var response = DestinationService.getroles();
        response.then(function (roles) {
            if (roles.errors && roles.errors.length > 0) {
                Materialize.toast(roles.message, 4000);
            }
            else {
                $scope.listrole = roles;
            }
        })
    }

    $scope.savecourse = function () {
        $scope.editcourse;
        $scope.editcourse.idrole = $scope.selectedrole.id;
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
            $('#coursename').val($scope.editcourse.coursename);
            $('#email').val($scope.editcourse.email);
            $('#idrole').val($scope.editcourse.idrole);
        } else {
            $('#modaldeletecourse').openModal();
        }
    };

    $scope.validatecontrols = function () {
        return $scope.editcourse == null || $scope.editcourse.coursename.length < 4;
    };

    $scope.newcourse = function () {
        $('#modaleditcourse').openModal();
        datacourse();
    };
});