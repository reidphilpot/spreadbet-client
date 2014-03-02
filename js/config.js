define({
    paths: {
        'jquery': 'lib/jquery/jquery.min',
        'jquery-ui': 'lib/jquery-ui/ui/jquery-ui',
        'angular': 'lib/angular/angular',
        'angular-route': 'lib/angular-route/angular-route',
        'angular-cookies': 'lib/angular-cookies/angular-cookies',
        'text': 'lib/requirejs-text/text',
        'bootstrap-js': 'lib/bootstrap/dist/js/bootstrap.min',
        'mediator-js': 'lib/mediator-js/mediator.min',
        'moment': 'lib/momentjs/min/moment.min'
    },
    shim: {
        'angular': {
            exports: 'angular',
            deps: ['jquery']
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-cookies': {
            deps: ['angular']
        },
        'jquery': {
            exports: '$'
        },
        'jquery-ui': {
            deps: ['jquery']
        },
        'bootstrap-js': {
            deps: ['jquery']
        },
        'mediator-js': {
            exports: 'Mediator'
        }
    },
    map: {
        '*': {
            'css': 'lib/require-css/css'
        }
    },
    baseUrl: 'js'
});