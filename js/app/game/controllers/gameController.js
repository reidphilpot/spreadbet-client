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
            $scope.timer = 0;
            $scope.gameStates = gameStates;

            // get game by game id
            xhrService.getGame($routeParams.username, $routeParams.gameId)
                .success(function (data) {
                    $scope.game = new Game(data);
                    console.log("game created", $scope.game);
                });

            // send request to start simulation on server
            $scope.startSimulation = function () {
                $scope.game.state = gameStates.DURING;
                socketService.send("startSimulation");
            };

            // subscribe to simulated match events
            var subscriptionId = subscriptionService.subscribe('matchEvent', function (matchEvent) {
                $scope.$apply(function () {
                    switch (matchEvent.type) {
                        case "Clock":
                            $scope.timer = matchEvent.time;
                            break;

                        case "Goal":
                            if (matchEvent.team === 0) {
                                $scope.game.homeTeam.score++;
                            } else {
                                $scope.game.awayTeam.score++;
                            }
                            break;

                        case "FullTime":
                            subscriptionService.unsubscribe(subscriptionId);
                            break;
                    }
                    $scope.game.matchEvents.push(matchEvent);

                });
            });

        }

    ];
});

