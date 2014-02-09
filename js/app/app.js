define([
    "angular",
    "angular-route",
    "./services/xhrService",
    "./services/socketService",
    "./appController",
    "./appRoutes",
    "./appConfig",
    "./security/module",
    "./game/gameModule",
    "css!./css/app.css"],

function (angular, angularRoute, xhrService, socketService, appController, routes, config) {
    'use strict';

    var initialise = function () {

        angular.module("appModule", ['ngRoute', 'securityModule', 'gameModule'], routes)
            .config(config)
            .value("endPoint", "http://spreadbet-server.herokuapp.com")
            .service("xhrService", xhrService)
            .service("socketService", socketService)
            .controller('appController', appController);

        angular.bootstrap(document, ["appModule"]);
    };

    return {
        initialise: initialise
    };
});