define([],function() {
    'use strict';

    function GameCtrl(
        $scope,
        xhrService,
        securityService,
        gameService,
        subscriptionService,
        gameStates,
        $location,
        $interval,
        socketService,
        $routeParams
    ){

        $scope.securityService = securityService;
        $scope.$location = $location;

        gameService.state = gameStates.CONFIG;

        $scope.homeTeam = {};
        $scope.awayTeam = {};
        $scope.markets = [];

        $scope.homeTeamGoals = 0;
        $scope.awayTeamGoals = 0;
        $scope.timer = 0;
        $scope.matchEvents = [];

        var subscriptionId = subscriptionService.subscribe('matchEvent', function(data) {
           console.log("got matchEvent", data);
        });

        console.log("subscriptionId", subscriptionId);

        setTimeout(function() {
            subscriptionService.unsubscribe(subscriptionId);
        }, 10000);

        if($routeParams.gameId) {
            xhrService.getGame($routeParams.username, $routeParams.gameId)
                .success(function(data) {
                    $scope.markets = data.markets;
                    $scope.homeTeam = data.homeTeam;
                    $scope.awayTeam = data.awayTeam;
                });
        }

        $scope.startGame = function() {
            xhrService.startGame().success(function() {
                var interval = $interval(function() {
                    $scope.timer++;
                }, 1000);

                socketService.on("matchEvent", function(matchEvent) {
                    $scope.$apply(function() {
                        if(matchEvent.type === "Goal") {
                            if(matchEvent.team === 0) {
                                $scope.homeTeamGoals++;
                            } else {
                                $scope.awayTeamGoals++;
                            }
                        }

                        if(matchEvent.type === "FullTime") {
                            $interval.cancel(interval);
                        }

                        $scope.matchEvents.push(matchEvent);
                    });
                });

            });
        };

    }

    GameCtrl.$inject = [
        "$scope",
        "xhrService",
        "securityService",
        "gameService",
        "subscriptionService",
        "gameStates",
        "$location",
        "$interval",
        "socketService",
        "$routeParams"];

    return GameCtrl;
});

