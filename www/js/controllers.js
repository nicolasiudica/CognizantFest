angular.module('app.controllers', [])
	
.controller('homeCtrl', function($scope, $state) {
	
})
	 
.controller('gamesCtrl', function($scope, $state) {

})
	 
.controller('drinksCtrl', function($scope, $state) {

	  $scope.items = [{
    src: 'img/cerveza.jpg'
  }, {
    src: 'img/daikiri.jpg',
    sub: '<b>Daikiri ingredients are rum, strawberry and sugar.</b>'
  }, {
    src: 'img/fernet.jpg'
  }, {
    src: 'img/gintonic.jpg'
  }, {
  	src: 'img/cubalibre.jpg'
  }, {
  	src: 'img/destornillador.jpg'
  }, {
  	src: 'img/margarita.jpg'
  }, {
  	src: 'img/martini.jpg'
  }, {
    src: 'img/tequilaSunrise.jpg'
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
