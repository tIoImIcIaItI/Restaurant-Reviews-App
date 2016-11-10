/*globals angular, moment */

(function () {
	'use strict';

	var app = angular.module('app');

	app.directive('ratingFilter',
		function () {
			return {
				transclude: true,
				scope: false,
				templateUrl: '/filters/ratingFilter.html'
			}
		});

}());