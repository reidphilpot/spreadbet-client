define(['socket.io'], function (io) {
    'use strict';

    return ['endPoint', function (endPoint) {
        return io.connect(endPoint);
    }];
});