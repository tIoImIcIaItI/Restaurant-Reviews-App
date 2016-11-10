/*globals angular, moment */

(function (global) {
	'use strict';

	var app = angular.module('app', []);

	app.controller('AppController', ['$scope', function ($scope) {

		$scope._lastRatingFilter = null;

		$scope.newReview = {
			rating: '',
			comments: '',
			reviewer: '',
			date: '',

			ratingText: function () {
				return $scope.newReview.rating ?
					'Rated ' + $scope.newReview.rating + ' of 5 stars' : // TODO: generalize num stars
					'Not yet rated';
			},

			clear: function() {
				$scope.newReview.rating = '';
				$scope.newReview.comments = '';
				$scope.newReview.reviewer = '';
				$scope.newReview.date = '';
			}
		};

		function ratingFromReviews(reviews) {

			var ratings = reviews.map(function(r) { return r.rating; });
			return Math.round(Math.avg(ratings));
		}

		$scope.venues = venues.map(function (venue) {

			venue.rating = ratingFromReviews(venue.reviews);

			var firstDayOfWeek = 1;

			function sortOrderFor(hours) {
				return hours.dow > firstDayOfWeek ? hours.dow : 7 + hours.dow;
			}

			venue.hours = venue.hours.sort(function (x, y) { return sortOrderFor(x) - sortOrderFor(y); });

			return venue;
		});

		$scope.venue = null;

		$scope.ratingFilter = null;

		$scope.priceFilter = {
			expensive: false,
			moderatelyPriced: false,
			inexpensive: false
		};

		$scope.onSaveReview = function (newReview) {
			console.log('saving review: ', newReview);

			var venue = $scope.venue;

			// FUTURE: This is where we would persist changes to a data store...

			// Add the review to our list
			venue.reviews.unshift(newReview);

			// Recalculate the venue's rating
			venue.rating = ratingFromReviews(venue.reviews);

			// Clear review form
			$scope.newReview.clear();

			$scope.$apply();
		}

		$scope.selectVenue = function (venue) {

			if ($scope.venue === venue) return;

			// Initialize the review form
			$scope.newReview.clear();
			//$scope.newReview.venue = venue;

			// Show the selected venue
			$scope.venue = venue;

			// TODO: Scroll to the top of the selected venue? Animate?
			scrollToTop();
		}

		$scope.deselectVenue = function() {

			$scope.venue = null;

			// TODO: Scroll to the top of the venue list? Animate?
			scrollToTop();
		}

		$scope.priceFilterBitMask = function () {

			var res = 0;
			if ($scope.priceFilter.inexpensive) res += 1;
			if ($scope.priceFilter.moderatelyPriced) res += 2;
			if ($scope.priceFilter.expensive) res += 4;
			return res;
		};

		$scope.clearRatingFilter = function () {

			$scope.ratingFilter = null;
		}

		$scope.clearPriceFilter = function () {

			$scope.priceFilter.expensive = false;
			$scope.priceFilter.moderatelyPriced = false;
			$scope.priceFilter.inexpensive = false;
		}

		$scope.hasRatingFilter = function () {

			return $scope.ratingFilter !== null;
		}

		$scope.hasAllPriceFilters = function () {

			return $scope.priceFilter.expensive &&
				$scope.priceFilter.moderatelyPriced &&
				$scope.priceFilter.inexpensive;
		}

		$scope.hasPriceFilter = function () {

			return !$scope.hasAllPriceFilters() && (
				$scope.priceFilter.expensive ||
				$scope.priceFilter.moderatelyPriced ||
				$scope.priceFilter.inexpensive);
		}

		$scope.priceFilters = function () {

			if (!$scope.hasPriceFilter())
				return null;

			var res = [];
			if ($scope.priceFilter.expensive) res.push('expensive');
			if ($scope.priceFilter.moderatelyPriced) res.push('moderately priced');
			if ($scope.priceFilter.inexpensive) res.push('inexpensive');
			//res[0][0] = res[0][0].toLocaleUpperCase();
			return res.join(' or ');
		}

		$scope.$watch($scope.priceFilters, function () {
			$scope.deselectVenue();
		});

		$scope.$watch($scope.hasRatingFilter, function () {
			$scope.deselectVenue();
		});

	}]);

	global.app = app;

	// ReSharper disable once ThisInGlobalContext
}(this));