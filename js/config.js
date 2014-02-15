define({
    paths: {
        "jquery": "lib/jquery/jquery.min",
        "angular": "lib/angular/angular",
        "angular-route": "lib/angular-route/angular-route",
        "angular-cookies": "lib/angular-cookies/angular-cookies",
        "text": "lib/requirejs-text/text"
    },
    shim: {
        "angular": {
            exports: "angular",
            deps: ["jquery"]
        },
        "angular-route": {
            deps: ["angular"]
        },
        "angular-cookies": {
            deps: ["angular"]
        },
        "jquery": {
            exports: "$"
        }
    },
    map: {
        '*': {
            'css': 'lib/require-css/css'
        }
    },
    baseUrl: 'js'
});