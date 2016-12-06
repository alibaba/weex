# Transform Code into Js Bundle
<span class="weex-version">0.4</span>

Paragraphs [Maintain Your Component Code](./maintain-your-component-code.md) and [Require 3rd Party Libs](./require-3rd-party-libs.md) show us how to write and organize weex code. However, Weex DSL code must be transformed to `js bundle` so that `js framework` can parse and execute it for iOS, Android and HTML5 portal. For more information, please refer to [How It Works
](/advanced/how-it-works.md) and [JS Bundle Format](../specs/js-bundle-format.md).

Now come back to the topic `transform code into js bundle`. There are several ways to achieve the goal.

## weex-toolkit
```bash
$npm install -g weex-toolkit
```

### transform a `we file` to JS Bundle
```
$weex your_best_weex.we  -o .
```
`your_best_weex.we` will be transform to JS Bundle file `your_best_weex.js` , saved in your current directory

### transform a `we file` to JS Bundle , watch this file ，auto run transformer if change happen.
```
$weex your_best_weex.we  -o . --watch
```

### transform every we file in a directory 
```
$weex we/file/storage/path  -o outputpath
```
every `we file` in `we/file/storage/path` will be transformed to JS Bundle  , saved in `outputpath` path

please access [npmjs.com](https://www.npmjs.com/package/weex-toolkit) for more information about weex-toolkit.

## transformer

```bash
npm install weex-transformer
```

### CLI Tool

```
  Usage: transformer [options] <file...>

  Options:

    -h, --help               output usage information
    -V, --version            output the version number
    -l, --oldFormat [value]  whether to transform to old format (default: false)
    -e, --isEntry [value]    whether is an entry module which has `bootstrap` (default: true)
    -o, --output [path]      the output file dirname
```

### API

** transform(name, code, path, elements, config) **

```javascript
var transformer = require('weex-transformer')
var output = transformer.transform('foo', '/* code here */', '.', {})
```

params:

- `name`: string, current bundle name
- `code`: string, source code
- `path`: string *optional*, useful when find custom component in a certain path
- `elements`: object *optional*, existed custom component map
- `config`: object *optional*
    * `oldFormat`: whether to transform to old format (default: false)
    * `isEntry`: whether is an entry module which has `bootstrap` (default: true)

returns:

- an object with keys
    * `result`: string, all custom components `define()` and final `bootstrap()`
    * `logs`: array, corresponding warning & error logs

## gulp weex

```bash
npm install gulp-weex
```

```javascript
var gulp = require('gulp')
var weex = require('gulp-weex')

gulp.task('default', function () {
  return gulp.src('src/*.html')
    .pipe(weex({}))
    .pipe(gulp.dest('./dest'))
})
```

Options:

- `oldFormat`: whether to transform to old format (default: false)
- `isEntry`: whether is an entry module which has `bootstrap` (default: true)
