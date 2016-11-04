angular
	.module('app.routes', [])

.config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider

		.state('login', {
		url: '/login',
		templateUrl: 'templates/login.html',
		controller: 'loginCtrl',
		cache: false
	})

	.state('menu', {
		url: '/cognifest',
		abstract: true,
		templateUrl: 'templates/menu.html',
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
				templateUrl: 'templates/home.html',
				controller: 'homeCtrl'
			}
		}
	})

	.state('menu.map', {
		url: '/map',
		views: {
			'map': {
				templateUrl: 'templates/map.html',
				controller: 'mapCtrl'
			}
		}
	})

	.state('menu.drinks', {
		url: '/drinks',
		views: {
			'drinks': {
				templateUrl: 'templates/drinks.html',
				controller: 'drinksCtrl'
			}
		}
	})

	.state('menu.camera', {
		cache: false,
		url: '/camera',
		views: {
			'camera': {
				templateUrl: 'templates/camera.html',
				controller: 'cameraCtrl'
			}
		}
	})

	.state('menu.games', {
		url: '/games',
		views: {
			'games': {
				templateUrl: 'templates/games.html'
			}
		}
	})

	//route to the welcome screen of BUBBLES!
	.state('bubbles', {
		url: '/bubbles',
		templateUrl: 'templates/games/bubbles/welcome.html',
		controller: 'WelcomeCtrl'
	})

	//route to the game screen of BUBBLES!
	.state('canvas', {
		url: '/bubbles/playbubbles',
		templateUrl: 'templates/games/bubbles/bubbles.html',
		controller: 'BubbleCtrl'
	});

	$urlRouterProvider.otherwise('/cognifest/home');

});
