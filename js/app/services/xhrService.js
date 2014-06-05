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
        return $.ajax({type: 'PUT', url: endPoint + '/game', data: putData});
    };

    XhrService.prototype.getGame = function (gameId) {
        return this.$http.get(endPoint + '/game/' + gameId);
    };

    // bet

    XhrService.prototype.createBet = function (gameId, username, market, stake, price, direction) {
        return $.ajax({
            type: 'PUT',
            url: endPoint + '/users/' + username + '/games/' + gameId + '/bet',
            data: {
                market: market,
                stake: stake,
                price: price,
                direction: direction
            }});
    };

    XhrService.prototype.getBets = function (gameId, username) {
        return this.$http.get(endPoint + '/users/' + username + '/games/' + gameId + '/bets');
    };

    XhrService.prototype.deleteBet = function (gameId, username, betId) {
        return this.$http.delete(endPoint + '/users/' + username + '/games/' + gameId + '/bets/' + betId);
    };

    // security

    XhrService.prototype.login = function (username, password) {
        return $.ajax({type: 'POST', url: endPoint + '/login', data: { username: username, password: password }});
    };

    XhrService.prototype.logout = function () {
        return this.$http.get(endPoint + '/logout');
    };

    XhrService.prototype.register = function (postData) {
        return $.ajax({type: 'POST', url: endPoint + '/register', data: postData});
    };

    XhrService.prototype.getUser = function (username) {
        return this.$http.get(endPoint + '/user/' + username);
    };

    return XhrService;
});