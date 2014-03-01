define(function () {
    'use strict';

    return ['subscriptionService', function (subscriptionService) {

        function Market(config, $scope) {
            this.set(config);
            // subscribe to simulated market events
            this.subscriptionId = subscriptionService.subscribe('marketEvent', function (marketEvent) {
                $scope.$apply(function () {
                    this.set(marketEvent);
                }.bind(this));
            }.bind(this));
        }

        /**
         * Stash config on instance
         * @param {Object} config
         */
        Market.prototype.set = function (config) {
            this.id = config.id;
            this.title = config.title;
            this.sellPrice = config.sellPrice;
            this.buyPrice = config.buyPrice;
            this.soFar = config.soFar;
            this.description = config.description;
        };

        /**
         * Un-subscribe from simulated market events
         */
        Market.prototype.unsubscribe = function () {
            subscriptionService.unsubscribe(this.subscriptionId);
        };

        return Market;
    }];

});