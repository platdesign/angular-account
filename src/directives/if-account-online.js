'use strict';

module.exports = ['ngIfDirective', 'Account', function(ngIfDirective, Account) {
	var ngIf = ngIfDirective[0];

	return {
		transclude: ngIf.transclude,
		priority: ngIf.priority,
		terminal: ngIf.terminal,
		restrict: ngIf.restrict,

		link: function($scope, $element, $attr) {
			$attr.ngIf = function() {
				return Account.isOnline();
			};
			ngIf.link.apply(ngIf, arguments);
		}

	};
}];


