'use strict';

angular
	.module('drinks.controller')
	.controller('drinksCtrl', function($scope, $state, $ionicModal, $cordovaVibration) {

	$scope.items = [
		{
			name: 'Beer',
			largeImg: 'img/beer_large.png',
			src: 'img/beer.png',
			sub: '<b>Daikiri ingredients are rum, strawberry and sugar.</b>'
	  	}, 
		{
			name: 'Cuba Libre',
			largeImg: 'img/cubalibre_large.png',
			src: 'img/cubalibre.png',
			sub: '<b>Daikiri ingredients are rum, strawberry and sugar.</b>'
	  	}, 
		{
			name: 'Fernet',
			largeImg: 'img/fernet_large.png',
			src: 'img/fernet.png',
			sub: '<b>Daikiri ingredients are rum, strawberry and sugar.</b>'
	  	}, 
		{
			name: 'Gintonic',
			largeImg: 'img/gintonic_large.png',
			src: 'img/gintonic.png',
			sub: '<b>Daikiri ingredients are rum, strawberry and sugar.</b>'
	  	}, 
		{
			name: 'Daiquiri',
			largeImg: 'img/daiquiri_large.png',
			src: 'img/daiquiri.png',
			sub: '<b>Daikiri ingredients are rum, strawberry and sugar.</b>'
	  	}, 
		{
			name: 'Screwdriver',
			largeImg: 'img/screwdriver_large.png',
			src: 'img/screwdriver.png',
			sub: '<b>Daikiri ingredients are rum, strawberry and sugar.</b>'
	  	}, 
		{
			name: 'Margarita',
			largeImg: 'img/margarita_large.png',
			src: 'img/margarita.png',
			sub: '<b>Daikiri ingredients are rum, strawberry and sugar.</b>'
	  	}, 
		{
			name: '',
			largeImg: '',
			src: '',
			sub: ''
	  	}
	];

	$ionicModal.fromTemplateUrl('templates/randomDrinkModal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal){
		$scope.modal = modal;
	});
		$scope.closeModal = function(){
			$scope.modal.hide();
		//console.log('escondiendo la modal');
	};

	var onShake = function () {
  		var randomNumber = Math.floor((Math.random() * 7));
  		//send selected drink object yo the scope
		$scope.randomDrink = $scope.items[randomNumber];
		//open modal
		$cordovaVibration.vibrate(300);
		$scope.modal.show();
	};

	var onError = function () {
 		alert('error');
  		// Fired when there is an accelerometer error (optional)
	};

	// Start watching for shake gestures and call "onShake"
	// with a shake sensitivity of 40 (optional, default 30)
	if(window.shake) {
		shake.startWatch(onShake, 40 , onError);
	}

})