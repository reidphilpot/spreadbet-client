define([
    'angular',
    './controllers/gameController',
    './controllers/configController',
    './constants/gameStates',
    './constants/teamConstant',
    './models/game',
    './models/market',
    './directives/spreadBotDirective',
    './directives/matchEvent',
    './directives/matchEventFacet'
], function (angular, gameController, configController, gameStates, teamConstant, Game, Market, spreadBotDirective, matchEventDirective, matchEventFacetDirective) {
    'use strict';

    angular.module('gameModule', [])
        .controller('gameController', gameController)
        .controller('configController', configController)
        .factory('gameFactory', Game)
        .factory('marketFactory', Market)
        .constant('gameStates', gameStates)
        .constant('teamConstant', teamConstant)
        .directive('spreadBot', spreadBotDirective)
        .directive('matchEvent', matchEventDirective)
        .directive('matchEventFacet', matchEventFacetDirective);
});