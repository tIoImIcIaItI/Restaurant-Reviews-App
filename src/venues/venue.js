/*globals angular, moment */

(function () {
	'use strict';

	var app = angular.module('app');

	app.directive('venue',
		function () {
			return {
				transclude: true,
				scope: false,
				templateUrl: '/venues/venue.html'
			}
		});

}());