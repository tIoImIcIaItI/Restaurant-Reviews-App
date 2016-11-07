/*globals angular */

(function () {
	'use strict';

	var app = angular.module('app');

	app.component('ratingInteractive', {

		bindings: {
			rating: '=ngModel'
		},

		templateUrl: '/ratings/ratingWidget.html',

		controller: ['$scope', '$element', function ($scope, $element) {
			var self = this;

			this._lastRating = this.rating;
			this._ratingWidget = null;

			this.$postLink = function () {

				var ratingEl = $element[0].children[0];

				self._ratingWidget = new RatingWidget(ratingEl, self.rating);

				self._ratingWidget.change = function (widget, newValue) {

					self.rating = newValue;
					$scope.$apply();
				};

				self._ratingWidget.init();
			};

			this.$doCheck = function () {

				if (self.rating !== self._lastRating) {

					self._ratingWidget.setRating(self.rating);

					self._lastRating = self.rating;
				}
			}
		}]
	});
}());