define(function() {

    return function() {

        function Game(config) {
            this.homeTeam = config.homeTeam;
            this.homeTeam.score = 0;
            this.awayTeam = config.awayTeam;
            this.awayTeam.score = 0;
            this.markets = config.markets;
            this.matchEvents = [];
        }

        return Game;
    }

});