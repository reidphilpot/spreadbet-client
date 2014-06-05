define({
    paths: {
        'jquery': 'lib/jquery/jquery.min',
        'jquery-ui': 'lib/jquery-ui/ui/jquery-ui',
        'angular': 'lib/angular/angular',
        'angular-route': 'lib/angular-route/angular-route',
        'angular-cookies': 'lib/angular-cookies/angular-cookies',
        'angular-sanitize': 'lib/angular-sanitize/angular-sanitize',
        'text': 'lib/requirejs-text/text',
        'bootstrap-js': 'lib/bootstrap/dist/js/bootstrap.min',
        'mediator-js': 'lib/mediator-js/mediator.min',
        'moment': 'lib/momentjs/min/moment.min',
        'slickCore': 'lib/slickgrid/slick.core',
        'slickGrid': 'lib/slickgrid/slick.grid',
        'slickDataView': 'lib/slickgrid/slick.dataview',
        'dragEvent': 'lib/jquery.event.drag-drop/event.drag/jquery.event.drag',
        'dropEvent': 'lib/jquery.event.drag-drop/event.drop/jquery.event.drop'
    },
    shim: {
        'angular': {
            exports: 'angular',
            deps: ['jquery']
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-sanitize': {
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
        'slickCore': {
            deps:  ['jquery-ui'],
            exports: 'Slick'
        },
        'slickGrid': {
            deps: ['slickCore', 'dragEvent', 'dropEvent']

        },
        'slickDataView': {
            deps: ['slickGrid']
        }
    },
    map: {
        '*': {
            'css': 'lib/require-css/css'
        }
    },
    baseUrl: 'js'
});