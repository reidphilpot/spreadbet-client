define(['jquery'], function ($) {
    'use strict';

    function LoginCtrl($scope, securityService, $location) {
        $scope.securityService = securityService;

        $scope.login = function () {
            var u = $('input[type=username]').val();
            var p = $('input[type=password]').val();

            securityService.login(u, p);
        };

        $scope.register = function () {
            $location.path('/register');
        };
    }

    LoginCtrl.$inject = ["$scope", "securityService", "$location"];

    return LoginCtrl;
});

