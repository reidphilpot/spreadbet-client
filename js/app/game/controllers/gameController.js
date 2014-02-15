define([],function() {
    'use strict';

    function GameCtrl(
        $scope,
        xhrService,
        securityService,
        Game,
        subscriptionService,
        gameStates,
        $location,
        socketService,
        $routeParams
    ){

        this.$scope = $scope;
        this.subscriptionService = subscriptionService;

        $scope.game = null;

        $scope.securityService = securityService;
        $scope.$location = $location;
        $scope.gameStates = gameStates;

        $scope.timer = 0;

        if($routeParams.gameId) {
            xhrService.getGame($routeParams.username, $routeParams.gameId)
                .success(function(data) {
                    $scope.game = new Game(data);
                    console.log("game created", $scope.game);
                }.bind(this));
        }

        this.subscribeToMatchEvents();

        $scope.startGame = function() {
            $scope.game.state = gameStates.DURING;
            socketService.send("startSimulator");
        };

    }

    GameCtrl.$inject = [
        "$scope",
        "xhrService",
        "securityService",
        "gameFactory",
        "subscriptionService",
        "gameStates",
        "$location",
        "socketService",
        "$routeParams"];

    GameCtrl.prototype.subscribeToMatchEvents = function() {

        var subscriptionId = this.subscriptionService.subscribe('matchEvent', function(matchEvent) {

            this.$scope.$apply(function() {

                switch(matchEvent.type) {
                    case "Clock":
                        this.$scope.timer = matchEvent.time;
                        break;

                    case "Goal":
                        if(matchEvent.team === 0) {
                            this.$scope.game.homeTeam.score++;
                        } else {
                            this.$scope.game.awayTeam.score++;
                        }
                        break;

                    case "FullTime":
                        this.subscriptionService.unsubscribe(subscriptionId);
                        break;
                }

                this.$scope.game.matchEvents.push(matchEvent);

            }.bind(this));

        }.bind(this));

    };

    return GameCtrl;
});

