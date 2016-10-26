// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

// Initialize Firebase
var config = {
	apiKey: "AIzaSyAg3pKHvhfXu1xps06opGqcO05v5yfRS2E",
	authDomain: "cognifest-b13f9.firebaseapp.com",
	databaseURL: "https://cognifest-b13f9.firebaseio.com",
	storageBucket: "cognifest-b13f9.appspot.com",
	messagingSenderId: "57670734851"
};
firebase.initializeApp(config);
firebase.auth().signInAnonymously().catch(function(error) {
	// Handle Errors here.
	var errorCode = error.code;
	var errorMessage = error.message;
	// ...
});

var ref = firebase.database().ref("/photo");


angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'ion-gallery', 'bubbles'])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
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
})