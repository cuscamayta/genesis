var app = angular.module('genesisApp', ['uitls.paginate']);

app.config(function ($routeProvider) {    
	$routeProvider
		.when('/', {
		    controller: 'HomeController',
			templateUrl: 'app/partials/home/home.html'
		})
        .when('/user', {
            controller: 'UserController',
            templateUrl: 'app/partials/security/user.html'
        })
		.when('/role', {
            controller: 'RoleController',
            templateUrl: 'app/partials/security/role.html'
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
});

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