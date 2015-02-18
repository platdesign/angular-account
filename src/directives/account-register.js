'use strict';

module.exports = function() {
	return {
		restrict: 'EA',
		template:
		'<div>'+
			'<form ng-submit="Account.register()">'+
				'<label>Username'+
					'<input type="text" ng-model="Account.register.username" placeholder="Username" />'+
				'</label>'+
				'<label>eMail'+
					'<input type="text" ng-model="Account.register.email" placeholder="eMail" />'+
				'</label>'+
				'<label>Password'+
					'<input type="password" ng-model="Account.register.password" placeholder="Password" />'+
				'</label>'+
				'<button>Register</button>'+
				'<div ng-if="Account.register.error">{{ Account.register.error }}</div>'+
			'</form>'+
		'</div>',
		scope: {},
		controller: ['$scope', 'Account', function($scope, Account) {
			$scope.Account = Account;
		}]
	};
};
