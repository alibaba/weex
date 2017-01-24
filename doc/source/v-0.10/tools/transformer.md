---
title: Transformer
type: tools
order: 3
has_chapter_content: true
version: 0.10
---

# gulp-weex

> gulp plugin for weex transformer

## Usage

```javascript
var gulp = require('gulp')
var weex = require('gulp-weex')

gulp.task('default', function () {
  return gulp.src('src/*.html')
    .pipe(weex({}))
    .pipe(gulp.dest('./dest'))
})
```

## Options

### oldFormat

whether transform to old format.

default: `false`.

### isEntry

whether is an entry module which has `bootstrap(...)`.

default: `true`.