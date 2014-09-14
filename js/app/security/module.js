define([
    'angular',
    'angular-cookies',
    './controllers/login',
    './controllers/logout',
    './services/securityService',
    'css!./css/login.css'
], function (angular, angularCookies, loginController, logoutController, securityService) {
    'use strict';

    angular.module('securityModule', ['ngCookies'])
        .service('securityService', securityService)
        .controller('loginController', loginController)
        .controller('logoutController', logoutController);
});