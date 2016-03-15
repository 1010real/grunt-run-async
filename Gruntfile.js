/*
 * grunt-run-async
 * https://github.com/1010real/grunt-run-async
 *
 * Copyright (c) 2016 1010real
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    run_async: {
      default_options: {
        options: {
          cmd: 'cat',
        },
        files: {
          'tmp/default_options/test_case1': ['test/fixtures/test_case1'],
          'tmp/default_options/test_case2': ['test/fixtures/test_case2'],
          'tmp/default_options/test_case3': ['test/fixtures/test_case3'],
          'tmp/default_options/test_case4': ['test/fixtures/test_case4'],
          'tmp/default_options/test_case5': ['test/fixtures/test_case5']
        }
      },
      custom_options: {
        options: {
          cmd: 'ruby',
          args: ['test/consolelogdelete.rb'],
        },
        files: {
          'tmp/custom_options/test_case1': ['test/fixtures/test_case1'],
          'tmp/custom_options/test_case2': ['test/fixtures/test_case2'],
          'tmp/custom_options/test_case3': ['test/fixtures/test_case3'],
          'tmp/custom_options/test_case4': ['test/fixtures/test_case4'],
          'tmp/custom_options/test_case5': ['test/fixtures/test_case5']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'run_async', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
