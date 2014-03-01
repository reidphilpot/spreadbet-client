define(['jquery'], function ($) {
    'use strict';

    var XhrService = function ($http, endPoint) {
        this.$http = $http;
        this.endPoint = endPoint;
    };

    XhrService.$inject = ['$http', 'endPoint', 'loadingService'];

    XhrService.prototype.getTeams = function () {
        return this.$http.get(this.endPoint + '/teams');
    };

    XhrService.prototype.createGame = function (putData) {
        return $.ajax({type: 'PUT', url: this.endPoint + '/game/new', data: putData});
    };

    XhrService.prototype.getGame = function (gameId) {
        return this.$http.get(this.endPoint + '/game/' + gameId);
    };

    return XhrService;
});