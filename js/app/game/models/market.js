define([], function () {
    'use strict';

    var id = 0;

    function Market(config) {
        this.set(config);
    }

    Market.prototype.set = function (config) {
        this.id = id++;
        this.title = config.title;
        this.sellPrice = config.sellPrice;
        this.buyPrice = config.buyPrice;
        this.soFar = config.soFar;
        this.description = config.description;
    };

    return Market;

});