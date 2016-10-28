'use strict';

angular.module('drinks.controllers', ['ionic', 'ngCordova'])

.controller('drinksCtrl', function ($scope, $state, $ionicModal, $cordovaVibration, DrinksService) {

	$scope.items = DrinksService.items();


	$scope.closeModal = function () {
		$scope.modal.hide();
		//console.log('escondiendo la modal');
	};

	var onShake = function () {
		$scope.modal.hide();
		$scope.randomDrink = DrinksService.random();
		//send selected drink object yo the scope
		//$scope.randomDrink = $scope.items[randomNumber];
		//open modal
		$cordovaVibration.vibrate(300);
		$scope.modal.show();
	};

	var onError = function () {
		alert('error');
		// Fired when there is an accelerometer error (optional)
	};

	$ionicModal.fromTemplateUrl('templates/randomDrinkModal.html', function ($ionicModal) {
		$scope.modal = $ionicModal;
	}, {
		// Use our scope for the scope of the modal to keep it simple
		scope: $scope,
		// The animation we want to use for the modal entrance
		animation: 'slide-in-up'
	});

	// Start watching for shake gestures and call "onShake"
	// with a shake sensitivity of 40 (optional, default 30)
	if (window.shake) {
		shake.startWatch(onShake, 40, onError);
	}

});