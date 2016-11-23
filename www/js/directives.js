angular.module('app.directives', [])

.directive('imgPreload', ['$rootScope', function ($rootScope) {
	return {
		restrict: 'A',
		transclude: true,
		scope: {
			ngSrc: '@'
		},
		link: function (scope, element, attrs) {
			// triggered after each item is loaded
			function onProgress(imgLoad, image) {
				//console.log("onProgress", imgLoad, image);
				// change class if the image is loaded or broken
				var $item = $(image.img).parent();
				$item.removeClass('is-loading');
				if (!image.isLoaded) {
					$item.addClass('is-broken');
				}
				var result = image.isLoaded ? 'loaded' : 'broken';
				//console.log('image is ' + result + ' for ' + image.img.src);
			}

			function onAlways(imgLoad) {
				console.log(imgLoad.images.length + ' images loaded');
				// detect which image is broken
				//for (var i = 0, len = imgLoad.images.length; i < len; i++) {
				//	var image = imgLoad.images[i];
				//	var result = image.isLoaded ? 'loaded' : 'broken';
				//	console.log('image is ' + result + ' for ' + image.img.src);
				//}
			}

			function onDone(imgLoad) {
				//console.log("image correctly loaded");
				$rootScope.$broadcast('imageloaded', imgLoad.images[0].img.src);
			}

			element.imagesLoaded()
			//	.always(onAlways)
				.done(onDone)
				.fail(function () {
					console.log('all images loaded, at least one is broken');
				})
				.progress(onProgress);
			//.progress(onProgress)
			//.always(onAlways);
			//element.bind('load', function () {
			//	//call the function that was passed
			//	scope.$apply(attrs.imageonload);
			//});
			//scope.$watch('ngSrc', function (newVal) {
			//	scope.$apply(attrs.imgPreload);
			//});
		}
	};
}]);