/*globals subclass */

(function (global) {
	'use strict';

	// Constructor
	// ReSharper disable once InconsistentNaming
	var ReviewFormViewModel = function (form) {
		FormViewModel.call(this, form);
	};

	subclass(ReviewFormViewModel, FormViewModel);

	
	ReviewFormViewModel.prototype.init = function() {
		var self = this;

		self.ratingEl =
			document.getElementById('new-review-rating');

		self.isValidRating = function (rating) {

			return rating && !isNaN(rating) && rating >= 1 && rating <= 5; // TODO: configure min, max rating
		}

		self.updateRatingValidity = function() {
			
			self.ratingEl = document.
				getElementById('new-review-rating');

			var ratingStr = self.ratingEl.
				getElementsByClassName('rating-widget')[0].
				getAttribute('data-value');

			return self.isValidRating(parseInt(ratingStr, 10)) ?
				self.passInput(self.ratingEl) :
				self.failInput(self.ratingEl, 'Please provide a rating.');
		}

		// Custom validate the rating input on blur
		self.ratingEl.addEventListener(
			'blur', self.updateRatingValidity);

	};



	global.ReviewFormViewModel = ReviewFormViewModel;

	// ReSharper disable once ThisInGlobalContext
}(this));