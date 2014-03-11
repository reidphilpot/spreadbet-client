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
     * Create a Bet and prepend it to the Bet Grid
     * @param {Object} market
     * @param {Number} stake
     * @param {Boolean} direction
     */
    BetService.prototype.createBet = function (market, stake, direction) {
        var bet = new Bet(market, stake, direction);
        bet.id = this.bets.length;

        this.bets.push(bet);

        this.grid.dataView.beginUpdate();
        this.grid.dataView.setItems(this.bets);
        this.grid.dataView.endUpdate();
    };

    BetService.prototype.createBetsGrid = function () {
        this.grid = this._gridService.create('#betGrid', [
            {id: 'title', name: 'Market', field: 'title'},
            {id: 'direction', name: 'Dir', field: 'direction', width: 30, cssClass: 'cell-align-center', formatter: this._directionFormatter.bind(this)},
            {id: 'stake', name: 'Stake', field: 'stake', width: 30, cssClass: 'cell-align-center', formatter: this._stakeFormatter.bind(this)},
            {id: 'result', name: 'Result', field: 'result', width: 30, cssClass: 'cell-align-center'}
        ]);
    };

    BetService.prototype._stakeFormatter = function (row, col, value) {
        return '£' + value;
    };

    BetService.prototype._directionFormatter = function (row, col, value) {
        return value ? 'Buy' : 'Sell';
    };

    return BetService;

});