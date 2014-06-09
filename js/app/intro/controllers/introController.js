define(function () {
    'use strict';

    function IntroCtrl($scope, securityService) {
        $scope.securityService = securityService;

        this.pages = [
            {
                tab:   'The basics',
                title: 'What is sports spread betting?',
                body:  'The bookmaker makes a prediction on various aspects of a sporting event; ' +
                       'you then decide whether that prediction has been pitched too high or two low. What ' +
                       'you then win or lose depends on the stake you choose and how right or wrong you are.'
            },
            {
                tab:   'Why two prices?',
                title: 'Why two prices?',
                body:  'Predictions are always in the form of two prices, a buy price and a sell price. You ' +
                       'buy at the high price and sell at the low one. The range between the two prices is known ' +
                       'as the spread.'
            },
            {
                tab:   'Spread betting vs fixed odds',
                title: 'Spread betting vs fixed odds',
                body:  'With fixed odds betting you have a simple ‘win or lose’ scenario and you know exactly how much ' +
                       'you will win or lose as soon as you strike a bet. With spread betting, how much you win or lose ' +
                       'is determined by how accurate you are. Play the game to find out more.'
            },
            {
                tab:   'Profit and loss',
                title: 'Calculating profit and loss',
                body:  'Say you bought corners at 11 for £5 a corner. This means that you require more than 11 corners ' +
                       'in order to make a profit. When the match finishes, for every corner there has been above 11 you ' +
                       'will make £5, for every corner below 11 you would lose £5.'
            },
            {
                tab:   'Let\'s play!',
                title: 'Let\'s play!',
                body:  'The best way to learn about sports spread betting is to try it out for yourself. ' +
                       '<a href="#/login">Register here</a> to pick two teams and simulate a football ' +
                       'match. Then place some spread bets to win or lose some virtual money!'
            }
        ];
        this.page = this.pages[0];

        $scope.$watch('securityService.loggedInUser', function(loggedInUser) {
            this.pages[4].body = loggedInUser
                ?
                    'The best way to learn about sports spread betting is to try it out for yourself. ' +
                     '<a href="#/users/' + loggedInUser.username + '/games/create">Click here</a> to pick ' +
                     'two teams and simulate a football match. Then place some spread bets to win or lose ' +
                     'some virtual money!'
                :
                    'The best way to learn about sports spread betting is to try it out for yourself. ' +
                    '<a href="#/login">Register here</a> to pick two teams and simulate a football ' +
                    'match. Then place some spread bets to win or lose some virtual money!';
        }.bind(this));
    }

    IntroCtrl.$inject = ['$scope', 'securityService'];

    IntroCtrl.prototype.canNavigateBackwards = function() {
        return this.pages.indexOf(this.page) > 0;
    };

    IntroCtrl.prototype.canNavigateForwards = function() {
        return this.pages.indexOf(this.page) < this.pages.length-1;
    };

    IntroCtrl.prototype.next = function() {
        this.page = this.pages[Math.min(this.pages.indexOf(this.page)+1, this.pages.length-1)];
    };

    IntroCtrl.prototype.prev = function() {
        this.page = this.pages[Math.max(this.pages.indexOf(this.page)-1, 0)];
    };

    return IntroCtrl;
});

