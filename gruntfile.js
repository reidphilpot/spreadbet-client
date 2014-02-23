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
                        "jquery": "lib/jquery/jquery.min",
                        "angular": "lib/angular/angular",
                        "angular-route": "lib/angular-route/angular-route",
                        "angular-cookies": "lib/angular-cookies/angular-cookies",
                        "text": "lib/requirejs-text/text",
                        "bootstrap-js": "lib/bootstrap/dist/js/bootstrap.min"
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
                        },
                        "jquery-ui": {
                            deps: ["jquery"]
                        },
                        "bootstrap-js": {
                            deps: ["jquery"]
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
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    console: true,
                    requirejs: true,
                    require: true,
                    define: true
                }
            }
        },
        karma: {
            options: {
                configFile: 'karma.conf.js',
                runnerPort: 9999,
                browsers: ['Chrome', 'Firefox', 'PhantomJS']
            },
            continuous: {
                singleRun: true
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
        }
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-less');

    // Default task
    grunt.registerTask('default', ['jshint', 'karma:continuous', 'requirejs']);
};
