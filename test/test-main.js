var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/test\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/src',

    paths: {
        'jquery': '../js/lib/jquery/jquery-min',
        'angular': '../js/lib/angular/angular',
        'angular-route': '../js/lib/angular-route/angular-route',
        'angular-cookies': '../js/lib/angular-cookies/angular-cookies'
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

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});