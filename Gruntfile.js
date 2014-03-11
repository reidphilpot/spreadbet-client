'use strict';

module.exports = function (grunt) {
    // Project configuration
    grunt.initConfig({
        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;',
        // Task configuration
        requirejs: {
            compile: {
                options: {
                    name: "main",
                    baseUrl: "js",
                    mainConfigFile: "js/config.js",
                    out: "dist/<%= pkg.name %>-min.js",
                    optimize: "uglify",
                    findNestedDependencies: true,
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
                    }
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['js/*.js', 'js/app/*.js', 'js/app/**/*.js']
        },
        karma: {
            options: {
                configFile: 'karma.conf.js',
                runnerPort: 9999,
                browsers: ['Chrome', 'Firefox', 'PhantomJS']
            },
            continuous: {
                singleRun: true
            },
            unit: {
                singleRun: false
            }
        },
        less: {
            development: {
                options: {
                    paths: ["less"]
                },
                files: {
                    "dist/<%= pkg.name %>-min.css": "less/spreadly.less"
                }
            },
            production: {
                options: {
                    paths: ["less"],
                    cleancss: true
                },
                files: {
                    "dist/<%= pkg.name %>-min.css": "less/spreadly.less"
                }
            }
        },
        watch: {
            less: {
                files: "less/*.less",
                tasks: ["less"]
            }
        },
        bower: {
            install: {
                //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
            }
        }
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-bower-task');

    // Default task
    grunt.registerTask('default', ['jshint', 'karma:continuous', 'requirejs', 'less:development']);
    grunt.registerTask('heroku', ['bower', 'less:production']);
};
