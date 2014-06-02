define(function () {
    'use strict';

    return function ($routeProvider, $locationProvider) {
        // routes
        $routeProvider.when('/login', {
            templateUrl: '/js/app/security/templates/login.html',
            controller: 'loginController',
            controllerAs: 'loginController'
        });
        $routeProvider.when('/logout', {
            templateUrl: '/js/app/security/templates/login.html',
            controller: 'logoutController'
        });
        $routeProvider.when('/register', {
            templateUrl: '/js/app/security/templates/register.html',
            controller: 'registerController'
        });
        $routeProvider.when('/user/:username', {
            templateUrl: '/js/app/user/templates/user.html',
            controller: 'userController'
        });
        $routeProvider.when('/users/:username/games/create', {
            templateUrl: '/js/app/game/templates/config.html',
            controller: 'configController',
            controllerAs: 'gameConfigCtrl'
        });
        $routeProvider.when('/users/:username/games/:gameId', {
            templateUrl: '/js/app/game/templates/game.html',
            controller: 'gameController',
            controllerAs: 'gameController'
        });
        $routeProvider.otherwise({ redirectTo: '/'});
        $locationProvider.html5Mode(false);
    };

});

