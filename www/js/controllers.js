angular.module('app.controllers', [])

.controller('homeCtrl', function($scope) {

})

.controller('gamesCtrl', function($scope) {

})

.controller('drinksCtrl', function($scope, $ionicBackdrop, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate) {
 
  $scope.allImages = [{
    src: 'drinks/images/cerveza.jpg'
  }, {
    src: 'drinks/images/daikiri.jpg'
  }, {
    src: 'drinks/images/fernet.jpg'
  }, {
    src: 'drinks/images/gintonic.jpg'
  }, {
    src: 'drinks/images/tequilaSunrise.jpg'
  }];
 
  $scope.zoomMin = 2;

  $scope.showImages = function(index) {
    $scope.activeSlide = index;
    $scope.showModal('templates/gallery-zoomview.html');
  };
 
  $scope.showModal = function(templateUrl) {
    $ionicModal.fromTemplateUrl(templateUrl, {
      scope: $scope
  }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
  });
  }
 
  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.modal.remove()
  };
 
$scope.updateSlideStatus = function(slide) {
    var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;
    if (zoomFactor == $scope.zoomMin) {
      $ionicSlideBoxDelegate.enableSlide(true);
    } else {
      $ionicSlideBoxDelegate.enableSlide(false);
    }
  };

})

.controller('MotionController', function($scope, $cordovaDeviceMotion, $ionicPlatform) {
  
   // watch Acceleration options
    $scope.options = { 
        frequency: 100, // Measure every 100ms
        deviation : 25  // We'll use deviation to determine the shake event, best values in the range between 25 and 30
    };
 
    // Current measurements
    $scope.measurements = {
        x : null,
        y : null,
        z : null,
        timestamp : null
    }
 
    // Previous measurements    
    $scope.previousMeasurements = {
        x : null,
        y : null,
        z : null,
        timestamp : null
    }   
 
    // Watcher object
    $scope.watch = null;
 
    // Start measurements when Cordova device is ready
    $ionicPlatform.ready(function() {
 
        //Start Watching method
        $scope.startWatching = function() {     
 
            // Device motion configuration
            $scope.watch = $cordovaDeviceMotion.watchAcceleration($scope.options);
 
            // Device motion initilaization
            $scope.watch.then(null, function(error) {
                console.log('Error');
            },function(result) {
 
                // Set current data  
                $scope.measurements.x = result.x;
                $scope.measurements.y = result.y;
                $scope.measurements.z = result.z;
                $scope.measurements.timestamp = result.timestamp;                 
 
                // Detecta shake  
                $scope.detectShake(result);  
 
            });     
        };      
 
        // Stop watching method
        $scope.stopWatching = function() {  
            $scope.watch.clearWatch();
        }       
 
        // Detect shake method      
        $scope.detectShake = function(result) { 
 
            //Object to hold measurement difference between current and old data
            var measurementsChange = {};
 
            // Calculate measurement change only if we have two sets of data, current and old
            if ($scope.previousMeasurements.x !== null) {
                measurementsChange.x = Math.abs($scope.previousMeasurements.x, result.x);
                measurementsChange.y = Math.abs($scope.previousMeasurements.y, result.y);
                measurementsChange.z = Math.abs($scope.previousMeasurements.z, result.z);
            }
 
            // If measurement change is bigger then predefined deviation
            if (measurementsChange.x + measurementsChange.y + measurementsChange.z > $scope.options.deviation) {
                $scope.stopWatching();  // Stop watching because it will start triggering like hell
                console.log('Shake detected'); // shake detected
                setTimeout($scope.startWatching(), 1000);  // Again start watching after 1 sex
 
                // Clean previous measurements after succesfull shake detection, so we can do it next time
                $scope.previousMeasurements = { 
                    x: null, 
                    y: null, 
                    z: null
                }               
 
            } else {
                // On first measurements set it as the previous one
                $scope.previousMeasurements = {
                    x: result.x,
                    y: result.y,
                    z: result.z
                }
            }           
 
        }       
 
    });
 
    $scope.$on('$ionicView.beforeLeave', function(){
        $scope.watch.clearWatch(); // Turn off motion detection watcher
    });

})

.controller('signupCtrl', function($scope) {

})

