define(["../models/user"], function(User) {
    'use strict';

    function SecurityService(xhrService, $location, $timeout, $cookieStore) {
        this.$timeout = $timeout;
        this.$location = $location;
        this.xhrService = xhrService;
        this.$cookieStore = $cookieStore;

        this.loggedInUser = this.isLoggedIn() ? new User("Test User") : null;
    }

    SecurityService.$inject = ["xhrService", "$location", "$timeout", "$cookieStore"];

    SecurityService.prototype.login = function(username, password) {
        this.xhrService.login(username, password)
            .done(this.handleSuccess.bind(this))
            .fail(this.handleError.bind(this));
    };

    SecurityService.prototype.logout = function() {
        this.xhrService.logout().success(function() {
            this.$cookieStore.remove("spread.session");
            this.$location.path("/");
        }.bind(this));
    };

    SecurityService.prototype.register = function(username, password) {
        this.xhrService.register(username, password).done(this.handleSuccess.bind(this));
    };

    SecurityService.prototype.isLoggedIn = function() {
        return this.$cookieStore.get("spread.session") !== undefined;
    };

    // todo this shouldn't need to do a timeout here
    SecurityService.prototype.handleSuccess = function (/*data, textStatus, jqXHR*/) {
        this.$cookieStore.put("spread.session", "test");

        this.$timeout(function() {
            this.$location.path('/');
        }.bind(this));

        this.loggedInUser = new User("Test User");
    };

    // todo this shouldn't need to do a timeout here
    SecurityService.prototype.handleError = function (/*data, textStatus, jqXHR*/) {
        this.$timeout(function() {
            this.error = "Incorrect username or password";
        }.bind(this));
    };

    return SecurityService;
});