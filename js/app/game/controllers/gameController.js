define([
    '../models/match',
    '../models/market',
    '../constants/gameStates',
    '../constants/teamConstant',
    '../../services/loadingService',
    '../../services/socketService',
    '../../services/subscriptionService',
    'bootstrap-js'
], function (Match, Market, gameStates, teams, loadingService, socketService, sub) {
    'use strict';

    function GameCtrl($scope, xhrService, $routeParams) {
        this.$scope = $scope;

        $scope.gameStates = gameStates;
        $scope.state = gameStates.BEFORE;
        $scope.teams = teams;
        loadingService.setLoading(true);

        // get game by game id
        xhrService.getGame($routeParams.gameId)
            .success(function (data) {
                this.createGame(data);
                loadingService.setLoading(false);
                //$('#gameIntro').modal();
            }.bind(this));

        // send request to start simulation on server
        $scope.startSimulation = function () {
            $scope.state = gameStates.DURING;
            socketService.send('startSimulation');
        };
    }

    GameCtrl.$inject = [
        '$scope',
        'xhrService',
        '$routeParams'
    ];

    GameCtrl.prototype.createGame = function(data) {
        this.createMatch(data.homeTeam, data.awayTeam);
        this.createMarkets(data.markets);
    };

    GameCtrl.prototype.createMatch = function(homeTeam, awayTeam) {
        var $scope = this.$scope;
        $scope.match = new Match(homeTeam, awayTeam);

        // subscribe to simulated match events
        sub.subscriptionService.subscribe('matchEvent', function(matchEvent) {
            $scope.$apply(function() {
                $scope.match.setEvent(matchEvent);
            });
        });
    };

    GameCtrl.prototype.createMarkets = function(markets) {
        var $scope = this.$scope;

        // create a Market object for each market in array
        $scope.markets = markets.map(function (market) {
            var m = new Market(market);

            // subscribe to simulated market events
            sub.subscriptionService.subscribe('marketEvent', function(marketEvent) {
                $scope.$apply(function() {
                    m.set(marketEvent);
                });
            });

            return m;
        });
    };

    return GameCtrl;
});

