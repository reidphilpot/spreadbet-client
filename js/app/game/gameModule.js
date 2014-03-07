define([
    'angular',
    './controllers/gameController',
    './controllers/configController',
    './directives/spreadBotDirective',
    './directives/matchEvent',
    './directives/matchEventFacet',
    './services/marketService'
], function (angular, gameController, configController, spreadBotDirective, matchEventDirective, matchEventFacetDirective, marketService) {
    'use strict';

    angular.module('gameModule', [])
        .controller('gameController', gameController)
        .controller('configController', configController)
        .directive('spreadBot', spreadBotDirective)
        .directive('matchEvent', matchEventDirective)
        .directive('matchEventFacet', matchEventFacetDirective)
        .service('marketService', marketService);
});