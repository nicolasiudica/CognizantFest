'use strict';

angular
	.module('firebase.services', []);

angular
	.module('firebase.services')

.factory('FirebaseDB', ['$q', '$state', '$timeout', '$rootScope', function ($q, $state, $timeout, $rootScope) {

	var instance, storageInstance = null;
	var initialized = false;

	/**
	 * A rudimentary debounce method
	 * @param {function} fn the function to debounce
	 * @param {object} [ctx] the `this` context to set in fn
	 * @param {int} wait number of milliseconds to pause before sending out after each invocation
	 * @param {int} [maxWait] max milliseconds to wait before sending out, defaults to wait * 10 or 100
	 */
	function debounce(fn, ctx, wait, maxWait) {
		var start, cancelTimer, args, runScheduledForNextTick;

		function _compile(fn) {
			return $rootScope.$evalAsync(fn || function () {});
		}

		function _wait(fn, wait) {
			var to = $timeout(fn, wait || 0);
			return function () {
				if (to) {
					$timeout.cancel(to);
					to = null;
				}
			};
		}

		if (typeof (ctx) === 'number') {
			maxWait = wait;
			wait = ctx;
			ctx = null;
		}

		if (typeof wait !== 'number') {
			throw new Error('Must provide a valid integer for wait. Try 0 for a default');
		}
		if (typeof (fn) !== 'function') {
			throw new Error('Must provide a valid function to debounce');
		}
		if (!maxWait) {
			maxWait = wait * 10 || 100;
		}

		// clears the current wait timer and creates a new one
		// however, if maxWait is exceeded, calls runNow() on the next tick.
		function resetTimer() {
			if (cancelTimer) {
				cancelTimer();
				cancelTimer = null;
			}
			if (start && Date.now() - start > maxWait) {
				if (!runScheduledForNextTick) {
					runScheduledForNextTick = true;
					_compile(runNow);
				}
			} else {
				if (!start) {
					start = Date.now();
				}
				cancelTimer = _wait(runNow, wait);
			}
		}

		// Clears the queue and invokes the debounced function with the most recent arguments
		function runNow() {
			cancelTimer = null;
			start = null;
			runScheduledForNextTick = false;
			fn.apply(ctx, args);
		}

		function debounced() {
			args = Array.prototype.slice.call(arguments, 0);
			resetTimer();
		}
		debounced.running = function () {
			return start > 0;
		};

		return debounced;
	};

	return {
		initialize: function () {

			var config = {
				apiKey: "AIzaSyBtMjHS55_1HtnAF4dBeVIg_lY7yw8ttY4",
				authDomain: "cognifest-b13f9.firebaseapp.com",
				databaseURL: "https://cognifest-b13f9.firebaseio.com",
				storageBucket: "cognifest-b13f9.appspot.com",
				messagingSenderId: "57670734851"
			};

			// initialize database and storage
			instance = firebase.initializeApp(config);
			storageInstance = firebase.storage();

			if (instance && storageInstance)
				initialized = true;

			return $q(function (resolve, reject) {
				return initialized ? resolve(true) : reject("NotInit");
			});
		},
		/**
		 * return database instance
		 */
		database: function () {
			return instance.database();
		},
		/**
		 * return storage instance
		 */
		storage: function () {
			return storageInstance;
		},
		isAuthenticated: function () {
			return $q(function (resolve, reject) {
				return firebase.auth().currentUser ? resolve(true) : reject("NotAuth");
			});
		},
		/**************************/
		/*  Authentication State  */
		/**************************/
		/**
		 * Asynchronously fires the provided callback with the current authentication data every time
		 * the authentication data changes. It also fires as soon as the authentication data is
		 * retrieved from the server.
		 *
		 * @param {function} callback A callback that fires when the client's authenticate state
		 * changes. If authenticated, the callback will be passed an object containing authentication
		 * data according to the provider used to authenticate. Otherwise, it will be passed null.
		 * @param {string} [context] If provided, this object will be used as this when calling your
		 * callback.
		 * @return {Promise<Function>} A promised fulfilled with a function which can be used to
		 * deregister the provided callback.
		 */
		onAuthStateChanged: function (callback, context) {
			var fn = debounce(callback, context, 0);
			var off = firebase.auth().onAuthStateChanged(fn);

			// Return a method to detach the `onAuthStateChanged()` callback.
			return off;
		},
		/**
		 * return the currentUser object
		 */
		currentUser: function () {
			//debugger;
			return firebase.auth().currentUser;
		},
		/**
		 * @param  {any} _credentials
		 */
		login: function (_credentials) {
			return firebase.auth()
				.signInWithEmailAndPassword(_credentials.email, _credentials.password)
				.then(function (authData) {
					currentUser = authData;
					return authData;
				});
		},
		/**
		 * @param  {any} _credentials
		 */
		createUser: function (_credentials) {
			return firebase.auth()
				.createUserWithEmailAndPassword(_credentials.email, _credentials.password)
				.then(function (authData) {
					currentUser = authData;
					return authData;
				}).then(function (authData) {
					// add the user to a seperate list
					var ref = instance.database().ref('CogniFest/users');
					return ref.child(authData.uid).set({
						"provider": authData.providerData[0],
						"displayName": _credentials.displayName
					});
				});
		}
	}
}]);
