define(function() {
    'use strict';

    return ['endPoint', 'subscriptionService', function(endPoint, subscriptionService) {

        var ws = new WebSocket(endPoint.replace(/^http/, 'ws'));

        ws.onerror = function (messageEvent) {
            console.error("socket error", messageEvent);
        };

        ws.onopen = function (messageEvent) {
            console.info("socket opened", messageEvent);
        };

        ws.onclose = function (messageEvent) {
            console.info("socket closed", messageEvent);
        };

        ws.onmessage = function (messageEvent) {
            var msg = JSON.parse(messageEvent.data);

            console.debug("websocket message received: ", msg);

            subscriptionService.publish(msg.topic, msg.data);
        };

        return ws;
    }];
});