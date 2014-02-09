define([
    "angular",
    "./controllers/gameController",
    "./directives/spreadbotDirective",
    "css!./css/game.css"
],function (
    angular,
    gameController,
    spreadbotDirective) {
    'use strict';

    angular.module("gameModule", [])
        .controller('gameController', gameController)
        .directive('spreadbot', spreadbotDirective)
        .run(["securityService", "$location", function(securityService, $location) {
            if(!securityService.isLoggedIn()) {
                $location.path("/");
            }
        }]);
});