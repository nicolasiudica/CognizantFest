angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('camera.html','<ion-view hide-back-button="false" title="Camera" id="page7" class="">\r\n\t<ion-content id="camera-content" class="padding">\r\n\t\t<div ng-show="imageURI !== undefined">\r\n\t\t\t<div class="text-center animate-show" ng-show="currentState.showPost">\r\n\t\t\t\t<button class="button button-large button-assertive icon-left ion-close-round" ng-click="discardPhoto()">Discard</button>\r\n\t\t\t\t<button class="button button-large button-balanced icon-left ion-checkmark-round" ng-click="postPhoto()">Upload</button>\r\n\t\t\t\t<div class="image-container" style="max-height:{{imageHeight}}px;">\r\n\t\t\t\t\t<img ng-src="{{imageURI}}" class="{{imageClass}}">\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="card text-center animate-show" ng-hide="currentState.showPost">\r\n\t\t\t\t<div class="item item-text-wrap calm animate-show" ng-show="currentState.showPostingMessage">\r\n\t\t\t\t\t<ion-spinner class="spinner-calm"></ion-spinner>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="item item-text-wrap item-icon-left energized animate-show" ng-show="currentState.showErrorMessage">\r\n\t\t\t\t\t<i class="icon ion-close-circled"></i>Error uploading. Sorry!\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="item item-text-wrap item-icon-left calm animate-show" ng-show="currentState.showPostedMessage">\r\n\t\t\t\t\t<i class="icon ion-cloud"></i>Photo uploaded\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="item item-text-wrap item-icon-left assertive animate-show" ng-show="currentState.showDiscardMessage">\r\n\t\t\t\t\t<i class="icon ion-minus-circled"></i>Photo discarded\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<button class="button button-block button-calm animate-show" ng-hide="currentState.showPost" ng-click="takePhoto()">Take a pic!</button>\r\n\t</ion-content>\r\n</ion-view>\r\n');
$templateCache.put('directionsModal.html','<ion-modal-view>\r\n\t<ion-header-bar class="bar bar-header bar-light">\r\n\t\t<h1 class="title">How to get there</h1>\r\n\t\t<button class="button button-calm icon" ng-click="closeInstructionsModal()">\r\n\t\t\t<i class="icon ion-close-round"></i>\r\n\t\t</button>\r\n\t</ion-header-bar>\r\n\t<ion-content>\r\n\t\t<div id="directions-panel"></div>\r\n\t</ion-content>\r\n</ion-modal-view>');
$templateCache.put('disclaimer.html','<ion-modal-view>\r\n\t<ion-header-bar class="bar bar-header bar-calm">\r\n\t\t<h1 class="title">Disclaimer</h1>\r\n\t</ion-header-bar>\r\n\t<ion-content style="background: white;">\r\n\t\t<div class="flex-container padding" style="height: 100%;">\r\n\t\t\t<div class="flex-item">\r\n\t\t\t\t<div class="text-center">\r\n\t\t\t\t\t<h1 class="title">Hey {{ name }}</h1>\r\n\t\t\t\t\t<h3>we expect you at the</h3>\r\n\t\t\t\t\t<h3><b>End Year Party</b>!</h3>\r\n\t\t\t\t</div>\r\n\t\t\t\t<br>\r\n\t\t\t\t<br>\r\n\t\t\t\t<div class="padding">\r\n\t\t\t\t\t<p class="text-justify">Your attendance is voluntary and implies accepting that photos of the event, in which you may appear, can be made public both in institutional campaigns and on social networks where today or in the future Cognizant may participate.</p>\r\n\t\t\t\t\t<p class="text-justify">Alcohol consume is a personal responsibility. We trust you will enjoy the event.</p>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</ion-content>\r\n\t<ion-footer-bar class="bar-stable">\r\n\t\t<div class="button-bar">\r\n\t\t\t<a class="button button-assertive icon-left ion-close-round" ng-click="closeDisclaimer(false)">No</a>\r\n\t\t\t<a class="button button-balanced icon-left ion-checkmark-round" ng-click="closeDisclaimer(true)">Yes!</a>\r\n\t\t</div>\r\n\t</ion-footer-bar>\r\n</ion-modal-view>');
$templateCache.put('drinks.html','<ion-view hide-back-button="false" title="Drinks" id="page3" class=" ">\r\n\t<ion-content padding="true" class="has-header">\r\n\t\t<div class="card no-margin-top">\r\n\t\t\t<div class="shake-icon"></div>\r\n\t\t\t<div class="shake-text-container">\r\n\t\t\t\t<p class="shake-text">Shake your phone to pick a random drink!</p>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class="card drinks-list-title">\r\n\t\t\t<p>Drinks</p>\r\n\t\t\t<ion-gallery ion-gallery-items="items" ion-gallery-row="1"></ion-gallery>\r\n\t\t</div>\r\n\t</ion-content>\r\n</ion-view>\r\n');
$templateCache.put('games.html','<ion-view hide-back-button="false" title="Games" id="page2" class=" ">\r\n\t<ion-content padding="true" class="has-header">\r\n\t\t<div class="card bubbles" ui-sref="bubbles">\r\n\t\t\t<div>\r\n\t\t\t\t<img class="bubble-img" src="img/bubble.png" alt="Bubbles! Logo">\r\n\t\t\t\t<span class="bubble-title">Play BUBBLES!</span>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</ion-content>\r\n</ion-view>');
$templateCache.put('home.html','<ion-view hide-back-button="true" title="Home" id="page1" class="">\r\n\t<ion-content padding="true" class="has-header" on-swipe-left="onSwipeLeft()">\r\n\t\t<div class="card main animated tada">\r\n\t\t\t<div class="item item-icon-left">\r\n\t\t\t\t<i class="icon ion-android-alarm-clock"></i>\r\n\t\t\t\t<span class="card-title">\r\n\t\t\t\t\tCOUNTDOWN TO THE PARTY\r\n\t\t\t\t</span>\r\n\t\t\t</div>\r\n\t\t\t<span class="item item-text-wrap">\r\n<!--               <h2>{{ daysLeft }} DAYS LEFT</h2>-->\r\n\t\t\t\t<h2>{{ countdown }}</h2>\r\n\t\t\t</span>\r\n\t\t</div>\r\n\t\t<div class="card animated" ui-sref="menu.map">\r\n\t\t\t<div class="item item-icon-left">\r\n\t\t\t\t<i class="icon ion-location"></i>\r\n\t\t\t\t<span class="card-title">\r\n\t\t\t\t\tESPACIO DARWIN\r\n\t\t\t\t</span>\r\n\t\t\t</div>\r\n\t\t\t<div class="item item-text-wrap">\r\n\t\t\t\tAv. Cnel. Niceto Vega 5350 - PALERMO\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</ion-content>\r\n</ion-view>');
$templateCache.put('login.html','<ion-view title="Login" hide-back-button="true" hide-nav-bar="true">\r\n\t<ion-content padding="false" class="login">\r\n\t\t<form name="loginForm" novalidate="" ng-submit="openDisclaimer(creds)">\r\n\t\t\t<div class="login-msg">Welcome to CogniFest! Please Log In</div>\r\n\t\t\t<ion-list>\r\n\t\t\t\t<label class="item item-input item-floating-label" ng-class="{ \'has-errors\' : loginForm.email.$invalid && loginForm.email.$dirty, \'no-errors\' : loginForm.email.$valid}">\r\n\t\t\t\t\t<input type="email" name="email" placeholder="Your Cognizant E-mail" ng-model="creds.email" ng-pattern="/^[_a-z0-9-]+(\\.[_a-z0-9-]+)*(@cognizant\\.com)$/i" ng-model-options="{ debounce: 500 }" required>\r\n\t\t\t\t</label>\r\n\t\t\t\t<div class="error-container" ng-show="loginForm.email.$error && !loginForm.email.$valid && loginForm.email.$dirty">\r\n\t\t\t\t\t<div class="error">\r\n\t\t\t\t\t\t<i class="ion-information-circled"></i> <span class="error-msg">Please, enter a valid Cognizant E-mail</span>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</ion-list>\r\n\t\t\t<button class="button button-balanced button-small" type="submit" ng-disabled="loginForm.$invalid || loginForm.$pending">Go In!</button>\r\n\t\t</form>\r\n\t</ion-content>\r\n</ion-view>');
$templateCache.put('map.html','<ion-view hide-back-button="false" title="Map" id="page5" class=" ">\r\n\t<ion-content padding="false" class="has-header">\r\n\t\t<div id="controls-container">\r\n\t\t\t<div class="left">\r\n\t\t\t\t<input id="origin-input" class="controls" type="text" placeholder="Origin Location" data-tap-disabled="true" ng-change="disableTap()" ng-model="search">\r\n\t\t\t\t<input id="destination-input" class="controls" type="text" placeholder="Destination location">\r\n\t\t\t</div>\r\n\t\t\t<button id="switch-btn" class="button" value="" ng-click="onSwitch()">\r\n\t\t\t\t<i class="icon ion-arrow-swap ion-rotate-90"></i>\r\n\t\t\t</button>\r\n\t\t\t<div class="right">\r\n\t\t\t\t<div class="button-bar">\r\n\t\t\t\t\t<a class="option-button button icon ion-android-bus " method="TRANSIT"></a>\r\n\t\t\t\t\t<a class="option-button button icon ion-android-car " method="DRIVING"></a>\r\n\t\t\t\t\t<a class="option-button button icon ion-android-walk" method="WALKING"></a>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<button class="button icon-left button-balanced button-full" ng-click="openInstructionsModal()" ng-disabled="!instructionsLoaded">\r\n\t\t\t<i class="icon ion-map"></i><b class="">Detailed instructions</b>\r\n\t\t</button>\r\n\t\t<div id="map"></div>\r\n\t\t<div ng-hide="true" id="right-panel"></div>\r\n\t</ion-content>\r\n</ion-view>');
$templateCache.put('menu.html','<ion-tabs class="tabs-stripped tabs-color-calm tabs-icon-top">\r\n\r\n\t<ion-tab title="Home" icon-on="ion-ios-home" icon-off="ion-ios-home-outline" ui-sref="menu.home" ui-sref-active="active">\r\n\t\t<ion-nav-view name="home"></ion-nav-view>\r\n\t</ion-tab>\r\n\r\n\t<ion-tab title="Map" icon-on="ion-ios-location" icon-off="ion-ios-location-outline" ui-sref="menu.map" ui-sref-active="active">\r\n\t\t<ion-nav-view name="map"></ion-nav-view>\r\n\t</ion-tab>\r\n\r\n\t<ion-tab title="Drinks" icon-on="ion-ios-wineglass" icon-off="ion-ios-wineglass-outline" ui-sref="menu.drinks" ui-sref-active="active">\r\n\t\t<ion-nav-view name="drinks"></ion-nav-view>\r\n\t</ion-tab>\r\n\r\n\t<ion-tab title="Camera" icon-on="ion-ios-camera" icon-off="ion-ios-camera-outline" ui-sref="menu.camera" ui-sref-active="active">\r\n\t\t<ion-nav-view name="camera" ng-init="takePhoto()"></ion-nav-view>\r\n\t</ion-tab>\r\n\r\n\t<ion-tab title="Game" icon-on="ion-ios-game-controller-b" icon-off="ion-ios-game-controller-b-outline" ui-sref="menu.games" ui-sref-active="active">\r\n\t\t<ion-nav-view name="games"></ion-nav-view>\r\n\t</ion-tab>\r\n\r\n</ion-tabs>');
$templateCache.put('randomDrinkModal.html','<ion-modal-view>\r\n\t<ion-content padding="true">\r\n\t\t<div class="random-drink-container">\r\n\t\t\t<div class="card random-drink-img">\r\n\t\t\t\t<p>Drink a {{ randomDrink.name }}!</p>\r\n\t\t\t\t<img ng-src="{{ randomDrink.largeImg }}" alt="">\r\n\t\t\t</div>\r\n\t\t\t<div class="gotit">\r\n\t\t\t\t<button class="button button-small button-calm" ng-click="closeModal()">Got it!</button>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</ion-content>\r\n</ion-modal-view>');
$templateCache.put('games/bubbles/bubbles.html','<ion-view view-title="Game" class="padding screen-background" hide-nav-bar="true" ng-class="bubblesBg">\r\n\t<div>\r\n\t\t<p class="click-counter bad">bad: {{ badClicks }}</p>\r\n\t\t<p class="click-counter good">good: {{ goodClicks }}</p>\r\n\t\t<!--\r\n\t\t<p>the one: {{ theOne }}</p>\r\n\t\t<p>series: {{ series }}</p>\r\n\t\t<p>data: {{ data }}</p>\r\n\t\t-->\r\n\t</div>\r\n\t<canvas id="chart" class="chart chart-bubble" chart-data="data" chart-colors="colors" chart-options="options" chart-click="whoClicked" chart-hover="">\r\n\t</canvas>\r\n</ion-view>');
$templateCache.put('games/bubbles/instructions.html','<ion-modal-view>\r\n\t<ion-header-bar class="bar bar-header bar-light">\r\n\t\t<h1 class="title">How to play</h1>\r\n\t\t<button class="button button-calm icon" ng-click="closeInstructionsModal()">\r\n\t\t\t<i class="icon ion-close-round"></i>\r\n\t\t</button>\r\n\t</ion-header-bar>\r\n\t<ion-content>\r\n\t\t<div class="flex-container padding" style="height: 100%;">\r\n\t\t\t<div class="flex-item">\r\n\t\t\t\t<div class="card">\r\n\t\t\t\t\t<div class="item item-text-wrap">\r\n\t\t\t\t\t\tSpot the bubble that doesn\'t move.\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="card">\r\n\t\t\t\t\t<div class="item item-text-wrap">\r\n\t\t\t\t\t\tYou only have 3 attempts.\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="card">\r\n\t\t\t\t\t<div class="item item-text-wrap">\r\n\t\t\t\t\t\tHave fun!\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</ion-content>\r\n</ion-modal-view>');
$templateCache.put('games/bubbles/popup.html','<div class="row responsive-sm">\r\n\t<div class="col">\r\n\t\t<img src="{{ result.img }}" alt="{{ result.alt }}" >\r\n\t</div>\r\n</div>');
$templateCache.put('games/bubbles/welcome.html','<ion-view hide-back-button="false" view-title="Welcome" class="padding screen-background" hide-nav-bar="true">\r\n\t<div class="bubbles-welcome">\r\n\t\t<div class="responsive-sm text-center v-center">\r\n\t\t\t<img class="col" src="img/bubble.png" alt="Bubbles! Logo">\r\n\t\t</div>\r\n\t\t<div class="responsive-sm text-center v-center">\r\n\t\t\t<h1 class="col bubbles-title">Bubbles!</h1>\r\n\t\t</div>\r\n\t\t<div class="bubbles-menu">\r\n\t\t\t<a class="button button-block button-calm" ui-sref="canvas">Start!</a>\r\n\t\t\t<a class="button button-block button-outline button-calm" ng-click="openInstructionsModal()">Instructions</a>\r\n\t\t\t<a class="button button-block button-outline button-calm" ui-sref="menu.games">Exit game</a>\r\n\t\t</div>\r\n\t</div>\r\n</ion-view>');}]);

