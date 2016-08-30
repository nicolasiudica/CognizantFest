angular.module('app.services', [])

/*.factory("Gallery", function($firebaseArray) {
    var firebase = new Firebase("https://cognizantfest.firebaseio.com/gallery");    
    return $firebaseArray(itemsRef);
})*/

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

