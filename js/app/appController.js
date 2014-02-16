define([], function () {
    'use strict';

    function MainCtrl($scope, securityService, loadingService, $location) {
        $scope.securityService = securityService;
        $scope.$location = $location;
        $scope.loadingService = loadingService;
    }

    MainCtrl.$inject = ["$scope", "securityService", "loadingService", "$location"];

    return MainCtrl;
});

