/*globals angular */

(function () {
	'use strict';

	var app = angular.module('app');

	app.directive('pricingStatic', ['$compile', function ($compile) {

		function getTemplate(pricing) {
			var res = '';
			for (var i = 0; i < pricing; i++) {
				res += '<i class="fa fa-usd" aria-hidden="true"></i>';
			}
			return res;
		}

		function render(scope, element) {

			element.html(getTemplate(scope.pricing)).show();

			$compile(element.contents())(scope);
		}

		function linker(scope, element, attrs) {

			render(scope, element, attrs);

			scope.$watch(attrs.pricing,
				function (newValue, oldValue) {
					if (newValue !== oldValue) {
						render(scope, element, attrs);
					}
				});
		};

		return {
			scope: {
				pricing: '='
			},
			restrict: 'AE',
			replace: true,
			link: linker
		};
	}]);
}());