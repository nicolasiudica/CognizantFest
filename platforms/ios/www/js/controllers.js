angular.module('app.controllers', [])

.controller('homeCtrl', function ($scope, $state, DaysLeftCounter) {
	
	$scope.daysLeft = DaysLeftCounter.day().daysLeft();

	var counter = 1;

	$scope.tapCounter = function () {
		counter += 1;

		var timer = setTimeout(log, 2000);
		console.log(timer);

		if (counter >= 10) {
			console.log('mayor que 20');
			clearTimeout(timer);
		}

		function log() {
			counter = 0;
		}

	};

})


.controller('gamesCtrl', function ($scope, $state) {

})

.controller('drinksCtrl', function ($scope, $state, $ionicModal, $cordovaVibration, RandomImage) {

	$scope.items = [{
		name: 'Beer',
		largeImg: 'img/beer_large.png',
		src: 'img/beer.png',
		sub: '<b>Daikiri ingredients are rum, strawberry and sugar.</b>'
	}, {
		name: 'Cuba Libre',
		largeImg: 'img/cubalibre_large.png',
		src: 'img/cubalibre.png',
		sub: '<b>Daikiri ingredients are rum, strawberry and sugar.</b>'
	}, {
		name: 'Fernet',
		largeImg: 'img/fernet_large.png',
		src: 'img/fernet.png',
		sub: '<b>Daikiri ingredients are rum, strawberry and sugar.</b>'
	}, {
		name: 'Gintonic',
		largeImg: 'img/gintonic_large.png',
		src: 'img/gintonic.png',
		sub: '<b>Daikiri ingredients are rum, strawberry and sugar.</b>'
	}, {
		name: 'Daiquiri',
		largeImg: 'img/daiquiri_large.png',
		src: 'img/daiquiri.png',
		sub: '<b>Daikiri ingredients are rum, strawberry and sugar.</b>'
	}, {
		name: 'Screwdriver',
		largeImg: 'img/screwdriver_large.png',
		src: 'img/screwdriver.png',
		sub: '<b>Daikiri ingredients are rum, strawberry and sugar.</b>'
	}, {
		name: 'Margarita',
		largeImg: 'img/margarita_large.png',
		src: 'img/margarita.png',
		sub: '<b>Daikiri ingredients are rum, strawberry and sugar.</b>'
	}, {
		name: '',
		largeImg: '',
		src: '',
		sub: ''
	}];

	
	$ionicModal.fromTemplateUrl('templates/randomDrinkModal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal){
		$scope.modal = modal;
	});
		$scope.closeModal = function(){
			$scope.modal.hide();
		//console.log('escondiendo la modal');
	};

	var onShake = function () {
  		var randomNumber = Math.floor((Math.random() * 7));
  		var itemsImages = RandomImage.items();
      	$scope.randomDrink = itemsImages[randomNumber];
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

	// Start watching for shake gestures and call "onShake"
	// with a shake sensitivity of 40 (optional, default 30)
	if(window.shake) {
		shake.startWatch(onShake, 40 , onError);
	}

})

.controller('signupCtrl', function ($scope, $state) {

})

.controller('playListCtrl', function ($scope, $state) {

})

.controller('mapCtrl', function ($scope, $state, $cordovaGeolocation) {

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
		}, function (error) {}, cordova.plugins.diagnostic.runtimePermission.ACCESS_FINE_LOCATION);
	};

	$scope.setPhonePermission = function () {
		cordova.plugins.diagnostic.requestRuntimePermission(function (status) {
			initMap();
		}, function (error) {}, cordova.plugins.diagnostic.runtimePermission.ACCESS_FINE_LOCATION);
	};

	$scope.$on('$ionicView.enter', function () {
		var isAndroid = ionic.Platform.isAndroid();
		var currentPlatformVersion = ionic.Platform.version();
		var isMarshmallow = parseFloat(currentPlatformVersion) >= 6.0;
		if (isAndroid && isMarshmallow) {
			$scope.getCallPermission();
		}
	});

	var geocoder;
	var directionsDisplay;
	var directionsService;
	var map = $scope.map;
	var mapDIV = document.getElementById('map');
	var partyLocation = "Avenida Presidente Figueroa Alcorta 7285, Ciudad Autónoma de Buenos Aires";
	var partyLatLng = {
		lat: -34.546459,
		lng: -58.445475
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

	$scope.disableTap = function () {
		var container = document.getElementsByClassName('pac-container');
		angular.element(container).attr('data-tap-disabled', 'true');
		var backdrop = document.getElementsByClassName('backdrop');
		angular.element(backdrop).attr('data-tap-disabled', 'true');
		angular.element(container).on("click", function () {
			document.getElementById('pac-input').blur();
		});
	};

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

	//TRAVEL MODE LISTENER

	for (var i = 0; i < travelMethodButtons.length; i++) {
		travelMethodButtons[i].addEventListener('click', function () {
			var travelMethod = this.getAttribute('method');
			calculateAndDisplayRoute(directionsService, directionsDisplay, travelMethod);
		});
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

})

.controller('cameraPhotosCtrl', function ($scope, $cordovaCamera, DaysLeftCounter) {

	$scope.items = [];

	//Base64 image for testing purposes

	//Opens the camera and the settings that it will be using to take the pictures
	$scope.takePhoto = function () {

		var options = {
			quality: 90,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: Camera.PictureSourceType.CAMERA,
			allowEdit: false,
			encodingType: Camera.EncodingType.JPEG,
			// targetWidth: 300, //Here you can change the size of the image shown in the <img> tag
			// targetHeight: 300, //Here you can change the size of the image shown in the <img> tag
			popoverOptions: CameraPopoverOptions, //This is only for iOS, to show the Confirm/Reject buttons in a popup. Android does show that popup automatically thanks to the Cordova plugin
			saveToPhotoAlbum: true,
			correctOrientation: true
		};

		//Gets the picture encoded in base64 that will be shown in the <img> tag
		$cordovaCamera.getPicture(options).then(function (imageData) {

			$scope.showPost = !($scope.showPostMessage = ($scope.showDiscardMessage = false));

			$scope.imgURI = "data:image/jpeg;base64," + imageData;
			
			var img = new Image();
			img.src = $scope.imgURI;
			var imgH = img.height;
			var imgW = img.width;
			
			if(imgH > imgW) {
				$scope.class = "resize-vertical";
			} else {
				$scope.class = "resize-horizontal";
			}
			
			$scope.height = document.getElementsByTagName('ion-content')[1].clientHeight * (2 / 3);

			$scope.postPhoto = function () {
				ref.push({
					src: $scope.imgURI,
					time: DaysLeftCounter.day().now()
				});

				$scope.showPost = !($scope.showPostMessage = true);
			};

			$scope.discardPhoto = function () {
				$scope.showPost = !($scope.showDiscardMessage = true);
			};
		}, function (error) {

		});
	};

	//ref.push({src:imgData});
	/* ref.on('child_added', function(snapshot) {
		 $scope.items = [];
		 console.log(snapshot.key)
		 snapshot.forEach(function(childsnap){
			 $scope.items.push({src:childsnap.child('src').val()});  
		 })
		 console.log("---> Gallery has", $scope.items.length, "images", $scope.items);
	 });*/


	// see firebase database images 
	/*
	ref.on('value', function(snapshot) {
		$scope.items = [];
		console.log(snapshot.key);
		snapshot.forEach(function(childsnap){
			$scope.items.push({src:childsnap.child('src').val()});  
		});
		console.log("---> Gallery has", $scope.items.length, "images", $scope.items);
	});*/
	

});