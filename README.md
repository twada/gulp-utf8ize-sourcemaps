# gulp-utf8ize-sourcemaps

> A [gulp](https://github.com/wearefractal/gulp) plugin for [utf8ize-sourcemaps](https://github.com/twada/utf8ize-sourcemaps).

[![Build Status][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]
[![Code Style][style-image]][style-url]
[![License][license-image]][license-url]


## Description
`gulp-utf8ize-sourcemaps` is a gulp plugin to apply [utf8ize-sourcemaps](https://github.com/twada/utf8ize-sourcemaps) to target Buffer/Stream.


## Usage

First, install `gulp-utf8ize-sourcemaps` as a devDependencies:

```shell
npm install --save-dev gulp-utf8ize-sourcemaps
```

Then, add it to your `gulpfile.js`.


### gulp example

```javascript
const utf8ize = require('gulp-utf8ize-sourcemaps');
const coffee = require('gulp-coffee');
const sourcemaps = require('gulp-sourcemaps');

gulp.src('./test/*test.coffee')
    .pipe(sourcemaps.init())
    .pipe(coffee())
    .pipe(sourcemaps.write())
    .pipe(utf8ize())
    .pipe(gulp.dest('./build'));
```


### gulp + browserify example

```javascript
const utf8ize = require('gulp-utf8ize-sourcemaps');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

gulp.task('build', function() {
    const bundleStream = browserify({entries: './index.js', debug: true}).bundle();
    return bundleStream
        .pipe(source('bundle.js'))
        .pipe(utf8ize())
        .pipe(gulp.dest('./build'));
});
```


## Author

* [Takuto Wada](http://github.com/twada)


## License

Licensed under the [MIT](http://twada.mit-license.org/2014-2020) license.


[npm-url]: https://npmjs.org/package/gulp-utf8ize-sourcemaps
[npm-image]: https://badge.fury.io/js/gulp-utf8ize-sourcemaps.svg

[travis-url]: http://travis-ci.org/twada/gulp-utf8ize-sourcemaps
[travis-image]: https://secure.travis-ci.org/twada/gulp-utf8ize-sourcemaps.svg?branch=master

[license-url]: http://twada.mit-license.org/2014-2020
[license-image]: http://img.shields.io/badge/license-MIT-brightgreen.svg

[style-url]: https://github.com/Flet/semistandard
[style-image]: https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg
