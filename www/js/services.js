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
			}
		}
	}

}])

.service('UserService', function() {
    //for the purpose of this example I will store user data on ionic local storage but you should save it on a database
    var setUser = function(user_data) {
        window.localStorage.starter_facebook_user = JSON.stringify(user_data);
    };

    var getUser = function(){
        return JSON.parse(window.localStorage.starter_facebook_user || '{}');
    };

    return {
        getUser: getUser,
        setUser: setUser
    };
})

.service('BlankService', [function(){

}]);

