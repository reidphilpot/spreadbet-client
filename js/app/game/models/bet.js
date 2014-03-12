define(function () {
    'use strict';

    function Bet(market, stake, price, direction) {
        this.stake = stake;
        this.price = price;
        this.title = market.title;
        this.direction = direction;
    }

    return Bet;

});