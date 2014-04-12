define(['../constants/teamConstant', 'text!../templates/matchEvent.html'], function (teams, template) {
    'use strict';

    return function () {
        return {
            restrict: 'EA',
            template: template,
            replace: false,
            transclude: true,
            scope: {
                match: '=matchEvent'
            },
            link: function(scope) {
                scope.teams = teams;
            }
        };
    };

});