var app = angular.module('app', []);

app.filter('pricing', function () {
	return function (pricing) {
		var names = ['Inexpensive', 'Moderatley Priced', 'Expensive'];
		return names[pricing - 1];
	}
});

app.filter('dayOfWeek', function () {
	return function (dow) {
		//var names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		var shortNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		return shortNames[dow - 1];
	}
});

app.filter('venuesFilter', [function () {
	return function (inputArray, ratingFilter, priceFilter) {
		return inputArray.
			filter(function (e) { return ratingFilter > 0 ? e.rating >= ratingFilter : true; }).
			filter(function (e) { return priceFilter > 0 ? e.pricing & priceFilter : true; });
	};
}]);

app.controller('AppController', ['$scope', function ($scope) {

	$scope.newReview = {
		rating: '',
		comments: ''
	};

	$scope.venues = venues;
	$scope.venue = null;

	$scope.ratingFilter = null;

	$scope.priceFilter = {
		expensive: false,
		moderatelyPriced: false,
		inexpensive: false
	};

	$scope.selectVenue = function (venue) {

		if ($scope.venue === venue) return;

		// Clear review form
		$scope.newReview.rating = '';
		$scope.newReview.comments = '';

		// Show the selected venue
		$scope.venue = venue;
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

	});

}]);

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

app.directive('ratingStatic', ['$compile', function ($compile) {

	function getDigit(isRated) {
		return isRated ?
			'<i class="fa fa-star"    aria-hidden="true"></i>' :
			'<i class="fa fa-star-o" aria-hidden="true"></i>';
	}

	function getTemplate(rating, max) {
		max = max || 5;

		var res = '';

		for (var i = 1; i <= max; i++) {
			var isRated = i <= rating;
			res += getDigit(isRated);
		}

		return res;
	}

	function render(scope, element) {

		element.html(getTemplate(scope.rating)).show();

		$compile(element.contents())(scope);
	}

	function linker(scope, element, attrs) {

		render(scope, element, attrs);

		scope.$watch(attrs.rating,
			function (newValue, oldValue) {
				if (newValue !== oldValue) {
					render(scope, element, attrs);
				}
			});
	}

	return {
		scope: {
			rating: '='
		},
		restrict: 'AE',
		replace: true,
		link: linker
	};
}]);


app.component('ratingInteractive', {

	bindings: {
		rating: '='
	},

	templateUrl: 'ratingWidget.html',

	controller: ['$scope', '$element', function ($scope, $element) {
		var that = this;

		this._lastRating = this.rating;
		this._ratingWidget = null;

		this.$postLink = function() {

			var ratingEl = $element[0].children[0];

			that._ratingWidget = new RatingWidget(ratingEl, that.rating);

			that._ratingWidget.change = function (widget, newValue) {

				that.rating = newValue;
				$scope.$apply();
			};

			that._ratingWidget.init();
		};

		this.$doCheck = function () {

			if (that.rating !== that._lastRating) {

				that._ratingWidget.setRating(that.rating);

				that._lastRating = that.rating;
			}
		}
	}]
});
