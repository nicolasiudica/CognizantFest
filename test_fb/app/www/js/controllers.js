angular.module('app.controllers', [])

.controller('LoginCtrl', function($scope, $state, $q, UserService, $ionicLoading) {
    // This is the success callback from the login method
    var fbLoginSuccess = function(response) {
    if (!response.authResponse){
      fbLoginError("Cannot find the authResponse");
      return;
    }

    var authResponse = response.authResponse;

    getFacebookProfileInfo(authResponse).then(function(profileInfo) {
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
            console.log('profile info fail', fail);
        });
    };

    // This is the fail callback from the login method
    var fbLoginError = function(error){
        console.log('fbLoginError', error);
        $ionicLoading.hide();
    };

    // This method is to get the user profile info from the facebook api
    var getFacebookProfileInfo = function (authResponse) {
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
    $scope.facebookSignIn = function() {
        facebookConnectPlugin.getLoginStatus(function(success){
        if (success.status === 'connected'){
            // The user is logged in and has authenticated your app, and response.authResponse supplies
            // the user's ID, a valid access token, a signed request, and the time the access token
            // and signed request each expire
            console.log('getLoginStatus', success.status);

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
						picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
				    });

				    $state.go('app.home');
					}, function(fail){
						// Fail get profile info
						console.log('profile info fail', fail);
					});
				}else{
					$state.go('app.home');
				}
        } else {
            // If (success.status === 'not_authorized') the user is logged in to Facebook,
			// but has not authenticated your app
            // Else the person is not logged into Facebook,
            // so we're not sure if they are logged into this app or not.

			console.log('getLoginStatus', success.status);

			$ionicLoading.show({
                template: 'Logging in...'
            });

			// Ask the permissions you need. You can learn more about
            // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
            facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
        }
    });
  };
    
    
    /*window.fbAsyncInit = function() {
        FB.init({
            appId : '551371951570061',
            xfbml      : true,
            version    : 'v2.7'
        });
    };
    
    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));*/

    
    /*
    var twitterKey = 'STORAGE.TWITTER.KEY';
    var clientId = 'B9NilAbzVeKLaUfCPEljSgWfj';
    var clientSecret = 'xgy14kMLWmCjm8CH3WpXam95bWHccGU6OPmSiTDIoY2SEOLxVY';
    var myToken = '';

    $scope.tweet = {};

    // Automatically start the OAuth dialog if no token was found
    $ionicPlatform.ready(function() {
        myToken = JSON.parse(window.localStorage.getItem(twitterKey));
        if (myToken==='' || myToken===null) {
            $cordovaOauth.twitter(clientId, clientSecret).then(function (succ) {
                myToken = succ;
                window.localStorage.setItem(twitterKey, JSON.stringify(succ));
                $twitterApi.configure(clientId, clientSecret, succ);
                $scope.showHomeTimeline();
            }, function(error) {
                console.log(error);
            });
        } else {
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
        $twitterApi.postStatusUpdateImage($scope.tweet.message).then(function(result) {
            alert("TWEETED!!!");
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
    };
    */
    
    
    
    /*$scope.correctTimestring = function(string) {
        return new Date(Date.parse(string));
    };
    
    $scope.showHomeTimeline = function() {
        $scope.home_timeline = TwitterService.getHomeTimeline();
    };
    
    $scope.doRefresh = function() {
        $scope.showHomeTimeline();
        $scope.$broadcast('scroll.refreshComplete');
    };
    
    $ionicPlatform.ready(function() {
        if (TwitterService.isAuthenticated()) {
            $scope.showHomeTimeline();
        } else {
            TwitterService.initialize().then(function(result) {
                if (result === true) {
                    $scope.showHomeTimeline();
                }
            });
        }
    });*/
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
