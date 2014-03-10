define([
    '../models/bet',
    'slickgrid',
    'slickdataview'
], function (Bet) {
    'use strict';

    function BetService() {
        this.bets = [];
    }

    BetService.prototype.createBet = function(market, stake, direction) {
        var bet = new Bet(market, stake, direction);
        bet.id = this.bets.length;

        this.bets.push(bet);

        this.dataView.beginUpdate();
        this.dataView.setItems(this.bets);
        this.dataView.endUpdate();
    };

    BetService.prototype.createBetsGrid = function () {
        var sortCol = 'title';

        function stakeFormatter(row, col, value) {
            return '£' + value;
        }

        function directionFormatter(row, col, value) {
            return value ? 'Buy' : 'Sell';
        }

        var columns = [
            {id: 'title', name: 'Market', field: 'title'},
            {id: 'direction', name: 'Dir', field: 'direction', width: 40, cssClass: 'cell-align-center', formatter: directionFormatter},
            {id: 'stake', name: 'Stake', field: 'stake', width: 40, cssClass: 'cell-align-center', formatter: stakeFormatter},
            {id: 'result', name: 'Result', field: 'result', width: 40, cssClass: 'cell-align-center'}
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

        this.grid = new Slick.Grid('#betGrid', this.dataView, columns, options);

        this.grid.onSort.subscribe(function (e, args) {
            sortCol = args.sortCol.field;
            this.dataView.sort(comparer, args.sortAsc);
        }.bind(this));
    };

    return BetService;

});