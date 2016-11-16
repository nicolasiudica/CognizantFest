angular
	.module('app.routes', [])

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

	$stateProvider

	.state('login', {
		url: '/login',
		templateUrl: 'login.html',
		controller: 'loginCtrl',
		cache: false
	})

	.state('menu', {
		url: '/cognifest',
		abstract: true,
		templateUrl: 'menu.html',
		cache: true
//		resolve: {
//			user: ['FirebaseDB', '$q',
//				function (FirebaseDB, $q) {
//					var authData = FirebaseDB.currentUser();
//					return $q(function (resolve, reject) {
//						authData ? resolve(authData) : reject("NoAuth");
//					});
//				}
//			]
//		}
	})

	.state('menu.home', {
		url: '/home',
		views: {
			'home': {
				templateUrl: 'home.html',
				controller: 'homeCtrl'
			}
		},
		cache: true
	})

	.state('menu.map', {
		url: '/map',
		views: {
			'map': {
				templateUrl: 'map.html',
				controller: 'mapCtrl'
			}
		},
		cache: true
	})

	.state('menu.drinks', {
		url: '/drinks',
		views: {
			'drinks': {
				templateUrl: 'drinks.html',
				controller: 'drinksCtrl'
			}
		},
		cache: true
	})

	.state('menu.camera', {
		url: '/camera',
		views: {
			'camera': {
				templateUrl: 'camera.html',
				controller: 'cameraCtrl'
			}
		},
		cache: false
	})

	.state('menu.games', {
		url: '/games',
		views: {
			'games': {
				templateUrl: 'games.html'
			}
		},
		cache: true
	})

	//route to the welcome screen of BUBBLES!
	.state('bubbles', {
		url: '/bubbles',
		templateUrl: 'games/bubbles/welcome.html',
		controller: 'WelcomeCtrl',
		cache: true
	})

	//route to the game screen of BUBBLES!
	.state('canvas', {
		url: '/bubbles/playbubbles',
		templateUrl: 'games/bubbles/bubbles.html',
		controller: 'BubbleCtrl',
		cache: true
	});

	$urlRouterProvider.otherwise('/cognifest/home');

}]);
