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

}]);

angular
	.module('app')

.run(['$ionicPlatform', 'FirebaseDB', '$rootScope', '$state', '$urlRouter',
	  function ($ionicPlatform, FirebaseDB, $rootScope, $state, $urlRouter) {

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

		$rootScope.loginAttempts = 10;
		// for authentication
		$rootScope.$on('$stateChangeError',
			function (event, toState, toParams, fromState, fromParams, error) {
				// if the error is "noUser" the go to login state
				if (error === "NoAuth" && $rootScope.loginAttempts === 0) {
					event.preventDefault();
					console.log("go to login state");
					$state.go('login', {});
				} else $rootScope.loginAttempts--;
			}
		);


		$rootScope.skipSomeAsync = false;

		//		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
		//
		//			if ($rootScope.skipSomeAsync) {
		//				return;
		//			}
		//			
		//			//console.log("$stateChangeStart fired by: ", event, toState, toParams, fromState);
		//
		//			// prevent navigation until async is finished
		//			event.preventDefault();
		//
		//			// do async event
		//			if (!FirebaseDB.isAuthenticated())
		//				continueNavigation('login');
		//			else
		//				$urlRouter.sync();
		//
		//
		//			function continueNavigation(authState) {
		//				var params = angular.copy(toParams);
		//				var nextState = toState.name;
		//				$rootScope.skipSomeAsync = true;
		//				if (authState)
		//					nextState = authState;
		//				$state.go(nextState, params);
		//			}
		//
		//			$rootScope.skipSomeAsync = false;
		//
		//		});
}]);