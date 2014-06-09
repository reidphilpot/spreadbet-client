define(['../constants/gameStates'], function (gameStates) {
    'use strict';

    return function() {
        this.state = gameStates.BEFORE;
    };
});