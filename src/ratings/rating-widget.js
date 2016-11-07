/*globals document */

(function (global, document) {
	'use strict';

	global.RatingWidget = function (el, initialRating) {
		var self = this;

		function getInitialValue(rating, max) {
			var value = rating;

			if (rating) {

				if (typeof rating === 'number')
					value = rating;
				else if (typeof rating === 'string')
					value = parseInt(rating, 10);
				else
					throw Error('Unable to interpret initialRating as an integer');

				if (isNaN(value))
					throw Error('Unable to interpret initialRating as an integer');
				if (value > max)
					throw Error('Initial rating must not be greater than the maximum rating of ' + max);
				if (value < 1)
					throw Error('Initial rating must be greater than zero');
			}

			return value;
		}

		function setRating(newRating, performCallback, force) {

			if (force || (self.value !== newRating)) {

				// Update the persisted rating value
				self.value = newRating;
				self.el.setAttribute('data-value', newRating);

				// Esure we leave the digits properly classified given the new rating
				updateDigits(newRating);

				// Execute any registered callback
				if (performCallback && self.change) self.change(self, newRating);
			}
		}

		function getDigitWithRating(rating) {

			return self.allDigits.find(function (digit) {
				// ReSharper disable once CoercedEqualsUsing
				return rating == digit.getAttribute('data-value');
			});
		}

		function getRatingFromDigit(digit) {

			return parseInt(digit.getAttribute('data-value'), 10);
		}

		function getSortableRatingFromWidget() {

			var rating = parseInt(self.el.getAttribute('data-value'), 10);

			return isNaN(rating) ? -Infinity : rating;
		}

		function digits() {

			return Array.prototype.slice.call(
				self.el.querySelectorAll('.rating-digit-container'));
		}

		function findFocusedDigit() {

			return self.allDigits.find(function (digit) {
				return digit === document.activeElement;
			});
		}

		function updateDigits(rating, setToFocusedDigit) {

			var focusedDigit = findFocusedDigit();

			var containsFocus =
				focusedDigit != null;

			self.allDigits.forEach(function (digit) {

				var digitValue = digit.getAttribute('data-value');

				var glyph = digit.querySelector('.rating-digit');

				if (!setToFocusedDigit || !focusedDigit) {

					// Display the persisted rating

					glyph.classList.toggle('fa-star', digitValue <= rating);
					glyph.classList.toggle('fa-star-o', digitValue > rating);

					digit.classList.toggle('interactive', self.isInteractive || containsFocus);

				} else {

					// Display the focused rating

					var focusedDigitRating = getRatingFromDigit(focusedDigit);

					glyph.classList.toggle('fa-star', digitValue <= focusedDigitRating);
					glyph.classList.toggle('fa-star-o', digitValue > focusedDigitRating);

					digit.classList.toggle('interactive', false);
				}
			});
		}

		function clearRovingFocus() {
			self.allDigits.forEach(function (digit) {

				digit.setAttribute('tabindex', -1);
			});

			self.el.setAttribute('tabindex', 0);
		}

		function setRovingFocusToDigit(focusedDigit, setFocus) {

			if (setFocus === undefined) setFocus = true;

			self.el.setAttribute('tabindex', -1);

			self.allDigits.forEach(function (digit) {

				if (digit === focusedDigit) {

					digit.setAttribute('tabindex', 0);

					if (setFocus) digit.focus();

				} else {

					digit.setAttribute('tabindex', -1);
				}
			});
		}

		function proposeRatingDigit(digit) {

			setRovingFocusToDigit(digit);

			updateDigits(
				getRatingFromDigit(
					digit));
		}

		function selectDigit(digitToSelect) {

			self.allDigits.forEach(function (digit) {
				digit.setAttribute('aria-selected', digit === digitToSelect);
			});
		}

		function setRatingToDigit(digit) {

			setRating(
				getRatingFromDigit(digit),
				true);

			setRovingFocusToDigit(
				digit);

			selectDigit(digit);
		}

		function onFocusDigit(evt) {

			var focusedDigit = evt.currentTarget;

			proposeRatingDigit(focusedDigit);
		};

		function onBlurDigit() {

			updateDigits(
				getSortableRatingFromWidget());
		};

		function onMouseEnterDigit(evt) {

			self.isInteractive = true;

			updateDigits(
				getRatingFromDigit(
					evt.currentTarget));
		};

		function onMouseleaveDigit() {

			self.isInteractive = false;

			updateDigits(
				getSortableRatingFromWidget(),
				true);
		};

		function onClickDigit(evt) {

			setRatingToDigit(evt.currentTarget);

			evt.stopPropagation();
			return false;
		};

		function maybeSelectFocusedDigit() {

			var focusedDigit = findFocusedDigit();
			if (!focusedDigit) return true;

			setRatingToDigit(focusedDigit);
			return false;
		}

		function moveNext() {
			var allDigits = self.allDigits;

			var focusedDigit = findFocusedDigit();

			// Now pick one item to receive focus
			var nextDigit;
			if (!focusedDigit) {

				// If nothing is yet focused, focus the fist item
				nextDigit = allDigits[0];
			} else {

				// Otherwise select the next item, wrapping around the end to the start
				var curIndex = allDigits.indexOf(focusedDigit);
				var nextIndex = (curIndex + 1) % (allDigits.length);
				nextDigit = allDigits[nextIndex];
			}

			proposeRatingDigit(nextDigit);

			return true;
		}

		function movePrevious() {
			var allDigits = self.allDigits;

			var focusedDigit = findFocusedDigit();

			// Now pick one item to receive focus
			var prevDigit;
			if (!focusedDigit) {

				// If nothing is yet focused, focus the last item
				prevDigit = allDigits[allDigits.length - 1];
			} else {

				// Otherwise select the next item, wrapping around the end to the start
				var curIndex = allDigits.indexOf(focusedDigit);
				var nextIndex = curIndex - 1;
				if (nextIndex < 0) nextIndex = allDigits.length - 1;
				prevDigit = allDigits[nextIndex];
			}

			proposeRatingDigit(prevDigit);

			return true;
		}

		function onKeydownWidget(event) {

			if (event.altKey || event.ctrlKey || event.shiftKey) {
				return true;
			}

			var res;

			switch (event.keyCode) {

				case keyCodes.down:
				case keyCodes.right:
					res = moveNext();
					break;

				case keyCodes.up:
				case keyCodes.left:
					res = movePrevious();
					break;

				case keyCodes.space:
				case keyCodes.enter:
					res = maybeSelectFocusedDigit(event);
					break;

				default:
					res = true;
			}

			if (!res)
				event.stopPropagation();

			return res;
		}

		function onKeypressWidget(event) {

			if (event.altKey || event.ctrlKey || event.shiftKey) {
				return true;
			}

			switch (event.keyCode) {
				case keyCodes.enter:
				case keyCodes.space:
				case keyCodes.left:
				case keyCodes.right:
				case keyCodes.up:
				case keyCodes.down:
					{
						event.stopPropagation();
						return false;
					}
			}

			return true;
		}

		function onFocusWidget() {

			// The first time the widget gets focus,
			// pass focus along to the first element and
			// make the container unfocusable
			moveNext();

			self.el.setAttribute('tabindex', -1);
		}

		function clear() {

			setRating('', true);

			clearRovingFocus();
		};

		function init() {

			self.allDigits = digits();

			// Configure the rating widget container

			self.el.setAttribute('tabindex', 0);
			self.el.addEventListener('focus', onFocusWidget);

			// Handle keyboard navigation within the widget

			self.el.addEventListener('keydown', onKeydownWidget);
			self.el.addEventListener('keypress', onKeypressWidget);

			// Wire up the rating digits

			self.allDigits.forEach(function (digit) {

				digit.setAttribute('tabindex', -1);

				digit.addEventListener('mouseenter', onMouseEnterDigit);
				digit.addEventListener('mouseleave', onMouseleaveDigit);
				digit.addEventListener('click', onClickDigit);
				digit.addEventListener('focus', onFocusDigit);
				digit.addEventListener('blur', onBlurDigit);
			});

			// Set the initial state

			if (self.value) {

				setRating(
					self.value,
					false,
					true);

				var digitWithRating =
					getDigitWithRating(self.value);

				setRovingFocusToDigit(
					digitWithRating,
					false);

				selectDigit(
					digitWithRating);
			}
		};

		var maxRating = 5; // TODO: make configurable

		self.el = el;
		self.value = getInitialValue(initialRating, maxRating) || '';
		self.change = null;
		self.allDigits = null;

		self.clear = clear;
		self.init = init;
		self.setRating = setRating;
	};

	// ReSharper disable once ThisInGlobalContext
}(this, document));