define([
    '../models/market',
    '../../services/subscriptionService',
    'slickGrid',
    'slickDataView'
], function (Market, sub) {
    'use strict';

    function MarketService(betEntryFactory, gridService) {
        this.markets = null;
        this._betEntryFactory = betEntryFactory;
        this._gridService = gridService;
    }

    MarketService.$injector = ['betEntryFactory', 'gridFactory'];

    /**
     * Get Market by ID
     * @param marketId
     * @returns {*}
     * @private
     */
    MarketService.prototype._getMarketById = function (marketId) {
        for (var i = 0; i < this.markets.length; i++) {
            var market = this.markets[i];
            if (market.id === marketId) {
                return market;
            }
        }
        return null;
    };

    /**
     * Populate markets array
     * @param markets
     * @param gameId
     * @returns {Object[]}
     */
    MarketService.prototype.createMarkets = function (markets, gameId) {
        // create a Market object for each market in array
        this.markets = markets.map(function (m) {
            return new Market(m);
        });

        // subscribe to simulated market events
        sub.subscriptionService.subscribe('marketEvent-' + gameId, this._handleMarketEvent.bind(this));

        this.grid.dataView.beginUpdate();
        this.grid.dataView.setItems(this.markets);
        this.grid.dataView.endUpdate();

        return this.markets;
    };

    /**
     * Create Market Grid
     */
    MarketService.prototype.createMarketGrid = function () {
        this.grid = this._gridService.create('#marketGrid', [
            {id: 'title', name: 'Market', field: 'title', formatter: this._marketFormatter.bind(this), width: 300, sortable: true},
            {id: 'soFar', name: 'So Far', field: 'soFar', width: 90, cssClass: 'cell-align-center'},
            {id: 'sellAction', name: '', field: 'sellAction', width: 70, cssClass: 'cell-action', formatter: this._sellButtonFormatter.bind(this), editor: this._betEntryFactory},
            {id: 'sellPrice', name: 'Sell Price', field: 'sellPrice', width: 100, cssClass: 'cell-align-center'},
            {id: 'buyPrice', name: 'Buy Price', field: 'buyPrice', width: 100, cssClass: 'cell-align-center'},
            {id: 'buyAction', name: '', field: 'buyAction', width: 220, cssClass: 'cell-action', formatter: this._buyButtonFormatter.bind(this), editor: this._betEntryFactory}
        ]);
    };

    /**
     * Handle Market event
     * @param marketEvent
     * @private
     */
    MarketService.prototype._handleMarketEvent = function (marketEvent) {
        var market = this._getMarketById(marketEvent.id);
        market.set(marketEvent);

        this.grid.dataView.updateItem(market.id, market);

        var row = this.grid.dataView.getRowById(market.id);

        var hash = {};
        hash[row] = {};
        hash[row].soFar = 'changed';

        this.grid.slickGrid.setCellCssStyles('highlight' + row, hash);

        // Turn off highlight
        setTimeout(function () {
            this.grid.slickGrid.removeCellCssStyles('highlight' + row);
        }.bind(this), 500);
    };

    /**
     * Title Formatter
     * @returns {string}
     * @private
     */
    MarketService.prototype._marketFormatter = function (row, col, value) {
        return value + ' <span class="game-tip"></span>';
    };

    /**
     * Sell Button Formatter
     * @returns {string}
     * @private
     */
    MarketService.prototype._sellButtonFormatter = function () {
        return '<button class="btn btn-xs btn-danger">SELL</button>';
    };

    /**
     * Buy Button Formatter
     * @returns {string}
     * @private
     */
    MarketService.prototype._buyButtonFormatter = function () {
        return '<button class="btn btn-xs btn-primary">BUY</button>';
    };

    return MarketService;

});