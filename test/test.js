/*global describe, it*/
'use strict';

delete require.cache[require.resolve('../')];

var fs = require('fs'),
    es = require('event-stream'),
    assert = require('assert'),
    Vinyl = require('vinyl'),
    utf8ize = require('../');

describe('gulp-utf8ize-sourcemaps', function () {

    it('should produce expected file via buffer', function (done) {
        var stream = utf8ize(),
            srcFile = new Vinyl({
                path: 'test/fixtures/example.js',
                cwd: 'test/',
                base: 'test/fixtures',
                contents: fs.readFileSync('test/fixtures/example.js')
            }),
            expectedFile = new Vinyl({
                path: 'test/expected/example.js',
                cwd: 'test/',
                base: 'test/expected',
                contents: fs.readFileSync('test/expected/example.js')
            });
        stream.on('error', function(err) {
            assert(err);
            done(err);
        });
        stream.on('data', function (newFile) {
            assert(newFile);
            assert(newFile.contents);
            assert.equal(String(newFile.contents), String(expectedFile.contents));
            done();
        });
        stream.write(srcFile);
        stream.end();
    });

    it('should produce expected file via stream', function (done) {
        var stream = utf8ize(),
            srcStream = new Vinyl({
                path: 'test/fixtures/example.js',
                cwd: 'test/',
                base: 'test/fixtures',
                contents: fs.createReadStream('test/fixtures/example.js')
            }),
            expectedFile = new Vinyl({
                path: 'test/expected/example.js',
                cwd: 'test/',
                base: 'test/expected',
                contents: fs.readFileSync('test/expected/example.js')
            });
        stream.on('error', function(err) {
            assert(err);
            done();
        });
        stream.on('data', function (newFile) {
            assert(newFile);
            assert(newFile.contents);
            newFile.contents.pipe(es.wait(function(err, data) {
                assert(!err);
                assert.equal(String(data), String(expectedFile.contents));
                done();
            }));
        });
        stream.write(srcStream);
        stream.end();
    });

});
