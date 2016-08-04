angular.module('app.controllers', [])
  
.controller('homeCtrl', function($scope) {

})
   
.controller('gamesCtrl', function($scope) {

})
   
.controller('drinksCtrl', function($scope) {

})
      
.controller('signupCtrl', function($scope) {

})
   
.controller('playListCtrl', function($scope) {

})
   
.controller('mapCtrl', function($scope,$state,$cordovaGeolocation) {
    
  initMap();

  var map = $scope.map;

 /************************Inicializo el Mapa********************************/
 function initMap(){
    
    var options = {timeout: 10000, enableHighAccuracy: true};
  

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){
  //Declaro las opciones
    

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    
    var styles =[
        {
          "featureType": "poi",
          "elementType": "labels.icon",
          "stylers": [
            { "visibility": "off" }
          ]
        },{
          "featureType": "landscape",
          "stylers": [
            { "visibility": "off" }
          ]
        },{
          "featureType": "transit",
          "stylers": [
            { "visibility": "off" }
          ]
        },{
          "featureType": "road",
          "elementType": "labels.text",
          "stylers": [
            { "invert_lightness": true },
            { "saturation": 100 },
            { "lightness": -1 },
            { "visibility": "on" },
            { "weight": 0.8 },
            { "hue": "#0077ff" }
          ]
        }
      ];

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
    
    map.setOptions({styles: styles});

    var directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('right-panel'));

    initGeo(directionsDisplay); 


  }, function(error){
    console.log("Could not get location");
  });
}

/***********************************Geolocalización******************************************************/

  function initGeo(directionsDisplay){   
    
     var infoWindow = new google.maps.InfoWindow({map: map});
     var directionsService = new google.maps.DirectionsService();

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Estas aquí');
            map.setCenter(pos);
            
            getDirection(pos, directionsDisplay);
            setMarkers(pos, map);
            
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });

        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }
  }
/*******************************************Ruta por defecto*************************************************/

  function getDirection(origin, directionsDisplay){


    var directionsService = new google.maps.DirectionsService();
    
    var destination = {lat: -34.546284, lng: -58.452251};

    var selectedMode = document.getElementById('mode').value;

    var origin_input = document.getElementById('origin-input');

    var destination_input = document.getElementById('destination-input');
   
    var modes = document.getElementById('mode');

    var switchButton = document.getElementById('switch-inputs');

    var destination_place_id = null;

    var request = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode[selectedMode]
    };
     
    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(result);
        }
    });

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(origin_input);
    map.controls[google.maps.ControlPosition.LEFT].push(destination_input);
    map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(modes);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(switchButton);
  
/************************************AutoComplete**************************************/
     
   

    var origin_autocomplete = new google.maps.places.Autocomplete(origin_input);
    origin_autocomplete.bindTo('bounds', map);

    var destination_autocomplete =
        new google.maps.places.Autocomplete(destination_input);
    destination_autocomplete.bindTo('bounds', map);

    
    function expandViewportToFitPlace(map, place) {
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }
    }

    
    origin_autocomplete.addListener('place_changed', function() {
      var place = origin_autocomplete.getPlace();
      if (!place.geometry) {
        window.alert("Autocomplete's returned place contains no geometry");
        return;
      }

      expandViewportToFitPlace(map, place);


      // If the place has a geometry, store its place ID and route if we have
      // the other place ID
      origin_place_id = place.place_id;
      route(origin_place_id, destination_place_id,
            directionsService, directionsDisplay);
    
    });
   
    
    destination_autocomplete.addListener('place_changed', function() {
      
      var place = destination_autocomplete.getPlace();
      if (!place.geometry) {
        window.alert("Autocomplete's returned place contains no geometry");
        return;
      }
      expandViewportToFitPlace(map, place);

      // If the place has a geometry, store its place ID and route if we have
      // the other place ID
      destination_place_id = place.place_id;
      route(origin_place_id, destination_place_id, directionsService, directionsDisplay);
  });    

/*************************************************Trazar Ruta **********************************************/
    function route(origin_place_id, destination_place_id, directionsService, directionsDisplay){
     
     //Se traza la ruta automaticamente
      if (!origin_place_id || !destination_place_id) {
      
       directionsService.route({
        destination: destination,  
        travelMode: google.maps.TravelMode[selectedMode]
        }, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response);
            } else {
              window.alert('Directions request failed due to ' + status);
            }
          });
        return
      }

      //Se traza la ruta elegida por el From y el To.
      directionsService.route({
        origin: {'placeId': origin_place_id},
        destination: {'placeId': destination_place_id},
        travelMode: google.maps.TravelMode[selectedMode]
      }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }
/********************************TRAVEL MODE LISTENER******************/   
    document.getElementById('mode').addEventListener('change', function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
    });


/*********************Modo de transporte*****************************/
   function calculateAndDisplayRoute(directionsService, directionsDisplay) {
      var selectedMode = document.getElementById('mode').value;
      directionsService.route({
        origin: origin,  // Haight.
        destination: destination,  // Ocean Beach.
        // Note that Javascript allows us to access the constant
        // using square brackets and a string value as its
        // "property."
        travelMode: google.maps.TravelMode[selectedMode]
      }, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
   }  
  
}


 
/********************************************MARKERS*****************************************************/
      
  function setMarkers(pos){
    var destination = {lat: -34.546284, lng: -58.452251};
    var image = "img/cognizantLogo30x30.png";
        var markerCognizant = new google.maps.Marker({
          animation: google.maps.Animation.DROP,
          position: destination,
          map: map,
          icon:image,
          title: 'Cognizant Technology Solutions'
      });

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
        content: contentString
      });

        markerCognizant.addListener('click', function() {
          infowindow.open(map, markerCognizant);
        });

  } 
})
   
.controller('cameraPhotosCtrl', function($scope) {

})
 