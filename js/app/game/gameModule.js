define([
    'angular',
    './controllers/gameController',
    './controllers/configController',
    './directives/matchEvent',
    './directives/matchEventFacet',
    './services/marketService',
    './services/betService',
    '../services/gridService',
    './betEntry',
    '../spreadBot/spreadBotModule'
], function (angular, gameController, configController, matchEventDirective, matchEventFacetDirective, marketService, betService, gridService, betEntry) {
    'use strict';

    angular.module('gameModule', ['spreadBotModule'])
        .controller('gameController', gameController)
        .controller('configController', configController)
        .directive('matchEvent', matchEventDirective)
        .directive('matchEventFacet', matchEventFacetDirective)
        .service('marketService', marketService)
        .service('betService', betService)
        .service('gridService', gridService)
        .factory('betEntryFactory', betEntry);
});