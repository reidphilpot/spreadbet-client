define(function () {
    'use strict';

    return [
        'gameStates',
        'subscriptionService',
        'marketFactory',
        'teamConstant',
        function (gameStates, subscriptionService, Market, teams) {

            function Game(config, $scope) {
                this.id = config._id;
                this.clock = config.clock || 0;
                this.homeTeam = config.homeTeam;
                this.awayTeam = config.awayTeam;
                this.matchEvents = [];
                this.state = gameStates.BEFORE;
                this.teamEvents = {};
                this.teamEvents[teams.HOME] = {};
                this.teamEvents[teams.AWAY] = {};

                // create a Market object for each market in array
                this.markets = config.markets.map(function (market) {
                    return new Market(market, $scope);
                });

                // subscribe to simulated match events
                this.subscriptionId = subscriptionService.subscribe('matchEvent', function (matchEvent) {
                    $scope.$apply(function () {
                        this._handleMatchEvent(matchEvent);
                    }.bind(this));
                }.bind(this));
            }

            /**
             * Un-subscribe from simulated match events
             */
            Game.prototype.unsubscribe = function () {
                subscriptionService.unsubscribe(this.subscriptionId);
            };

            /**
             *
             * @param {Object} matchEvent
             * @private
             */
            Game.prototype._handleMatchEvent = function (matchEvent) {
                switch (matchEvent.type) {
                    case 'Clock':
                        this.clock = matchEvent.time;
                        break;

                    case 'FullTime':
                        this.unsubscribe();
                        this.markets.forEach(function (market) {
                            market.unsubscribe();
                        });
                        this.state = gameStates.AFTER;
                        break;
                }

                this.matchEvents.push(matchEvent);

                if (!this.teamEvents[matchEvent.team][matchEvent.type]) {
                    this.teamEvents[matchEvent.team][matchEvent.type] = 0;
                }
                this.teamEvents[matchEvent.team][matchEvent.type]++;
            };

            return Game;
        }
    ];
});