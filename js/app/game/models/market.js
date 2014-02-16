define(function () {
    'use strict';

    return ['socketService', function (socket) {

        function Market(config, $scope) {
            this.set(config);
            // subscribe to simulated market events
            socket.on('marketEvent', function(marketEvent) {
                $scope.$apply(function() { this._handleMatchEvent(marketEvent); }.bind(this));
            }.bind(this));
        }

        Market.prototype.set = function(config) {
            this.id = config.id;
            this.title = config.title;
            this.sellPrice = config.sellPrice;
            this.buyPrice = config.buyPrice;
            this.soFar = config.soFar;
            this.description = config.description;
        };

        return Market;
    }];

});