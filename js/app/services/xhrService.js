define(['./endPointService', 'jquery'], function (endPoint, $) {
    'use strict';

    var XhrService = function ($http) {
        this.$http = $http;
    };

    XhrService.$inject = ['$http'];

    XhrService.prototype.getTeams = function () {
        return this.$http.get(endPoint + '/teams');
    };

    XhrService.prototype.createGame = function (putData) {
        return $.ajax({type: 'PUT', url: endPoint + '/game/new', data: putData});
    };

    XhrService.prototype.getGame = function (gameId) {
        return this.$http.get(endPoint + '/game/' + gameId);
    };

    return XhrService;
});