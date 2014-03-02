define([], function () {
    'use strict';

    function UserCtrl($scope, xhrService, $routeParams) {

        if ($routeParams.username) {
            xhrService.getUser($routeParams.username)
                .success(function (data) {
                    $scope.username = data.username;
                    $scope.balance = data.balance;
                });
        }

    }

    UserCtrl.$inject = ['$scope', 'xhrService', '$routeParams'];

    return UserCtrl;
});

