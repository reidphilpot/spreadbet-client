define(function() {
    'use strict';

    function LoginCtrl(securityService) {
        securityService.logout();
    }

    LoginCtrl.$inject = ["securityService"];

    return LoginCtrl;
});

