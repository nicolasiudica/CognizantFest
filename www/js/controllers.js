angular
	.module('app.controllers', [])

.controller('loginCtrl', ['$scope', '$state', '$timeout', 'FirebaseDB',
						  function LoginCtrl($scope, $state, $timeout, FirebaseDB) {
		console.log("Login Controller");

		function createCredentials(_credentials) {

			String.prototype.capitalizeFirstLetter = function () {
				return this.charAt(0).toUpperCase() + this.slice(1);
			};

			if (_credentials.email) {

				var password = _credentials.email;
				var subName = _credentials.email.substr(0, _credentials.email.lastIndexOf('@'));
				var firstName = subName.substr(0, subName.lastIndexOf('.')).capitalizeFirstLetter();
				var lastName = subName.substr(subName.lastIndexOf('.') + 1).capitalizeFirstLetter();
				var displayName = firstName + ' ' + lastName;

				return {
					email: _credentials.email,
					password: password,
					displayName: displayName
				};
			} else {
				return {};
			}
		}

		$scope.doCreateUserAction = function (_credentials) {

			FirebaseDB.createUser(createCredentials(_credentials)).then(function (authData) {
				console.log("Logged in as:", authData);
				$state.go('menu.home', {});
			}).catch(function (error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.error("Authentication failed:", error);

				if (error.code === "auth/email-already-in-use") {
					FirebaseDB.login(createCredentials(_credentials)).then(function (authData) {
						console.log("Logged in as:", authData);
						$state.go('menu.home', {});
					}).catch(function (error) {
						var errorCode = error.code;
						var errorMessage = error.message;
						console.error("Authentication failed:", error);
					});
				}
			});
		};
}])

.controller('homeCtrl', ['$scope', '$state', 'DaysLeftCounter',
						 function ($scope, $state, DaysLeftCounter) {

		$scope.daysLeft = DaysLeftCounter.day().daysLeft();

		var counter = 1;

		$scope.tapCounter = function () {
			counter += 1;

			var timer = setTimeout(log, 2000);
			console.log(timer);

			if (counter >= 10) {
				console.log("mayor que 20");
				clearTimeout(timer);
			}

			function log() {
				counter = 0;
			}

		};

}])

