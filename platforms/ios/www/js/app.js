'use strict';

angular
	.module('app', [
		'ionic', 'ion-gallery', 'ngCordova', 'ui.router',
		'app.controllers', 'app.routes', 'app.services', 'app.directives',
		'bubbles', 'drinks', 'firebase'
	]);

angular
	.module('app')

.config(['$ionicConfigProvider', function ($ionicConfigProvider) {
	$ionicConfigProvider.tabs.position('bottom'); // other values: top
	$ionicConfigProvider.views.transition('platform');
}]);

angular
	.module('app')

.run(['$ionicPlatform', function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
}])

.run(['FirebaseDB', '$rootScope', '$state', '$urlRouter',
	  function (FirebaseDB, $rootScope, $state, $urlRouter) {

		FirebaseDB.initialize()
			.then(function () {
				console.log("firebase init, check auth");

				FirebaseDB.onAuthStateChanged(function () {
					var authUser = FirebaseDB.currentUser();

					if (authUser) {
						console.log("firebase auth, go to home", authUser);
						$state.go('menu.home');
					} else {
						console.log("firebase not auth, go to login", authUser);
						$state.go('login');
					}
				}, this);
			}, function () {
				console.log("firebase didnt init, go to login");
				$state.go('login');
			});
}]);
