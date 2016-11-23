angular
	.module('app.controllers', []);

angular
	.module('app.controllers')

.controller('photosCtrl', ['FirebaseDB', '$scope', '$timeout',
						   function (FirebaseDB, $scope, $timeout) {
		var databaseRef = FirebaseDB.database().ref("CogniFest/photos");
		$scope.loadedImages = [];

		// Watching for imageloaded event to later start autoplaying when all loaded
		$scope.$on('imageloaded', function (evt, data) {
			//console.log("imageloaded", evt, data)
			$scope.loadedImages.push(data);
			console.log("----> Loaded", $scope.loadedImages.length, "images");
			$scope.$apply();
		});

		$scope.$watchCollection('loadedImages', function (newVal, oldVal, scope) {
			var status = areAllLoaded(newVal.length);
			console.log("loaded status", status);
			if (status) {
				console.log("Since all photos are loaded, start autoplay");
				forceStartAutoplay($scope.data.sliderDelegate);
			}
		}, true);

		function updateSlideCounter(swiper) {
			console.log("Updating counter");
			if (!swiper) {
				console.log("No swiper instance received", swiper);
				return;
			}
			var currentIndex = swiper.activeIndex;
			var totalIndex = $scope.data.firebasePhotos.length;
			console.log("Current index:", currentIndex, "Total index:", totalIndex);
			$scope.data.currentIndex = currentIndex + 1;
			$scope.data.totalIndex = totalIndex;
			$scope.$apply();
		}

		function areAllLoaded(loadedLength) {
			var totalLength = $scope.data.firebasePhotos.length;
			var status = (loadedLength === totalLength);
			console.log("loaded", loadedLength, "total", totalLength);
			return status;
		}

		function forceStartAutoplay(sliderDelegate) {
			$timeout(sliderDelegate.stopAutoplay())
				.then(sliderDelegate.startAutoplay());
		}

		$scope.data = {};
		$scope.data.firebasePhotos = [];

		// Watching for new pictures
		databaseRef.on("value", function (snapshot) {
			var firebasePhotos = [];
			// Load all pictures into an array...
			console.log("Load all pictures into an array...");
			snapshot.forEach(function (childsnap) {
				firebasePhotos.push({
					owner: childsnap.child('owner').val(),
					src: childsnap.child('src').val(),
					time: childsnap.child('time').val()
				});
			});
			// ...so now I can see how many are new and separate them...
			console.log("...so now I can see how many are new and separate them...");
			var newPhotos = _.differenceBy(firebasePhotos, $scope.data.firebasePhotos, 'src');
			// ...to later add them to the $scope...
			console.log("...to later add them to the $scope...");
			newPhotos.forEach(function (newPhoto) {
				$scope.data.firebasePhotos.push(newPhoto);
			});
			// ...and update the slide counter...
			console.log("...and update the slide counter...");
			$scope.data.sliderDelegate.on('slideChangeStart', updateSlideCounter);
			$scope.data.sliderDelegate.on('slideChangeEnd', updateSlideCounter);
			$scope.data.sliderDelegate.on('init', updateSlideCounter);
			// ...and the slider instance.
			console.log("...and the slider instance.");
			$timeout($scope.$apply())
				.then($scope.data.sliderDelegate.update());

			console.log("---> Gallery has", $scope.data.firebasePhotos.length, "images", $scope.data.firebasePhotos);
		});

		$scope.data.sliderOptions = {
			effect: 'coverflow',
			grabCursor: true,
			centeredSlides: true,
			initialSlide: 0,
			loop: false,
			speed: 2000,
			autoplay: 1000,
			autoplayDisableOnInteraction: false,
			autoplayStopOnLast: true,
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