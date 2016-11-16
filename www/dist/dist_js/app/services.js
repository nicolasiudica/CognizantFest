"use strict";

angular.module('app.services', ['ngCordova'])

// Days countdown to the party
.service('DaysLeftCounter', function () {

	var partyDate = new Date(2016, 10, 25, 21, 0, 0);
	var daysLeft = getTimeRemaining(partyDate);

	function getTimeRemaining(date) {
		var t = Date.parse(date) - Date.parse(new Date());
		return {
			'total': t,
			'days': Math.floor(t / (1000 * 60 * 60 * 24)),
			'hours': Math.floor((t / (1000 * 60 * 60)) % 24),
			'minutes': Math.floor((t / 1000 / 60) % 60),
			'seconds': Math.floor((t / 1000) % 60)
		};
	}

	function getHTMLMessage(date) {
		var t = getTimeRemaining(date);
		var html;

		if (t.days > 1) {
			html = t.days + ' days left';
		} else {
			if (t.hours > 1) {
				html = t.hours + ' hours left';
			} else {
				if (t.minutes > 1) {
					html = t.minutes + ' minutes left';
				} else {
					if (t.seconds > 0) {
						html = t.seconds + ' seconds left';
					} else {
						html = "Party has started! Start taking photos!";
					}
				}
			}
		}

		return html;
	}

	return {
		daysLeft: function () {
			return daysLeft;
		},
		partyDay: function () {
			return partyDate;
		},
		toString: function () {
			return getHTMLMessage(partyDate);
		}
	};

//	this.day = function () {
//
//		var today = new Date();
//		var PartyDay = new Date("November 25, 2016");
//
//		// Milisegundos en un dia
//		const msDay = 24 * 60 * 60 * 1000;
//		// Tiempo en milisegundos que falatan para la fiesta
//		var timeLeft = (PartyDay.getTime() - today.getTime());
//		var daysLeft = Math.floor(timeLeft / msDay);
//
//		return {
//			daysLeft: function () {
//				return daysLeft;
//			},
//			partyDay: function () {
//				return PartyDay;
//			},
//			now: function () {
//				return today.getTime();
//			}
//		};
//	};
})

.service('BlankService', [function () {

}]);
