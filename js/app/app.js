define([
    'angular',
    'angular-route',
    'angular-sanitize',
    './services/xhrService',
    './appController',
    './appRoutes',
    './appConfig',
    './intro/controllers/introController',
    './filters/currency',
    './game/gameModule',
    './security/module'
],

    function (angular, angularRoute, angularSanitize, xhrService, appController, routes, config, introController, currencyFilter) {
        'use strict';

        function initialise() {
            angular.module('appModule', ['ngRoute', 'gameModule', 'securityModule', 'ngSanitize'], routes)
                .config(config)
                .service('xhrService', xhrService)
                .controller('appController', appController)
                .controller('introController', introController)
                .filter('customCurrency', currencyFilter);

            angular.bootstrap(document, ['appModule']);
        }

        return {
            initialise: initialise
        };
    });