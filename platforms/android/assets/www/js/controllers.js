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
	 
.controller('drinksCtrl', function($scope, $state, $ionicModal, $cordovaDeviceMotion, $cordovaVibration) {

	$scope.items = [
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
	];
	
	//$ionicModal.fromTemplateUrl('lib\ion-gallery\src\templatesrandomDrinkModal.html', {

	$ionicModal.fromTemplateUrl('templates/randomDrinkModal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal){
		$scope.modal = modal;
	});
	/*
	$scope.onShakeTest = function(){
  		console.log('hola soy el shake');
  		var randomNumber = Math.floor((Math.random() * 7));
		console.log('your random drink is: ' + randomNumber);
		console.log($scope.items[randomNumber].src);

		//send selected drink object yo the scope
		$scope.randomDrink = $scope.items[randomNumber];
		//open modal
		$scope.modal.show();
	};
	*/

	$scope.closeModal = function(){
		$scope.modal.hide();
		console.log('escondiendo la modal');
	};
  	var onShake = function () {
  		var randomNumber = Math.floor((Math.random() * 7));
  		//send selected drink object yo the scope
		$scope.randomDrink = $scope.items[randomNumber];
		//open modal
		$cordovaVibration.vibrate(300);
		$scope.modal.show();
	};
/*
*/

	var onError = function () {
	  $('#pruebaShake').html("<strong>ERROR DETECTADO</strong>");
	  // Fired when there is an accelerometer error (optional)
	};

	// Start watching for shake gestures and call "onShake"
	// with a shake sensitivity of 40 (optional, default 30)
	if(window.shake) shake.startWatch(onShake, 30 , onError);

})
			
