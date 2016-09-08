// SOURCE: http://www.oaa-accessibility.org/example/19/
var keyCodes = {
	//tab: 9,
	enter: 13,
	//esc: 27,

	space: 32,
	//pageup: 33,
	//pagedown: 34,
	//end: 35,
	//home: 36,

	left: 37,
	up: 38,
	right: 39,
	down: 40
};


function RatingWidget(el, initialRating) {
	var that = this;

	var max = 5; // TODO: make configurable

	var initialValue = initialRating;

	if (initialRating) {

		if (typeof initialRating === 'number')
			initialValue = initialRating;
		else if (typeof initialRating === 'string')
			initialValue = parseInt(initialRating, 10);
		else
			throw Error('Unable to interpret initialRating as an integer');

		if (isNaN(initialValue))
			throw Error('Unable to interpret initialRating as an integer');
		if (initialValue > max)
			throw Error('Initial rating must not be greater than the maximum rating of ' + max);
		if (initialValue < 1)
			throw Error('Initial rating must be greater than zero');
	}


	this.el = el;
	this.value = initialValue || '';
	this.change = null;
	this.allDigits = null;

	function setRating(newRating, performCallback, force) {

		if (force || (that.value !== newRating)) {

			// Update the persisted rating value
			that.value = newRating;
			that.el.setAttribute('data-value', newRating);

			// Esure we leave the digits properly classified given the new rating
			updateDigits(newRating);

			// Execute any registered callback
			if (performCallback && that.change) that.change(that, newRating);
		}
	}

	function getDigitWithRating(rating) {

		return that.allDigits.find(function(digit) {
			// ReSharper disable once CoercedEqualsUsing
			return rating == digit.getAttribute('data-value');
		});
	}

	function getRatingFromDigit(digit) {

		return parseInt(digit.getAttribute('data-value'), 10);
	}

	function getRatingFromWidget() {

		var rating = parseInt(that.el.getAttribute('data-value'), 10);
		if (isNaN(rating))
			rating = -Infinity;
		return rating;
	}

	function digits() {

		return Array.prototype.slice.call(
			that.el.querySelectorAll('.rating-digit'));
	}

	function updateDigits(rating, setToFocusedDigit) {

		var focusedDigit = that.allDigits.find(function (digit) { return digit === document.activeElement; });

		var containsFocus =
			focusedDigit != null;

		that.allDigits.forEach(function (digit) {

			var digitValue = digit.getAttribute('data-value');

			if (!setToFocusedDigit || !focusedDigit) {

				// Display the persisted rating

				digit.classList.toggle('fa-star', digitValue <= rating);
				digit.classList.toggle('fa-star-o', digitValue > rating);
				digit.classList.toggle('interactive', that.isInteractive || containsFocus);

			} else {

				// Display the focused rating

				var focusedDigitRating = getRatingFromDigit(focusedDigit);

				digit.classList.toggle('fa-star', digitValue <= focusedDigitRating);
				digit.classList.toggle('fa-star-o', digitValue > focusedDigitRating);
				digit.classList.toggle('interactive', false);
			}
		});
	}

	function clearRovingFocus() {
		that.allDigits.forEach(function (digit) {

			digit.setAttribute('tabindex', -1);
		});

		that.el.setAttribute('tabindex', 0);
	}

	function setRovingFocusToDigit(focusedDigit, setFocus) {

		if (setFocus === undefined) setFocus = true;

		that.el.setAttribute('tabindex', -1);

		that.allDigits.forEach(function (digit) {

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

	function setRatingToDigit(digit) {

		setRating(
			getRatingFromDigit(digit),
			true);

		setRovingFocusToDigit(
			digit);
	}

	function focusDigit(evt) {

		var focusedDigit = evt.target;

		proposeRatingDigit(focusedDigit);
	};

	function blurDigit() {

		updateDigits(
			getRatingFromWidget());
	};

	function mouseEnterDigit(evt) {

		that.isInteractive = true;

		updateDigits(
			getRatingFromDigit(
				evt.target));
	};

	function mouseleaveDigit() {

		that.isInteractive = false;

		updateDigits(
			getRatingFromWidget(), true);
	};

	function clickDigit(evt) {

		setRatingToDigit(evt.target);

		evt.stopPropagation();
		return false;
	};

	function maybeSelectFocusedDigit() {

		var focusedDigit = that.allDigits.find(function (digit) { return digit === document.activeElement; });
		if (!focusedDigit) return true;

		setRatingToDigit(focusedDigit);
		return false;
	}

	function moveNext() {
		var allDigits = that.allDigits;

		var focusedDigit = allDigits.find(function (digit) { return digit === document.activeElement; });

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
		var allDigits = that.allDigits;

		var focusedDigit = allDigits.find(function (digit) { return digit === document.activeElement; });

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

	function keydownWidget(event) {

		//console.log(event.keyCode);

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

	function keypressWidget(event) {

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

	function focusWidget() {

		// The first time the widget gets focus,
		// pass focus along to the first element and
		// make the container unfocusable
		moveNext();

		that.el.setAttribute('tabindex', -1);
	}

	this.clear = function () {

		setRating('', true);

		clearRovingFocus();
	}

	this.init = function () {

		that.allDigits = digits();

		// Configure the rating widget container

		that.el.setAttribute('tabindex', 0);
		that.el.addEventListener('focus', focusWidget);

		// Handle keyboard navigation within the widget

		that.el.addEventListener('keydown', keydownWidget);
		that.el.addEventListener('keypress', keypressWidget);

		// Configure the rating digits

		that.allDigits.forEach(function (digit) {

			digit.setAttribute('tabindex', -1);

			digit.addEventListener('mouseenter', mouseEnterDigit);
			digit.addEventListener('mouseleave', mouseleaveDigit);
			digit.addEventListener('click', clickDigit);
			digit.addEventListener('focus', focusDigit);
			digit.addEventListener('blur', blurDigit);
		});

		if (initialValue) {

			setRating(
				initialValue, false, true);

			setRovingFocusToDigit(
				getDigitWithRating(initialValue), false);
		}
	}

	this.setRating = setRating;
}
