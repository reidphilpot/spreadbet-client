define([
    '../models/match',
    '../models/market',
    '../constants/gameStates',
    '../constants/teamConstant',
    '../../services/loadingService',
    '../../services/socketService',
    '../../services/subscriptionService',
    'slickgrid',
    'slickdataview',
    'bootstrap-js'
], function (Match, Market, gameStates, teams, loadingService, socketService, sub) {
    'use strict';

    function GameCtrl($scope, xhrService, $routeParams) {
        this.$scope = $scope;

        $scope.gameStates = gameStates;
        $scope.state = gameStates.BEFORE;
        $scope.teams = teams;
        $scope.startSimulation = this._startSimulation.bind(this);

        loadingService.setLoading(true);

        // get game by game id
        xhrService.getGame($routeParams.gameId).success(function (data) {
            this._createGame(data);
            loadingService.setLoading(false);
            //$('#gameIntro').modal();
        }.bind(this));

        this._createMarketGrid();
    }

    GameCtrl.$inject = [
        '$scope',
        'xhrService',
        '$routeParams'
    ];

    /**
     * Create instance of game
     * @param {Object} game configuration received from server
     * @private
     */
    GameCtrl.prototype._createGame = function (data) {
        this._createMatch(data.homeTeam, data.awayTeam, new Date(data.gameCreated));
        this._createMarkets(data.markets);
    };

    /**
     * Send request to start simulation on server
     * @private
     */
    GameCtrl.prototype._startSimulation = function () {
        this.$scope.state = gameStates.DURING;
        socketService.send('startSimulation');
    };

    /**
     * Un-subscribe from all events when simulation completes
     * @private
     */
    GameCtrl.prototype._endSimulation = function () {
        this.$scope.state = gameStates.AFTER;

        sub.subscriptionService.unsubscribe(this.matchSubscription);

        this.marketSubscriptions.forEach(function (marketSub) {
            sub.subscriptionService.unsubscribe(marketSub);
        });
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
        this.matchSubscription = sub.subscriptionService.subscribe('matchEvent', this._handleMatchEvent.bind(this));
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
            } else {
                this.$scope.match.setEvent(matchEvent);
            }

        }.bind(this));
    };

    /**
     * Create Markets and put them on the scope
     * @param markets
     * @private
     */
    GameCtrl.prototype._createMarkets = function (markets) {
        var $scope = this.$scope;
        this.marketSubscriptions = [];

        // create a Market object for each market in array
        $scope.markets = markets.map(function (m) {
            var market = new Market(m);

            // subscribe to simulated market events
            this.marketSubscriptions.push(sub.subscriptionService.subscribe('marketEvent', function (marketEvent) {
                $scope.$apply(function () {
                    market.set(marketEvent);
                });
            }));

            return market;
        }.bind(this));

        this.dataView.beginUpdate();
        this.dataView.setItems($scope.markets);
        this.dataView.endUpdate();
        this.grid.resizeCanvas();
    };

    GameCtrl.prototype._createMarketGrid = function() {

        var columns = [
            {id: 'title', name: 'Market', field: 'title', width: 250},
            {id: 'soFar', name: 'So Far', field: 'soFar', width: 120, cssClass: 'cell-align-center'},
            {id: 'sellPrice', name: 'Sell Price', field: 'sellPrice', width: 120, cssClass: 'cell-align-center'},
            {id: 'buyPrice', name: 'Buy Price', field: 'buyPrice', width: 120, cssClass: 'cell-align-center'}
        ];

        var options = {
            enableCellNavigation: true,
            enableColumnReorder: false,
            forceFitColumns: true,
            fullWidthRows: true,
            rowHeight: 38
        };

        this.dataView = new Slick.Data.DataView();
        this.grid = new Slick.Grid('#marketGrid', this.dataView, columns, options);
    };

    return GameCtrl;
});