'use strict';

angular
	.module('app', [
		'ionic', 'ion-gallery', 'ngCordova', 'ui.router',
		'app.controllers', 'app.routes', 'app.services', 'app.directives',
		'bubbles', 'drinks', 'firebase', 'templates'
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

"use strict";

angular.module('app.services', ['ngCordova'])

// Days countdown to the party
.service('DaysLeftCounter', function () {

	var partyDate = new Date(2016, 10, 25, 21, 0, 0);
	var daysLeft = getTimeRemaining(partyDate);

	function getTimeRemaining(date) {
		var t = Date.parse(date) - Date.parse(new Date());
		return {
			'total': t,
			'days': Math.floor(t / (1000 * 60 * 60 * 24)),
			'hours': Math.floor((t / (1000 * 60 * 60)) % 24),
			'minutes': Math.floor((t / 1000 / 60) % 60),
			'seconds': Math.floor((t / 1000) % 60)
		};
	}

	function getHTMLMessage(date) {
		var t = getTimeRemaining(date);
		var html;

		if (t.days > 1) {
			html = t.days + ' days left';
		} else {
			if (t.hours > 1) {
				html = t.hours + ' hours left';
			} else {
				if (t.minutes > 1) {
					html = t.minutes + ' minutes left';
				} else {
					if (t.seconds > 0) {
						html = t.seconds + ' seconds left';
					} else {
						html = "Party has started! Start taking photos!";
					}
				}
			}
		}

		return html;
	}

	return {
		daysLeft: function () {
			return daysLeft;
		},
		partyDay: function () {
			return partyDate;
		},
		toString: function () {
			return getHTMLMessage(partyDate);
		}
	};

//	this.day = function () {
//
//		var today = new Date();
//		var PartyDay = new Date("November 25, 2016");
//
//		// Milisegundos en un dia
//		const msDay = 24 * 60 * 60 * 1000;
//		// Tiempo en milisegundos que falatan para la fiesta
//		var timeLeft = (PartyDay.getTime() - today.getTime());
//		var daysLeft = Math.floor(timeLeft / msDay);
//
//		return {
//			daysLeft: function () {
//				return daysLeft;
//			},
//			partyDay: function () {
//				return PartyDay;
//			},
//			now: function () {
//				return today.getTime();
//			}
//		};
//	};
})

.service('BlankService', [function () {

}]);

"use strict";

angular.module('app.directives', [])

//.directive('overwriteEmail', [function () {
//	var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@cognizant\.com$/i;
//
//	return {
//		require: '?ngModel',
//		link: function (scope, elm, attrs, ctrl) {
//			// only apply the validator if ngModel is present and Angular has added the email validator
//			if (ctrl && ctrl.$validators.email) {
//
//				// this will overwrite the default Angular email validator
//				ctrl.$validators.email = function (modelValue) {
//					return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
//				};
//			}
//		}
//	};
//}])

.directive('blankDirective', [function () {

}]);
"use strict";

angular
	.module('app.controllers', [])

.controller('loginCtrl', ['$scope', '$state', '$timeout', 'FirebaseDB', '$ionicModal',
						  function LoginCtrl($scope, $state, $timeout, FirebaseDB, $ionicModal) {
		console.log("Login Controller");

		var userCredentials;

		function createCredentials(_credentials) {

			String.prototype.capitalizeFirstLetter = function () {
				return this.charAt(0).toUpperCase() + this.slice(1);
			};

			if (_credentials.email) {

				var password = _credentials.email;
				var subName = _credentials.email.substr(0, _credentials.email.lastIndexOf('@'));
				var firstName = subName.substr(0, subName.lastIndexOf('.')).capitalizeFirstLetter();
				var lastName = subName.substr(subName.lastIndexOf('.') + 1).capitalizeFirstLetter();
				var displayName = firstName + ' ' + lastName;

				return {
					email: _credentials.email,
					password: password,
					displayName: displayName
				};
			} else {
				return {};
			}
		}

		var doCreateUserAction = function (_credentials) {

			FirebaseDB.createUser(_credentials).then(function (authData) {
				console.log("Logged in as:", authData);
				$state.go('menu.home', {});
			}).catch(function (error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.error("Authentication failed:", error);

				if (error.code === "auth/email-already-in-use") {
					FirebaseDB.login(_credentials).then(function (authData) {
						console.log("Logged in as:", authData);
						$state.go('menu.home', {});
					}).catch(function (error) {
						var errorCode = error.code;
						var errorMessage = error.message;
						console.error("Authentication failed:", error);
					});
				}
			});
		};

		$ionicModal.fromTemplateUrl('disclaimer.html', {
			scope: $scope,
			options: {
				backdropClickToClose: false,
				hardwareBackButtonClose: false
			}
		}).then(function (modal) {
			$scope.disclaimer = modal;
		});

		$scope.openDisclaimer = function (_credentials) {
			userCredentials = createCredentials(_credentials);
			$scope.name = userCredentials.displayName.substr(0, userCredentials.displayName.lastIndexOf(' '));
			$scope.disclaimer.show();
		};
		$scope.closeDisclaimer = function (accept) {
			$scope.disclaimer.hide();

			if (accept) {
				doCreateUserAction(userCredentials);
			} else {
				console.log("Rejected terms");
			}
		};
		//Cleanup the modal when we're done with it!
		$scope.$on('$destroy', function () {
			$scope.disclaimer.remove();
		});
		// Execute action on hidden modal
		$scope.$on('modal.hidden', function () {
			// Execute action
		});
		// Execute action on remove modal
		$scope.$on('modal.removed', function () {
			// Execute action
		});
}])

.controller('homeCtrl', ['$scope', '$state', 'DaysLeftCounter',
						 function ($scope, $state, DaysLeftCounter) {

		//		$scope.daysLeft = DaysLeftCounter.day().daysLeft();
		//
		//		var counter = 1;
		//
		//		$scope.tapCounter = function () {
		//			counter += 1;
		//
		//			var timer = setTimeout(log, 2000);
		//			console.log(timer);
		//
		//			if (counter >= 10) {
		//				console.log("mayor que 20");
		//				clearTimeout(timer);
		//			}
		//
		//			function log() {
		//				counter = 0;
		//			}
		//
		//		};
		$scope.countdown = DaysLeftCounter.toString();
		$scope.partyDay = DaysLeftCounter.partyDay();
}])

.controller('mapCtrl', ['$scope', '$state', '$cordovaGeolocation', '$ionicModal',
						function ($scope, $state, $cordovaGeolocation, $ionicModal) {

		var geocoder;
		var directionsDisplay;
		var directionsService;
		var map = $scope.map;
		var mapDIV = document.getElementById('map');
		var partyLocation = "Av. Cnel. Niceto Vega 5350, 1414 CABA";
		var partyLatLng = {
			lat: -34.588660,
			lng: -58.436719
		};
		var destination = partyLatLng;
		var destinationString = partyLocation;
		var selectedMode = document.getElementsByClassName('option-button')[0].getAttribute('method');
		var origin;
		var origin_input = document.getElementById('origin-input');
		var destination_input = document.getElementById('destination-input');
		//var modes = document.getElementById('mode');
		var switchButton = document.getElementById('switch-btn');
		var isGoing = true;
		var markerCognizant;
		var markerImage = "img/cognizantLogo30x30.png";
		var origin_place_id;
		var destination_place_id;
		var origin_autocomplete;
		var destination_autocomplete;
		var placesService;
		var directionsPanel = document.getElementById('right-panel');
		var travelMethodButtons = document.getElementsByClassName('option-button');

		destination_input.disabled = true;

		$scope.instructionsLoaded = false;

		$ionicModal.fromTemplateUrl('directionsModal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function (modal) {
			$scope.instructionsModal = modal;
		});

		$scope.disableTap = function () {
			var container = document.getElementsByClassName('pac-container');
			angular.element(container).attr('data-tap-disabled', 'true');
			var backdrop = document.getElementsByClassName('backdrop');
			angular.element(backdrop).attr('data-tap-disabled', 'true');
			angular.element(container).on("click", function () {
				document.getElementById('pac-input').blur();
			});
		};

		//		$scope.callDialog = function () {
		//			document.addEventListener("deviceready", function () {
		//				cordova.dialogGPS("Your GPS is Disabled, this app needs to be enable to works.", //message
		//					"Use GPS, with wifi or 3G.", //description
		//					function (buttonIndex) { //callback
		//						switch (buttonIndex) {
		//						case 0:
		//							break; //cancel
		//						case 1:
		//							break; //neutro option
		//						case 2:
		//							break; //user go to configuration
		//						}
		//					},
		//					"Please Turn on GPS", //title
		//				["Cancel", "Later", "Go"]); //buttons
		//			});
		//		};

		$scope.getCallPermission = function () {
			cordova.plugins.diagnostic.getPermissionAuthorizationStatus(function (status) {
				switch (status) {
					case cordova.plugins.diagnostic.runtimePermissionStatus.NOT_REQUESTED:
						$scope.setPhonePermission();
						break;
					case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED:
						$scope.setPhonePermission();
						break;
				}
			}, function (error) {
				//			if (window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")) {
				//				$scope.callDialog();
				//				cordova.plugins.diagnostic.switchToLocationSettings();
				//				}
			}, cordova.plugins.diagnostic.runtimePermission.ACCESS_FINE_LOCATION);
		};

		$scope.setPhonePermission = function () {
			cordova.plugins.diagnostic.requestRuntimePermission(function (status) {
				initMap();
			}, function (error) {
				//			if (window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")) {
				//				$scope.callDialog();
				//				cordova.plugins.diagnostic.switchToLocationSettings();
				//			}
			}, cordova.plugins.diagnostic.runtimePermission.ACCESS_FINE_LOCATION);
		};

		$scope.$on('$ionicView.enter', function () {
			var isAndroid = ionic.Platform.isAndroid();
			var currentPlatformVersion = ionic.Platform.version();
			var isMarshmallow = parseFloat(currentPlatformVersion) >= 6.0;
			if (isAndroid && isMarshmallow) {
				$scope.getCallPermission();
			}
		});

		$scope.onSwitch = function () {
			console.log("SWITCHING ROUTES...");

			if (isGoing) {
				console.log("--- COMING BACK ---");
				isGoing = false;

				destination_input.value = origin_input.value;
				destination_input.disabled = false;
				destinationString = destination_input.value;

				origin = partyLatLng;
				origin_input.value = partyLocation;
				origin_input.disabled = true;

				geocoder.geocode({
					'address': destinationString
				}, function (results, status) {
					if (status == 'OK') {
						destination = results[0].geometry.location;
						getDirection(directionsDisplay);
						setMarker(origin, map);
					} else {
						console.log('***** onSwitchRoutes COMING BACK Geocode was not successful for the following reason: ' + status);
					}
				});

			} else {
				console.log("--- GOING ---");
				isGoing = true;
				origin_input.value = destination_input.value;
				origin_input.disabled = false;
				destination = partyLatLng;
				destination_input.value = partyLocation;
				destination_input.disabled = true;

				geocoder.geocode({
					'address': origin_input.value
				}, function (results, status) {
					if (status == 'OK') {
						origin = results[0].geometry.location;
						getDirection(directionsDisplay);
						setMarker(partyLatLng, map);
					} else {
						console.log('***** onSwitchRoutes GOING Geocode was not successful for the following reason: ' + status);
					}
				});
			}
		};

		$scope.openInstructionsModal = function () {
			$scope.instructionsModal.show();
			$('#directions-panel').html($('#right-panel').html());
		};

		$scope.closeInstructionsModal = function () {
			$scope.instructionsModal.hide();
		};

		// Cleanup the modal when we're done with it!
		$scope.$on('$destroy', function () {
			console.log("Destroy Instructions Modal");
			$scope.instructionsModal.remove();
		});
		// Execute action on hide modal
		$scope.$on('modal.hidden', function () {
			// Execute action
			console.log("Instructions Modal Hidden");
		});
		// Execute action on remove modal
		$scope.$on('modal.removed', function () {
			// Execute action
			console.log("Instructions Modal Removed");
		});

		destination_input.value = partyLocation;
		initMap();

		//Initialize map
		function initMap() {
			// new 260916
			var options = {
				timeout: 10000,
				enableHighAccuracy: true
			};

			$cordovaGeolocation.getCurrentPosition(options).then(function (position) {

				var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

				var mapOptions = {
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					center: latLng,
					zoom: 18,
					mapTypeControlOptions: {
						mapTypeIds: [
						google.maps.MapTypeId.ROADMAP
					],
						position: google.maps.ControlPosition.BOTTOM_LEFT
					}
				};

				map = new google.maps.Map(mapDIV, mapOptions);

				origin_autocomplete = new google.maps.places.Autocomplete(origin_input);
				origin_autocomplete.bindTo('bounds', map);
				destination_autocomplete = new google.maps.places.Autocomplete(destination_input);
				destination_autocomplete.bindTo('bounds', map);

				directionsService = new google.maps.DirectionsService();
				geocoder = new google.maps.Geocoder();
				directionsDisplay = new google.maps.DirectionsRenderer();
				directionsDisplay.setMap(map);
				directionsDisplay.setOptions({
					suppressMarkers: true
				});
				placesService = new google.maps.places.PlacesService(map);

				//AutoComplete
				origin_autocomplete.addListener('place_changed', function () {
					var place = origin_autocomplete.getPlace();
					if (!place.geometry) {
						console.log("***** Autocomplete's returned place contains no geometry");
						return;
					}
					expandViewportToFitPlace(map, place);

					// If the place has a geometry, store its place ID and route if we have
					// the other place ID
					origin_place_id = place.place_id;

					geocoder.geocode({
						'placeId': origin_place_id
					}, function (results, status) {
						if (status == 'OK') {
							origin = results[0].geometry.location;
							route(origin_place_id, destination_place_id, directionsService, directionsDisplay);
						} else {
							console.log('***** origin_autocomplete Geocode was not successful for the following reason: ' + status);
						}
					});
				});

				destination_autocomplete.addListener('place_changed', function () {
					var place = destination_autocomplete.getPlace();
					if (!place.geometry) {
						console.log("***** Autocomplete's returned place contains no geometry");
						return;
					}
					expandViewportToFitPlace(map, place);

					destination_place_id = place.place_id;

					if (origin_autocomplete.getPlace()) {
						var placeOrig = origin_autocomplete.getPlace();
						console.log("place orig", placeOrig);
						//console.log("origin_autocomplete", origin_autocomplete.getPlace());
						origin_place_id = placeOrig.place_id;
						route(origin_place_id, destination_place_id, directionsService, directionsDisplay);
					} else {
						//console.log("origin_input.value", origin_input.value)
						placesService.textSearch({
							query: origin_input.value
						}, function (results, status) {
							origin_place_id = results[0].place_id;
							route(origin_place_id, destination_place_id, directionsService, directionsDisplay);
						});
					}
				});

				function expandViewportToFitPlace(map, place) {
					if (place.geometry.viewport) {
						map.fitBounds(place.geometry.viewport);
					} else {
						map.setCenter(place.geometry.location);
						map.setZoom(17);
					}
				}

				//map.setOptions({styles: styles});

				directionsDisplay.setPanel(null);
				directionsDisplay.setPanel(directionsPanel);

				var icon = {
					url: markerImage,
					scaledSize: new google.maps.Size(30, 50),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(20, 40)
				};

				markerCognizant = new google.maps.Marker({
					animation: google.maps.Animation.DROP,
					icon: icon,
					map: map,
					title: 'Cognizant Technology Solutions'
				});

				initGeo(directionsDisplay);

			}, function (error) {
				console.log("Could not get location " + error.code);
				$('#map').append("Could not get the location: " + error.message + error.code);
				$scope.getCallPermission();
			});
		}

		//Geolocalization
		function initGeo(directionsDisplay) {
			console.log("---> initGeo()");
			//var infoWindow = new google.maps.InfoWindow({map: map});
			var directionsService = new google.maps.DirectionsService();

			// Try HTML5 geolocation.
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function (position) {
					pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};

					//infoWindow.setPosition(pos);
					//infoWindow.setContent('Estas aquí');

					geocoder.geocode({
						'location': pos
					}, function (results, status) {
						if (status == 'OK') {
							//console.log(results[0])
							origin = results[0].geometry.location;
							origin_input.value = results[1].formatted_address;
							map.setCenter(pos);
							getDirection(directionsDisplay);
							setMarker(partyLatLng, map);
							$scope.instructionsLoaded = true;
							$scope.$apply();
						} else {
							console.log('***** Geocode was not successful for the following reason: ' + status);
						}
					});

				}, function () {
					handleLocationError(true, infoWindow, map.getCenter());
				});

			} else {
				// Browser doesn't support Geolocation
				handleLocationError(false, infoWindow, map.getCenter());
			}

			function handleLocationError(browserHasGeolocation, infoWindow, pos) {
				//infoWindow.setPosition(pos);
				//infoWindow.setContent(browserHasGeolocation ?
				//'Error: The Geolocation service failed.' :
				//'Error: Your browser doesn\'t support geolocation.');
			}
		}

		/*
		document.getElementById('mode').addEventListener('change', function() {
		});
		*/

		//GET NEW DIRECTION
		function getDirection(directionsDisplay) {
			console.log("---> getDirection()");

			var request = {
				origin: origin,
				destination: destination,
				transitOptions: {
					modes: [google.maps.TransitMode.BUS, google.maps.TransitMode.SUBWAY]
				},
				travelMode: google.maps.TravelMode[selectedMode]
			};

			directionsService.route(request, function (result, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					console.log("DRAW ROUTE", request);
					directionsDisplay.setDirections(result);
				}
			});
		}

		//Travel TYPE
		function calculateAndDisplayRoute(directionsService, directionsDisplay, travelMethod) {
			console.log("---> calculateAndDisplayRoute()");
			var selectedMode = travelMethod;
			//var selectedMode = document.getElementById('mode').value;
			//console.log("selected mode:", selectedMode);

			directionsService.route({
				origin: origin,
				destination: destination,
				// **transitOptions** agregar las opciones de transporte publico para hacer una mejor ruta
				transitOptions: {
					modes: [google.maps.TransitMode.SUBWAY, google.maps.TransitMode.BUS]
				},
				travelMode: google.maps.TravelMode[selectedMode]
			}, function (response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setPanel(null);
					directionsDisplay.setPanel(directionsPanel);
					directionsDisplay.setDirections(response);
				} else {
					console.log('***** calculateAndDisplayRoute Directions request failed due to ' + status);
				}
			});
		}

		//Draw route
		function route(origin_place_id, destination_place_id, directionsService, directionsDisplay) {
			//Draws the route automatically
			console.log("---> route()");
			if (!origin_place_id || !destination_place_id) {
				directionsService.route({
					origin: origin,
					destination: destination,
					transitOptions: {
						modes: [google.maps.TransitMode.SUBWAY, google.maps.TransitMode.BUS]
					},
					travelMode: google.maps.TravelMode[selectedMode]
				}, function (response, status) {
					if (status == google.maps.DirectionsStatus.OK) {
						directionsDisplay.setDirections(response);
					} else {
						console.log('***** route Directions request failed due to ' + status);
					}
				});
				return;
			}

			//Draws teh chosen route from From and To.
			directionsService.route({
				origin: {
					'placeId': origin_place_id
				},
				destination: {
					'placeId': destination_place_id
				},
				travelMode: google.maps.TravelMode[selectedMode]
			}, function (response, status) {
				if (status === google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);
				} else {
					console.log('***** route Directions request failed due to ' + status);
				}
			});
		}

		//MARKERS
		function setMarker(pos) {
			markerCognizant.setPosition(pos);
			markerCognizant.setZIndex(99999);

			var contentString = '<div id="content">' +
				'<div id="siteNotice">' +
				'</div>' +
				'<h4 id="firstHeading" class="firstHeading">Ubicación de la empresa</h4>' +
				'<div id="bodyContent">' +
				'<p><b>Cognizant Technology Solutions</b>' +
				'</p>' +
				'</div>' +
				'</div>';

			var infowindow = new google.maps.InfoWindow({
				//content: contentString
			});

			markerCognizant.addListener('click', function () {
				//infowindow.open(map, markerCognizant);
			});
		}

		//TRAVEL MODE LISTENER
		for (var i = 0; i < travelMethodButtons.length; i++) {
			travelMethodButtons[i].addEventListener('click', function () {
				var travelMethod = this.getAttribute('method');
				calculateAndDisplayRoute(directionsService, directionsDisplay, travelMethod);
			});
		}
}])

