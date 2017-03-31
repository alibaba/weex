---
title: 将 `.we` 源代码转换成 JS Bundle 
type: guide
order: 4.4
version: 0.10
---

# 将 `.we` 源代码转换成 JS Bundle
<span class="weex-version">0.4</span>

在前面的章节中你已经了解到如何编写及组织 Weex 代码，如果你还有疑问，可参考 [语法](../syntax/main.html) 及 [手册](../../references/main.html)。 但是，Weex 语法的代码必须转换为 JSBundle，以便 Weex JSFramework 可以在 iOS，Android 和浏览器端解析和执行。了解更多信息，可参考 [Weex 工作原理](../../advanced/how-it-works.html) 和 [JS Bundle 格式](../../references/specs/js-bundle-format.html)

现在，回到将 `.we` 源代码转换成 JS Bundle 的主题。有几种方法来实现这一目标。

## 使用 weex-toolkit

如果你已经有了 node.js 开发环境，可以直接使用以下命令。关于 node.js 及其他依赖安装可参考[安装依赖](../develop-on-your-local-machine.html#第一步：安装依赖)
```bash
$npm install -g weex-toolkit
```

### 将 `.we` 文件转换为 JS Bundle

```bash
$ weex your_best_weex.we  -o .
```

`your_best_weex.we` 将会被转换为 `your_best_weex.js` 并保存在当前目录。

### 将 `.we` 文件转换为 JS Bundle 并开启 watch 功能，实时自动转换

```bash

$ weex your_best_weex.we  -o . --watch
```

### 将所有 `.we` 文件转换到一个目录中 

```bash
$ weex we/file/storage/path  -o outputpath
```

 `we/file/storage/path` 目录下的每个 `.we` 文件都会被转换为 JS Bundle 并保存到 `outputpath` 目录。

请访问 [npmjs.com](https://www.npmjs.com/package/weex-toolkit) 了解更多关于 `weex-toolkit`。

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

参数：

- `name {string}`：当前 bundle 文件名
- `code {string}`：源码
- `path {string}`： *可选*，当在某个路径中查找自定义组件时很有用
- `elements {Object}`：*可选*，存在的自定义组件映射
- `config {Object}`：*可选*

    * `oldFormat {boolean}`：是否转换为旧格式 （默认：`false`）
    * `isEntry {boolean}`：是否是具有 `bootstrap` 的入口模块 （默认：`true`）

返回值:
- 一个对象：
    - `result {string}`：所有自定义组件的 `define()` 方法和最终的 `bootstrap()`
    - `logs {Array}`：相应的警告和错误日志

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

参数:

- `oldFormat {boolean}`：是否转换为旧格式 （默认：`false`）
- `isEntry {boolean}`：是否是具有 `bootstrap` 的入口模块 （默认：`true`）
