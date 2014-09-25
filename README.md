# gulp-utf8ize-sourcemaps
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

> A [gulp](https://github.com/wearefractal/gulp) plugin for [utf8ize-sourcemaps](https://github.com/twada/utf8ize-sourcemaps).


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
var utf8ize = require('gulp-utf8ize-sourcemaps');
var espower = require('gulp-espower');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

gulp.src('./test/*test.coffee')
    .pipe(sourcemaps.init())
    .pipe(coffee())
    .pipe(sourcemaps.write())
    .pipe(utf8ize())
    .pipe(gulp.dest('./build'));
```


### gulp + browserify example

```javascript
var utf8ize = require('gulp-utf8ize-sourcemaps');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('build', function() {
    var bundleStream = browserify({entries: './index.js', debug: true}).bundle();
    return bundleStream
        .pipe(source('bundle.js'))
        .pipe(utf8ize())
        .pipe(gulp.dest('./build'));
});
```


## Author

* [Takuto Wada](http://github.com/twada)


## License

Licensed under the [MIT](http://twada.mit-license.org/) license.


[npm-url]: https://npmjs.org/package/gulp-utf8ize-sourcemaps
[npm-image]: https://badge.fury.io/js/gulp-utf8ize-sourcemaps.svg

[travis-url]: http://travis-ci.org/twada/gulp-utf8ize-sourcemaps
[travis-image]: https://secure.travis-ci.org/twada/gulp-utf8ize-sourcemaps.svg?branch=master

[depstat-url]: https://gemnasium.com/twada/gulp-utf8ize-sourcemaps
[depstat-image]: https://gemnasium.com/twada/gulp-utf8ize-sourcemaps.svg
