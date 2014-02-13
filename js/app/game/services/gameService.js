define(function() {

    var GameService = function($http, $location, xhrService, gameStates) {
        this.$location = $location;
        this.xhrService = xhrService;
        this.gameState = gameStates.CONFIG;
    };

    GameService.$inject = ["$http", "$location", "xhrService", "gameStates"];


    return GameService;

});