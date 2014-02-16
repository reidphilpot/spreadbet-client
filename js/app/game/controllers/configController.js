define([], function () {
    'use strict';

    function GameConfigCtrl($scope, xhrService, securityService, $location, loadingService) {
        $scope.teams = [];
        $scope.homeTeam = {};
        $scope.awayTeam = {};
        loadingService.loading = true;

        xhrService.getTeams().success(function (teams) {
            $scope.teams = teams;

            $scope.teams.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });

            $scope.homeTeam = $scope.teams[0];
            $scope.awayTeam = $scope.teams[1];
            loadingService.loading = false;
        });

        $scope.createGame = function () {
            loadingService.loading = true;
            xhrService.createGame({ homeTeam: $scope.homeTeam._id, awayTeam: $scope.awayTeam._id })
                .then(function (data) {
                    $scope.$apply(function () {
                        $location.path('/user/' + securityService.loggedInUser.username + '/game/' + data.game._id);
                    });
                });
        };

    }

    GameConfigCtrl.$inject = ["$scope", "xhrService", "securityService", "$location", "loadingService"];

    return GameConfigCtrl;
});

