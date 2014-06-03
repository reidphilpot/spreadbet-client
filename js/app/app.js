define([
    'angular',
    'angular-route',
    './services/xhrService',
    './appController',
    './appRoutes',
    './appConfig',
    './intro/controllers/introController',
    './game/gameModule',
    './security/module'
],

    function (angular, angularRoute, xhrService, appController, routes, config, introController) {
        'use strict';

        function initialise() {
            angular.module('appModule', ['ngRoute', 'gameModule', 'securityModule'], routes)
                .config(config)
                .service('xhrService', xhrService)
                .controller('appController', appController)
                .controller('introController', introController);

            angular.bootstrap(document, ['appModule']);
        }

        return {
            initialise: initialise
        };
    });