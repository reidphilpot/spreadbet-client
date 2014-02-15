define([], function () {
    'use strict';

    return [
        "$scope",
        "xhrService",
        "gameFactory",
        "subscriptionService",
        "gameStates",
        "socketService",
        "$routeParams",

        function GameCtrl($scope, xhrService, Game, subscriptionService, gameStates, socketService, $routeParams) {
            $scope.gameStates = gameStates;

            // get game by id
            xhrService.getGame($routeParams.username, $routeParams.gameId)
                .success(function (data) {
                    $scope.game = new Game(data, $scope);
                    console.log("game created", $scope.game);
                }
            );

            // send request to start simulation on server
            $scope.startSimulation = function () {
                $scope.game.state = gameStates.DURING;
                socketService.send("startSimulation");
            };

        }
    ];
});

