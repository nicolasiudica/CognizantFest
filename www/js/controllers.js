angular.module('app.controllers', [])
	
.controller('homeCtrl', function($scope, $state) {
	
})
	 
.controller('gamesCtrl', function($scope, $state) {

})
	 
.controller('drinksCtrl', function($scope, $state) {

	$scope.items = [
  {
    src: 'img/beer.png',
    sub: '<b>Daikiri ingredients are rum, strawberry and sugar.</b>'
  }, 
  {
    src: 'img/cubalibre.png',
    sub: '<b>Daikiri ingredients are rum, strawberry and sugar.</b>'
  }, 
  {
    src: 'img/fernet.png',
    sub: '<b>Daikiri ingredients are rum, strawberry and sugar.</b>'
  }, 
  {
    src: 'img/gintonic.png',
    sub: '<b>Daikiri ingredients are rum, strawberry and sugar.</b>'
  }, 
  {
    src: 'img/daikiri.png',
    sub: '<b>Daikiri ingredients are rum, strawberry and sugar.</b>'
  }, 
  {
    src: 'img/screwdriver.png',
    sub: '<b>Daikiri ingredients are rum, strawberry and sugar.</b>'
  }, 
  {
    src: 'img/margarita.png',
    sub: '<b>Daikiri ingredients are rum, strawberry and sugar.</b>'
  }];

})
			
.controller('signupCtrl', function($scope, $state) {

})
	 
.controller('playListCtrl', function($scope, $state) {

})
	 
.controller('mapCtrl', function($scope,$state,$cordovaGeolocation) {

})
	 
.controller('cameraPhotosCtrl', function($scope) {

})