.controller('cameraCtrl', ['$scope', '$cordovaCamera', '$cordovaFile', 'FirebaseDB',
						   function ($scope, $cordovaCamera, $cordovaFile, FirebaseDB) {

		function imageResizing(imageURI) {
			var img = new Image();
			img.src = imageURI;
			return (img.height > img.width) ? 'resize-vertical' : 'resize-horizontal';
		}

		function viewStatus(_ztate) {

			var _state = {
				showPost: false,
				showPostedMessage: false,
				showPostingMessage: false,
				showErrorMessage: false,
				showDiscardMessage: false
			};

			if (_ztate == 'init' || _ztate === null) {
				_state.showPost = false;
				_state.showPostedMessage = false;
				_state.showPostingMessage = false;
				_state.showErrorMessage = false;
				_state.showDiscardMessage = false;
			}

			if (_ztate == 'taken') {
				_state.showPost = true;
				_state.showPostedMessage = false;
				_state.showPostingMessage = false;
				_state.showErrorMessage = false;
				_state.showDiscardMessage = false;
			}

			if (_ztate.slice(0, 4) == 'post') {
				_state.showPost = false;

				if (_ztate.slice(4) == 'ing') {
					_state.showPostingMessage = true;
					_state.showPostedMessage = false;
					_state.showErrorMessage = false;
					_state.showDiscardMessage = false;
				}

				if (_ztate.slice(4) == 'ed') {
					_state.showPostingMessage = false;
					_state.showPostedMessage = true;
					_state.showErrorMessage = false;
					_state.showDiscardMessage = false;
				}

				if (_ztate.slice(4) == 'error') {
					_state.showPostingMessage = false;
					_state.showPostedMessage = false;
					_state.showErrorMessage = true;
					_state.showDiscardMessage = false;
				}
			}

			if (_ztate == 'discard') {
				_state.showPost = false;
				_state.showPostedMessage = false;
				_state.showPostingMessage = false;
				_state.showErrorMessage = false;
				_state.showDiscardMessage = true;
			}

			return _state;
		}

		$scope.currentState = viewStatus('init');

		$scope.postPhoto = function _postPhoto() {

			var owner = FirebaseDB.currentUser().uid;
			var now = new Date().getTime();
			var imageTitle = 'CogniFest.' + owner + '.' + now;

			var name = $scope.imageURI.substr($scope.imageURI.lastIndexOf('/') + 1);
			var file_path = $scope.imageURI.substr(0, $scope.imageURI.lastIndexOf('/') + 1);

			console.log(file_path);

			$cordovaFile
				.readAsArrayBuffer(file_path, name)
				.then(function (imageData) {
					// success
					console.log("File read succesful", imageData);

					var blob = new Blob([imageData], {
						type: "image/jpeg"
					});

					console.log("Image", blob);

					var uploadTask = FirebaseDB.storage().ref('CogniFest/photos/' + imageTitle + '.jpg').put(blob);

					uploadTask.on('state_changed', function (snapshot) {
						// Observe state change events such as progress, pause, and resume
						var progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
						console.log('Upload is ' + progress + '% done');
						$scope.currentState = viewStatus('posting');
						$scope.$apply();
					}, function (error) {
						// Handle unsuccessful uploads
						console.log("Error uploading: " + error);
						$scope.currentState = viewStatus('posterror');
						$scope.$apply();
					}, function () {
						// Handle successful uploads on complete
						// For instance, get the download URL: https://firebasestorage.googleapis.com/...
						var downloadURL = uploadTask.snapshot.downloadURL;
						console.log("Success! ", downloadURL);
						$scope.currentState = viewStatus('posted');
						$scope.$apply();
						// save a reference to the image for listing purposes
						var ref = FirebaseDB.database().ref('CogniFest/photos');
						ref.push({
							'src': downloadURL,
							'owner': owner,
							'time': now
						});
					});
				}, function (error) {
					// error
					console.log("Failed to read file from directory", error);
				});
		};

		$scope.discardPhoto = function _discardPhoto() {
			$scope.currentState = viewStatus('discard');
		};

		//Opens the camera and the settings that it will be using to take the pictures
		$scope.takePhoto = function _takePhoto() {

			var options = {
				quality: 90,
				destinationType: Camera.DestinationType.FILE_URI,
				sourceType: Camera.PictureSourceType.CAMERA,
				encodingType: Camera.EncodingType.JPEG,
				mediaType: Camera.MediaType.PICTURE,
				allowEdit: false,
				saveToPhotoAlbum: true,
				correctOrientation: true
			};

			$cordovaCamera
				.getPicture(options)
				.then(function (imageData) {
					$scope.currentState = viewStatus('taken');
					$scope.imageURI = imageData;
					console.log($scope.imageURI);
					$scope.imageClass = imageResizing(imageData);
					$scope.imageHeight = $('#camera-content').clientHeight * (2 / 3);
				}, function (error) {
					console.log("Failed to take picture", error);
				});
		};

		$scope.takePhoto();
}]);

