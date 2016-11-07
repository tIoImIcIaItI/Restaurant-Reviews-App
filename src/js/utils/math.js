/*globals Math */

(function () {
	'use strict';

	if (!Math.avg) {
		Math.avg = function (array) {
			var count = array.length;
			var total = 0.0;
			for (var i = 0; i < count; i++) {
				total += array[i];
			}
			return total / count;
		}
	}

}());