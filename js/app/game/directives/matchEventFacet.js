define(['../constants/teamConstant', 'text!../templates/matchEventFacet.html'], function (teams, template) {
    'use strict';

    return function () {
        return {
            restrict: 'EA',
            template: template,
            replace: true,
            transclude: true,
            scope: {
                label: '@',
                eventType: '@'
            },
            link: function ($scope) {
                $scope.teams = teams;

                $scope.eventCountAsPercentage = function () {
                    var match = $scope.$parent.match;

                    if (!match) {
                        return 50;
                    }

                    var homeTeamEvent = match.teamEvents[teams.HOME][$scope.eventType] || 0;
                    var awayTeamEvent = match.teamEvents[teams.AWAY][$scope.eventType] || 0;
                    var total = homeTeamEvent + awayTeamEvent;

                    return total ? Math.floor((homeTeamEvent / total) * 100) : 50;
                };
            }
        };
    };

});