'use strict';

angular
	.module('bubbles', ['bubbles.controllers', 'bubbles.services']);
'use strict';

angular
	.module('bubbles.services', []);
'use strict';

angular
	.module('bubbles.controllers', ['ionic', 'chart.js']);

angular
	.module('bubbles.controllers')
	.controller('WelcomeCtrl', ['$scope', '$ionicModal',
								function ($scope, $ionicModal) {
			$ionicModal.fromTemplateUrl('games/bubbles/instructions.html', {
				scope: $scope
			}).then(function (modal) {
				$scope.instructions = modal;
			});

			$scope.openInstructionsModal = function () {
				$scope.instructions.show();
			};
			$scope.closeInstructionsModal = function () {
				$scope.instructions.hide();
			};
			//Cleanup the modal when we're done with it!
			$scope.$on('$destroy', function () {
				$scope.instructions.remove();
			});
			// Execute action on hidden modal
			$scope.$on('modal.hidden', function () {
				// Execute action
			});
			// Execute action on remove modal
			$scope.$on('modal.removed', function () {
				// Execute action
			});
}]);

angular
	.module('bubbles.controllers')
	.config(['ChartJsProvider',
			 function (ChartJsProvider) {
			ChartJsProvider.setOptions({
				tooltips: {
					enabled: false
				}
			});
	}]);

