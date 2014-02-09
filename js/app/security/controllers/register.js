define(['jquery'],function($) {
    'use strict';

    function RegisterCtrl($scope, securityService) {
        $scope.register = function() {
            var u = $('input[type=username]').val();
            var p = $('input[type=password]').val();

            securityService.register(u, p);
        };
    }

    RegisterCtrl.$inject = ["$scope", "securityService"];

    return RegisterCtrl;
});

