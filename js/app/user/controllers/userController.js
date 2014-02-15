define([], function () {
    'use strict';

    function UserCtrl($scope, xhrService, securityService, $location, $interval, socketService, $routeParams) {

        if ($routeParams.username) {
            xhrService.getUser($routeParams.username)
                .success(function (data) {
                    $scope.username = data.username;
                    $scope.balance = data.balance;
                });
        }

    }

    UserCtrl.$inject = ["$scope", "xhrService", "securityService", "$location", "$interval", "socketService", "$routeParams"];

    return UserCtrl;
});

