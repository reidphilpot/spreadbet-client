define(['text!../templates/matchEventFacet.html'], function (template) {
    'use strict';

    return ['teamConstant', function (teams) {
        return {
            restrict: 'EA',
            template: template,
            replace: true,
            scope: {
                label: '@',
                eventType: '@'
            },
            link: function ($scope) {
                $scope.teams = teams;

                $scope.eventCountAsPercentage = function () {
                    var game = $scope.$parent.game;

                    if (!game) {
                        return 50;
                    }

                    var homeTeamEvent = game.teamEvents[teams.HOME][$scope.eventType] || 0;
                    var awayTeamEvent = game.teamEvents[teams.AWAY][$scope.eventType] || 0;
                    var total = homeTeamEvent + awayTeamEvent;

                    return total ? Math.floor((homeTeamEvent / total) * 100) : 50;
                };
            }
        };
    }];

});