define([
    '../models/match',
    '../models/market',
    '../constants/gameStates',
    '../constants/teamConstant',
    '../../services/loadingService',
    '../../services/socketService',
    '../../services/subscriptionService',
    '../betEntry',
    'slickgrid',
    'slickdataview',
    'bootstrap-js'
], function (Match, Market, gameStates, teams, loadingService, socketService, sub, betEntry) {
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
        this._gameId = data._id;
        this._createMatch(data.homeTeam, data.awayTeam);
        this._createMarkets(data.markets);
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
            } else {
                this.$scope.match.setEvent(matchEvent);
            }

        }.bind(this));
    };

    GameCtrl.prototype._handleMarketEvent = function (marketEvent) {
        var $scope = this.$scope;
        
        function getMarketById (mId) {
            for (var i = 0; i < $scope.markets.length; i++) {
                var m = $scope.markets[i];
                if (m.id === mId) {
                    return m;
                }
            }
        }

        var market = getMarketById(marketEvent.id);
        market.set(marketEvent);

        this.dataView.beginUpdate();
        this.dataView.setItems($scope.markets);
        this.dataView.endUpdate();
    };

    /**
     * Create Markets and put them on the scope
     * @param markets
     * @private
     */
    GameCtrl.prototype._createMarkets = function (markets) {
        var $scope = this.$scope;
        var dataView = this.dataView;
        var grid = this.grid;

        this.marketSubscriptions = [];

        function getMarketById (mId) {
            for (var i = 0; i < $scope.markets.length; i++) {
                var m = $scope.markets[i];
                if (m.id === mId) {
                    return m;
                }
            }
        }

        // create a Market object for each market in array
        $scope.markets = markets.map(function (m) {
            var market = new Market(m);

            // subscribe to simulated market events
            this.marketSubscriptions.push(sub.subscriptionService.subscribe('marketEvent-' + this._gameId, function (marketEvent) {
                $scope.$apply(function () {
                    var m = getMarketById(marketEvent.id);
                    m.set(marketEvent);
                    dataView.updateItem(m.id, m);

                    var row = dataView.getRowById(m.id);

                    var hash = {}
                    hash[row]= {};
                    hash[row]["soFar"] = 'changed';

                    grid.setCellCssStyles("highlight" + row, hash);

                    // Turn off highlight after 1 sec
                    setTimeout(function () {
                        grid.removeCellCssStyles("highlight" + row);
                    }, 500);
                });
            }));

            return market;
        }.bind(this));

        dataView.beginUpdate();
        dataView.setItems($scope.markets);
        dataView.endUpdate();
    };

    GameCtrl.prototype._createMarketGrid = function() {

        var sortCol = 'title';

        function sellButton () {
            return '<button class="btn btn-xs btn-danger">SELL</button>';
        }

        function buyButton () {
            return '<button class="btn btn-xs btn-primary">BUY</button>';
        }

        var columns = [
            {id: 'title', name: 'Market', field: 'title', width: 300, sortable: true},
            {id: 'soFar', name: 'So Far', field: 'soFar', width: 100, sortable: true, cssClass: 'cell-align-center'},
            {id: 'sellAction', name: '', field: 'sellAction', width: 75, sortable: true, cssClass: 'cell-align-center cell-action', formatter: sellButton, editor: betEntry},
            {id: 'sellPrice', name: 'Sell Price', field: 'sellPrice', width: 100, sortable: true, cssClass: 'cell-align-center'},
            {id: 'buyPrice', name: 'Buy Price', field: 'buyPrice', width: 100, sortable: true, cssClass: 'cell-align-center'},
            {id: 'buyAction', name: '', field: 'buyAction', width: 75, sortable: true, cssClass: 'cell-align-center cell-action', formatter: buyButton, editor: betEntry}
        ];

        var options = {
            enableCellNavigation: true,
            enableColumnReorder: true,
            forceFitColumns: true,
            fullWidthRows: true,
            rowHeight: 38,
            editable: true
        };

        function comparer(a, b) {
            var x = a[sortCol], y = b[sortCol];
            return (x == y ? 0 : (x > y ? 1 : -1));
        }

        this.dataView = new Slick.Data.DataView();

        this.dataView.onRowCountChanged.subscribe(function (e, args) {
            this.grid.updateRowCount();
            this.grid.render();
        }.bind(this));

        this.dataView.onRowsChanged.subscribe(function (e, args) {
            this.grid.invalidateRows(args.rows);
            this.grid.render();
        }.bind(this));

        this.grid = new Slick.Grid('#marketGrid', this.dataView, columns, options);

        this.grid.onSort.subscribe(function (e, args) {
            sortCol = args.sortCol.field;
            this.dataView.sort(comparer, args.sortAsc);
        }.bind(this));
    };

    return GameCtrl;
});

