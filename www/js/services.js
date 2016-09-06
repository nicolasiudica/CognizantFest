angular.module('app.services', [])

/*.factory("Gallery", function($firebaseArray) {
    var firebase = new Firebase("https://cognizantfest.firebaseio.com/gallery");    
    return $firebaseArray(itemsRef);
})*/

.factory('TwitterService', function($cordovaOauth, $cordovaOauthUtility, $http, $resource, $q) {
    // 1
    var twitterKey = 'STORAGE.TWITTER.KEY';
    var clientId = 'B9NilAbzVeKLaUfCPEljSgWfj';
    var clientSecret = 'xgy14kMLWmCjm8CH3WpXam95bWHccGU6OPmSiTDIoY2SEOLxVY';

    // 2
    function storeUserToken(data) {
        window.localStorage.setItem(twitterKey, JSON.stringify(data));
    }

    function getStoredToken() {
        return window.localStorage.getItem(twitterKey);
    }

    // 3
    function createTwitterSignature(method, url) {
        alert('createTwitterSignature');
        var token = angular.fromJson(getStoredToken());
        var oauthObject = {
            oauth_consumer_key: clientId,
            oauth_nonce: $cordovaOauthUtility.createNonce(10),
            oauth_signature_method: "HMAC-SHA1",
            oauth_token: token.oauth_token,
            oauth_timestamp: Math.round((new Date()).getTime() / 1000.0),
            oauth_version: "1.0"
        };
        var signatureObj = $cordovaOauthUtility.createSignature(method, url, oauthObject, {}, clientSecret, token.oauth_token_secret);
        $http.defaults.headers.common.Authorization = signatureObj.authorization_header;
    }

    return {
        // 4
        initialize: function() {
            var deferred = $q.defer();
            var token = getStoredToken();
            alert('TOKEN ' + token);
            if (token !== null) {
                deferred.resolve(true);
            } else {
                $cordovaOauth.twitter(clientId, clientSecret).then(function(result) {
                    storeUserToken(result);
                    deferred.resolve(true);
                    alert('INITIALIZE TWITTER' + result);
                }, function(error) {
                    alert('INITIALIZE TWITTER ERROR ' + error);
                    deferred.reject(false);
                });
            }            
            
            return deferred.promise;
        },
        // 5
        isAuthenticated: function() {
            console.log('isAuthenticated ' + (getStoredToken()!==null));
            return getStoredToken() !== null;
        },
        // 6
        getHomeTimeline: function() {
            console.log('getHomeTimeline');
            var home_tl_url = 'https://api.twitter.com/1.1/statuses/home_timeline.json';
            createTwitterSignature('GET', home_tl_url);
            return $resource(home_tl_url).query();
        },
        storeUserToken: storeUserToken,
        getStoredToken: getStoredToken,
        createTwitterSignature: createTwitterSignature
    };
})

.service('UserService', function() {
    //for the purpose of this example I will store user data on ionic local storage but you should save it on a database
    var setUser = function(user_data) {
        window.localStorage.starter_google_user = JSON.stringify(user_data);
    };

    var getUser = function(){
        return JSON.parse(window.localStorage.starter_google_user || '{}');
    };

    return {
        getUser: getUser,
        setUser: setUser
    };
})

.factory('Camera', [function($q){

}])

.service('BlankService', [function(){

}]);

