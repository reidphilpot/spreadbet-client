define([
    'angular',
    'angular-route',
    './services/xhrService',
    './services/gridService',
    './appController',
    './appRoutes',
    './appConfig',
    './game/gameModule',
    './security/module'
],

    function (angular, angularRoute, xhrService, gridService, appController, routes, config) {
        'use strict';

        function initialise() {
            angular.module('appModule', ['ngRoute', 'gameModule', 'securityModule'], routes)
                .config(config)
                .service('xhrService', xhrService)
                .service('gridService', gridService)
                .controller('appController', appController);

            angular.bootstrap(document, ['appModule']);
        }

        return {
            initialise: initialise
        };
    });