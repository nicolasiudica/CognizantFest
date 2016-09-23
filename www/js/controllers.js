angular.module('app.controllers', [])
	
.controller('homeCtrl', function($scope, $state) {
	
})
	 
.controller('gamesCtrl', function($scope, $state) {

})
	 
.controller('drinksCtrl', function($scope, $state, $cordovaVibration) {

	$scope.items = [
  {
    src: 'img/beer.png',
    sub: '<b>Daikiri ingredients are rum, strawberry and sugar.</b>'
  }, 
  {
    src: 'img/cubalibre.png',
    sub: '<b>Daikiri ingredients are rum, strawberry and sugar.</b>'
  }, 
  {
    src: 'img/fernet.png',
    sub: '<b>Daikiri ingredients are rum, strawberry and sugar.</b>'
  }, 
  {
    src: 'img/gintonic.png',
    sub: '<b>Daikiri ingredients are rum, strawberry and sugar.</b>'
  }, 
  {
    src: 'img/daikiri.png',
    sub: '<b>Daikiri ingredients are rum, strawberry and sugar.</b>'
  }, 
  {
    src: 'img/screwdriver.png',
    sub: '<b>Daikiri ingredients are rum, strawberry and sugar.</b>'
  }, 
  {
    src: 'img/margarita.png',
    sub: '<b>Daikiri ingredients are rum, strawberry and sugar.</b>'
  }];

var onShake = function () {
  $('#pruebaShake').html("<strong>SHAKE DETECTADO</strong>");
  $cordovaVibration.vibrate(300);
  //var url = randomDrink(cantidadTragos);
  //$('#pruebaShake').html("<strong>URL: " + url + "</strong>");
};

var onError = function () {
  $('#pruebaShake').html("<strong>ERROR DETECTADO</strong>");
  // Fired when there is an accelerometer error (optional)
};

// Start watching for shake gestures and call "onShake"
// with a shake sensitivity of 40 (optional, default 30)
shake.startWatch(onShake, 30 , onError);

 //defino la cantidad de tragos y los nombres
var cantidadTragos = 9;
//este es el resultado rel return, puede ser la imagen o una url, o un div, depende de como se haga la interfaz
trago1 = "img/cerveza.jpg";
trago2 = "img/martini.jpg";
trago3 = "img/daikiri.jpg";
trago4 = "img/margarita.jpg";
trago5 = "img/cubalibre.jpg";
trago6 = "img/tequilaSunrise.jpg";
trago7 = "img/fernet.jpg";
trago8 = "img/gintonic.jpg";
trago9 = "img/destornillador.jpg";
//ejecuto la funcion para elegir el trago luego de que se detecte el shake event
function randomDrink(cantidadTragos){
  var idTrago = Math.floor((Math.random() * cantidadTragos) + 1);
  switch(idTrago) {
    case 1:
    tragoAleatorio = trago1;
    break;
    case 2:
    tragoAleatorio = trago2;
    break;
    case 3:
    tragoAleatorio = trago3;
    break;
    case 4:
    tragoAleatorio = trago4;
    break;
    case 5:
    tragoAleatorio = trago5;
    break;
    case 6:
    tragoAleatorio = trago6;
    break;
    case 7:
    tragoAleatorio = trago7;
    break;
    case 8:
    tragoAleatorio = trago8;
    break;
    case 9:
    tragoAleatorio = trago9;
    break;
    case 10:
    tragoAleatorio = trago10;
    break;
    }
  return tragoAleatorio;
}



})
			
.controller('signupCtrl', function($scope, $state) {

})
	 
.controller('playListCtrl', function($scope, $state) {

})
	 
.controller('mapCtrl', function($scope,$state,$cordovaGeolocation) {

})
	 
.controller('cameraPhotosCtrl', function($scope) {

})