.controller('playListCtrl', ['$scope', 'Spotify', function ($scope, Spotify) {

    $scope.searchArtist = function () {
      Spotify.search($scope.searchartist, 'artist').then(function (data) {
        $scope.artists = data.artists.items;
      });
    };

    $scope.login = function () {
      Spotify.login().then(function (data) {
        console.log(data);
        alert("You are now logged in");
      }, function () {
        console.log('didn\'t log in');
      })
    };

    // Gets an album
    Spotify.getAlbum('0sNOF9WDwhWunNAHPD3Baj').then(function (data){
      console.log('=================== Album - ID ===================');
      console.log(data);
    });
    // Works with Spotify uri too
    Spotify.getAlbum('spotify:album:0sNOF9WDwhWunNAHPD3Baj').then(function (data){
      console.log('=================== Album - Spotify URI ===================');
      console.log(data);
    });

    //Get multiple Albums
    Spotify.getAlbums('41MnTivkwTO3UUJ8DrqEJJ,6JWc4iAiJ9FjyK0B59ABb4,6UXCm6bOO4gFlDQZV5yL37').then(function (data) {
      console.log('=================== Albums - Ids ===================');
      console.log(data);
    });
    Spotify.getAlbums(['41MnTivkwTO3UUJ8DrqEJJ','6JWc4iAiJ9FjyK0B59ABb4','6UXCm6bOO4gFlDQZV5yL37']).then(function (data) {
      console.log('=================== Albums - Array ===================');
      console.log(data);
    });


    Spotify.getAlbumTracks('41MnTivkwTO3UUJ8DrqEJJ').then(function (data) {
      console.log('=================== Album Tracks - ID ===================');
      console.log(data);
      $scope.tracks = data.items;
    });
    Spotify.getAlbumTracks('spotify:album:41MnTivkwTO3UUJ8DrqEJJ').then(function (data) {
      console.log('=================== Album Tracks - Spotify URI ===================');
      console.log(data);
    });



    //Artist
    Spotify.getArtist('0LcJLqbBmaGUft1e9Mm8HV').then(function (data) {
      console.log('=================== Artist - Id ===================');
      console.log(data);
    });
    Spotify.getArtist('spotify:artist:0LcJLqbBmaGUft1e9Mm8HV').then(function (data) {
      console.log('=================== Artist - Spotify URI ===================');
      console.log(data);
    });

    Spotify.getArtistAlbums('0LcJLqbBmaGUft1e9Mm8HV').then(function (data) {
      console.log('=================== Artist Albums - Id ===================');
      console.log(data);
    });

    Spotify.getArtistAlbums('spotify:artist:0LcJLqbBmaGUft1e9Mm8HV').then(function (data) {
      console.log('=================== Artist Albums - Spotify URI ===================');
      console.log(data);
    });

    Spotify.getArtistTopTracks('0LcJLqbBmaGUft1e9Mm8HV', 'AU').then(function (data) {
      console.log('=================== Artist Top Tracks Australia ===================');
      console.log(data);
    });

    Spotify.getRelatedArtists('0LcJLqbBmaGUft1e9Mm8HV').then(function (data) {
      console.log('=================== Get Releated Artists ===================');
      console.log(data);
    });


    //Tracks
    Spotify.getTrack('0eGsygTp906u18L0Oimnem').then(function (data) {
      console.log('=================== Track ===================');
      console.log(data);
    });

    Spotify.getTracks('0eGsygTp906u18L0Oimnem,1lDWb6b6ieDQ2xT7ewTC3G').then(function (data) {
      console.log('=================== Tracks - String ===================');
      console.log(data);
    });

    Spotify.getTracks(['0eGsygTp906u18L0Oimnem','1lDWb6b6ieDQ2xT7ewTC3G']).then(function (data) {
      console.log('=================== Tracks - Array ===================');
      console.log(data);
    });




    //playList
    Spotify.getPlaylistTracks('11100513684', 'CognizantFest').then(function (data) {
      console.log('=================== Playlist Tracks - Array ===================');
      console.log(data);
    })

  }])

.controller('mapCtrl', function($scope) {

})

.controller('cameraPhotosCtrl', function($scope) {

})
