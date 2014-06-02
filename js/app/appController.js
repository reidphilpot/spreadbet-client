define(['./services/loadingService'], function (loadingService) {
    'use strict';

    function MainCtrl($scope, $location, securityService) {
        $scope.$location = $location;
        $scope.loadingService = loadingService;
        $scope.securityService = securityService;

        $scope.go = function (path) {
            $location.path(path);
        };
    }

    MainCtrl.$inject = ['$scope', '$location', 'securityService'];

    return MainCtrl;
});
