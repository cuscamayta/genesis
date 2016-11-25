var app = angular.module('genesisApp', ['uitls.paginate', 'ngStorage']);

app.config(function ($routeProvider, $httpProvider) {
    $routeProvider
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'app/partials/home/home.html'
        })
        .when('/setting', {
            controller: 'SettingController',
            templateUrl: 'app/partials/security/setting.html'
        })
        .when('/user', {
            controller: 'UserController',
            templateUrl: 'app/partials/security/user.html'
        })
        .when('/role', {
            controller: 'RoleController',
            templateUrl: 'app/partials/security/role.html'
        })
        .when('/page', {
            controller: 'PageController',
            templateUrl: 'app/partials/security/page.html'
        })
        .when('/module', {
            controller: 'ModuleController',
            templateUrl: 'app/partials/security/module.html'
        })
        .when('/permit', {
            controller: 'PermitController',
            templateUrl: 'app/partials/security/permit.html'
        })
        .when('/useroffice', {
            controller: 'UserofficeController',
            templateUrl: 'app/partials/security/useroffice.html'
        })
        .when('/drivertype', {
            controller: 'DrivertypeController',
            templateUrl: 'app/partials/driver/drivertype.html'
        })
        .when('/driver', {
            controller: 'DriverController',
            templateUrl: 'app/partials/driver/driver.html'
        })
        .when('/bustype', {
            controller: 'BustypeController',
            templateUrl: 'app/partials/bus/bustype.html'
        })
        .when('/bus', {
            controller: 'BusController',
            templateUrl: 'app/partials/bus/bus.html'
        })
        .when('/destination', {
            controller: 'DestinationController',
            templateUrl: 'app/partials/course/destination.html'
        })
        .when('/course', {
            controller: 'CourseController',
            templateUrl: 'app/partials/course/course.html'
        })
        .when('/office', {
            controller: 'OfficeController',
            templateUrl: 'app/partials/course/office.html'
        })
        .when('/orderbook', {
            controller: 'OrderbookController',
            templateUrl: 'app/partials/sales/orderbook.html'
        })
        .when('/invoice', {
            controller: 'InvoiceController',
            templateUrl: 'app/partials/sales/invoice.html'
        })
        .when('/travel', {
            controller: 'TravelController',
            templateUrl: 'app/partials/schedule/travel.html'
        })
        .when('/schedule', {
            controller: 'ScheduleController',
            templateUrl: 'app/partials/schedule/schedule.html'
        })
        .when('/ticket', {
            controller: 'TicketController',
            templateUrl: 'app/partials/sales/ticket.html'
        })
        .when('/invalidate', {
            controller: 'InvalidateController',
            templateUrl: 'app/partials/sales/invalidate.html'
        })
        .when('/manifest', {
            controller: 'ManifestController',
            templateUrl: 'app/partials/manifest/manifest.html'
        })
        .when('/baggage', {
            controller: 'ManifestController',
            templateUrl: 'app/partials/manifest/baggage.html'
        })
        .when('/dailycash', {
            controller: 'DailycashController',
            templateUrl: 'app/partials/report/dailycash.html'
        })
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'app/partials/home/login.html'
        })
        .when('/password', {
            controller: 'LoginController',
            templateUrl: 'app/partials/home/password.html'
        })
        .when('/route/:id', {
            controller: 'HomeController',
            templateUrl: '/routepartial'
        })        

        .otherwise({
            redirectTo: '/'
        });

    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                if ($localStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $localStorage.token;
                }
                return config;
            },
            'responseError': function (response) {
                if (response.status === 401 || response.status === 403) {
                    $location.path('/login');
                }
                return $q.reject(response);
            }
        };
    }]);
});