define(['text!./spreadBot.html'], function (template) {
    'use strict';

    return ['spreadBotService', function (spreadBotService) {
        return {
            restrict: 'EA',
            template: template,
            replace: true,
            link: function(scope, element, attrs) {
                scope.spreadBotService = spreadBotService;
            }
        };
    }];

});