.controller('mapCtrl', ['$scope', '$state', '$cordovaGeolocation', '$ionicModal',
						function ($scope, $state, $cordovaGeolocation, $ionicModal) {

		var geocoder;
		var directionsDisplay;
		var directionsService;
		var map = $scope.map;
		var mapDIV = document.getElementById('map');
		var partyLocation = "Calle Falsa 123"; //"Av. Cnel. Niceto Vega 5350, 1414 CABA";
		var partyLatLng = {
			lat: -34.588660,
			lng: -58.436719
		};
		var destination = partyLatLng;
		var destinationString = partyLocation;
		var selectedMode = document.getElementsByClassName('option-button')[0].getAttribute('method');
		var origin;
		var origin_input = document.getElementById('origin-input');
		var destination_input = document.getElementById('destination-input');
		//var modes = document.getElementById('mode');
		var switchButton = document.getElementById('switch-btn');
		var isGoing = true;
		var markerCognizant;
		var markerImage = "img/cognizantLogo30x30.png";
		var origin_place_id;
		var destination_place_id;
		var origin_autocomplete;
		var destination_autocomplete;
		var placesService;
		var directionsPanel = document.getElementById('right-panel');
		var travelMethodButtons = document.getElementsByClassName('option-button');

		destination_input.disabled = true;

		$scope.instructionsLoaded = false;

		$ionicModal.fromTemplateUrl('templates/directionsModal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function (modal) {
			$scope.instructionsModal = modal;
		});

		$scope.disableTap = function () {
			var container = document.getElementsByClassName('pac-container');
			angular.element(container).attr('data-tap-disabled', 'true');
			var backdrop = document.getElementsByClassName('backdrop');
			angular.element(backdrop).attr('data-tap-disabled', 'true');
			angular.element(container).on("click", function () {
				document.getElementById('pac-input').blur();
			});
		};

		//		$scope.callDialog = function () {
		//			document.addEventListener("deviceready", function () {
		//				cordova.dialogGPS("Your GPS is Disabled, this app needs to be enable to works.", //message
		//					"Use GPS, with wifi or 3G.", //description
		//					function (buttonIndex) { //callback
		//						switch (buttonIndex) {
		//						case 0:
		//							break; //cancel
		//						case 1:
		//							break; //neutro option
		//						case 2:
		//							break; //user go to configuration
		//						}
		//					},
		//					"Please Turn on GPS", //title
		//				["Cancel", "Later", "Go"]); //buttons
		//			});
		//		};

		$scope.getCallPermission = function () {
			cordova.plugins.diagnostic.getPermissionAuthorizationStatus(function (status) {
				switch (status) {
				case cordova.plugins.diagnostic.runtimePermissionStatus.NOT_REQUESTED:
					$scope.setPhonePermission();
					break;
				case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED:
					$scope.setPhonePermission();
					break;
				}
			}, function (error) {
				//			if (window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")) {
				//				$scope.callDialog();
				//				cordova.plugins.diagnostic.switchToLocationSettings();
				//				}
			}, cordova.plugins.diagnostic.runtimePermission.ACCESS_FINE_LOCATION);
		};

		$scope.setPhonePermission = function () {
			cordova.plugins.diagnostic.requestRuntimePermission(function (status) {
				initMap();
			}, function (error) {
				//			if (window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")) {
				//				$scope.callDialog();
				//				cordova.plugins.diagnostic.switchToLocationSettings();
				//			}
			}, cordova.plugins.diagnostic.runtimePermission.ACCESS_FINE_LOCATION);
		};

		$scope.$on('$ionicView.enter', function () {
			var isAndroid = ionic.Platform.isAndroid();
			var currentPlatformVersion = ionic.Platform.version();
			var isMarshmallow = parseFloat(currentPlatformVersion) >= 6.0;
			if (isAndroid && isMarshmallow) {
				$scope.getCallPermission();
			}
		});

		$scope.onSwitch = function () {
			console.log("SWITCHING ROUTES...");

			if (isGoing) {
				console.log("--- COMING BACK ---");
				isGoing = false;

				destination_input.value = origin_input.value;
				destination_input.disabled = false;
				destinationString = destination_input.value;

				origin = partyLatLng;
				origin_input.value = partyLocation;
				origin_input.disabled = true;

				geocoder.geocode({
					'address': destinationString
				}, function (results, status) {
					if (status == 'OK') {
						destination = results[0].geometry.location;
						getDirection(directionsDisplay);
						setMarker(origin, map);
					} else {
						console.log('***** onSwitchRoutes COMING BACK Geocode was not successful for the following reason: ' + status);
					}
				});

			} else {
				console.log("--- GOING ---");
				isGoing = true;
				origin_input.value = destination_input.value;
				origin_input.disabled = false;
				destination = partyLatLng;
				destination_input.value = partyLocation;
				destination_input.disabled = true;

				geocoder.geocode({
					'address': origin_input.value
				}, function (results, status) {
					if (status == 'OK') {
						origin = results[0].geometry.location;
						getDirection(directionsDisplay);
						setMarker(partyLatLng, map);
					} else {
						console.log('***** onSwitchRoutes GOING Geocode was not successful for the following reason: ' + status);
					}
				});
			}
		};

		$scope.openInstructionsModal = function () {
			$scope.instructionsModal.show();
			$('#directions-panel').html($('#right-panel').html());
		};

		$scope.closeInstructionsModal = function () {
			$scope.instructionsModal.hide();
		};

		// Cleanup the modal when we're done with it!
		$scope.$on('$destroy', function () {
			console.log("Destroy Instructions Modal");
			$scope.instructionsModal.remove();
		});
		// Execute action on hide modal
		$scope.$on('modal.hidden', function () {
			// Execute action
			console.log("Instructions Modal Hidden");
		});
		// Execute action on remove modal
		$scope.$on('modal.removed', function () {
			// Execute action
			console.log("Instructions Modal Removed");
		});

		destination_input.value = partyLocation;
		initMap();

		//Initialize map
		function initMap() {
			// new 260916
			var options = {
				timeout: 10000,
				enableHighAccuracy: true
			};

			$cordovaGeolocation.getCurrentPosition(options).then(function (position) {

				var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

				var mapOptions = {
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					center: latLng,
					zoom: 18,
					mapTypeControlOptions: {
						mapTypeIds: [
						google.maps.MapTypeId.ROADMAP
					],
						position: google.maps.ControlPosition.BOTTOM_LEFT
					}
				};

				map = new google.maps.Map(mapDIV, mapOptions);

				origin_autocomplete = new google.maps.places.Autocomplete(origin_input);
				origin_autocomplete.bindTo('bounds', map);
				destination_autocomplete = new google.maps.places.Autocomplete(destination_input);
				destination_autocomplete.bindTo('bounds', map);

				directionsService = new google.maps.DirectionsService();
				geocoder = new google.maps.Geocoder();
				directionsDisplay = new google.maps.DirectionsRenderer();
				directionsDisplay.setMap(map);
				directionsDisplay.setOptions({
					suppressMarkers: true
				});
				placesService = new google.maps.places.PlacesService(map);

				//AutoComplete
				origin_autocomplete.addListener('place_changed', function () {
					var place = origin_autocomplete.getPlace();
					if (!place.geometry) {
						console.log("***** Autocomplete's returned place contains no geometry");
						return;
					}
					expandViewportToFitPlace(map, place);

					// If the place has a geometry, store its place ID and route if we have
					// the other place ID
					origin_place_id = place.place_id;

					geocoder.geocode({
						'placeId': origin_place_id
					}, function (results, status) {
						if (status == 'OK') {
							origin = results[0].geometry.location;
							route(origin_place_id, destination_place_id, directionsService, directionsDisplay);
						} else {
							console.log('***** origin_autocomplete Geocode was not successful for the following reason: ' + status);
						}
					});
				});

				destination_autocomplete.addListener('place_changed', function () {
					var place = destination_autocomplete.getPlace();
					if (!place.geometry) {
						console.log("***** Autocomplete's returned place contains no geometry");
						return;
					}
					expandViewportToFitPlace(map, place);

					destination_place_id = place.place_id;

					if (origin_autocomplete.getPlace()) {
						var placeOrig = origin_autocomplete.getPlace();
						console.log("place orig", placeOrig);
						//console.log("origin_autocomplete", origin_autocomplete.getPlace());
						origin_place_id = placeOrig.place_id;
						route(origin_place_id, destination_place_id, directionsService, directionsDisplay);
					} else {
						//console.log("origin_input.value", origin_input.value)
						placesService.textSearch({
							query: origin_input.value
						}, function (results, status) {
							origin_place_id = results[0].place_id;
							route(origin_place_id, destination_place_id, directionsService, directionsDisplay);
						});
					}
				});

				function expandViewportToFitPlace(map, place) {
					if (place.geometry.viewport) {
						map.fitBounds(place.geometry.viewport);
					} else {
						map.setCenter(place.geometry.location);
						map.setZoom(17);
					}
				}

				//map.setOptions({styles: styles});

				directionsDisplay.setPanel(null);
				directionsDisplay.setPanel(directionsPanel);

				var icon = {
					url: markerImage,
					scaledSize: new google.maps.Size(30, 50),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(20, 40)
				};

				markerCognizant = new google.maps.Marker({
					animation: google.maps.Animation.DROP,
					icon: icon,
					map: map,
					title: 'Cognizant Technology Solutions'
				});

				initGeo(directionsDisplay);

			}, function (error) {
				console.log("Could not get location " + error.code);
				$('#map').append("Could not get the location: " + error.message + error.code);
				$scope.getCallPermission();
			});
		}

		//Geolocalization
		function initGeo(directionsDisplay) {
			console.log("---> initGeo()");
			//var infoWindow = new google.maps.InfoWindow({map: map});
			var directionsService = new google.maps.DirectionsService();

			// Try HTML5 geolocation.
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function (position) {
					pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};

					//infoWindow.setPosition(pos);
					//infoWindow.setContent('Estas aquí');

					geocoder.geocode({
						'location': pos
					}, function (results, status) {
						if (status == 'OK') {
							//console.log(results[0])
							origin = results[0].geometry.location;
							origin_input.value = results[1].formatted_address;
							map.setCenter(pos);
							getDirection(directionsDisplay);
							setMarker(partyLatLng, map);
							$scope.instructionsLoaded = true;
							$scope.$apply();
						} else {
							console.log('***** Geocode was not successful for the following reason: ' + status);
						}
					});

				}, function () {
					handleLocationError(true, infoWindow, map.getCenter());
				});

			} else {
				// Browser doesn't support Geolocation
				handleLocationError(false, infoWindow, map.getCenter());
			}

			function handleLocationError(browserHasGeolocation, infoWindow, pos) {
				//infoWindow.setPosition(pos);
				//infoWindow.setContent(browserHasGeolocation ?
				//'Error: The Geolocation service failed.' :
				//'Error: Your browser doesn\'t support geolocation.');
			}
		}

		/*
		document.getElementById('mode').addEventListener('change', function() {
		});
		*/

		//GET NEW DIRECTION
		function getDirection(directionsDisplay) {
			console.log("---> getDirection()");

			var request = {
				origin: origin,
				destination: destination,
				transitOptions: {
					modes: [google.maps.TransitMode.BUS, google.maps.TransitMode.SUBWAY]
				},
				travelMode: google.maps.TravelMode[selectedMode]
			};

			directionsService.route(request, function (result, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					console.log("DRAW ROUTE", request);
					directionsDisplay.setDirections(result);
				}
			});
		}

		//Travel TYPE
		function calculateAndDisplayRoute(directionsService, directionsDisplay, travelMethod) {
			console.log("---> calculateAndDisplayRoute()");
			var selectedMode = travelMethod;
			//var selectedMode = document.getElementById('mode').value;
			//console.log("selected mode:", selectedMode);

			directionsService.route({
				origin: origin,
				destination: destination,
				// **transitOptions** agregar las opciones de transporte publico para hacer una mejor ruta
				transitOptions: {
					modes: [google.maps.TransitMode.SUBWAY, google.maps.TransitMode.BUS]
				},
				travelMode: google.maps.TravelMode[selectedMode]
			}, function (response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setPanel(null);
					directionsDisplay.setPanel(directionsPanel);
					directionsDisplay.setDirections(response);
				} else {
					console.log('***** calculateAndDisplayRoute Directions request failed due to ' + status);
				}
			});
		}

		//Draw route
		function route(origin_place_id, destination_place_id, directionsService, directionsDisplay) {
			//Draws the route automatically
			console.log("---> route()");
			if (!origin_place_id || !destination_place_id) {
				directionsService.route({
					origin: origin,
					destination: destination,
					transitOptions: {
						modes: [google.maps.TransitMode.SUBWAY, google.maps.TransitMode.BUS]
					},
					travelMode: google.maps.TravelMode[selectedMode]
				}, function (response, status) {
					if (status == google.maps.DirectionsStatus.OK) {
						directionsDisplay.setDirections(response);
					} else {
						console.log('***** route Directions request failed due to ' + status);
					}
				});
				return;
			}

			//Draws teh chosen route from From and To.
			directionsService.route({
				origin: {
					'placeId': origin_place_id
				},
				destination: {
					'placeId': destination_place_id
				},
				travelMode: google.maps.TravelMode[selectedMode]
			}, function (response, status) {
				if (status === google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);
				} else {
					console.log('***** route Directions request failed due to ' + status);
				}
			});
		}

		//MARKERS
		function setMarker(pos) {
			markerCognizant.setPosition(pos);
			markerCognizant.setZIndex(99999);

			var contentString = '<div id="content">' +
				'<div id="siteNotice">' +
				'</div>' +
				'<h4 id="firstHeading" class="firstHeading">Ubicación de la empresa</h4>' +
				'<div id="bodyContent">' +
				'<p><b>Cognizant Technology Solutions</b>' +
				'</p>' +
				'</div>' +
				'</div>';

			var infowindow = new google.maps.InfoWindow({
				//content: contentString
			});

			markerCognizant.addListener('click', function () {
				//infowindow.open(map, markerCognizant);
			});
		}

		//TRAVEL MODE LISTENER
		for (var i = 0; i < travelMethodButtons.length; i++) {
			travelMethodButtons[i].addEventListener('click', function () {
				var travelMethod = this.getAttribute('method');
				calculateAndDisplayRoute(directionsService, directionsDisplay, travelMethod);
			});
		}
}])

