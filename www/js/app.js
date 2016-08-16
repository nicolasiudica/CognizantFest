// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module exe (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'spotify','satellizer'])


.config(function (SpotifyProvider) {
  SpotifyProvider.setClientId('7ba63848e95343078565450edf3cda08');
  SpotifyProvider.setRedirectUri('https://oauth.io/auth');
  SpotifyProvider.setScope('playlist-read-private');

})


.config(function($authProvider) {
  var commonConfig = {
    popupOptions: {
      location: 'no',
      toolbar: 'yes',
      width: window.screen.width,
      height: window.screen.height
    }
  };
  $authProvider.spotify({
     clientId: '7ba63848e95343078565450edf3cda08',
     redirectUri: 'https://oauth.io/auth'
   });

   $authProvider.google(angular.extend({}, commonConfig, {
     clientId: '670295000649-nh0fhbhe4kb31qbvf4a3sel04sa75g57.apps.googleusercontent.com',
     redirectUri: 'https://oauth.io/auth',
     scope: ['profile', 'email']
   }));

})

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
