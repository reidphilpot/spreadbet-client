define(function () {
    'use strict';

    function User(config) {
        this.username = config.username;
        this.balance = config.balance;
        this.passedAssessment = config.passedAssessment;
        this.id = config._id;
    }

    return User;

});