angular
	.module('bubbles.controllers')
	.controller('BubbleCtrl', ['$scope', '$interval', '$state', '$ionicPopup',
							   function ($scope, $interval, $state, $ionicPopup) {

			//shake.stopWatch();

			function randomScalingFactor() {
				return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
			}

			function randomRadius() {
				return Math.max(Math.abs(randomScalingFactor() / 2.5), 10);
			}

			function createTheOne() {
				//console.log('====== createTheOne ======');
				/*
				var thisx = randomScalingFactor(),
					thisy = randomScalingFactor(),
					thisr = randomRadius(),
				*/
				var theOne = [{
					x: randomScalingFactor(),
					y: randomScalingFactor(),
					r: randomRadius()
				}];
				//console.log("The One: (x,y) = (" + thisx + "," + thisy + ")");
				//console.log(thisr);
				return theOne;
			}

			function injectTheOne(series, data) {
				//console.log('====== injectTheOne ======');
				if ($scope.theOne == null) {
					$scope.theOne = createTheOne();
				}

				series.push('The One');
				data.push($scope.theOne);
			}

			function findTheOne(points, scope) {
				var i = 0,
					dataset,
					serie,
					theOne = [{
						x: 0,
						y: 0,
						r: 0
				}];

				for (i; i < points.length; i++) {
					// Get current Dataset
					dataset = points[i]._datasetIndex;
					// Get current serie by dataset index
					serie = scope.series[dataset];

					if (serie == 'The One') {
						theOne.x = points[i]._model.x;
						theOne.y = points[i]._model.y;
						theOne.r = points[i]._model.radius;
					}
				}

				return theOne;
			}

			function createChart() {
				//console.log('====== createChart ======');
				var howMany = 30,
					i = 0;
				$scope.series = [];
				$scope.data = [];

				injectTheOne($scope.series, $scope.data);

				$scope.series.push('Others');

				for (i; i < howMany; i++) {
					$scope.data.push([{
						x: randomScalingFactor(),
						y: randomScalingFactor(),
						r: randomRadius()
				}]);
				}
			}

			Chart.defaults.global.elements.point.hoverRadius = 0;

			$scope.options = {
				resposive: true,
				maintainAspectRatio: false,
				scales: {
					xAxes: [{
						display: false,
						ticks: {
							max: 150,
							min: -150,
							stepSize: 1
						}
				}],
					yAxes: [{
						display: false,
						ticks: {
							max: 150,
							min: -150,
							stepSize: 1
						}
				}]
				}
			};

			createChart();
			$interval(createChart, 3000);

			/****  ****/
			/*********/
			$scope.showPopup = function () {
				$scope.data = {};

				$ionicPopup.show({
					title: $scope.result.alt,
					scope: $scope,
					templateUrl: 'games/bubbles/popup.html',
					buttons: [{
						text: 'Replay',
						type: 'button-calm',
						onTap: function () {
							$scope.theOne = null;
							$state.go('canvas');
						}
					}, {
						text: 'Exit',
						type: 'button-default',
						onTap: function () {
							$scope.theOne = null;
							$state.go('bubbles');
						}
					}]
				});
			};

			var badClickCounter = 0;
			var goodClickCounter = 0;

			$scope.whoClicked = function (points, event) {
				var theOne = findTheOne(points, $scope),
					hitboxX = theOne.x || 0,
					hitboxY = theOne.y || 0,
					hitboxR = theOne.r || 0,

					hitboxMinX = hitboxX - hitboxR - 1,
					hitboxMaxX = hitboxX + hitboxR + 1,

					hitboxMinY = hitboxY - hitboxR - 1,
					hitboxMaxY = hitboxY + hitboxR + 1,

					//clickX = event.offsetX,
					//clickY = event.offsetY,

					validX = (event.offsetX >= hitboxMinX) && (event.offsetX <= hitboxMaxX),
					validY = (event.offsetY >= hitboxMinY) && (event.offsetY <= hitboxMaxY),

					valid = validX && validY;

				var bubbleResultMessages = [
					{
						alt: 'You should get a cab home.',
						img: 'img/03-drunk-bubble.jpg',
						resultID: 0
					},
					{
						alt: 'You are ready to dance.',
						img: 'img/02-medium-bubble.jpg',
						resultID: 1
					},
					{
						alt: 'You are sober!',
						img: 'img/01-sober-bubble.jpg',
						resultID: 2
					},
					{
						alt: 'You are sober!',
						img: 'img/01-sober-bubble.jpg',
						resultID: 3
					}
				];

				//console.log("Valid: x = " + validX + " and y = " + validY);
				//console.log("TheOne: (x,y,r) = (" + theOne.x + "," + theOne.y + "," + theOne.r + ")");
				//console.log("Valid: ([m < x < M] , [m < y < M]) = ([" + hitboxMinX + " < x < " + hitboxMaxX + "] , [" + hitboxMinY + " < y < " + hitboxMaxY + "])");
				//console.log("Click: (x,y) = (" + clickX + "," + clickY + ")");

				animateBackground(valid);
				clicksCounter(valid);

				var state = bubbleResultMessages[goodClickCounter];

				sendResult(state);

				var totalClicks = badClickCounter + goodClickCounter;

				$scope.$apply();

				if (totalClicks === 3) {
					resetGame();
				}
			};

			function animateBackground(valid) {
				$scope.bubblesBg = '';
				$('[view-title="Game"]').removeClass('redBg').removeClass('greenBg');
				$scope.$apply();
				if (valid) {
					$scope.bubblesBg = 'greenBg';
				} else {
					$scope.bubblesBg = 'redBg';
				}
				$scope.$apply();
			}

			function clicksCounter(valid) {
				if (valid) {
					goodClickCounter += 1;
					$scope.theOne = createTheOne();
					createChart();
					$state.reload('canvas');
				} else {
					badClickCounter += 1;
					createChart();
					$state.reload('canvas');
				}
			}

			function sendResult(state) {
				//console.log(state);
				$scope.result = state;
				//$scope.resultID = state.resultID;
				$scope.badClicks = badClickCounter;
				$scope.goodClicks = goodClickCounter;
			}

			function resetGame() {
				badClickCounter = 0;
				goodClickCounter = 0;
				$scope.badClicks = 0;
				$scope.goodClicks = 0;
				$scope.showPopup();
			}
	}]);

