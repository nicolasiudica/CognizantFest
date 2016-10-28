'use strict';

angular.module('drinks.services', ['ionic'])

.service('DrinksService', function () {

	this.items = function () {
		return [
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
				}
			];
	};

	this.random = function () {
		var randomNumber = Math.floor((Math.random() * 7));
		return this.items()[randomNumber];
	}

})

.factory('Modals', function ($ionicModal) {
	var modals = [];

	return {
		openModal: function (scope) {
			$ionicModal.fromTemplateUrl('templates/randomDrinkModal.html', {
				scope: scope,
				animation: 'slide-in-up'
			}).then(function (modal) {
				modals[modals.push(modal) - 1].show();
			});
		},
		closeModal: function () {
			var modal = this.modals.pop();
			modal.hide();
			modal.remove();
		}
	}
});

//.service('ModalService', function ($ionicModal) {
//
//	this.openModal = function (scope) {
//		var _this = this;
//
//		$ionicModal.fromTemplateUrl('templates/randomDrinkModal.html', {
//			scope: scope,
//			animation: 'slide-in-up'
//		}).then(function (modal) {
//			_this.modal = modal;
//			_this.modal.show();
//		});
//	};
//
//	this.closeModal = function () {
//		var _this = this;
//		if (!_this.modal) return;
//		_this.modal.hide();
//		_this.modal.remove();
//	};
//
//});