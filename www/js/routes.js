angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
    
    .state('menu', {
        url: '/menu',
        templateUrl: 'templates/menu.html',
        abstract: true
    })
    
    .state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'LoginCtrl'        
    })

    .state('menu.logged', {
        url: '/logged',
        views: {
            'menu': {
                templateUrl: 'templates/logged.html',
                controller: 'LoggedCtrl'
            }
        }
    })
    
    .state('menu.games', {
        url: '/games',
        views: {
            'menu': {
                templateUrl: 'templates/games.html',
                controller: 'gamesCtrl'
          }
        }
    })

    .state('menu.drinks', {
        url: '/drinks',
        views: {
            'menu': {
                templateUrl: 'templates/drinks.html',
                controller: 'drinksCtrl'
          }
        }
    })

    .state('menu.cameraPhotos', {
        url: '/camera',
        views: {
            'menu': {
                templateUrl: 'templates/cameraPhotos.html',
                controller: 'cameraPhotosCtrl'
            }
        }
     });

    $urlRouterProvider.otherwise('/signup')
})
