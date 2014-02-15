define(function () {

    return ['gameStates', 'subscriptionService', 'marketFactory', function (gameStates, subscriptionService, Market) {

        function Game(config, $scope) {
            this.clock = config.clock || 0;
            this.homeTeam = config.homeTeam;
            this.homeTeam.score = 0;
            this.awayTeam = config.awayTeam;
            this.awayTeam.score = 0;
            this.matchEvents = [];
            this.state = gameStates.BEFORE;

            // create a Market object for each market in array
            this.markets = config.markets.map(function(market) { return new Market(market, $scope) });

            // subscribe to simulated match events
            this.subscriptionId = subscriptionService.subscribe('matchEvent', function(matchEvent) {
                $scope.$apply(function() { this._handleMatchEvent(matchEvent); }.bind(this));
            }.bind(this));
        }

        /**
         * unsubscribe from simulated match events
         */
        Game.prototype.unsubscribe = function() {
            subscriptionService.unsubscribe(this.subscriptionId);
        };

        Game.prototype._handleMatchEvent = function(matchEvent) {
            switch (matchEvent.type) {
                case "Clock":
                    this.clock = matchEvent.time;
                    break;

                case "Goal":
                    if (matchEvent.team === 0) {
                        this.homeTeam.score++;
                    } else {
                        this.awayTeam.score++;
                    }
                    break;

                case "FullTime":
                    this.unsubscribe();
                    this.markets.forEach(function(market) {
                        market.unsubscribe();
                    });
                    break;
            }
            this.matchEvents.push(matchEvent);
        };

        return Game;
    }];

});