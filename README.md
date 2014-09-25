# gulp-utf8ize-sourcemaps

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
var coffee = require('gulp-coffee');
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
