define(['../../services/loadingService'], function (loadingService) {
    'use strict';

    function GameConfigCtrl($scope, xhrService, $location) {
        this.$scope = $scope;
        this.$location = $location;
        this.xhrService = xhrService;

        $scope.homeTeam = {};
        $scope.awayTeam = {};
        $scope.createGame = this._createGame.bind(this);

        loadingService.setLoading(true);

        // Get teams from back-end service
        xhrService.getTeams().success(this._setTeams.bind(this));
    }

    GameConfigCtrl.$inject = ['$scope', 'xhrService', '$location'];

    GameConfigCtrl.prototype._setTeams = function (teams) {
        this.$scope.teams = teams;

        teams.sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });

        this.$scope.homeTeam = teams[0];
        this.$scope.awayTeam = teams[1];

        loadingService.setLoading(false);
    };

    GameConfigCtrl.prototype._createGame = function () {
        var $scope = this.$scope;

        loadingService.setLoading(true);

        this.xhrService.createGame({ homeTeam: $scope.homeTeam._id, awayTeam: $scope.awayTeam._id })
            .then(this._loadGame.bind(this));
    };

    GameConfigCtrl.prototype._loadGame = function(data) {
        loadingService.setLoading(false);

        this.$scope.$apply(function () {
            this.$location.path('/game/' + data.game._id);
        }.bind(this));
    };

    return GameConfigCtrl;
});