.controller('signupCtrl', function($scope, $state, $q, UserService, $ionicLoading){
    // This is the success callback from the login method
    var accesstoken;
    var fbLoginSuccess = function(response){
        if (!response.authResponse){
            fbLoginError("Cannot find the authResponse");
            return;
        }

        var authResponse = response.authResponse;
        accesstoken = authResponse.accessToken;

        getFacebookProfileInfo(authResponse).then(function(profileInfo){
            // For the purpose of this example I will store user data on local storage
            UserService.setUser({
                authResponse: authResponse,
                userID: profileInfo.id,
                name: profileInfo.name,
                email: profileInfo.email,
                picture: "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
            });
            $ionicLoading.hide();
            //$state.go('menu.home');
        }, function(fail){
                // Fail get profile info
                alert('profile info fail ' + fail);
            });
    };

    // This is the fail callback from the login method
    var fbLoginError = function(error){
        alert('fbLoginError ' + error);
        $ionicLoading.hide();
    };

    // This method is to get the user profile info from the facebook api
    var getFacebookProfileInfo = function (authResponse){
        var info = $q.defer();

        facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
            function (response) {
                console.log(response);
                info.resolve(response);
            },
            function (response) {
                console.log(response);
                info.reject(response);
            }
        );
        return info.promise;
    };

    //This method is executed when the user press the "Login with facebook" button
    $scope.facebookSignIn = function(){
        console.log('---> facebookSignIn');
        facebookConnectPlugin.getLoginStatus(function(success){
            if (success.status === 'connected'){
                // The user is logged in and has authenticated your app, and response.authResponse supplies
                // the user's ID, a valid access token, a signed request, and the time the access token
                // and signed request each expire
                //alert('getLoginStatus ' + success.status);

                // Check if we have our user saved
                var user = UserService.getUser('facebook');

                if (!user.userID){
                	alert('UNO');
                    getFacebookProfileInfo(success.authResponse).then(function(profileInfo) {
                        // For the purpose of this example I will store user data on local storage
                        UserService.setUser({
                            authResponse: success.authResponse,
                            userID: profileInfo.id,
                            name: profileInfo.name,
                            email: profileInfo.email,
                            picture: "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
                        });

                        //$state.go('menu.home');
                    }, function(fail){
                            // Fail get profile info
                            alert('profile info fail ' + fail);
                       });
                }else{
                	//alert('DOS');
                    $state.go('menu.home');
                    //184427335315109 album_id
                    //180129755744867 page_id
                    //'http://images.halloweencostumes.com/products/11628/1-1/sexy-bavarian-girl-costume.jpg'
                    var fan_token = 'EAAH1eElPZCI0BADZBlrZCbsZBWF5ig29gZBlmWMXD0I8jtP8fiXBRZCTOaxw0Qdo3haX6vqHlBLQEwRjsvaqTtb2DTCIJoW1jwV1Sn5ABsxH1ZA4xLJNZADarOGxo4kboMhpjZBDfKtD1lfDK1dJLcZBI4gRBOF2XGjOMZD';
                   	var message = 'Hola soy chriss'
                   	//var path = "file:///storage/sdcard0/Android/data/com.ionicframework.cognifest763009/cache/1475157641096.jpg"
                   	var path = $scope.picTakenSrc;
                   	alert(path);

                    facebookConnectPlugin.api('/180129755744867/photos?method=post&url=' + path, ['publish_actions'], 
                    	function (response) {
							if (response && !response.error) {
								alert('Successful Post');
							}
							else{
								alert(JSON.stringify(response));
							}
						}

                    	/*

                    	function(response){
                    		//console.log(response);
                    		//alert(response);
                    		console.log('todo bien', response);
                    		alert('todo bien' + response);
                    	},

                    	function(error){
                    		console.log('todo mal', error);
                    		alert('FAIL ' + JSON.stringify(response))}
                    		*/
                    	)
					

						/*facebookConnectPlugin.showDialog( 
    					{
					        
					        method: "feed",
					        picºre:'https://www.google.co.jp/logos/doodles/2014/doodle-4-google-2014-japan-winner-5109465267306496.2-hp.png',
					        name:'Test Post',
					        message:'First photo post',    
					        caption: 'Testing using phonegap plugin',
					        description: 'Posting photo using phonegap facebook plugin'
					    }, 
					    function (response) { alert(JSON.stringify(response)) },
					    function (response) { alert(JSON.stringify(response)) });*/
                    
                }
            }else{
                // If (success.status === 'not_authorized') the user is logged in to Facebook,
                // but has not authenticated your app
                // Else the person is not logged into Facebook,
                // so we're not sure if they are logged into this app or not.

                alert('getLoginStatus ' + success.status);

                $ionicLoading.show({
                    template: 'Logging in...'
                });

                // Ask the permissions you need. You can learn more about
                // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
                facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
            }
        });
    };
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
	 
.controller('cameraPhotosCtrl', function($scope, $cordovaCamera) {
    $scope.items = [];   
        
    //Opens the camera and the settings that it will be using to take the pictures
    $scope.takePhoto = function () {
        var options = {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300, //Here you can change the size of the image shown in the <img> tag
            targetHeight: 300, //Here you can change the size of the image shown in the <img> tag
            popoverOptions: CameraPopoverOptions, //This is only for iOS, to show the Confirm/Reject buttons in a popup. Android does show that popup automatically thanks to the Cordova plugin
            saveToPhotoAlbum: true
        };

        //alert();

        $cordovaCamera.getPicture(options).then(function(imageData) {      
            //alert(imageData); 
            $scope.imgURI = "data:image/jpeg;base64," + imageData;            
            
            var authToken = 'EAAH1eElPZCI0BADZBlrZCbsZBWF5ig29gZBlmWMXD0I8jtP8fiXBRZCTOaxw0Qdo3haX6vqHlBLQEwRjsvaqTtb2DTCIJoW1jwV1Sn5ABsxH1ZA4xLJNZADarOGxo4kboMhpjZBDfKtD1lfDK1dJLcZBI4gRBOF2XGjOMZD';
		    try {
		    	alert('dataURItoBlob ---> imageData');
		        var blob = dataURItoBlob(imageData);
		    }
		    catch(e) {
		        console.log(e);
		    }
		    var fd = new FormData();
		    fd.append("access_token",authToken);
		    fd.append("source", blob);
		    fd.append("message","Photo Text");
		    try {
		        $.ajax({
		            url:"https://graph.facebook.com/180129755744867/photos?access_token=" + authToken,
		            type:"POST",
		            data:fd,
		            processData:false,
		            contentType:false,
		            cache:false,
		            success:function(data){
		                alert("success " + data);
		            },
		            error:function(shr,status,data){
		                alert("error " + data + " Status " + shr.status);
		            },
		            complete:function(){
		                alert("Posted to facebook");
		            }
		        });
		    }
		    catch(e) {
		        alert(e + ' ERROR');
		    }
		

			function dataURItoBlob(dataURI) {
			    var byteString = window.atob(dataURI.split(',')[1]);
			    var ab = new ArrayBuffer(byteString.length);
			    var ia = new Uint8Array(ab);
			    for (var i = 0; i < byteString.length; i++) {
			        ia[i] = byteString.charCodeAt(i);
			    }
			    return new Blob([ab], { type: 'image/jpg' });
			}



        }, function (error) {
            // An error occured. Show a message to the user
        });        
        /*
        //Gets the picture encoded in base64 that will be shown in the <img> tag
        $cordovaCamera.getPicture(options).then(function(imageData) {

        onImageSuccess(imageData);
 
		function onImageSuccess(fileURI) {
			createFileEntry(fileURI);
		}
 
		function createFileEntry(fileURI) {
			window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
		}
 
		// 5
		function copyFile(fileEntry) {
			var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
			var newName = makeid() + name;

			alert(name);
			alert(fileEntry.fullPath);
 
			window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
				fileEntry.copyTo(
					fileSystem2,
					newName,
					onCopySuccess,
					fail
				);
			},
			fail);
		}
		


            //$scope.imgURI = "data:image/jpeg;base64," + $scope.img;            
            //ref.push({src:$scope.imgURI, sub:""});            
        }, function (error) {
            // An error occured. Show a message to the user
        });        
        */
    }
    
    //ref.push({src:$scope.img});
    /*ref.on('child_added', function(snapshot) {
        $scope.items = [];
        console.log(snapshot.key)
        snapshot.forEach(function(childsnap){
            $scope.items.push({src:childsnap.child('src').val()});  
        })
        console.log("---> Gallery has", $scope.items.length, "images", $scope.items);
    });*/
    
    /*ref.on('value', function(snapshot) {
        $scope.items = [];
        console.log(snapshot.key)
        snapshot.forEach(function(childsnap){
            $scope.items.push({src:childsnap.child('src').val()});  
        })
        console.log("---> Gallery has", $scope.items.length, "images", $scope.items);
    });*/
    
    /* To open the photo gallery
    $scope.choosePhoto = function () {
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true
    };
        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            // An error occured. Show a message to the user
        });
    }*/
})
