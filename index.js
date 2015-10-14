/**
 * gulp-utf8ize-sourcemaps
 * 
 * https://github.com/twada/gulp-utf8ize-sourcemaps
 *
 * Copyright (c) 2014-2015 Takuto Wada
 * Licensed under the MIT license.
 *   http://twada.mit-license.org/2014-2015
 */
'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var utf8ize = require('utf8ize-sourcemaps');
var BufferStreams = require('bufferstreams');
var PLUGIN_NAME = 'gulp-utf8ize-sourcemaps';

var transform = function (code) {
    return new Buffer(utf8ize(code));
};

module.exports = function () {
    return through.obj(function (file, encoding, callback) {
        encoding = encoding || 'utf8';
        if (file.isNull()) {
            this.push(file);
        } else if (file.isBuffer()) {
            file.contents = transform(file.contents.toString(encoding));
            this.push(file);
        } else if (file.isStream()) {
            file.contents = file.contents.pipe(new BufferStreams(function(err, buf, cb) {
                if(err) {
                    cb(new gutil.PluginError(PLUGIN_NAME, err, {showStack: true}));
                } else {
                    cb(null, transform(buf.toString(encoding)));
                }
            }));
            this.push(file);
        }
        callback();
    });
};
