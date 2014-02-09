define([],function() {
    'use strict';

    function GameCtrl($scope, xhrService, securityService, $location, $interval, socketService ) {
        $scope.securityService = securityService;
        $scope.$location = $location;

        $scope.teams = [];
        $scope.homeTeam = {};
        $scope.awayTeam = {};
        $scope.markets = [];

        $scope.homeTeamGoals = 0;
        $scope.awayTeamGoals = 0;

        $scope.matchEvents = [];

        $scope.configured = false;
        $scope.started = false;

        $scope.selectedMatch = function() {
            return $scope.homeTeam.id + $scope.awayTeam.id;
        };

        $scope.startGame = function() {
            xhrService.startGame();
            $scope.started = true;

            var interval = $interval(function() {
                $scope.timer++;
            },1000);

            socketService.on("matchEvent", function(matchEvent) {
                //console.log(matchEvent);
                $scope.$apply(function() {
                    if(matchEvent.type === "Goal") {
                        if(matchEvent.team === 0) {
                            $scope.homeTeamGoals++;
                        } else {
                        } $scope.awayTeamGoals++;
                    }

                    if(matchEvent.type === "Fulltime") {
                        $interval.cancel(interval);
                    }

                    $scope.matchEvents.push(matchEvent);
                });
            });
        };

        xhrService.getTeams().success(function(data) {
            $scope.teams = data.teams;

            $scope.teams.sort(function(a, b) {
                return a.name > b.name;
            });

            $scope.homeTeam = $scope.teams[0];
            $scope.awayTeam = $scope.teams[1];
        });

        $scope.$watch("selectedMatch()", function() {
            if($scope.homeTeam && $scope.awayTeam) {
                xhrService.getMarkets($scope.homeTeam.name, $scope.awayTeam.name).success(function(data) {
                    $scope.markets = data.markets;
                });
            }
        });

        $scope.timer = 0;

    }

    GameCtrl.$inject = ["$scope", "xhrService", "securityService", "$location", "$interval", "socketService"];

    return GameCtrl;
});

