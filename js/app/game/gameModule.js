define([
    'angular',
    './controllers/gameController',
    './controllers/configController',
    './directives/matchEvent',
    './directives/matchEventFacet',
    './services/marketService',
    './services/betService',
    '../services/gridService',
    './services/gameStateService',
    './betEntry',
    '../spreadBot/spreadBotModule'
], function (angular, gameController, configController, matchEventDirective, matchEventFacetDirective, marketService, betService, gridService, gameStateService, betEntry) {
    'use strict';

    angular.module('gameModule', ['spreadBotModule'])
        .controller('gameController', gameController)
        .controller('configController', configController)
        .directive('matchEvent', matchEventDirective)
        .directive('matchEventFacet', matchEventFacetDirective)
        .service('marketService', marketService)
        .service('betService', betService)
        .service('gridService', gridService)
        .service('gameStateService', gameStateService)
        .factory('betEntryFactory', betEntry);
});