/*var dataURItoBlob = function(dataURI) {
    alert('data to uri');
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {
        type: 'image/png'
    });
}
*/
angular.module('app.services', ['ngCordova'])

// Days countdown to the party

.service('DaysLeftCounter', [function(){

	this.day = function(){

		var today = new Date();
		var PartyDay = new Date("November 10, 2016");

		// Milisegundos en un dia
		const msDay = 24 * 60 * 60 * 1000;
		// Tiempo en milisegundos que falatan para la fiesta
		var timeLeft = (PartyDay.getTime() - today.getTime());
		var daysLeft = Math.floor(timeLeft / msDay);

		return {
			daysLeft: function() {
			  return daysLeft;
			},
			partyDay: function() {
				return PartyDay;
			}
		}
	}

}])

.service('UserService', function() {
    //for the purpose of this example I will store user data on ionic local storage but you should save it on a database
    var setUser = function(user_data) {
        window.localStorage.starter_facebook_user = JSON.stringify(user_data);
    };

    var getUser = function(){
        return JSON.parse(window.localStorage.starter_facebook_user || '{}');
    };

    return {
        getUser: getUser,
        setUser: setUser
    };
})

.service('PostImageToFacebook', [function(){
	return{
		postInFB(authToken){
			 var canvas = document.getElementById("c");
    var imageData = canvas.toDataURL("image/png");
    try {
        alert('face try');
        var blob = function(dataURI) {
                alert('data to uri');
                var byteString = atob(dataURI.split(',')[1]);
                var ab = new ArrayBuffer(byteString.length);
                var ia = new Uint8Array(ab);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                return new Blob([ab], {
                    type: 'image/png'
                });
            }
        

        
    } catch (e) {
        console.log(e);
    }
    var fd = new FormData();
    fd.append("access_token", authToken);
    fd.append("source", blob);
    fd.append("message", "Posteado desde CogniFest");
    try {
        alert('try ajax');
        $.ajax({
            url: "https://graph.facebook.com/180129755744867/photos?access_token=" + authToken,
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            cache: false,
            success: function (data) {
                alert('success try');
                console.log("success " + data);
                $("#poster").html("Posted Canvas Successfully");
            },
            error: function (shr, status, data) {
                alert('error try ' + data + ' ' + shr.status);
                console.log("error " + data + " Status " + shr.status);
            },
            complete: function () {
                alert('complete try');
                console.log("Posted to facebook");
            }
        });

    } catch (e) {
        console.log(e);
        alert('catch' + e);
    }
		}
	}
}])

.service('loginFBService', [function(){
            	
    $.ajaxSetup({ cache: true });
	$.getScript('js/sdk.js', function(){
		alert('get script');
        FB.init({
          appId: '551371951570061',
          cookie: true, // set sessions cookies to allow your server to access the session?
          xfbml: true, // parse XFBML tags on this page?
          frictionlessRequests: true,
          oauth: true,
          version: 'v2.5' // or v2.0, v2.1, v2.2, v2.3
        }); 

        FB.login(function (response) {
            alert('fb login');
            if (response.authResponse) {
            	var access_token = FB.getAuthResponse()['accessToken'];
    				console.log('Access Token = '+ access_token);
                window.authToken = response.authResponse.accessToken;
            } else {
                alert('no response');
            }
        }, {
            scope: 'publish_actions'
        });

    });

    // Populate the canvas
    var c = document.getElementById("c");
    var ctx = c.getContext("2d");

    ctx.font = "20px Georgia";
    ctx.fillText("Posted to Facebook", 10, 50);

    //alert('token ' + access_token);

}])

.service('BlankService', [function(){

}]);

