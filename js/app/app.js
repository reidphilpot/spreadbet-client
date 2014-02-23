define([
    "angular",
    "angular-route",
    "./services/xhrService",
    "./services/socketService",
    "./services/subscriptionService",
    "./services/loadingService",
    "./appController",
    "./appRoutes",
    "./appConfig",
    "./game/gameModule"],

    function (angular, angularRoute, xhrService, socketService, subscriptionService, loadingService, appController, routes, config) {
        'use strict';

        var initialise = function () {

            angular.module("appModule", ['ngRoute', 'gameModule'], routes)
                .config(config)
                .constant("endPoint", "http://spreadbet-server.herokuapp.com")
                .service("xhrService", xhrService)
                .service("socketService", socketService)
                .service("subscriptionService", subscriptionService)
                .service("loadingService", loadingService)
                .controller('appController', appController);

            angular.bootstrap(document, ["appModule"]);
        };

        return {
            initialise: initialise
        };
    });