.controller('cameraCtrl', ['$scope', '$cordovaCamera', '$cordovaFile', 'FirebaseDB', 'DaysLeftCounter',
						   function ($scope, $cordovaCamera, $cordovaFile, FirebaseDB, DaysLeftCounter) {

		var imageResizing = function (imageURI) {
			var img = new Image();
			img.src = imageURI;
			return (img.height > img.width) ? 'resize-vertical' : 'resize-horizontal';
		};

		$scope.showPost = false;
		$scope.showPostedMessage = false;
		$scope.showPostingMessage = false;
		$scope.showDiscardMessage = false;

		$scope.postPhoto = function () {
			$scope.showPost = false;

			var owner = FirebaseDB.currentUser().uid;
			var now = new Date().getTime();
			var imageTitle = 'CogniFest.' + owner + '.' + now;

			var name = $scope.imageURI.substr($scope.imageURI.lastIndexOf('/') + 1);
			var file_path = $scope.imageURI.substr(0, $scope.imageURI.lastIndexOf('/') + 1);

			$cordovaFile.readAsArrayBuffer(file_path, name)
				.then(function (success) {
					// success
					console.log(success);

					var blob = new Blob([success], {
						type: "image/jpeg"
					});

					console.log(blob);

					var uploadTask = FirebaseDB.storage().ref('CogniFest/photos/' + imageTitle + '.jpg').put(blob);

					uploadTask.on('state_changed', function (snapshot) {
						// Observe state change events such as progress, pause, and resume
						var progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
						console.log('Upload is ' + progress + '% done');
						$scope.showPostingMessage = true;
						$scope.showPostedMessage = false;
						$scope.showErrorMessage = false;
						console.log($scope.showPostingMessage ? "Posting" : "Not posting");
						console.log($scope.showPostedMessage ? "Posted" : "Not posted");
						console.log($scope.showErrorMessage ? "Error" : "Not error");
						$scope.$apply();
					}, function (error) {
						// Handle unsuccessful uploads
						console.log("Error uploading: " + error);
						$scope.showPostingMessage = false;
						$scope.showPostedMessage = false;
						$scope.showErrorMessage = true;
						console.log($scope.showPostingMessage ? "Posting" : "Not posting");
						console.log($scope.showPostedMessage ? "Posted" : "Not posted");
						console.log($scope.showErrorMessage ? "Error" : "Not error");
						$scope.$apply();
					}, function () {
						// Handle successful uploads on complete
						// For instance, get the download URL: https://firebasestorage.googleapis.com/...
						var downloadURL = uploadTask.snapshot.downloadURL;
						console.log("Success! ", downloadURL);
						$scope.showPostingMessage = false;
						$scope.showPostedMessage = true;
						$scope.showErrorMessage = false;
						console.log($scope.showPostingMessage ? "Posting" : "Not posting");
						console.log($scope.showPostedMessage ? "Posted" : "Not posted");
						console.log($scope.showErrorMessage ? "Error" : "Not error");
						$scope.$apply();
						// save a reference to the image for listing purposes
						var ref = FirebaseDB.database().ref('CogniFest/photos');
						ref.push({
							'src': downloadURL,
							'owner': owner,
							'time': now
						});
					});
				}, function (error) {
					// error
					console.log("Failed to read file from directory", error.code);
				});
		};

		$scope.discardPhoto = function () {
			$scope.showPost = false;
			$scope.showDiscardMessage = true;
			$scope.$apply();
		};

		//Opens the camera and the settings that it will be using to take the pictures
		$scope.takePhoto = function () {

			var options = {
				quality: 90,
				destinationType: Camera.DestinationType.NATIVE_URI,
				sourceType: Camera.PictureSourceType.CAMERA,
				encodingType: Camera.EncodingType.JPEG,
				mediaType: Camera.MediaType.PICTURE,
				allowEdit: false,
				saveToPhotoAlbum: true,
				correctOrientation: true
			};

			$cordovaCamera
				.getPicture(options)
				.then(function (imageData) {
					$scope.showPost = true;
					$scope.imageURI = imageData;
					console.log($scope.imageURI);
					$scope.imageClass = imageResizing(imageData);
					$scope.imageHeight = $('#camera-content').clientHeight * (2 / 3);
				}, function (error) {});
		};

		$scope.takePhoto();
}]);