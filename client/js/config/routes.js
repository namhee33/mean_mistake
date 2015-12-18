myApp.config(function($routeProvider){

	 $routeProvider
	 		.when('/', {
	 			redirectTo: '/login'
	 		})
	        .when('/login',{
	            templateUrl: './../static/partials/login.html',
	        })
	        .when('/apps',{
	            templateUrl: './../static/partials/apps.html',
	            controller: 'appsController as ac'
	        })
	        .otherwise({
	          redirectTo: '/'
	        });
})