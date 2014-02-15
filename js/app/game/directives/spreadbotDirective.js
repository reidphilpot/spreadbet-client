define(['text!../templates/spreadbot.html'], function (template) {
    'use strict';

    return function () {
        return {
            restrict: "EA",
            template: template,
            replace: true
        };
    };

});