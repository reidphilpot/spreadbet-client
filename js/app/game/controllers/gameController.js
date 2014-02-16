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
        "loadingService",

        function GameCtrl($scope, xhrService, Game, subscriptionService, gameStates, socketService, $routeParams, loadingService) {
            $scope.gameStates = gameStates;
            loadingService.loading = false;

            // get game by id
            xhrService.getGame($routeParams.username, $routeParams.gameId)
                .success(function (data) {
                    $scope.game = new Game(data, $scope);
                    console.log("game created", $scope.game);
                    loadingService.loading = false;
                }
            );

            // send request to start simulation on server
            $scope.startSimulation = function () {
                $scope.game.state = gameStates.DURING;
                socketService.emit("startSimulation");
            };

        }
    ];
});

