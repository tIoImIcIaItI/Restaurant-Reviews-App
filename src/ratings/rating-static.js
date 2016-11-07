/*globals angular */

(function () {
	'use strict';

	var app = angular.module('app');

	app.directive('ratingStatic', ['$compile', function ($compile) {

		function getDigit(isRated) {
			return isRated ?
				'<i class="fa fa-star"   aria-hidden="true"></i>' :
				'<i class="fa fa-star-o" aria-hidden="true"></i>';
		}

		function getTemplate(rating, max) {
			max = max || 5;

			var res = '';

			for (var i = 1; i <= max; i++) {
				var isRated = i <= rating;
				res += getDigit(isRated);
			}

			return res;
		}

		function render(scope, element) {

			element.html(getTemplate(scope.rating)).show();

			$compile(element.contents())(scope);
		}

		function linker(scope, element, attrs) {

			render(scope, element, attrs);

			scope.$watch(attrs.rating,
				function (newValue, oldValue) {
					if (newValue !== oldValue) {
						render(scope, element, attrs);
					}
				});
		}

		var controller = [
			'$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
				var self = this;

				self._lastRating = $scope.rating;

				self.$doCheck = function () {

					if ($scope.rating !== self._lastRating) {

						render($scope, $element, $attrs);

						self._lastRating = $scope.rating;
					}
				}

			}];

		return {
			scope: {
				rating: '='
			},
			controller: controller,
			restrict: 'AE',
			replace: true,
			link: linker
		};
	}]);
}());