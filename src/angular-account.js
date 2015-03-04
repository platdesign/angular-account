'use strict';



var ngModule;

try {
	ngModule = angular.module('pd');
} catch(err) {
	ngModule = angular.module('pd', []);
}

module.exports = ngModule;



ngModule.provider('Account', require('./providers/Account.js') );

//ngModule.directive('accountLogin', require('./directives/account-login.js') );
//ngModule.directive('accountRegister', require('./directives/account-register.js') );
ngModule.directive('ifAccountOnline', require('./directives/if-account-online.js') );



ngModule.run(['$rootScope','Account', function($rootScope, Account) {
	//Account.load();
	$rootScope.Account = Account;
}]);
