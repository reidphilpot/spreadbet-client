define([
    'angular',
    './controllers/gameController',
    './controllers/configController',
    './directives/matchEvent',
    './directives/matchEventFacet',
    './services/marketService',
    './services/betService',
    './betEntry',
    '../spreadBot/spreadBotModule'
], function (angular, gameController, configController, matchEventDirective, matchEventFacetDirective, marketService, betService, betEntry) {
    'use strict';

    angular.module('gameModule', ['spreadBotModule'])
        .controller('gameController', gameController)
        .controller('configController', configController)
        .directive('matchEvent', matchEventDirective)
        .directive('matchEventFacet', matchEventFacetDirective)
        .service('marketService', marketService)
        .service('betService', betService)
        .factory('betEntryFactory', betEntry);
});