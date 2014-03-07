define([
    '../models/market',
    '../../services/subscriptionService',
    '../betEntry',
    'slickgrid',
    'slickdataview'
], function (Market, sub, betEntry) {
    'use strict';

    function MarketService() {
        this.markets = null;
    }

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
        this.marketSubscriptions = [];

        // create a Market object for each market in array
        this.markets = markets.map(function (m) {
            var market = new Market(m);

            // subscribe to simulated market events
            this.marketSubscriptions.push(
                sub.subscriptionService.subscribe('marketEvent-' + gameId,
                    this._handleMarketEvent.bind(this))
            );

            return market;
        }.bind(this));

        this.dataView.beginUpdate();
        this.dataView.setItems(this.markets);
        this.dataView.endUpdate();

        return this.markets;
    };

    MarketService.prototype.createMarketGrid = function () {
        var sortCol = 'title';

        function sellButton() {
            return '<button class="btn btn-xs btn-danger">SELL</button>';
        }

        function buyButton() {
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
            return (x === y ? 0 : (x > y ? 1 : -1));
        }

        this.dataView = new Slick.Data.DataView();

        this.dataView.onRowCountChanged.subscribe(function () {
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

    MarketService.prototype._handleMarketEvent = function (marketEvent) {
        var market = this._getMarketById(marketEvent.id);
        market.set(marketEvent);

        this.dataView.updateItem(market.id, market);

        var row = this.dataView.getRowById(market.id);

        var hash = {};
        hash[row] = {};
        hash[row].soFar = 'changed';

        this.grid.setCellCssStyles('highlight' + row, hash);

        // Turn off highlight
        setTimeout(function () {
            this.grid.removeCellCssStyles('highlight' + row);
        }.bind(this), 500);
    };

    return MarketService;

});