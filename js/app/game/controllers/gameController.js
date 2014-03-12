define([
    '../models/match',
    '../constants/gameStates',
    '../constants/teamConstant',
    '../../services/loadingService',
    '../../services/socketService',
    '../../services/subscriptionService',
    'bootstrap-js'
], function (Match, gameStates, teams, loadingService, socketService, sub) {
    'use strict';

    function GameCtrl($scope, xhrService, marketService, betService, $routeParams) {
        this.$scope = $scope;

        $scope.gameStates = gameStates;
        $scope.state = gameStates.BEFORE;
        $scope.teams = teams;
        $scope.startSimulation = this._startSimulation.bind(this);

        this.marketService = marketService;
        this.betService = betService;

        loadingService.setLoading(true);

        // get game by game id
        xhrService.getGame($routeParams.gameId).success(function (data) {
            this._createGame(data);
            loadingService.setLoading(false);
            //$('#gameIntro').modal();
        }.bind(this));

        marketService.createMarketGrid();
        betService.createBetsGrid();
    }

    GameCtrl.$inject = [
        '$scope',
        'xhrService',
        'marketService',
        'betService',
        '$routeParams'
    ];

    /**
     * Create instance of game
     * @param {Object} game configuration received from server
     * @private
     */
    GameCtrl.prototype._createGame = function (data) {
        this._gameId = data._id;
        this._createMatch(data.homeTeam, data.awayTeam);
        this.marketService.createMarkets(data.markets, this._gameId);
    };

    /**
     * Send request to start simulation on server
     * @private
     */
    GameCtrl.prototype._startSimulation = function () {
        this.$scope.state = gameStates.DURING;

        socketService.send(JSON.stringify({
            key: 'startSimulation',
            value: this._gameId
        }));
    };

    /**
     * Un-subscribe from all events when simulation completes
     * @private
     */
    GameCtrl.prototype._endSimulation = function () {
        this.$scope.state = gameStates.AFTER;

        sub.subscriptionService.unsubscribe(this.matchSubscription);
    };

    /**
     * Create Match instance and put it on the scope
     * @param homeTeam
     * @param awayTeam
     * @private
     */
    GameCtrl.prototype._createMatch = function (homeTeam, awayTeam, timestamp) {
        this.$scope.match = new Match(homeTeam, awayTeam, timestamp);

        // subscribe to simulated match events
        this.matchSubscription = sub.subscriptionService.subscribe('matchEvent-' + this._gameId, this._handleMatchEvent.bind(this));
    };

    /**
     * Update Match with event delta
     * @param matchEvent
     * @private
     */
    GameCtrl.prototype._handleMatchEvent = function (matchEvent) {
        this.$scope.$apply(function () {

            if (matchEvent.type === 'FullTime') {
                this._endSimulation();
            }

            this.$scope.match.setEvent(matchEvent);

        }.bind(this));
    };

    return GameCtrl;
});

