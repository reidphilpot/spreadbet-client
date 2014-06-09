define(['../constants/gameStates'], function (gameStates) {
    return function() {
        this.state = gameStates.BEFORE;
    }
});