'use strict';

module.exports = function() {


	var provider = this;
	var account = {};


	provider.baseUrl = '/account';



	account._setOnlineAttrs = function(data) {
		account.id = data.id;
		account.username = data.username;
		account.email = data.email;
		account.active = data.active;
	};


	this.$get = ['$http', '$q','$rootScope', function($http, $q, $rootScope) {

		account.isOnline = function() {
			return !!this.id;
		};

		account.isActiveQ = function() {
			return this.load().then(function() {
				if(!account.isActive()) {
					throw new Error('Not active');
				}
			});
		};

		account.isOnlineQ = function() {
			return this.load().then(function() {
				if(!account.isOnline()) {
					throw new Error('Not online');
				}
			});
		};

		account.isActive = function() {
			return this.isOnline() && this.active;
		};

		account.load = function() {
			console.log('load');

			return $http.get( provider.baseUrl )
			.then(function(res) {
				account._setOnlineAttrs(res.data);
				return account;
			}, function() {
				return account;
			});
		};

		account.login = function(email, password) {

			var obj = {
				email: email || this.login.email,
				password: password || this.login.password
			};

			this.login.password = null;
			this.login.error = null;

			return $http.post(provider.baseUrl + '/login', obj)

			.then(function(res) {
				account._setOnlineAttrs(res.data);
				$rootScope.$broadcast('Account:login', account);
				return account;
			}, function(res) {

				var message = res.data.message || 'Login error';

				account.login.error = message;
				return $q.reject(message);
			});


		};


		account.register = function(username, email, password) {

			var obj = {
				username: username || this.register.username,
				email: email || this.register.email,
				password: password || this.register.password
			};

			this.register.password = null;
			this.register.error = null;

			if(obj.username && obj.email && obj.password) {

				return $http.post(provider.baseUrl + '/register', obj)
				.then(function(res) {
					return account;
				}, function(res) {
					var message = res.data.message || 'Register error';

					account.register.error = message;
					return $q.reject(message);
				});

			} else {

				var message = 'Missing input';

				account.register.error = message;
				return $q.reject(message);
			}

		};

		account.logout = function() {
			$http.get(provider.baseUrl + '/logout').then(function() {
				account._setOnlineAttrs({});
				$rootScope.$broadcast('Account:logout', account);
				return account;
			}, function(res) {
				account.logout.error = res.data.message;
			});
		};


		account.sendActivationEmail = function() {

			$http.post(provider.baseUrl + '/orderActivationEmail');

		};


		account.registerPermissionRoles = function(Permission) {
			// Define anonymous role
			Permission.defineRole('authenticated', function () {
				if(account.isOnline()) {
					return true;
				} else {
					return account.load().then(function() {
						if(!account.isOnline()) {
							return $q.reject(false);
						}
					});
				}
			});

			Permission.defineRole('active', function () {
				if(account.isActive()) {
					return true;
				} else {
					return account.load().then(function() {
						if(!account.isActive()) {
							return $q.reject(false);
						}
					});
				}
			});

			Permission.defineRole('offline', function () {
				return !account.isOnline();
			});
		};

		return account;
	}];


};
