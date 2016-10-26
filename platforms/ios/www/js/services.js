angular.module('app.services', ['ngCordova'])

// Days countdown to the party
.service('DaysLeftCounter', [function(){

	this.day = function(){

		var today = new Date();
		var PartyDay = new Date("November 10, 2016");

		// Milisegundos en un dia
		const msDay = 24 * 60 * 60 * 1000;
		// Tiempo en milisegundos que falatan para la fiesta
		var timeLeft = (PartyDay.getTime() - today.getTime());
		var daysLeft = Math.floor(timeLeft / msDay);

		return {
			daysLeft: function() {
			  return daysLeft;
			},
			partyDay: function() {
				return PartyDay;
			},
			now: function() {
				return today.getTime();
			}
		}
	}

}])

.service('RandomImage', function() {

    this.items = function() {

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
	  	}, 
		{
			name: '',
			largeImg: '',
			src: '',
			sub: ''
	  	}
	]};

})

.service('BlankService', [function(){

}]);

