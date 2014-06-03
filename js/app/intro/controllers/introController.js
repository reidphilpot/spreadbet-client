define(function () {
    'use strict';

    function IntroCtrl() {
        this.pages = [
            {
                tab: 'The basics',
                title: 'What is sports spread betting?',
                body: 'The bookmaker makes a prediction on various aspects of sporting or topical events. ' +
                      'You then decide whether that prediction has been pitched too high or two low. What ' +
                      'you then win or lose depends on the stake you choose and how right or wrong you are.'
            },
            {
                tab: 'Why two prices?',
                title: 'Why two prices?',
                body: 'The bookmaker makes a prediction on various aspects of sporting or topical events. ' +
                    'You then decide whether that prediction has been pitched too high or two low. What ' +
                    'you then win or lose depends on the stake you choose and how right or wrong you are.'
            },
            {
                tab: 'Spread betting vs fixed odds',
                title: 'Spread betting vs fixed odds',
                body: 'The bookmaker makes a prediction on various aspects of sporting or topical events. ' +
                    'You then decide whether that prediction has been pitched too high or two low. What ' +
                    'you then win or lose depends on the stake you choose and how right or wrong you are.'
            },
            {
                tab: 'Let\'s play!',
                title: 'Let\'s play!',
                body: 'The bookmaker makes a prediction on various aspects of sporting or topical events. ' +
                    'You then decide whether that prediction has been pitched too high or two low. What ' +
                    'you then win or lose depends on the stake you choose and how right or wrong you are.'
            }
        ];
        this.page = this.pages[0];
    }

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

