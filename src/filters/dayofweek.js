(function () {
	'use strict';

	var app = angular.module('app');

	app.filter('dayOfWeek', function () {
		return function (dow) {
			//var names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
			var shortNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
			return shortNames[dow - 1];
		}
	});

}());