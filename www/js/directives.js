"use strict";

angular.module('app.directives', [])

//.directive('overwriteEmail', [function () {
//	var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@cognizant\.com$/i;
//
//	return {
//		require: '?ngModel',
//		link: function (scope, elm, attrs, ctrl) {
//			// only apply the validator if ngModel is present and Angular has added the email validator
//			if (ctrl && ctrl.$validators.email) {
//
//				// this will overwrite the default Angular email validator
//				ctrl.$validators.email = function (modelValue) {
//					return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
//				};
//			}
//		}
//	};
//}])

.directive('blankDirective', [function () {

}]);