'use strict';

angular
	.module('app', [
		'ionic', 'ion-gallery', 'ngCordova',
		'app.controllers', 'app.routes', 'app.services', 'app.directives',
		'bubbles', 'drinks', 'firebase'
	]);

angular
	.module('app')

.config(['$ionicConfigProvider', function ($ionicConfigProvider) {

	$ionicConfigProvider.tabs.position('bottom'); // other values: top

}]);

angular
	.module('app')

.run(['$ionicPlatform', 'FirebaseDB', '$rootScope', '$state',
	  function ($ionicPlatform, FirebaseDB, $rootScope, $state) {
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

		FirebaseDB.initialize();

		// for authentication
//		$rootScope.$on('$stateChangeError',
//			function (event, toState, toParams, fromState, fromParams, error) {
//				// if the error is "noUser" the go to login state
//				if (error === "NO USER") {
//					event.preventDefault();
//					console.log("go to login state");
//					$state.go('login', {});
//				}
//			}
//		);

		$rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
			if (FirebaseDB.isAuthenticated())
			if ('data' in next && 'authorizedRoles' in next.data) {
				var authorizedRoles = next.data.authorizedRoles;
				if (!AuthService.isAuthorized(authorizedRoles)) {
					event.preventDefault();
					$state.go($state.current, {}, {
						reload: true
					});
					$rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
				}
			}

			if (!AuthService.isAuthenticated()) {
				if (next.name !== 'login') {
					event.preventDefault();
					$state.go('login');
				}
			}
			
		});
}]);