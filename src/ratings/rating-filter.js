(function () {
	'use strict';

	var app = angular.module('app');

	app.filter('rating', function () {
		return function (rating) {
			return rating ?
				'Rated ' + rating + ' of 5 stars' : // TODO: generalize num stars
				'Not yet rated';
		}
	});

}());