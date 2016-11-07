/*globals angular, moment */

(function () {
	'use strict';

	var app = angular.module('app');

	app.component('reviewForm', {

		bindings: {
			review: '=',
			save: '&'
		},

		templateUrl: '/reviews/reviewForm.html',

		controller: ['$scope', '$element', function ($scope, $element) {
			var self = this;

			self.vm = null;

			self.$postLink = function () {

				var formEl = $element[0].querySelector('#new-review-form');

				// Attach to the review form
				var reviewFormVm =
					new ReviewFormViewModel(
						formEl);

				reviewFormVm.preFormSubmit = function () {
					// TODO: validate form
					console.log('preFormSubmit');

					var isValid = true;

					isValid &= reviewFormVm.updateRatingValidity();

					return isValid;
				};

				reviewFormVm.onSubmitValid = function () {

					// Clone the review
					var newReview = (JSON.parse(JSON.stringify(self.review)));

					// Add audit info to the new review
					newReview.date = moment().format('YYYY-MM-DDTHH:mm:ss');
					newReview.reviewer = 'TODO: REVIEWER';

					// Send notification to save the new review
					if (self.save)
						self.save({ review: newReview });
				};

				reviewFormVm.init();

				self.vm = reviewFormVm;
			};

		}]
	});
}());