define(function () {
    'use strict';

    function LoginCtrl(securityService) {
        this.securityService = securityService;
    }

    LoginCtrl.$inject = ['securityService'];

    LoginCtrl.prototype.login = function () {
        this.securityService.login(this.username, this.password);
    };

    LoginCtrl.prototype.register = function () {
        this.securityService.register(this.r_username, this.r_password, this.r_experience);
    };

    return LoginCtrl;
});

