angular.module('app.controllers', [])

.controller('photosCtrl', function ($scope, $timeout) {
	$scope.data = {};
	$scope.data.firebasePhotos = [];

	// Initialize Firebase
	$scope.data.firebaseConfig = {
		apiKey: "AIzaSyAg3pKHvhfXu1xps06opGqcO05v5yfRS2E",
		authDomain: "cognifest-b13f9.firebaseapp.com",
		databaseURL: "https://cognifest-b13f9.firebaseio.com",
		storageBucket: "cognifest-b13f9.appspot.com",
		messagingSenderId: "57670734851"
	};

	firebase.initializeApp($scope.data.firebaseConfig);

	$scope.firebaseRef = firebase.database().ref("/photo");

	$scope.firebaseRef.on("value", function (snapshot) {
		var firebasePhotos = [];

		snapshot.forEach(function (childsnap) {
			firebasePhotos.push({
				src: childsnap.child('src').val(),
				time: childsnap.child('time').val()
			});
		});

		var newPhotos = _.differenceBy(firebasePhotos, $scope.data.firebasePhotos, 'src');

		newPhotos.forEach(function (newPhoto) {
			$scope.data.firebasePhotos.push(newPhoto);
		});

		$timeout($scope.$apply())
			.then($scope.data.sliderDelegate.update())
			.then($scope.data.sliderDelegate.slideTo(0))
			.then($scope.data.sliderDelegate.slideNext());

		console.log("---> Gallery has", $scope.data.firebasePhotos.length, "images", $scope.data.firebasePhotos);
	});

	$scope.data.sliderOptions = {
		effect: 'coverflow',
		grabCursor: true,
		centeredSlides: true,
		initialSlide: 0,
		loop: true,
		speed: 500,
		autoplay: 1000,
		autoplayDisableOnInteraction: false,
		coverflow: {
			rotate: 50,
			stretch: 0,
			depth: 100,
			modifier: 1,
			slideShadows: false
		}
	};

	$scope.data.sliderDelegate = null;
});