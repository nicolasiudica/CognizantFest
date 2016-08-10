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
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('menu.games', {
    url: '/games',
    views: {
      'side-menu21': {
        templateUrl: 'templates/games.html',
        controller: 'gamesCtrl'
      }
    }
  })

  .state('menu.drinks', {
    url: '/drinks',
    views: {
      'side-menu21': {
        templateUrl: 'templates/drinks.html',
        controller: 'drinksCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

  .state('signup', {
    url: '/page4',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('menu.playlist', {
    url: '/playlist',
    views: {
      'side-menu21': {
        templateUrl: 'templates/playlist.html',
        controller: 'playListCtrl'
      }
    }
  })

  .state('menu.map', {
    url: '/map',
    views: {
        'side-menu21': {
        templateUrl: 'templates/map.html',
        controller: 'mapCtrl'
      }
    }
  })

  .state('menu.cameraPhotos', {
    url: '/camera',
    views: {
        'side-menu21': {
        templateUrl: 'templates/cameraPhotos.html',
        controller: 'cameraPhotosCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/side-menu21/index')

<<<<<<< HEAD


});
=======
});
>>>>>>> ac26837cd0618f553075cfe2627a2b3d9e8c35e3
