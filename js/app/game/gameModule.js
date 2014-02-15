define([
    "angular",
    "./controllers/gameController",
    "./controllers/configController",
    "./services/gameStates",
    "./models/game",
    "./directives/spreadBotDirective",
    "css!./css/game.css"
], function (angular, gameController, configController, gameStates, Game, spreadBotDirective) {
    'use strict';

    angular.module("gameModule", [])
        .controller('gameController', gameController)
        .controller('configController', configController)
        .factory('gameFactory', Game)
        .service('gameStates', gameStates)
        .directive('spreadBot', spreadBotDirective)
        .run(["securityService", "$location", function (securityService, $location) {
            if (!securityService.isLoggedIn()) {
                $location.path("/");
            }
        }]);
});