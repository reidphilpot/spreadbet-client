define([
    '../models/match',
    '../constants/gameStates',
    '../../services/loadingService',
    '../../services/socketService',
    '../../services/subscriptionService'
], function (Match, gameStates, loadingService, socketService, sub) {
    'use strict';

    function GameCtrl($scope, xhrService, marketService, betService, spreadBotService, $routeParams) {
        // Angular scope
        this.$scope = $scope;

        this.gameStates = gameStates;
        this.gameState = gameStates.BEFORE;
        this.spreadBotService = spreadBotService;

        this.marketService = marketService;
        this.betService = betService;

        loadingService.setLoading(true);

        marketService.createMarketGrid();

        marketService.grid.slickGrid.onClick.subscribe(function(e, args) {
            $scope.$apply(function() {
                if(args.cell === 0) {
                    var dataItem = args.grid.getDataItem(args.row);
                    spreadBotService.tip = dataItem.tip;
                }
                e.stopPropagation();
            });
        });

        betService.createBetsGrid();

        // get game by game id
        xhrService.getGame($routeParams.gameId)
            .then(this._createGame.bind(this))
            .then(betService.getBets.bind(betService))
            .then(function(bets) {
                if(this.gameState === gameStates.AFTER) {
                    this._calculateWinnings(bets);
                }
            }.bind(this))
            .then(function() { loadingService.setLoading(false); });
    }

    GameCtrl.$inject = [
        '$scope',
        'xhrService',
        'marketService',
        'betService',
        'spreadBotService',
        '$routeParams'
    ];

    /**
     * Create instance of game
     * @param {Object} game configuration received from server
     * @private
     */
    GameCtrl.prototype._createGame = function (json) {
        var data = json.data;
        this._gameId = data._id;
        this.gameState = data.gameState;
        this._createMatch(data.homeTeam, data.awayTeam, data.minutesElapsed);
        this.marketService.createMarkets(data.markets, this._gameId);
        this.betService.gameId = this._gameId;
        if(this.gameState === 1) {
            this.startSimulation();
        }
    };

    /**
     * Send request to start simulation on server
     * @private
     */
    GameCtrl.prototype.startSimulation = function () {
        this.gameState = gameStates.DURING;

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
        this.gameState = gameStates.AFTER;
        sub.subscriptionService.unsubscribe(this.matchSubscription);
        this.betService.getBets().then(this._calculateWinnings.bind(this));
    };

    GameCtrl.prototype._calculateWinnings = function(bets) {
        var pnl = bets.map(function(bet) { return bet.result; }).reduce(function(previousValue, currentValue) {
            return previousValue + currentValue;
        });

        if(pnl > 0) {
            this.spreadBotService.tip = 'Congratulations you won £' + Math.abs(pnl).toFixed(2);
        }
        else if(pnl < 0) {
            this.spreadBotService.tip = 'Sorry you lost £' + Math.abs(pnl).toFixed(2);
        }
        else {
            this.spreadBotService.tip = 'You broke even';
        }
    };

    /**
     * Create Match instance and put it on the scope
     * @param homeTeam
     * @param awayTeam
     * @private
     */
    GameCtrl.prototype._createMatch = function (homeTeam, awayTeam, minutesElapsed) {
        this.match = new Match(homeTeam, awayTeam, minutesElapsed);
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

            this.match.setEvent(matchEvent);

        }.bind(this));
    };

    return GameCtrl;
});

