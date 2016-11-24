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

// app.factory('httpInterceptor', function ($q, $rootScope, $log, $injector, $location) {

//     var numLoadings = 0;
//     $rootScope.countRequest = 0;
//     return {
//         request: function (config) {

//             console.log('se llamo el interceptor');
//             //mensaje de espere por favor
//             $rootScope.lastResponse = 1;


//             return config || $q.when(config);

//         },
//         response: function (response) {
//             $rootScope.countRequest--;
//             if ((--numLoadings) === 0) {

//                 // ocultar el mensaje de espere por favor

//                 $rootScope.lastResponse = 0;

//             }

//             return response || $q.when(response);

//         },
//         responseError: function (response) {

//             if (response.status === 403 || response.status === 401) {

//                 //retornar a la pagina de login

//             //    $location.path("/login");
//             }

//             if (!(--numLoadings)) {

//                 //ocultar el mensaje de espere por favor
//             }

//             return $q.reject(response);
//         }
//     };
// })
//     .config(function ($httpProvider) {
//         $httpProvider.interceptors.push('httpInterceptor');
//     });


// app.run(function ($rootScope, $location) {

// 	var menus = [
// 		{
// 			Name: 'Reportes',
// 			Url: '#/reportes',
// 			PseudoUrl: '/reportes',
// 			SubMenu: []
// 		},
// 		{
// 			Name: 'Ventas',
// 			Url: '#/ventas',
// 			PseudoUrl: '/ventas',
// 			SubMenu: []
// 		},
// 		{
// 			Name: 'Inventario',
// 			PseudoUrl: '/inventario',
// 			Url: '',
// 			SubMenu: [
// 				{
// 					Name: 'Producto',
// 					PseudoUrl: '/producto',
// 					Url: '#/producto'

// 				},
// 				{
// 					Name: 'Tipo Producto',
// 					PseudoUrl: '/tipoProducto',
// 					Url: '#/tipoProducto'
// 				},
// 				{
// 					Name: 'Producto Transaccion',
// 					PseudoUrl: '/productTransaction',
// 					Url: '#/productTransaction'
// 				}
// 			]
// 		},
// 		{
// 			Name: 'Seguridad',
// 			PseudoUrl: '/seguridad',
// 			Url: '',
// 			SubMenu: [
// 				{
// 					Name: 'Usuarios',
// 					PseudoUrl: '/usuario',
// 					Url: '#/usuario'
// 				},
// 				{
// 					Name: 'logout',
// 					PseudoUrl: '/login',
// 					Url: '#/login'
// 				}
// 			]
// 		},
// 	];



// 	$rootScope.generateMenuForRole = function (user, isInit) {
// 		$rootScope.Menus = [];
// 		localStorage.removeItem('user');
// 		localStorage.setItem('user', JSON.stringify(user));
// 		if (user.Role.Name == 'Vendedor') {
// 			$rootScope.Menus.push(menus[1]);
// 			var menuSecurity = angular.copy(menus[3]);
// 			menuSecurity.SubMenu.splice(0, 1);
// 			$rootScope.Menus.push(menuSecurity);
// 			$location.path('/ventas');
// 		} else {
// 			$rootScope.Menus = menus;
// 			if (isInit)
// 				$location.path('/inicio');
// 		}
// 	}

// 	loadUserSession();

// 	function loadUserSession() {
// 		var userSession = localStorage.getItem('user');
// 		if (userSession) {
// 			$rootScope.Menus = $rootScope.menus;
// 			$rootScope.generateMenuForRole(JSON.parse(userSession));
// 		} else {
// 			$rootScope.Menus = [];
// 			$location.path('/login');
// 		}
// 	}
// });