'use strict';

angular
	.module('drinks', ['drinks.controllers', 'drinks.services']);
'use strict';

angular.module('drinks.services', ['ionic'])

.service('DrinksService', function () {

	this.items = function () {
		return [
			{
				name: 'Beer',
				largeImg: 'img/drinks/beer_large.png',
				src: 'img/drinks/beer.png'
			}, {
				name: 'Caipirinha de Maracuyá',
				largeImg: 'img/drinks/caipi-mar_large.png',
				src: 'img/drinks/caipi-mar.png',
				sub: '<b>Caipirinha de Maracuyá ingredients are vodka, sugar, limes and maracuyá pulp.</b>'
			}, {
				name: 'Caipirinha',
				largeImg: 'img/drinks/caipirinha_large.png',
				src: 'img/drinks/caipirinha.png',
				sub: '<b>Caipirinha ingredients are cachaça, sugar and limes.</b>'
			}, {
				name: 'Caipiroska',
				largeImg: 'img/drinks/caipiroska_large.png',
				src: 'img/drinks/caipiroska.png',
				sub: '<b>Caipiroska ingredients are vodka, sugar and limes.</b>'
			}, {
				name: 'Campari',
				largeImg: 'img/drinks/campari_large.png',
				src: 'img/drinks/campari.png',
				sub: '<b>Campari ingredients are campari, sugar and orange juice.</b>'
			}, {
				name: 'Cuba Libre',
				largeImg: 'img/drinks/cubalibre_large.png',
				src: 'img/drinks/cubalibre.png',
				sub: '<b>Cuba Libre ingredients are golden rum and coke.</b>'
			}, {
				name: 'Daiquiri',
				largeImg: 'img/drinks/daiquiri_large.png',
				src: 'img/drinks/daiquiri.png',
				sub: '<b>Daikiri ingredients are rum, fruits and sugar.</b>'
			}, {
				name: 'Fernet',
				largeImg: 'img/drinks/fernet_large.png',
				src: 'img/drinks/fernet.png',
				sub: '<b>Fernet ingredients are fernet and coke.</b>'
			}, {
				name: 'Gancia',
				largeImg: 'img/drinks/gancia_large.png',
				src: 'img/drinks/gancia.png',
				sub: '<b>Gancia ingredients are gancia, sugar and lemon juice.</b>'
			}, {
				name: 'Gangster',
				largeImg: 'img/drinks/gangster_large.png',
				src: 'img/drinks/gangster.png',
				sub: '<b>Gangster ingredients are vodka, gancia and grapefruit.</b>'
			}, {
				name: 'Gintonic',
				largeImg: 'img/drinks/gintonic_large.png',
				src: 'img/drinks/gintonic.png',
				sub: '<b>Gintonic ingredients are gin, tonic and lemon.</b>'
			}, {
				name: 'Iguana',
				largeImg: 'img/drinks/iguana_large.png',
				src: 'img/drinks/iguana.png',
				sub: '<b>Piel de Iguana ingredients are vodka, lemon juice, kiwi liqueur and sprite.</b>'
			}, {
				name: 'Jager',
				largeImg: 'img/drinks/jager_large.png',
				src: 'img/drinks/jager.png',
			}, {
				name: 'Margarita',
				largeImg: 'img/drinks/margarita_large.png',
				src: 'img/drinks/margarita.png',
				sub: '<b>Margarita ingredients are tequila, lemon and cointreau.</b>'
			}, {
				name: 'Mojito',
				largeImg: 'img/drinks/mojito_large.png',
				src: 'img/drinks/mojito.png',
				sub: '<b>Mojito ingredients are rum, mint, lemon juice, sugar and soda.</b>'
			}, {
				name: 'MojitoTai',
				largeImg: 'img/drinks/mojitotai_large.png',
				src: 'img/drinks/mojitotai.png',
				sub: '<b>Mojito Tai ingredients are rum, mint, lemon juice, sugar, soda and ginger.</b>'
			}, {
				name: 'Screwdriver',
				largeImg: 'img/drinks/screwdriver_large.png',
				src: 'img/drinks/screwdriver.png',
				sub: '<b>Screwdriver ingredients are vodka and orange juice.</b>'
			}, {
				name: 'SexOnTheBeach',
				largeImg: 'img/drinks/sex_large.png',
				src: 'img/drinks/sex.png',
				sub: '<b>Sex on the beach ingredients are vodka, orange juice, peach liqueur and grenadine</b>'
			}, {
				name: 'Tequila',
				largeImg: 'img/drinks/tequila_large.png',
				src: 'img/drinks/tequila.png',
			}, {
				name: 'Tom',
				largeImg: 'img/drinks/tom_large.png',
				src: 'img/drinks/tom.png',
				sub: '<b>Tom Collins ingredients are gin, soda and lemon juice.</b>'
			}, {
				name: 'VodkaTonic',
				largeImg: 'img/drinks/vodkatonic_large.png',
				src: 'img/drinks/vodkatonic.png',
				sub: '<b>Vodka Tonic ingredients are vodka and tonic.</b>'
			}, {
				name: 'Whiscola',
				largeImg: 'img/drinks/whiscola_large.png',
				src: 'img/drinks/whiscola.png',
				sub: '<b>Whiscola ingredients are whisky and coke.</b>'
			}
		];
	};

	this.random = function () {
		var randomNumber = Math.floor((Math.random() * 22));
		return this.items()[randomNumber];
	};

})

