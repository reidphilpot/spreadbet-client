define(['./endPointService', './subscriptionService'], function (endPoint, sub) {
    'use strict';

    var ws = new WebSocket(endPoint.replace(/^http/, 'ws'));

    ws.onerror = function (messageEvent) {
        console.error('socket error', messageEvent);
    };

    ws.onopen = function () {
        console.info('socket opened');
    };

    ws.onclose = function (messageEvent) {
        console.info('socket closed', messageEvent);
    };

    ws.onmessage = function (messageEvent) {
        var msg = JSON.parse(messageEvent.data);
        sub.subscriptionService.publish(msg.topic, msg.data);
    };

    return ws;
});