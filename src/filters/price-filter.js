/*globals angular, moment */

(function () {
	'use strict';

	var app = angular.module('app');

	app.directive('priceFilter',
		function () {
			return {
				transclude: true,
				scope: false,
				templateUrl: '/filters/priceFilter.html'
			}
		});

}());