define([
        'angular',
        'angular-route',
        './services/xhrService',
        './appController',
        './appRoutes',
        './appConfig',
        './game/gameModule'
    ],

    function (angular, angularRoute, xhrService, appController, routes, config) {
        'use strict';

        var initialise = function () {

            angular.module('appModule', ['ngRoute', 'gameModule'], routes)
                .config(config)
                .service('xhrService', xhrService)
                .controller('appController', appController);

            angular.bootstrap(document, ['appModule']);
        };

        return {
            initialise: initialise
        };
    });