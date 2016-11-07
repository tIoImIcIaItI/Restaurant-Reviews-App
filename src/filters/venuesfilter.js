(function () {
	'use strict';

	var app = angular.module('app');

	app.filter('venuesFilter', [function () {
		return function (inputArray, ratingFilter, priceFilterBitMask) {

			function priceBits(price) {
				var res = 0;
				switch (price) {
					case 1:
						res = 1;
						break;
					case 2:
						res = 2;
						break;
					case 3:
						res = 4;
						break;
				}
				return res;
			};

			function byRating(e) { return ratingFilter > 0 ? isNaN(e.rating) || (e.rating >= ratingFilter) : true; }

			function byPricing(e) { return priceFilterBitMask > 0 ? priceBits(e.pricing) & priceFilterBitMask : true; }

			return inputArray.
				filter(byRating).
				filter(byPricing);
		};
	}]);

}());