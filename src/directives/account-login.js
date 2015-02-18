'use strict';

module.exports = function() {
	return {
		restrict: 'EA',
		template:
		'<div>'+
			'<form ng-submit="Account.login()">'+
				'<label>eMail'+
					'<input type="text" ng-model="Account.login.email" placeholder="eMail" />'+
				'</label>'+
				'<label>Password'+
					'<input type="password" ng-model="Account.login.password" placeholder="Password" />'+
				'</label>'+
				'<button>Login</button>'+
				'<div ng-if="Account.login.error">{{ Account.login.error }}</div>'+
			'</form>'+
		'</div>',
		scope: {},
		controller: ['$scope', 'Account', function($scope, Account) {
			$scope.Account = Account;
		}]
	};
};
