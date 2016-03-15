'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.run_async = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(5);

    var actual = grunt.file.read('tmp/default_options/test_case1');
    var expected = grunt.file.read('test/expected/default_options/test_case1');
    test.equal(actual, expected, 'should describe what the default behavior is.');

    actual = grunt.file.read('tmp/default_options/test_case2');
    expected = grunt.file.read('test/expected/default_options/test_case2');
    test.equal(actual, expected, 'should describe what the default behavior is.');

    actual = grunt.file.read('tmp/default_options/test_case3');
    expected = grunt.file.read('test/expected/default_options/test_case3');
    test.equal(actual, expected, 'should describe what the default behavior is.');

    actual = grunt.file.read('tmp/default_options/test_case4');
    expected = grunt.file.read('test/expected/default_options/test_case4');
    test.equal(actual, expected, 'should describe what the default behavior is.');

    actual = grunt.file.read('tmp/default_options/test_case5');
    expected = grunt.file.read('test/expected/default_options/test_case5');
    test.equal(actual, expected, 'should describe what the default behavior is.');

    test.done();
  },
  custom_options: function(test) {
    test.expect(5);

    var actual = grunt.file.read('tmp/custom_options/test_case1');
    var expected = grunt.file.read('test/expected/custom_options/test_case1');
    test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');

    actual = grunt.file.read('tmp/custom_options/test_case2');
    expected = grunt.file.read('test/expected/custom_options/test_case2');
    test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');

    actual = grunt.file.read('tmp/custom_options/test_case3');
    expected = grunt.file.read('test/expected/custom_options/test_case3');
    test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');

    actual = grunt.file.read('tmp/custom_options/test_case4');
    expected = grunt.file.read('test/expected/custom_options/test_case4');
    test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');

    actual = grunt.file.read('tmp/custom_options/test_case5');
    expected = grunt.file.read('test/expected/custom_options/test_case5');
    test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');

    test.done();
  },
};
