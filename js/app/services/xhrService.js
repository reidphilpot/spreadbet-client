define(["jquery"], function($) {
    'use strict';

    var XhrService = function($http, endPoint) {
        this.$http = $http;
        this.endPoint = endPoint;
    };

    XhrService.$inject = ["$http", "endPoint"];

    XhrService.prototype.getTeams = function() {
        return this.$http.get(this.endPoint + '/teams');
    };

    XhrService.prototype.getMarkets = function(homeTeam, awayTeam) {
        return this.$http({
            method: "GET",
            url: this.endPoint + '/markets',
            params: {
                homeTeam: homeTeam,
                awayTeam: awayTeam
            }
        });
    };

    // todo this should use an $http.post instead of jquery
    XhrService.prototype.login = function(username, password) {
        return $.ajax({
            type: "POST",
            url: this.endPoint + '/login',
            data: {
                username: username,
                password: password
            }
        });
    };

    // todo this should use an $http.post instead of jquery
    XhrService.prototype.register = function(username, password) {
        return $.ajax({
            type: "POST",
            url: this.endPoint + '/register',
            data: {
                username: username,
                password: password
            }
        });
    };

    XhrService.prototype.logout = function() {
        return this.$http.get(this.endPoint + '/logout');
    };

    XhrService.prototype.startGame = function() {
        return this.$http.get(this.endPoint + '/game/start');
    };

    return XhrService;
});