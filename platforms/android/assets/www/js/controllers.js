angular.module('app.controllers', [])
	
.controller('homeCtrl', function($scope, $state, DaysLeftCounter) {
	
	$scope.daysLeft = DaysLeftCounter.day().daysLeft();

	var counter = 1;

	$scope.tapCounter = function(){
		counter += 1;

		var timer = setTimeout(log, 2000);
		console.log(timer);

		if(counter >= 10){
			console.log('mayor que 20');
			clearTimeout(timer);
		}
		function log(){
			counter = 0;
		}
		
	}

})
	 
.controller('gamesCtrl', function($scope, $state) {

})
	 
.controller('drinksCtrl', function($scope, $state, $cordovaVibration) {

$scope.items = [{
    src: 'img/cerveza.jpg'
  }, {
    src: 'img/daikiri.jpg',
    sub: '<b>Daikiri ingredients are rum, strawberry and sugar.</b>'
  }, {
    src: 'img/fernet.jpg'
  }, {
    src: 'img/gintonic.jpg'
  }, {
    src: 'img/cubalibre.jpg'
  }, {
    src: 'img/destornillador.jpg'
  }, {
    src: 'img/margarita.jpg'
  }, {
    src: 'img/martini.jpg'
  }, {
    src: 'img/tequilaSunrise.jpg'
  }];


var onShake = function () {
  $('#pruebaShake').html("<strong>SHAKE DETECTADO</strong>");
  $cordovaVibration.vibrate(500);
  var url = randomDrink(cantidadTragos);
  $('#pruebaShake').html("<strong>URL: " + url + "</strong>");
};

var onError = function () {
  $('#pruebaShake').html("<strong>ERROR DETECTADO</strong>");
  // Fired when there is an accelerometer error (optional)
};

// Start watching for shake gestures and call "onShake"
// with a shake sensitivity of 40 (optional, default 30)
shake.startWatch(onShake, 30 , onError);

shake.stopWatch();

 //defino la cantidad de tragos y los nombres
var cantidadTragos = 9;
//este es el resultado rel return, puede ser la imagen o una url, o un div, depende de como se haga la interfaz
trago1 = "img/cerveza.jpg";
trago2 = "img/martini.jpg";
trago3 = "img/daikiri.jpg";
trago4 = "img/margarita.jpg";
trago5 = "img/cubalibre.jpg";
trago6 = "img/tequilaSunrise.jpg";
trago7 = "img/fernet.jpg";
trago8 = "img/gintonic.jpg";
trago9 = "img/destornillador.jpg";
//ejecuto la funcion para elegir el trago luego de que se detecte el shake event
function randomDrink(cantidadTragos){
  var idTrago = Math.floor((Math.random() * cantidadTragos) + 1);
  switch(idTrago) {
    case 1:
    tragoAleatorio = trago1;
    break;
    case 2:
    tragoAleatorio = trago2;
    break;
    case 3:
    tragoAleatorio = trago3;
    break;
    case 4:
    tragoAleatorio = trago4;
    break;
    case 5:
    tragoAleatorio = trago5;
    break;
    case 6:
    tragoAleatorio = trago6;
    break;
    case 7:
    tragoAleatorio = trago7;
    break;
    case 8:
    tragoAleatorio = trago8;
    break;
    case 9:
    tragoAleatorio = trago9;
    break;
    case 10:
    tragoAleatorio = trago10;
    break;
    }
  return tragoAleatorio;
}



})
			
.controller('signupCtrl', function($scope, $state) {

})
	 
.controller('playListCtrl', function($scope, $state) {

})
	 
