define(['jquery'], function ($) {
    'use strict';

    function RegisterCtrl($scope, securityService) {
        $scope.register = function () {
            securityService.register($('input[type=username]').val(), $('input[type=password]').val());
        };
    }

    RegisterCtrl.$inject = ['$scope', 'securityService'];

    return RegisterCtrl;
});

