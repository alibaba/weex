---
title: CLI (英)
type: tools
order: 1
has_chapter_content: true
version: 0.10
---

# CLI

Please access [npmjs.com](https://www.npmjs.com/package/weex-toolkit) for latest version

Weex CLI tool set

## Pre Install
some dependencies need recent version of npm to install

if your
```
$ npm --version
```
output less than `2.15.1`, please run below cmd to upgrade your npm at first
```
sudo npm install -g npm
```

## Install
```
$npm install -g weex-toolkit
```

##  Usage

```
$weex foo/bar/input_path  [options]  

$weex create file_name  [options]

Options:
  --qr     display QR code for native runtime, **default action**
  -o,--output  transform weex we file to JS Bundle, output path (single JS bundle file or dir)
           [for create sub cmd] it specified we file output path                    
  --watch  using with -o, watch input path, auto run transform if change
           happen
  -s,--server  start a http file server, weex .we file will be transformed to JS
           bundle on the server, specify local root path using the option
  --port    http listening port number, default is 8081            
  --wsport  websocket listening port number, default is 8082
  -f, --force   [for create sub cmd] force to replace exsisting file(s) 
  --version show version of weex toolkit 
  --help   Show help                                                   
```

## Examples

#### create a `we file`(weex source file) using standard template
```
$weex create hello-world-weex
```
a file named 'hello-world-weex.we' will be created in current directory


#### transform a `we file` to JS Bundle
```
$weex your_best_weex.we  -o .
```
`your_best_weex.we` will be transformed to JS Bundle file `your_best_weex.js` and saved in your current directory

#### transform a `we file` to JS Bundle, watch this file，auto run transformer if any change happens.
```
$weex your_best_weex.we  -o . --watch
```

#### transform every we file in a directory 
```
$weex we/file/storage/path  -o outputpath
```
every `we file` in `we/file/storage/path` will be transformed to JS Bundle and saved in `outputpath` path

#### preview your we file using Weex Playground App
download & install [weex playground App](http://alibaba.github.io/weex/download.html)
```
$weex your_best_weex.we  --qr
```
a QR code will display in your terminal, using Playground App scan that.


#### start http server
```
$weex -s .
```
a http server will start running, your current directory(.) will be the document root for the server, every weex.we file will be transformed to JS Bundle when accessed through the server

## Issue & Feedback

[Github Issue List](https://github.com/weexteam/weex-toolkit/issues)
