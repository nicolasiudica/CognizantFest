angular.module('app.controllers', [])

.controller('homeCtrl', function($scope) {
})

.controller('gamesCtrl', function($scope) {
})

.controller('drinksCtrl', function($scope) {
})

.controller('SignUpCtrl', function($scope, $state, UserService, $ionicLoading) {
    //This method is executed when the user press the "Login with Google" button
    /*$scope.googleSignIn = function() {
        $ionicLoading.show({
            template: 'Logging in...'
        });

        window.plugins.googleplus.login(
            {},
            function (user_data) {
            console.log(user_data);

            //for the purpose of this example I will store user data on local storage
            UserService.setUser({
                userID: user_data.userId,
                name: user_data.displayName,
                email: user_data.email,
                picture: user_data.imageUrl,
                accessToken: user_data.accessToken,
                idToken: user_data.idToken
            });

            $ionicLoading.hide();
            $state.go('menu.logged');
        },
        function (msg) {
            $ionicLoading.hide();
            console.log(msg);
        });
    };*/
})

.controller('LoggedCtrl', function($scope, UserService, $ionicActionSheet, $state, $ionicLoading){

	/*$scope.user = UserService.getUser();

	$scope.showLogOutMenu = function() {
		var hideSheet = $ionicActionSheet.show({
			destructiveText: 'Logout',
			titleText: 'Are you sure you want to logout?',
			cancelText: 'Cancel',
			cancel: function() {},
			buttonClicked: function(index) {
				return true;
			},
			destructiveButtonClicked: function(){
				$ionicLoading.show({
					template: 'Logging out...'
				});
				//google logout
				window.plugins.googleplus.logout(
					function (msg) {
						console.log(msg);
						$ionicLoading.hide();
						$state.go('signup');
					},
					function(fail){
						console.log(fail);
					}
				);
			}
		});
	};*/
})

.controller('TwitterCtrl', function($scope, $ionicPlatform, TwitterService) {//$twitterApi, $cordovaOauth    
    // 1
    $scope.correctTimestring = function(string) {
        return new Date(Date.parse(string));
    };
    // 2
    $scope.showHomeTimeline = function() {
        $scope.home_timeline = TwitterService.getHomeTimeline();
    };
    // 3
    $scope.doRefresh = function() {
        $scope.showHomeTimeline();
        $scope.$broadcast('scroll.refreshComplete');
    };
    // 4
    $ionicPlatform.ready(function() {
        if (TwitterService.isAuthenticated()) {
            console.log('showHomeTimeline IS AUTH');
            $scope.showHomeTimeline();
        } else {
            TwitterService.initialize().then(function(result) {
                if(result === true) {
                    console.log('showHomeTimeline NO AUTH');
                    $scope.showHomeTimeline();
                }
            });
        }
    });
    
    /*var twitterKey = 'STORAGE.TWITTER.KEY';
    var clientId = 'B9NilAbzVeKLaUfCPEljSgWfj';
    var clientSecret = 'xgy14kMLWmCjm8CH3WpXam95bWHccGU6OPmSiTDIoY2SEOLxVY';
    var myToken = '';

    $scope.tweet = {};

    // Automatically start the OAuth dialog if no token was found
    $ionicPlatform.ready(function() {
        alert('AUTH READY ' + myToken);
        myToken = JSON.parse(window.localStorage.getItem(twitterKey));
        if (myToken==='' || myToken===null) {
            $cordovaOauth.twitter(clientId, clientSecret).then(function (succ) {
                alert('AUTH SUCCESS ' + succ);
                myToken = succ;
                window.localStorage.setItem(twitterKey, JSON.stringify(succ));
                $twitterApi.configure(clientId, clientSecret, succ);
                $scope.showHomeTimeline();
            }, function(error) {
                console.log(error);
                alert('ERROR AUTH: ' + error);
            });
        } else {
            alert('SHOW TIMELINE');
            $twitterApi.configure(clientId, clientSecret, myToken);
            $scope.showHomeTimeline();
        }
    });

    // Load your home timeline
    $scope.showHomeTimeline = function() {
        $twitterApi.getHomeTimeline().then(function(data) {
            $scope.home_timeline = data;
        });
    };

    // Post a tweet
    $scope.submitTweet = function() {
        $twitterApi.postStatusUpdate($scope.tweet.message).then(function(result) {
            $scope.showHomeTimeline();
        });
    }

    // Pull-to-refresh
    $scope.doRefresh = function() {
        $scope.showHomeTimeline();
        $scope.$broadcast('scroll.refreshComplete');
    };

    // Display the correct date from Twitter response
    $scope.correctTimestring = function(string) {
        return new Date(Date.parse(string));
    };*/
})

.controller('mapCtrl', function($scope) {
    console.log('map controller');
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
        
        //Gets the picture encoded in base64 that will be shown in the <img> tag
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + $scope.img;            
            ref.push({src:$scope.imgURI, sub:""});            
        }, function (error) {
            // An error occured. Show a message to the user
        });        
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
