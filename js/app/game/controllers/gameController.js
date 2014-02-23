define(['bootstrap-js'], function () {
    'use strict';

    function GameCtrl($scope, xhrService, Game, gameStates, socketService, $routeParams, loadingService) {
        $scope.gameStates = gameStates;
        loadingService.setLoading(true);

        // get game by game id
        xhrService.getGame($routeParams.gameId)
            .success(function (data) {
                $scope.game = new Game(data, $scope);
                loadingService.setLoading(false);
                $('#gameIntro').modal();
            });

        // send request to start simulation on server
        $scope.startSimulation = function () {
            $scope.game.state = gameStates.DURING;
            socketService.send("startSimulation");
        };

    }

    GameCtrl.$inject = [
        "$scope",
        "xhrService",
        "gameFactory",
        "gameStates",
        "socketService",
        "$routeParams",
        "loadingService"
    ];

    return GameCtrl;
});

