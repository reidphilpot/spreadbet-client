define(function() {
    'use strict';

    return function($routeProvider, $locationProvider) {
        // routes
        $routeProvider.when('/', {
            templateUrl: '/js/app/templates/main.html',
            controller: 'appController'
        });
        $routeProvider.when('/login', {
            templateUrl: '/js/app/security/templates/login.html',
            controller: 'loginController'
        });
        $routeProvider.when('/logout', {
            templateUrl: '/js/app/security/templates/login.html',
            controller: 'logoutController'
        });
        $routeProvider.when('/register', {
            templateUrl: '/js/app/security/templates/register.html',
            controller: 'registerController'
        });
        $routeProvider.when('/game', {
            templateUrl: '/js/app/game/templates/game.html',
            controller: 'gameController'
        });

        $routeProvider.otherwise( { redirectTo: '/'} );
        $locationProvider.html5Mode(false);
    };

});

