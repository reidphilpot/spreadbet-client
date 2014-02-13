define([
    "angular",
    "./controllers/gameController",
    "./controllers/configController",
    "./services/gameService",
    "./services/gameStates",
    "./directives/spreadbotDirective",
    "css!./css/game.css"
],function (
    angular,
    gameController,
    configController,
    gameService,
    gameStates,
    spreadbotDirective) {
    'use strict';

    angular.module("gameModule", [])
        .controller('gameController', gameController)
        .controller('configController', configController)
        .service('gameService', gameService)
        .service('gameStates', gameStates)
        .directive('spreadbot', spreadbotDirective)
        .run(["securityService", "$location", function(securityService, $location) {
            if(!securityService.isLoggedIn()) {
                $location.path("/");
            }
        }]);
});