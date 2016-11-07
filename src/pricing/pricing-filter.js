(function () {
	'use strict';

	var app = angular.module('app');

	app.filter('pricing', function () {
		return function (pricing) {
			var names = ['Inexpensive', 'Moderatley Priced', 'Expensive'];
			return names[pricing - 1];
		}
	});

}());