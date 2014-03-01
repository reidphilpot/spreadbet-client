define(function () {
    'use strict';

    function GameConfigCtrl($scope, xhrService, $location, loadingService) {
        $scope.homeTeam = {};
        $scope.awayTeam = {};
        loadingService.setLoading(true);

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
            loadingService.setLoading(false);
        });

        $scope.createGame = function () {
            loadingService.setLoading(true);
            xhrService.createGame({ homeTeam: $scope.homeTeam._id, awayTeam: $scope.awayTeam._id })
                .then(function (data) {
                    $scope.$apply(function () {
                        $location.path('/game/' + data.game._id);
                        loadingService.setLoading(false);
                    });
                });
        };

    }

    GameConfigCtrl.$inject = ['$scope', 'xhrService', '$location', 'loadingService'];

    return GameConfigCtrl;
});

