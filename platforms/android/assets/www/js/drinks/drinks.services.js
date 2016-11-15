'use strict';

angular.module('drinks.services', ['ionic'])

.service('DrinksService', function () {

	this.items = function () {
		return [
			{
				name: 'Beer',
				largeImg: 'img/drinks/beer_large.png',
				src: 'img/drinks/beer.png'
			}, {
				name: 'Caipirinha de Maracuyá',
				largeImg: 'img/drinks/caipi-mar_large.png',
				src: 'img/drinks/caipi-mar.png',
				sub: '<b>Caipirinha de Maracuyá ingredients are vodka, sugar, limes and maracuyá pulp.</b>'
			}, {
				name: 'Caipirinha',
				largeImg: 'img/drinks/caipirinha_large.png',
				src: 'img/drinks/caipirinha.png',
				sub: '<b>Caipirinha ingredients are cachaça, sugar and limes.</b>'
			}, {
				name: 'Caipiroska',
				largeImg: 'img/drinks/caipiroska_large.png',
				src: 'img/drinks/caipiroska.png',
				sub: '<b>Caipiroska ingredients are vodka, sugar and limes.</b>'
			}, {
				name: 'Campari',
				largeImg: 'img/drinks/campari_large.png',
				src: 'img/drinks/campari.png',
				sub: '<b>Campari ingredients are campari, sugar and orange juice.</b>'
			}, {
				name: 'Cuba Libre',
				largeImg: 'img/drinks/cubalibre_large.png',
				src: 'img/drinks/cubalibre.png',
				sub: '<b>Cuba Libre ingredients are golden rum and coke.</b>'
			}, {
				name: 'Daiquiri',
				largeImg: 'img/drinks/daiquiri_large.png',
				src: 'img/drinks/daiquiri.png',
				sub: '<b>Daikiri ingredients are rum, fruits and sugar.</b>'
			}, {
				name: 'Fernet',
				largeImg: 'img/drinks/fernet_large.png',
				src: 'img/drinks/fernet.png',
				sub: '<b>Fernet ingredients are fernet and coke.</b>'
			}, {
				name: 'Gancia',
				largeImg: 'img/drinks/gancia_large.png',
				src: 'img/drinks/gancia.png',
				sub: '<b>Gancia ingredients are gancia, sugar and lemon juice.</b>'
			}, {
				name: 'Gangster',
				largeImg: 'img/drinks/gangster_large.png',
				src: 'img/drinks/gangster.png',
				sub: '<b>Gangster ingredients are vodka, gancia and grapefruit.</b>'
			}, {
				name: 'Gintonic',
				largeImg: 'img/drinks/gintonic_large.png',
				src: 'img/drinks/gintonic.png',
				sub: '<b>Gintonic ingredients are gin, tonic and lemon.</b>'
			}, {
				name: 'Iguana',
				largeImg: 'img/drinks/iguana_large.png',
				src: 'img/drinks/iguana.png',
				sub: '<b>Piel de Iguana ingredients are vodka, lemon juice, kiwi liqueur and sprite.</b>'
			}, {
				name: 'Jager',
				largeImg: 'img/drinks/jager_large.png',
				src: 'img/drinks/jager.png',
			}, {
				name: 'Margarita',
				largeImg: 'img/drinks/margarita_large.png',
				src: 'img/drinks/margarita.png',
				sub: '<b>Margarita ingredients are tequila, lemon and cointreau.</b>'
			}, {
				name: 'Mojito',
				largeImg: 'img/drinks/mojito_large.png',
				src: 'img/drinks/mojito.png',
				sub: '<b>Mojito ingredients are rum, mint, lemon juice, sugar and soda.</b>'
			}, {
				name: 'MojitoTai',
				largeImg: 'img/drinks/mojitotai_large.png',
				src: 'img/drinks/mojitotai.png',
				sub: '<b>Mojito Tai ingredients are rum, mint, lemon juice, sugar, soda and ginger.</b>'
			}, {
				name: 'Screwdriver',
				largeImg: 'img/drinks/screwdriver_large.png',
				src: 'img/drinks/screwdriver.png',
				sub: '<b>Screwdriver ingredients are vodka and orange juice.</b>'
			}, {
				name: 'SexOnTheBeach',
				largeImg: 'img/drinks/sex_large.png',
				src: 'img/drinks/sex.png',
				sub: '<b>Sex on the beach ingredients are vodka, orange juice, peach liqueur and grenadine</b>'
			}, {
				name: 'Tequila',
				largeImg: 'img/drinks/tequila_large.png',
				src: 'img/drinks/tequila.png',
			}, {
				name: 'Tom',
				largeImg: 'img/drinks/tom_large.png',
				src: 'img/drinks/tom.png',
				sub: '<b>Tom Collins ingredients are gin, soda and lemon juice.</b>'
			}, {
				name: 'VodkaTonic',
				largeImg: 'img/drinks/vodkatonic_large.png',
				src: 'img/drinks/vodkatonic.png',
				sub: '<b>Vodka Tonic ingredients are vodka and tonic.</b>'
			}, {
				name: 'Whiscola',
				largeImg: 'img/drinks/whiscola_large.png',
				src: 'img/drinks/whiscola.png',
				sub: '<b>Whiscola ingredients are whisky and coke.</b>'
			}
		];
	};

	this.random = function () {
		var randomNumber = Math.floor((Math.random() * 22));
		return this.items()[randomNumber];
	};

})

.service('Modals', ['$ionicModal',
					function ($ionicModal) {
		var modals = [];

		this.openModal = function (scope) {
			$ionicModal.fromTemplateUrl('templates/randomDrinkModal.html', {
				scope: scope,
				animation: 'slide-in-up'
			}).then(function (modal) {
				modals[modals.push(modal) - 1].show();
			});
		};
		this.closeModal = function () {
			for (var i = modals.length; i > 0; i--) {
				modals[i - 1].hide();
				modals[i - 1].remove();
			}
			modals = [];
		};
}]);

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