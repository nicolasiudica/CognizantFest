angular.module('app.controllers', [])

.controller('TwitterCtrl', function($scope, $ionicPlatform, $twitterApi, $cordovaOauth) {
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
        alert("TWEETING...");
        $twitterApi.postStatusUpdateImage($scope.tweet.message).then(function(result) {
            alert("TWEETED!!!");
            $scope.showHomeTimeline();
        }, function(error) {
                alert("IMAGE: ", error);
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
