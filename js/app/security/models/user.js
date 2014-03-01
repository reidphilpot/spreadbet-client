define(function () {
    'use strict';

    function User(config) {
        this.username = config.username;
        this.balance = config.balance;
    }

    return User;

});