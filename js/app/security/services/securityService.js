define(['../models/user', '../../services/loadingService'], function (User, loadingService) {
    'use strict';

    function SecurityService(xhrService, $location, $timeout, $cookieStore) {
        this.$timeout = $timeout;
        this.$location = $location;
        this.xhrService = xhrService;
        this.$cookieStore = $cookieStore;
        this.loadingService = loadingService;

        if (this.isLoggedIn()) {
            this.loggedInUser = new User(JSON.parse(this.$cookieStore.get('spread.session')));
        }
    }

    SecurityService.$inject = ['xhrService', '$location', '$timeout', '$cookieStore'];

    SecurityService.prototype.login = function (username, password) {
        this.loadingService.setLoading(true);

        return this.xhrService.login(username, password)
            .done(this.handleSuccess.bind(this))
            .fail(this.handleError.bind(this));
    };

    SecurityService.prototype.logout = function () {
        this.xhrService.logout().success(function () {
            this.$cookieStore.remove('spread.session');
            this.loggedInUser = null;
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
            this.$location.path('/users/' + user.username + '/games/create');
        }.bind(this));

        this.loggedInUser = new User(user);
        this.loadingService.setLoading(false);
    };

    SecurityService.prototype.handleError = function (/*data, textStatus, jqXHR*/) {
        this.$timeout(function () {
            this.error = 'Incorrect username or password';
            this.loadingService.setLoading(false);
        }.bind(this));
    };

    return SecurityService;
});