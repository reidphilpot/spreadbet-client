define(['../../services/loadingService'], function (loadingService) {
    'use strict';

    function GameConfigCtrl($scope, xhrService, $location, securityService) {
        this.$scope = $scope;
        this.$location = $location;
        this.xhrService = xhrService;
        this.securityService = securityService;

        this.homeTeam = {};
        this.awayTeam = {};
        this.createGame = this._createGame.bind(this);

        loadingService.setLoading(true);

        // Get teams from back-end service
        xhrService.getTeams().success(this._setTeams.bind(this));
    }

    GameConfigCtrl.$inject = ['$scope', 'xhrService', '$location', 'securityService'];

    GameConfigCtrl.prototype._setTeams = function (teams) {
        this.teams = teams;

        this.teams.sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });

        this.homeTeam = teams[0];
        this.awayTeam = teams[1];

        loadingService.setLoading(false);
    };

    GameConfigCtrl.prototype._createGame = function () {
        loadingService.setLoading(true);

        this.xhrService.createGame({
            homeTeam: this.homeTeam._id,
            awayTeam: this.awayTeam._id,
            user: this.securityService.loggedInUser.id
        }).then(this._loadGame.bind(this));
    };

    GameConfigCtrl.prototype._loadGame = function (game) {
        loadingService.setLoading(false);

        this.$scope.$apply(function () {
            this.$location.path('/users/' + this.securityService.loggedInUser.username + '/games/' + game._id);
        }.bind(this));
    };

    GameConfigCtrl.prototype.filterOutSameTeam = function (team) {
        return function(item) {
            return item !== team;
        };
    };


    return GameConfigCtrl;
});

