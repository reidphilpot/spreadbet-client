define([
    "angular",
    "./controllers/gameController",
    "./controllers/configController",
    "./services/gameStates",
    "./services/teams",
    "./models/game",
    "./models/market",
    "./directives/spreadBotDirective",
    "./directives/matchEvent",
    "./directives/matchEventFacet"
], function (angular, gameController, configController, gameStates, teams, Game, Market, spreadBotDirective, matchEventDirective, matchEventFacetDirective) {
    'use strict';

    angular.module("gameModule", [])
        .controller('gameController', gameController)
        .controller('configController', configController)
        .factory('gameFactory', Game)
        .factory('marketFactory', Market)
        .service('gameStates', gameStates)
        .service('teamService', teams)
        .directive('spreadBot', spreadBotDirective)
        .directive('matchEvent', matchEventDirective)
        .directive('matchEventFacet', matchEventFacetDirective);
});