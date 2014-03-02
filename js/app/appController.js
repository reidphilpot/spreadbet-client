define(['./services/loadingService'], function (loadingService) {
    'use strict';

    function MainCtrl($scope, $location) {
        $scope.$location = $location;
        $scope.loadingService = loadingService;
    }

    MainCtrl.$inject = ['$scope', '$location'];

    return MainCtrl;
});
