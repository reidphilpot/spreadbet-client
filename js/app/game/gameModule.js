define([
    "angular",
    "./controllers/gameController",
    "./controllers/configController",
    "./services/gameStates",
    "./models/game",
    "./models/market",
    "./directives/spreadBotDirective"
], function (angular, gameController, configController, gameStates, Game, Market, spreadBotDirective) {
    'use strict';

    angular.module("gameModule", [])
        .controller('gameController', gameController)
        .controller('configController', configController)
        .factory('gameFactory', Game)
        .factory('marketFactory', Market)
        .service('gameStates', gameStates)
        .directive('spreadBot', spreadBotDirective);
});