define([], function () {
    'use strict';

    function MainCtrl($scope, securityService, $location) {
        $scope.securityService = securityService;
        $scope.$location = $location;
    }

    MainCtrl.$inject = ["$scope", "securityService", "$location"];

    return MainCtrl;
});

