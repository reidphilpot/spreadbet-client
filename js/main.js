require(["config"], function (config) {
    "use strict";
    requirejs.config(config);
    require(["./app/app"], function (App) {
        App.initialise();
    });
});