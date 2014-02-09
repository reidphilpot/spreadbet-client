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
                    out: "dist/<%= pkg.name %>.js",
                    optimize: "uglify",
                    findNestedDependencies: true,
                    paths : {
                        "jquery": "lib/jquery/jquery.min",
                        "angular": "lib/angular/angular",
                        "angular-route": "lib/angular-route/angular-route",
                        "angular-cookies": "lib/angular-cookies/angular-cookies",
                        "sockets.io": "lib/socket.io-client/dist/socket.io.min",
                        "text": "lib/requirejs-text/text"
                    },
                    shim : {
                        "angular": {
                            exports : "angular"
                        },
                        "angular-route": {
                            deps : ["angular"]
                        },
                        "angular-cookies": {
                            deps : ["angular"]
                        },
                        "sockets.io": {
                            exports : "io"
                        },
                        "jquery": {
                            exports : "$"
                        }
                    },
                    map: {
                        '*': {
                            'css': 'lib/require-css/css'
                        }
                    },
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
                    requirejs: true,
                    require: true,
                    jQuery: true,
                    define: true,
                    describe: true,
                    it: true
                }
            },
            lib_test: {
                src: ['js/*.js', 'js/app/*.js', 'js/app/**/*.js', 'test/spec/*.js']
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib_test: {
                files: '<%= jshint.lib_test.src %>',
                tasks: ['jshint:lib_test', 'qunit']
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
        }
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    // Default task
    grunt.registerTask('default', ['jshint', 'karma:continuous', 'requirejs']);
};