.service('Modals', ['$ionicModal',
					function ($ionicModal) {
		var modals = [];

		this.openModal = function (scope) {
			$ionicModal.fromTemplateUrl('randomDrinkModal.html', {
				scope: scope,
				animation: 'slide-in-up'
			}).then(function (modal) {
				modals[modals.push(modal) - 1].show();
			});
		};
		this.closeModal = function () {
			for (var i = modals.length; i > 0; i--) {
				modals[i - 1].hide();
				modals[i - 1].remove();
			}
			modals = [];
		};
}]);

//.service('ModalService', function ($ionicModal) {
//
//	this.openModal = function (scope) {
//		var _this = this;
//
//		$ionicModal.fromTemplateUrl('randomDrinkModal.html', {
//			scope: scope,
//			animation: 'slide-in-up'
//		}).then(function (modal) {
//			_this.modal = modal;
//			_this.modal.show();
//		});
//	};
//
//	this.closeModal = function () {
//		var _this = this;
//		if (!_this.modal) return;
//		_this.modal.hide();
//		_this.modal.remove();
//	};
//
//});

'use strict';

angular.module('drinks.controllers', ['ionic', 'ngCordova'])

.controller('drinksCtrl', ['$scope', '$state', '$ionicModal', '$cordovaVibration', 'DrinksService', 'Modals',
						   function ($scope, $state, $ionicModal, $cordovaVibration, DrinksService, Modals) {
		$scope.items = DrinksService.items();
		$scope.closeModal = Modals.closeModal;

		var onShake = function () {
			$scope.randomDrink = DrinksService.random();
			//send selected drink object yo the scope
			//$scope.randomDrink = $scope.items[randomNumber];
			//open modal
			$cordovaVibration.vibrate(300);
			Modals.openModal($scope);
		};

		var onError = function () {
			console.log('Shake error');
			Modals.closeModal();
		};

		// Start watching for shake gestures and call "onShake"
		// with a shake sensitivity of 40 (optional, default 30)
		if (window.shake) {
			shake.startWatch(onShake, 40, onError);
		}
}]);
'use strict';

