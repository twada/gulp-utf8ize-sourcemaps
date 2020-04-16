/**
 * gulp-utf8ize-sourcemaps
 * 
 * https://github.com/twada/gulp-utf8ize-sourcemaps
 *
 * Copyright (c) 2014-2020 Takuto Wada
 * Licensed under the MIT license.
 *   http://twada.mit-license.org/2014-2020
 */
'use strict';

var utf8ize = require('utf8ize-sourcemaps');
var through = require('through2');
var bufferFrom = require('buffer-from');
var BufferStreams = require('bufferstreams');
var PluginError = require('plugin-error');
var PLUGIN_NAME = 'gulp-utf8ize-sourcemaps';

var transform = function (code) {
    return bufferFrom(utf8ize(code));
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
                    cb(new PluginError(PLUGIN_NAME, err, {showStack: true}));
                } else {
                    cb(null, transform(buf.toString(encoding)));
                }
            }));
            this.push(file);
        }
        callback();
    });
};
