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
        'moment': 'lib/momentjs/min/moment.min',
        'slickcore': 'lib/slickgrid/slick.core',
        'slickgrid': 'lib/slickgrid/slick.grid',
        'slickdataview': 'lib/slickgrid/slick.dataview',
        'dragevent': 'lib/jquery.event.drag-drop/event.drag/jquery.event.drag',
        'dropevent': 'lib/jquery.event.drag-drop/event.drop/jquery.event.drop'
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
        },
        'slickcore': {
            deps:  ['jquery-ui'],
            exports: 'Slick'
        },
        'slickgrid': {
            deps: ['slickcore', 'dragevent', 'dropevent']

        },
        'slickdataview': {
            deps: ['slickgrid']
        }
    },
    map: {
        '*': {
            'css': 'lib/require-css/css'
        }
    },
    baseUrl: 'js'
});