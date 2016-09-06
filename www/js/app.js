// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module exe (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

// Initialize Firebase
/*var config = {
    apiKey: "AIzaSyDZIu415zgIsM1K6g25lsTEMLAjdxmsMe4",
    authDomain: "cognizantfest.firebaseapp.com",
    databaseURL: "https://cognizantfest.firebaseio.com",
    storageBucket: "cognizantfest.appspot.com",
  };

firebase.initializeApp(config);
firebase.auth().signInAnonymously().catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

var ref = firebase.database().ref("gallery/items");*/

///////////////////////////////////////////////////////////

angular.module('app', ['ionic', 'ngCordova', 'ngResource', 'ngCordovaOauth', 'ngTwitter', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'ion-gallery'])
//'firebase'

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