define(function() {
    'use strict';

    var options = {
        enableCellNavigation: true,
        enableColumnReorder: true,
        forceFitColumns: true,
        fullWidthRows: true,
        rowHeight: 38,
        editable: true
    };

    var sortCol = 'title';

    function comparer(a, b) {
        var x = a[sortCol], y = b[sortCol];
        return (x === y ? 0 : (x > y ? 1 : -1));
    }

    return function() {

        this.create = function(elementId, columns) {

            var dataView = new Slick.Data.DataView();

            dataView.onRowCountChanged.subscribe(function () {
                slickGrid.updateRowCount();
                slickGrid.render();
            });

            dataView.onRowsChanged.subscribe(function (e, args) {
                slickGrid.invalidateRows(args.rows);
                slickGrid.render();
            });

            var slickGrid = new Slick.Grid(elementId, dataView, columns, options);

            slickGrid.onSort.subscribe(function (e, args) {
                sortCol = args.sortCol.field;
                dataView.sort(comparer, args.sortAsc);
            });

            return {
                slickGrid: slickGrid,
                dataView: dataView
            };

        };
    };

});