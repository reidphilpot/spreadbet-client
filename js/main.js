require(["config"], function(config){
    requirejs.config(config);
    require(["./app/app"], function(App) {
        App.initialise();
    });
});