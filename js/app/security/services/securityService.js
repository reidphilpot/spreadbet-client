define(['../models/user'], function (User) {
    'use strict';

    function SecurityService(xhrService, $location, $timeout, $cookieStore, loadingService) {
        this.$timeout = $timeout;
        this.$location = $location;
        this.xhrService = xhrService;
        this.$cookieStore = $cookieStore;
        this.loadingService = loadingService;

        if (this.isLoggedIn()) {
            this.loggedInUser = new User(JSON.parse(this.$cookieStore.get('spread.session')));
        }
    }

    SecurityService.$inject = ['xhrService', '$location', '$timeout', '$cookieStore', 'loadingService'];

    SecurityService.prototype.login = function (username, password) {
        this.loadingService.loading = true;
        this.xhrService.login(username, password)
            .done(this.handleSuccess.bind(this))
            .fail(this.handleError.bind(this));
    };

    SecurityService.prototype.logout = function () {
        this.xhrService.logout().success(function () {
            this.$cookieStore.remove('spread.session');
            this.$location.path('/');
        }.bind(this));
    };

    SecurityService.prototype.register = function (username, password) {
        this.xhrService.register({ username: username, password: password})
            .done(this.handleSuccess.bind(this));
    };

    SecurityService.prototype.isLoggedIn = function () {
        return this.$cookieStore.get('spread.session') !== undefined;
    };

    SecurityService.prototype.handleSuccess = function (user) {
        this.$cookieStore.put('spread.session', JSON.stringify(user));

        this.$timeout(function () {
            this.$location.path('/');
        }.bind(this));

        this.loggedInUser = new User(user);
        this.loadingService.loading = false;
    };

    SecurityService.prototype.handleError = function (/*data, textStatus, jqXHR*/) {
        this.$timeout(function () {
            this.error = 'Incorrect username or password';
            this.loadingService.loading = false;
        }.bind(this));
    };

    return SecurityService;
});