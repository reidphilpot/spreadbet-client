define([], function () {
    'use strict';

    return [
        "$scope",
        "xhrService",
        "securityService",
        "gameFactory",
        "subscriptionService",
        "gameStates",
        "$location",
        "socketService",
        "$routeParams",

        function GameCtrl($scope, xhrService, securityService, Game, subscriptionService, gameStates, $location, socketService, $routeParams) {
            $scope.gameStates = gameStates;

            // get game by game id
            xhrService.getGame($routeParams.username, $routeParams.gameId)
                .success(function (data) {
                    $scope.game = new Game(data, $scope);
                    console.log("game created", $scope.game);
                });

            // send request to start simulation on server
            $scope.startSimulation = function () {
                $scope.game.state = gameStates.DURING;
                socketService.send("startSimulation");
            };

        }
    ];
});

