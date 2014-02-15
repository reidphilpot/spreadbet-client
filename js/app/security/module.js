define([
    "angular",
    "angular-cookies",
    "./controllers/login",
    "./controllers/logout",
    "./controllers/register",
    "./services/securityService",
    "css!./css/login.css"
], function (angular, angularCookies, loginController, logoutController, registerController, securityService) {
    'use strict';

    angular.module("securityModule", ['ngCookies'])
        .service('securityService', securityService)
        .controller('registerController', registerController)
        .controller('loginController', loginController)
        .controller('logoutController', logoutController);
});