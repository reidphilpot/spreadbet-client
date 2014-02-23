define([], function () {
    'use strict';

    function MainCtrl($scope, loadingService, $location) {
        $scope.$location = $location;
        $scope.loadingService = loadingService;
    }

    MainCtrl.$inject = ["$scope", "loadingService", "$location"];

    return MainCtrl;
});
