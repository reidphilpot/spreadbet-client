define(['../game/constants/gameStates', 'text!./spreadBot.html'], function (gameStates, template) {
    'use strict';

    return ['spreadBotService', 'gameStateService', 'assessmentService', 'securityService', function (spreadBotService, gameStateService, assessmentService, securityService) {
        return {
            restrict: 'EA',
            template: template,
            replace: true,
            link: function(scope) {
                scope.spreadBotService = spreadBotService;
                scope.gameStateService = gameStateService;
                scope.assessmentService = assessmentService;
                scope.gameStates = gameStates;
                scope.securityService = securityService;

                scope.buttonLabel = function () {
                    return spreadBotService.showTips ? 'Turn off Tips' : 'Turn on Tips';
                };

                scope.message = function () {
                    if(gameStateService.state === gameStates.AFTER) {
                        if(securityService.loggedInUser.passedAssessment || assessmentService.completed) {
                            return 'Congratulations you\'ve completed the game. Why not play again to improve your Spread Betting knowledge.';
                        } else {
                            return 'Congratulations, you may now take the Spread Betting quiz to test your knowledge, or play again.';
                        }
                    }

                    if(gameStateService.state === gameStates.DURING) {
                        return "The teams have kicked off, this should be an exciting match!"
                    }

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