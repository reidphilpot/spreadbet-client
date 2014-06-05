define([
    '../models/bet',
    'slickGrid',
    'slickDataView'
], function (Bet) {
    'use strict';

    function BetService(gridService, xhrService, securityService) {
        this._gridService = gridService;
        this._xhrService = xhrService;
        this._securityService = securityService;
        this.bets = [];
    }

    BetService.$injector = ['gridService', 'xhrService', 'securityService'];

    /**
     * Create Bets Grid
     */
    BetService.prototype.createBetsGrid = function () {
        this.bets.length = 0;

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
        return this._xhrService.createBet(
                this.gameId,
                this._securityService.loggedInUser.username,
                market.title,
                stake,
                price,
                direction)
        .then(this._bindBetToGrid.bind(this));
    };

    BetService.prototype._bindBetToGrid = function(betObject) {
        var bet = new Bet(
            betObject._id,
            betObject.market,
            betObject.stake,
            betObject.price,
            betObject.direction
        );

        this.bets.unshift(bet);

        this.grid.dataView.beginUpdate();
        this.grid.dataView.setItems(this.bets);
        this.grid.dataView.endUpdate();
    };

    BetService.prototype._removeBet = function (bet) {
        return this._xhrService.deleteBet(this.gameId, this._securityService.loggedInUser.username, bet.id)
            .success(function() {
                this.bets.splice(this.bets.indexOf(bet), 1);
                this.grid.dataView.beginUpdate();
                this.grid.dataView.setItems(this.bets);
                this.grid.dataView.endUpdate();
            }.bind(this));
    };

    BetService.prototype.getBets = function() {
        this._xhrService.getBets(this.gameId, this._securityService.loggedInUser.username)
            .then(function(json) {
                var bets = json.data;
                bets.forEach(this._bindBetToGrid.bind(this));
            }.bind(this));
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