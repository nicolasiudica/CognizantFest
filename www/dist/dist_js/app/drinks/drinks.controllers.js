'use strict';

angular.module('drinks.controllers', ['ionic', 'ngCordova'])

.controller('drinksCtrl', ['$scope', '$state', '$ionicModal', '$cordovaVibration', 'DrinksService', 'Modals',
						   function ($scope, $state, $ionicModal, $cordovaVibration, DrinksService, Modals) {
		$scope.items = DrinksService.items();
		$scope.closeModal = Modals.closeModal;

		var onShake = function () {
			$scope.randomDrink = DrinksService.random();
			//send selected drink object yo the scope
			//$scope.randomDrink = $scope.items[randomNumber];
			//open modal
			$cordovaVibration.vibrate(300);
			Modals.openModal($scope);
		};

		var onError = function () {
			console.log('Shake error');
			Modals.closeModal();
		};

		// Start watching for shake gestures and call "onShake"
		// with a shake sensitivity of 40 (optional, default 30)
		if (window.shake) {
			shake.startWatch(onShake, 40, onError);
		}
}]);