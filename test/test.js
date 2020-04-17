'use strict';

delete require.cache[require.resolve('../')];

const fs = require('fs');
const es = require('event-stream');
const assert = require('assert').strict;
const Vinyl = require('vinyl');
const utf8ize = require('../');

describe('gulp-utf8ize-sourcemaps', () => {
  it('should produce expected file via buffer', (done) => {
    const stream = utf8ize();
    const srcFile = new Vinyl({
      path: 'test/fixtures/example.js',
      cwd: 'test/',
      base: 'test/fixtures',
      contents: fs.readFileSync('test/fixtures/example.js')
    });
    const expectedFile = new Vinyl({
      path: 'test/expected/example.js',
      cwd: 'test/',
      base: 'test/expected',
      contents: fs.readFileSync('test/expected/example.js')
    });
    stream.on('error', (err) => {
      assert(err);
      done(err);
    });
    stream.on('data', (newFile) => {
      assert(newFile);
      assert(newFile.contents);
      assert.equal(String(newFile.contents), String(expectedFile.contents));
      done();
    });
    stream.write(srcFile);
    stream.end();
  });

  it('should produce expected file via stream', (done) => {
    const stream = utf8ize();
    const srcStream = new Vinyl({
      path: 'test/fixtures/example.js',
      cwd: 'test/',
      base: 'test/fixtures',
      contents: fs.createReadStream('test/fixtures/example.js')
    });
    const expectedFile = new Vinyl({
      path: 'test/expected/example.js',
      cwd: 'test/',
      base: 'test/expected',
      contents: fs.readFileSync('test/expected/example.js')
    });
    stream.on('error', (err) => {
      assert(err);
      done();
    });
    stream.on('data', (newFile) => {
      assert(newFile);
      assert(newFile.contents);
      newFile.contents.pipe(es.wait((err, data) => {
        assert(!err);
        assert.equal(String(data), String(expectedFile.contents));
        done();
      }));
    });
    stream.write(srcStream);
    stream.end();
  });
});
