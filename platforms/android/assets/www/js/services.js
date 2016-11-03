angular.module('app.services', ['ngCordova'])

// Days countdown to the party
.service('DaysLeftCounter', function () {

	this.day = function () {

		var today = new Date();
		var PartyDay = new Date("November 25, 2016");

		// Milisegundos en un dia
		const msDay = 24 * 60 * 60 * 1000;
		// Tiempo en milisegundos que falatan para la fiesta
		var timeLeft = (PartyDay.getTime() - today.getTime());
		var daysLeft = Math.floor(timeLeft / msDay);

		return {
			daysLeft: function () {
				return daysLeft;
			},
			partyDay: function () {
				return PartyDay;
			},
			now: function () {
				return today.getTime();
			}
		};
	};
})

.factory('FileService', function () {
	var images;
	var IMAGE_STORAGE_KEY = 'CogniFest/photos';

	function getImages() {
		var img = window.localStorage.getItem(IMAGE_STORAGE_KEY);
		if (img) {
			images = JSON.parse(img);
		} else {
			images = [];
		}
		return images;
	}

	function addImage(img) {
		images.push(img);
		window.localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(images));
	}

	return {
		storeImage: addImage,
		images: getImages
	};
})

.factory('ImageService', function ($cordovaCamera, FileService, $q, $cordovaFile) {

	function makeid() {
		var text = '';
		var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		for (var i = 0; i < 5; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	};

	function options() {
		return {
			quality: 90,
			destinationType: Camera.DestinationType.FILE_URI,
			sourceType: Camera.PictureSourceType.CAMERA,
			allowEdit: false,
			encodingType: Camera.EncodingType.JPEG,
			mediaType: Camera.MediaType.PICTURE,
			popoverOptions: CameraPopoverOptions,
			saveToPhotoAlbum: true,
			correctOrientation: true
		};
	}

	function saveMedia() {
		return $q(function (resolve, reject) {
			var options = options();

			$cordovaCamera
				.getPicture(options)
				.then(function (imageUrl) {
					var name = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
					var namePath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
					var newName = makeid() + name;
					$cordovaFile.copyFile(namePath, name, cordova.file.dataDirectory, newName)
						.then(function (info) {
							FileService.storeImage(newName);
							resolve();
						}, function (e) {
							reject();
						});
				});
		})
	}
	return {
		handleMediaDialog: saveMedia
	}
})

.service('BlankService', [function () {

}]);