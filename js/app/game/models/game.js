define(function () {

    return ['gameStates', function (gameStates) {

        function Game(config) {
            this.homeTeam = config.homeTeam;
            this.homeTeam.score = 0;
            this.awayTeam = config.awayTeam;
            this.awayTeam.score = 0;
            this.markets = config.markets;
            this.matchEvents = [];
            this.state = gameStates.BEFORE;
        }

        return Game;
    }];

});