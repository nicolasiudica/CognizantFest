angular.module('app.controllers', [])

.controller('homeCtrl', function($scope) {
})

.controller('gamesCtrl', function($scope) {
})

.controller('drinksCtrl', function($scope) {
})

.controller('LoginCtrl', function($scope, $state, $q, UserService, $ionicLoading){
    // This is the success callback from the login method
    var fbLoginSuccess = function(response){
        if (!response.authResponse){
            fbLoginError("Cannot find the authResponse");
            return;
        }

        var authResponse = response.authResponse;

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
            $state.go('app.home');
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
        facebookConnectPlugin.getLoginStatus(function(success){
            if (success.status === 'connected'){
                // The user is logged in and has authenticated your app, and response.authResponse supplies
                // the user's ID, a valid access token, a signed request, and the time the access token
                // and signed request each expire
                alert('getLoginStatus ' + success.status);

                // Check if we have our user saved
                var user = UserService.getUser('facebook');

                if (!user.userID){
                    getFacebookProfileInfo(success.authResponse).then(function(profileInfo) {
                        // For the purpose of this example I will store user data on local storage
                        UserService.setUser({
                            authResponse: success.authResponse,
                            userID: profileInfo.id,
                            name: profileInfo.name,
                            email: profileInfo.email,
                            picture: "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
                        });

                        $state.go('app.home');
                    }, function(fail){
                            // Fail get profile info
                            alert('profile info fail ' + fail);
                       });
                }else{
                    $state.go('app.home');
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
