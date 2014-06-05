define(function () {
    'use strict';

    function Bet(id, market, stake, price, direction, result) {
        this.id = id;
        this.stake = stake;
        this.price = price;
        this.title = market;
        this.direction = direction;
        this.result = result;
    }

    return Bet;
});