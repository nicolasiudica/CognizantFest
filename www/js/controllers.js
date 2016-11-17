angular
	.module('app.controllers', []);

angular
	.module('app.controllers')

.controller('photosCtrl', ['FirebaseDB', '$scope', '$timeout',
						   function (FirebaseDB, $scope, $timeout) {

		var databaseRef = FirebaseDB.database().ref("CogniFest/photos");

		$scope.data = {};
		$scope.data.firebasePhotos = [];

		databaseRef.on("value", function (snapshot) {
			var firebasePhotos = [];

			snapshot.forEach(function (childsnap) {
				firebasePhotos.push({
					owner: childsnap.child('owner').val(),
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
}]);