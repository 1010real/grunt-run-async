/*
 * grunt-run-async
 * https://github.com/1010real/grunt-run-async
 *
 * Copyright (c) 2016 1010real
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('run_async', 'run command async.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      cmd: null,
      args: []
    });

    if (Object.prototype.toString.call(options.cmd) !== '[object String]') {
      grunt.log.warn('Wrong parameter defined. options.cmd need String.');
      return false;
    }

    if(Object.prototype.toString.call(options.args) !== '[object Array]'){
      grunt.log.warn('Wrong parameter defined. options.args need Array.');
      return false;
    }

    var done = this.async();
    var fileCount = this.files.length;
    var doneCount = 0;

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {

        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        var spawn = require('child_process').spawn;
        var cmd = spawn(options.cmd, options.args.concat([filepath]), { cwd:'.' });
        var buff = "";

        cmd.stdout.on('data', function(data) {
          // grunt.log.writeln('stdout:' + data);
          buff += String(data);
        });

        cmd.stderr.on('data', function(data) {
          grunt.log.writeln('stderr: ' + data);
          done(false);
        });

        cmd.on('close', function(code) {
          if (code !== 0) {
            grunt.log.writeln('child process exited with code : ' + code);
            done(false);
          }

          // Print a success message.
          grunt.log.writeln('File "' + f.dest + '" created.');

          // Write the destination file.
          grunt.file.write(f.dest, buff);

          // Count done processes and check end of all.
          doneCount++;
          if (doneCount >= fileCount) {
            done();
          }
        });

        grunt.log.writeln('run command. filepath = ' + filepath);

      });

    });

  });

};
