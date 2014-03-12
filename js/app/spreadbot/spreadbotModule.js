define([
    'angular',
    './spreadBotDirective',
    './spreadBotService'
], function (angular, spreadBotDirective, spreadBotService) {
    'use strict';

    angular.module('spreadBotModule', [])
        .service('spreadBotService', spreadBotService)
        .directive('spreadBot', spreadBotDirective);
});