.controller('mapCtrl', function($scope, $state, $cordovaGeolocation){
	var geocoder;
	var directionsDisplay;
	var directionsService;
	var map = $scope.map;
	var mapDIV = document.getElementById('map');
	var partyLocation = "Avenida Presidente Figueroa Alcorta 7285, Ciudad Autónoma de Buenos Aires";
	var partyLatLng = {lat:-34.546459, lng:-58.445475};
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

	$scope.disableTap = function() {
        var container = document.getElementsByClassName('pac-container');
        angular.element(container).attr('data-tap-disabled', 'true');
        var backdrop = document.getElementsByClassName('backdrop');
        angular.element(backdrop).attr('data-tap-disabled', 'true');
        angular.element(container).on("click", function() {
            document.getElementById('pac-input').blur();
        });
    };

	$scope.onSwitch = function(){
		console.log("SWITCHING ROUTES...");
		
		if (isGoing){
			console.log("--- COMING BACK ---");
			isGoing = false;
			
			destination_input.value = origin_input.value;
			destination_input.disabled = false;
			destinationString = destination_input.value;
			
			origin = partyLatLng;
			origin_input.value = partyLocation;
			origin_input.disabled = true;
						
			geocoder.geocode({'address':destinationString}, function(results, status){
				if (status == 'OK') {
					destination = results[0].geometry.location;
					getDirection(directionsDisplay);
					setMarker(origin, map);
				} else {
					console.log('***** onSwitchRoutes COMING BACK Geocode was not successful for the following reason: ' + status);
				}
			});
		
		}else{
			console.log("--- GOING ---");
			isGoing = true;
			origin_input.value = destination_input.value;
			origin_input.disabled = false;
			destination = partyLatLng;
			destination_input.value = partyLocation;
			destination_input.disabled = true;
			
			geocoder.geocode({'address':origin_input.value}, function(results, status){
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
	function initMap(){
		var options = {timeout:3000, enableHighAccuracy:true};
	  
		$cordovaGeolocation.getCurrentPosition(options).then(function(position){
		
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

			map = new google.maps.Map(document.getElementById("map"), mapOptions);
				
			origin_autocomplete = new google.maps.places.Autocomplete(origin_input);
			origin_autocomplete.bindTo('bounds', map);
			destination_autocomplete = new google.maps.places.Autocomplete(destination_input);
			destination_autocomplete.bindTo('bounds', map);
				
			directionsService = new google.maps.DirectionsService();
			geocoder = new google.maps.Geocoder();
			directionsDisplay = new google.maps.DirectionsRenderer();
			directionsDisplay.setMap(map);
			directionsDisplay.setOptions( { suppressMarkers: true } );
			placesService = new google.maps.places.PlacesService(map);
			
			//AutoComplete
			origin_autocomplete.addListener('place_changed', function() {
				var place = origin_autocomplete.getPlace();
				if (!place.geometry) {
					console.log("***** Autocomplete's returned place contains no geometry");
					return;
				}
				expandViewportToFitPlace(map, place);

				// If the place has a geometry, store its place ID and route if we have
				// the other place ID
				origin_place_id = place.place_id;

				geocoder.geocode({'placeId':origin_place_id}, function(results, status){
					if (status == 'OK') {
						origin = results[0].geometry.location;
						route(origin_place_id, destination_place_id, directionsService, directionsDisplay);
					} else {
						console.log('***** origin_autocomplete Geocode was not successful for the following reason: ' + status);
					}
				});
			});   

			destination_autocomplete.addListener('place_changed', function() {
				var place = destination_autocomplete.getPlace();
				if (!place.geometry) {
					console.log("***** Autocomplete's returned place contains no geometry");
					return;
				}
				expandViewportToFitPlace(map, place);
				
				destination_place_id = place.place_id;
				
				if (origin_autocomplete.getPlace()){
					var placeOrig = origin_autocomplete.getPlace();
					console.log("place orig", placeOrig);
					//console.log("origin_autocomplete", origin_autocomplete.getPlace());
					origin_place_id = placeOrig.place_id;
					route(origin_place_id, destination_place_id, directionsService, directionsDisplay);
				}else{
					//console.log("origin_input.value", origin_input.value)
					placesService.textSearch({query:origin_input.value}, function(results, status){
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
		
		},function(error){
			console.log("Could not get location " + error.code);
			$('#map').append("Could not get location " + error);
	  	});
	}

	//Geolocalization
	function initGeo(directionsDisplay){
		console.log("---> initGeo()");
		//var infoWindow = new google.maps.InfoWindow({map: map});
		var directionsService = new google.maps.DirectionsService();

		// Try HTML5 geolocation.
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
			pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};

			//infoWindow.setPosition(pos);
			//infoWindow.setContent('Estas aquí');
				   
			geocoder.geocode({'location':pos}, function(results, status){
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

		  }, function() {
			handleLocationError(true, infoWindow, map.getCenter());
		  });

		}else{
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
		travelMethodButtons[i].addEventListener('click', function(){
			var travelMethod = this.getAttribute('method');
			calculateAndDisplayRoute(directionsService, directionsDisplay, travelMethod);
		});
	}

	/*
	document.getElementById('mode').addEventListener('change', function() {
	});
	*/
		
	//GET NEW DIRECTION
	function getDirection(directionsDisplay){
		console.log("---> getDirection()");    
		
		var request = {
		  origin: origin,
		  destination: destination,
		  transitOptions: { modes: [google.maps.TransitMode.BUS,google.maps.TransitMode.SUBWAY] },
		  travelMode: google.maps.TravelMode[selectedMode]
		};    
		
		directionsService.route(request, function(result, status) {
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
			transitOptions: { modes: [google.maps.TransitMode.SUBWAY,google.maps.TransitMode.BUS] },
			travelMode: google.maps.TravelMode[selectedMode]
		}, function(response, status) {
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
	function route(origin_place_id, destination_place_id, directionsService, directionsDisplay){
		//Draws the route automatically
		console.log("---> route()");
		if (!origin_place_id || !destination_place_id) {
			directionsService.route({
				origin: origin,
				destination: destination,
				transitOptions: { modes: [google.maps.TransitMode.SUBWAY,google.maps.TransitMode.BUS] },
				travelMode: google.maps.TravelMode[selectedMode]
			}, function(response, status) {
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
			origin: {'placeId': origin_place_id},
			destination: {'placeId': destination_place_id},
			travelMode: google.maps.TravelMode[selectedMode]
		}, function(response, status) {
			if (status === google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response);
			} else {
				console.log('***** route Directions request failed due to ' + status);
			}
		});
	}
	 
	//MARKERS      
	function setMarker(pos){
		markerCognizant.setPosition(pos);
		markerCognizant.setZIndex(99999);

		var contentString = '<div id="content">'+
		  '<div id="siteNotice">'+
		  '</div>'+
		  '<h4 id="firstHeading" class="firstHeading">Ubicación de la empresa</h4>'+
		  '<div id="bodyContent">'+
		  '<p><b>Cognizant Technology Solutions</b>'+
		  '</p>'+
		  '</div>'+
		  '</div>';

		var infowindow = new google.maps.InfoWindow({
			//content: contentString
		});

		markerCognizant.addListener('click', function() {
			//infowindow.open(map, markerCognizant);
		});
	}



})
	 
.controller('cameraPhotosCtrl', function($scope) {

});
