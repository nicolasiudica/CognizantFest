'use strict';

angular.module('drinks.services', [])

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

});