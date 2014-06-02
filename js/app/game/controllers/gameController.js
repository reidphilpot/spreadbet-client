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

        // get game by game id
        xhrService.getGame($routeParams.gameId).success(function (data) {
            this._createGame(data);
            loadingService.setLoading(false);
        }.bind(this));

        marketService.createMarketGrid();

        marketService.grid.slickGrid.onClick.subscribe(function(e, args) {
            $scope.$apply(function() {
                if(args.cell === 0) {
                    var dataItem = args.grid.getDataItem(args.row);
                    spreadBotService.tip = dataItem.title;
                }
                e.stopPropagation();
            });
        });

        betService.createBetsGrid();
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
    GameCtrl.prototype._createGame = function (data) {
        this._gameId = data._id;
        this._createMatch(data.homeTeam, data.awayTeam);
        this.marketService.createMarkets(data.markets, this._gameId);
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
    };

    /**
     * Create Match instance and put it on the scope
     * @param homeTeam
     * @param awayTeam
     * @private
     */
    GameCtrl.prototype._createMatch = function (homeTeam, awayTeam, timestamp) {
        this.match = new Match(homeTeam, awayTeam, timestamp);
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

