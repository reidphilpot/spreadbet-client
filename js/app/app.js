define([
    "angular",
    "angular-route",
    "./services/xhrService",
    "./services/socketService",
    "./services/subscriptionService",
    "./appController",
    "./appRoutes",
    "./appConfig",
    "./security/module",
    "./game/gameModule",
    "./user/userModule",
    "css!./css/app.css"],

    function (angular, angularRoute, xhrService, socketService, subscriptionService, appController, routes, config) {
        'use strict';

        var initialise = function () {

            angular.module("appModule", ['ngRoute', 'securityModule', 'gameModule', 'userModule'], routes)
                .config(config)
                .value("endPoint", "http://localhost:3000") //http://spreadbet-server.herokuapp.com
                .service("xhrService", xhrService)
                .service("socketService", socketService)
                .service("subscriptionService", subscriptionService)
                .controller('appController', appController);

            angular.bootstrap(document, ["appModule"]);
        };

        return {
            initialise: initialise
        };
    });