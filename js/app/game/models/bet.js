define(function () {
    'use strict';

    function Bet(id, market, stake, price, direction) {
        this.id = id;
        this.stake = stake;
        this.price = price;
        this.title = market;
        this.direction = direction;
    }

    return Bet;
});