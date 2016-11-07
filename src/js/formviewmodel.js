/*globals document, alert */
/*globals arrayFrom */


// Base form class, providing convenience functions and
// standardizing the way this app will handle validation, autofocus, etc.

(function (global, alert) {
	'use strict';

	// Constructor
	// ReSharper disable once InconsistentNaming
	var FormViewModel = function (formElement) {

		this.el = formElement;

		this.onSubmitValid = null;
		this.preFormSubmit = null;
		this.postFormSubmit = null;

		this.initializeValidation();
		this.initializeSubmitHook();
	};

	FormViewModel.prototype.constructor = FormViewModel;

	// Return an array filled with all the likely DOM input elements in this form
	FormViewModel.prototype.allInputs = function () {

		return arrayFrom(this.el.getElementsByTagName('input')).concat(
			arrayFrom(this.el.getElementsByTagName('textarea'))).concat(
			arrayFrom(this.el.getElementsByClassName('rating-interactive'))); // TODO: inject custom input tag names
	};

	// Because of habit in other languages, I sooo want to set value to null
	FormViewModel.prototype.clearInput = function (input) {

		input.value = '';
	};

	// Removes any value and validation errors from the given DOM input element
	FormViewModel.prototype.resetInput = function (input) {

		this.clearInput(input);
		this.clearValidationErrorState(input);
	};

	// Removes all values and validation errors from all the known input elements in this form
	FormViewModel.prototype.reset = function () {
		var that = this;

		this.allInputs().forEach(function (input) {
			that.resetInput(input);
		});
	};

	// Returns the label in this form whose 'for' attribute points to the given input element's id
	FormViewModel.prototype.labelFor = function (input) {
		return this.el.querySelector(
			'#' + this.el.id + ' label[for=\'' + input.id + '\']');
	};

	// Returns all the DOM elements in this form declared as being an error annotation
	// for the given DOM input element.
	// To associate an error with an input, place the 'data-error-for' attribute
	// on the error element and give it a value of the id of the input element.
	FormViewModel.prototype.errorElementsFor = function (input) {

		return arrayFrom(this.el.getElementsByClassName('validation-error')).
		filter(function (el) {
			return el.getAttribute('data-error-for') === input.id;
		});
	};

	// Pushes an input element's validation message into any associated error elements' textContent,
	// adds the 'aria-invalid' attribute to the input element,
	// and adds the 'has-error' class to the input element's parent.
	FormViewModel.prototype.setValidationErrorState = function (input) {
		var that = this;

		this.errorElementsFor(input).forEach(function (error) {
			error.removeAttribute('aria-hidden');
			//error.setAttribute('aria-live', 'assertive');
			error.textContent = that.getValidationMessage(input);
			error.classList.remove('invisible');
		});

		input.setAttribute('aria-invalid', 'true');

		input.parentNode.classList.add('has-error');
	};

	// Un-does what setValidationErrorState() does
	FormViewModel.prototype.clearValidationErrorState = function (input) {

		this.errorElementsFor(input).forEach(function (error) {
			//error.removeAttribute('aria-live');
			error.setAttribute('aria-hidden', 'true');
			error.textContent = '';
			error.classList.add('invisible');
		});

		input.removeAttribute('aria-invalid');

		input.classList.remove('dirty');

		input.parentNode.classList.remove('has-error');
		input.parentNode.classList.remove('has-warning');
		input.parentNode.classList.remove('has-success');
	};

	// Wrapper function for setCustomValidity() with fallback
	FormViewModel.prototype.setValidity = function (input, msg) {
		input.setCustomValidity !== undefined ?
			input.setCustomValidity = msg : 
			input.setAttribute('data-validity-customValidity', msg);
	};

	// Wrapper function for validity.valid property with fallback
	FormViewModel.prototype.isValid = function (input) {
		return input.validity !== undefined ?
			input.validity.valid : 
			!input.getAttribute('data-validity-customValidity');
	};

	// Wrapper function for validationMessage property with fallback
	FormViewModel.prototype.getValidationMessage = function (input)
	{
		return input.validationMessage !== undefined ?
			input.validationMessage :
			input.getAttribute('data-validity-customValidity');
	}

	// Sets or clears the input element's custom error state based on its current validity
	FormViewModel.prototype.updateValidationErrorState = function (input) {

		if (!this.isValid(input))
			this.setValidationErrorState(input);
		else
			this.clearValidationErrorState(input);
	};

	// Convenience method to clear all validation and error state
	FormViewModel.prototype.passInput = function (input) {

		this.setValidity(input, '');
		this.updateValidationErrorState(input);
		return true;
	};

	// Convenience method to set failed validation and error state
	FormViewModel.prototype.failInput = function (input, msg) {

		this.setValidity(input, msg);
		this.updateValidationErrorState(input);
		return false;
	};


	FormViewModel.prototype.initializeValidation = function () {
		var that = this;

		function addDirtyClass(evt) {
			evt.target.classList.add('dirty');
		}

		function validate(evt) {
			that.updateValidationErrorState(evt.target);
		}

		// Returns a space-delimited list of ids from the given elements
		function idListFrom(els) {
			return els.
				map(function (el) { return el.id; }).
				join(' ');
		}

		// Prepare all inputs, except those opting-out with a 'data-novalidate' attribute
		this.allInputs().
			filter(function (input) { return !input.hasAttribute('data-novalidate'); }).
			forEach(function (input) {

				var errorElements =
					that.errorElementsFor(input);

				// Allow AT to associate and announce the error messages with the input field
				errorElements.forEach(function(error) {
					error.setAttribute('aria-live', 'assertive');
				});

				if (!input.getAttribute('aria-describedby'))
					input.setAttribute('aria-describedby', idListFrom(errorElements));

				// Add the 'required' class to the label of any required input
				if (input.hasAttribute('required')) {

					var label = that.labelFor(input);

					if (label) {

						// Allow styling required labels
						label.classList.add('required');

						// Ensure screen readers will annouce that this field is required
						var ariaLabel = newTextElement('span', label.textContent + ' required');
						ariaLabel.id = input.id + '-aria-label';
						ariaLabel.classList.add('sr-only');

						label.appendChild(ariaLabel);
						input.setAttribute('aria-labelledby', ariaLabel.id);

						// Add a visual annotation to required field labels
						var splat = newLabelGlyph('fa-asterisk', 'required', 'required-annotation');
						splat.setAttribute('aria-hidden', 'true');

						label.appendChild(splat);
					}
				}

				/* ADAPTED FROM: https://developers.google.com/web/fundamentals/design-and-ui/input/forms/provide-real-time-validation?hl=en */
				input.addEventListener('blur', addDirtyClass);
				//input.addEventListener('invalid', addDirtyClass);
				//input.addEventListener('valid', addDirtyClass);

				input.addEventListener('blur', validate);

			});

	};

	// Returns the first descendant element of the form
	// with a 'data-autofocus' attribute present
	FormViewModel.prototype.getInitialFocusElement = function () {

		return this.el.querySelector(
			'#' + this.el.id + ' [data-autofocus]');
	};

	// Attempts to set focus to the element designated to receive initial focus.
	// Returns true if focus was set.
	FormViewModel.prototype.setInitialFocus = function () {

		var focusElement = this.getInitialFocusElement();

		if (focusElement) {
			focusElement.focus();

			return focusElement === document.activeElement;
		}

		return false;
	};

	// Wire up the form's submit event to provide some default handling of
	// invalid forms (preventing submission, showing an alert),
	// and perform custom application logic via a callback for valid form submits.
	// Calling code should assign a function to onSubmitValid to register the callback.
	// If the callback returns falsey (or no callback is registered), the form submittal is cancelled.
	FormViewModel.prototype.initializeSubmitHook = function () {
		var that = this;

		this.el.addEventListener('submit', function (evt) {

			if (that.preFormSubmit && !that.preFormSubmit()) {
				evt.preventDefault();
				return false;
			}

			if (that.el.checkValidity() === false) {

				// FALLBACK for browsers that don't block invalid form submittal
				that.el.reportValidity();

				alert('Please correct the form and try again');

				if (that.postFormSubmit)
					that.postFormSubmit();

				evt.preventDefault();
				return false;

			} else {

				// Callback to any submit listener
				var cancel = !that.onSubmitValid || !that.onSubmitValid(that.el);

				if (that.postFormSubmit)
					that.postFormSubmit();

				// Cancel form submittal if instructed
				if (cancel) {
					evt.preventDefault();
					return false;
				}
			}

			return true;
		});
	};

	global.FormViewModel = FormViewModel;

	// ReSharper disable once ThisInGlobalContext
}(this, alert));
