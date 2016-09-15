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

    // run Command async
    function runCommand(f) {
      return new Promise(function(resolve, reject) {

        // Concat specified files.
        var src = f.src.filter(function(filepath) {

          // Warn on and remove invalid source files (if nonull was set).
          if (!grunt.file.exists(filepath)) {
            resolve({ message: 'Source file "' + filepath + '" not found.', logType:'warn', data: filepath });
            return false;
          } else {
            return true;
          }
        }).map(function(filepath) {
          var spawn = require('child_process').spawn;
          var cmd = spawn(options.cmd, options.args.concat([filepath]), { cwd:'.' });
          var buff = Buffer.from('');

          cmd.stdout.on('data', function(data) {
            // grunt.log.writeln('stdout:' + data);
            var totalLength = buff.length + data.length;
            buff = Buffer.concat([buff, data], totalLength);
          });

          cmd.stderr.on('data', function(data) {
            reject({ message: 'stderr: ' + data, err: data });
          });

          cmd.on('close', function(code) {
            if (code !== 0) {
              reject({ message: 'child process exited with code : ' + code, err: code });
            }

            // Write the destination file.
            grunt.file.write(f.dest, buff);

            // Print a success message.
            resolve({ message: 'File "' + f.dest + '" created.', data: f.dest });
          });

          grunt.log.writeln('run command. filepath = ' + filepath);

        });

      });

    }

    // Iterate over all specified file groups.
    (function iterate(files, count) {
      // Count done processes and check end of all.
      if (files.length <= count) {
        done();
        return;
      }
      var promise = runCommand(files[count]);
      promise.then(function(obj){
        if(typeof obj.logType === 'undefined') {
          grunt.log.writeln(obj.message);
        } else {
          grunt.log[obj.logType](obj.message);
        }
        iterate(files, ++count);
      }, function(obj){
        if(typeof obj.logType === 'undefined') {
          grunt.log.warn(obj.message);
        } else {
          grunt.log[obj.logType](obj.message);
        }
        done(false);
      });
    })(this.files, 0);

  });

};
