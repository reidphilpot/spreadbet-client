define(["jquery"], function ($) {
    'use strict';

    var XhrService = function ($http, endPoint) {
        this.$http = $http;
        this.endPoint = endPoint;
    };

    XhrService.$inject = ["$http", "endPoint"];

    XhrService.prototype.getTeams = function () {
        return this.$http.get(this.endPoint + '/teams');
    };

    XhrService.prototype.login = function (username, password) {
        return $.ajax({type: "POST", url: this.endPoint + '/login', data: { username: username, password: password }});
    };

    XhrService.prototype.register = function (postData) {
        return $.ajax({type: "POST", url: this.endPoint + '/register', data: postData});
    };

    XhrService.prototype.createGame = function (putData) {
        return $.ajax({type: "PUT", url: this.endPoint + '/game/new', data: putData});
    };

    XhrService.prototype.getGame = function (username, gameId) {
        return this.$http.get(this.endPoint + '/user/' + username + '/game/' + gameId);
    };

    XhrService.prototype.getUser = function (username) {
        return this.$http.get(this.endPoint + '/user/' + username);
    };

    XhrService.prototype.logout = function () {
        return this.$http.get(this.endPoint + '/logout');
    };

    XhrService.prototype.startGame = function () {
        return this.$http.get(this.endPoint + '/game/start');
    };

    return XhrService;
});