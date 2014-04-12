define(['text!./spreadBot.html'], function (template) {
    'use strict';

    return ['spreadBotService', function (spreadBotService) {
        return {
            restrict: 'EA',
            template: template,
            replace: true,
            link: function(scope) {
                scope.spreadBotService = spreadBotService;

                scope.buttonLabel = function () {
                    return spreadBotService.showTips ? 'Turn off Tips' : 'Turn on Tips';
                };

                scope.message = function () {
                    if(!spreadBotService.showTips) {
                        return 'Before we start let\'s turn on game tips by clicking the button below.';
                    } else {
                        return 'Great, now you can click on the "Tip" balloons to learn how Spread Betting works.';
                    }
                };
            }
        };
    }];

});