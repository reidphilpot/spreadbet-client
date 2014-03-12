define([
    '../models/bet',
    'slickGrid',
    'slickDataView'
], function (Bet) {
    'use strict';

    function BetService(gridService) {
        this._gridService = gridService;
        this.bets = [];
    }

    BetService.$injector = ['gridService'];

    /**
     * Create Bets Grid
     */
    BetService.prototype.createBetsGrid = function () {
        this.grid = this._gridService.create('#betGrid', [
            {id: 'delete', name: '', field: 'delete', width: 50, cssClass: 'cell-align-center', formatter: this._deleteFormatter.bind(this)},
            {id: 'title', name: 'Market', field: 'title', width: 300},
            {id: 'direction', name: 'Dir', field: 'direction', width: 100, cssClass: 'cell-align-center', formatter: this._directionFormatter.bind(this)},
            {id: 'stake', name: 'Stake', field: 'stake', width: 120, cssClass: 'cell-align-center', formatter: this._stakeFormatter.bind(this)},
            {id: 'price', name: 'Price', field: 'price', width: 120, cssClass: 'cell-align-center'},
            {id: 'result', name: 'Result', field: 'result', width: 120, cssClass: 'cell-align-center'}
        ]);

        this.grid.slickGrid.onClick.subscribe(function(e, args) {
            if(args.cell === 0) {
                var dataItem = args.grid.getDataItem(args.row);
                if (dataItem) {
                    this._removeBet(dataItem);
                }
            }
            e.stopPropagation();
        }.bind(this));
    };

    /**
     * Create a Bet and prepend it to the Bet Grid
     * @param {Object} market
     * @param {Number} stake
     * @param {Boolean} direction
     */
    BetService.prototype.createBet = function (market, stake, price, direction) {
        var bet = new Bet(market, stake, price, direction);
        bet.id = this.bets.length;

        this.bets.unshift(bet);

        this.grid.dataView.beginUpdate();
        this.grid.dataView.setItems(this.bets);
        this.grid.dataView.endUpdate();
    };

    BetService.prototype._removeBet = function (bet) {
        this.bets.splice(this.bets.indexOf(bet), 1);

        this.grid.dataView.beginUpdate();
        this.grid.dataView.setItems(this.bets);
        this.grid.dataView.endUpdate();
    };

    BetService.prototype._stakeFormatter = function (row, col, value) {
        return '£' + value;
    };

    BetService.prototype._directionFormatter = function (row, col, value) {
        return value ? '<span class="text-primary">BUY</span>' : '<span class="text-danger">SELL</span>';
    };

    BetService.prototype._deleteFormatter = function () {
        return '<span class="glyphicon glyphicon-trash"></span>';
    };

    return BetService;

});