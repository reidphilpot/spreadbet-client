define([
    "angular",
    "./controllers/userController"
], function (angular, userController) {
    'use strict';

    angular.module("userModule", [])
        .controller('userController', userController);
});