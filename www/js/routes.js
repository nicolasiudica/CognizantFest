angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

  .state('menu.home', {
    url: '/index',
    views: {
      'cognifest': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('menu.games', {
    url: '/games',
    views: {
      'cognifest': {
        templateUrl: 'templates/games.html',
        controller: 'gamesCtrl'
      }
    }
  })

  //bubbles game stand alone view without main app UI
  .state('bubbles', {
    url: '/bubbles',
    templateUrl: 'templates/games/bubbles/welcome.html',
    controller: 'WelcomeCtrl'
  })

  .state('canvas', {
    url: '/bubbles/playbubbles',
    templateUrl: 'templates/games/bubbles/bubbles.html',
    controller: 'BubbleCtrl'
  })

  .state('menu.drinks', {
    url: '/drinks',
    views: {
      'cognifest': {
        templateUrl: 'templates/drinks.html',
        controller: 'drinksCtrl'
      }
    }
  })

  .state('menu', {
    url: '/cognifest',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

  .state('menu.cameraPhotos', {
    url: '/camera',
    views: {
      'cognifest': {
    templateUrl: 'templates/cameraPhotos.html',
    controller: 'cameraPhotosCtrl'
      }
    }
  })

  .state('menu.playList', {
    url: '/playlist',
    views: {
      'cognifest': {
    templateUrl: 'templates/playList.html',
    controller: 'playListCtrl'
      }
    }
  })

  .state('menu.map', {
    url: '/map',
     views: {
      'cognifest': {
      templateUrl: 'templates/map.html',
      controller: 'mapCtrl'
      }
    }
  })

  .state('signup', {
    url: '/page4',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

$urlRouterProvider.otherwise('/cognifest/index')

});