define(['text!../templates/matchEvent.html'], function (template) {
    'use strict';

    return function () {
        return {
            restrict: "EA",
            template: template,
            replace: false,
            transclude: true
        };
    };

});