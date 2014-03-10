define(function () {
    'use strict';

    function Bet (market, stake, direction) {
        this.stake = stake;
        this.title = market.title;
        this.direction = direction;
    }

    return Bet;

});