define(['./endPointService', 'jquery'], function (endPoint, $) {
    'use strict';

    var XhrService = function ($http) {
        this.$http = $http;
    };

    XhrService.$inject = ['$http'];

    // game

    XhrService.prototype.getTeams = function () {
        return this.$http.get(endPoint + '/teams');
    };

    XhrService.prototype.createGame = function (putData) {
        return $.ajax({type: 'PUT', url: endPoint + '/game/new', data: putData});
    };

    XhrService.prototype.getGame = function (gameId) {
        return this.$http.get(endPoint + '/game/' + gameId);
    };

    // security

    XhrService.prototype.login = function(username, password) {
        return $.ajax({type: "POST", url: endPoint + '/login', data: { username: username, password: password }});
    };

    XhrService.prototype.logout = function () {
        return this.$http.get(endPoint + '/logout');
    };

    XhrService.prototype.register = function(postData) {
        return $.ajax({type: "POST", url: endPoint + '/register', data: postData});
    };

    XhrService.prototype.getUser = function (username) {
        return this.$http.get(endPoint + '/user/' + username);
    };

    return XhrService;
});