angular
	.module('firebase', ['firebase.services']);
'use strict';

angular
	.module('firebase.services', []);

angular
	.module('firebase.services')

.factory('FirebaseDB', ['$q', '$state', '$timeout', '$rootScope', function ($q, $state, $timeout, $rootScope) {

	var instance, storageInstance = null;
	var initialized = false;

	/**
	 * A rudimentary debounce method
	 * @param {function} fn the function to debounce
	 * @param {object} [ctx] the `this` context to set in fn
	 * @param {int} wait number of milliseconds to pause before sending out after each invocation
	 * @param {int} [maxWait] max milliseconds to wait before sending out, defaults to wait * 10 or 100
	 */
	function debounce(fn, ctx, wait, maxWait) {
		var start, cancelTimer, args, runScheduledForNextTick;

		function _compile(fn) {
			return $rootScope.$evalAsync(fn || function () {});
		}

		function _wait(fn, wait) {
			var to = $timeout(fn, wait || 0);
			return function () {
				if (to) {
					$timeout.cancel(to);
					to = null;
				}
			};
		}

		if (typeof (ctx) === 'number') {
			maxWait = wait;
			wait = ctx;
			ctx = null;
		}

		if (typeof wait !== 'number') {
			throw new Error('Must provide a valid integer for wait. Try 0 for a default');
		}
		if (typeof (fn) !== 'function') {
			throw new Error('Must provide a valid function to debounce');
		}
		if (!maxWait) {
			maxWait = wait * 10 || 100;
		}

		// clears the current wait timer and creates a new one
		// however, if maxWait is exceeded, calls runNow() on the next tick.
		function resetTimer() {
			if (cancelTimer) {
				cancelTimer();
				cancelTimer = null;
			}
			if (start && Date.now() - start > maxWait) {
				if (!runScheduledForNextTick) {
					runScheduledForNextTick = true;
					_compile(runNow);
				}
			} else {
				if (!start) {
					start = Date.now();
				}
				cancelTimer = _wait(runNow, wait);
			}
		}

		// Clears the queue and invokes the debounced function with the most recent arguments
		function runNow() {
			cancelTimer = null;
			start = null;
			runScheduledForNextTick = false;
			fn.apply(ctx, args);
		}

		function debounced() {
			args = Array.prototype.slice.call(arguments, 0);
			resetTimer();
		}
		debounced.running = function () {
			return start > 0;
		};

		return debounced;
	};

	return {
		initialize: function () {

			var config = {
				apiKey: "AIzaSyBtMjHS55_1HtnAF4dBeVIg_lY7yw8ttY4",
				authDomain: "cognifest-b13f9.firebaseapp.com",
				databaseURL: "https://cognifest-b13f9.firebaseio.com",
				storageBucket: "cognifest-b13f9.appspot.com",
				messagingSenderId: "57670734851"
			};

			// initialize database and storage
			instance = firebase.initializeApp(config);
			storageInstance = firebase.storage();

			if (instance && storageInstance)
				initialized = true;

			return $q(function (resolve, reject) {
				return initialized ? resolve(true) : reject("NotInit");
			});
		},
		/**
		 * return database instance
		 */
		database: function () {
			return instance.database();
		},
		/**
		 * return storage instance
		 */
		storage: function () {
			return storageInstance;
		},
		isAuthenticated: function () {
			return $q(function (resolve, reject) {
				return firebase.auth().currentUser ? resolve(true) : reject("NotAuth");
			});
		},
		/**************************/
		/*  Authentication State  */
		/**************************/
		/**
		 * Asynchronously fires the provided callback with the current authentication data every time
		 * the authentication data changes. It also fires as soon as the authentication data is
		 * retrieved from the server.
		 *
		 * @param {function} callback A callback that fires when the client's authenticate state
		 * changes. If authenticated, the callback will be passed an object containing authentication
		 * data according to the provider used to authenticate. Otherwise, it will be passed null.
		 * @param {string} [context] If provided, this object will be used as this when calling your
		 * callback.
		 * @return {Promise<Function>} A promised fulfilled with a function which can be used to
		 * deregister the provided callback.
		 */
		onAuthStateChanged: function (callback, context) {
			var fn = debounce(callback, context, 0);
			var off = firebase.auth().onAuthStateChanged(fn);

			// Return a method to detach the `onAuthStateChanged()` callback.
			return off;
		},
		/**
		 * return the currentUser object
		 */
		currentUser: function () {
			//debugger;
			return firebase.auth().currentUser;
		},
		/**
		 * @param  {any} _credentials
		 */
		login: function (_credentials) {
			return firebase.auth()
				.signInWithEmailAndPassword(_credentials.email, _credentials.password)
				.then(function (authData) {
					currentUser = authData;
					return authData;
				});
		},
		/**
		 * @param  {any} _credentials
		 */
		createUser: function (_credentials) {
			return firebase.auth()
				.createUserWithEmailAndPassword(_credentials.email, _credentials.password)
				.then(function (authData) {
					currentUser = authData;
					return authData;
				}).then(function (authData) {
					console.log("Saving user data", authData);
					// add the user to a seperate list
					var ref = instance.database().ref('CogniFest/users');
					return ref.child(authData.uid).set({
						"provider": authData.providerData[0],
						"displayName": _credentials.displayName,
						"termsAccepted": true
					});
				});
		}
	}
}]);

