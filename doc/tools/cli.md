Weex-Toolkit
============

Please access [npmjs.com](https://www.npmjs.com/package/weex-toolkit) for latest version

Weex CLI tool set

## Pre Install
some dependencies need recent version of npm to install

if your
```
$ npm --version
```
output less then `2.15.1`, please run below cmd upgrade your npm at first
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
  --watch  using with -o , watch input path , auto run transform if change
           happen
  -s,--server  start a http file server, weex .we file will be transforme to JS
           bundle on the server , specify local root path using the option
  --port    http listening port number ,default is 8081            
  --wsport  websocket listening port number ,default is 8082
  -f, --force   [for create sub cmd] force to replace exsisting file(s) 
  --version show version of weex toolkit 
  --help   Show help                                                   
```

## Examples

#### crate a `we file`(weex source file) using standard template
```
$weex create hello-world-weex
```
a file named 'hello-world-weex.we' we be created in current directory


#### transform a `we file` to JS Bundle
```
$weex your_best_weex.we  -o .
```
`your_best_weex.we` will be transform to JS Bundle file `your_best_weex.js` , saved in your current directory

#### transform a `we file` to JS Bundle , watch this file ，auto run transformer if change happen.
```
$weex your_best_weex.we  -o . --watch
```

#### transform every we file in a directory 
```
$weex we/file/storage/path  -o outputpath
```
every `we file` in `we/file/storage/path` we be transform to JS Bundle  , saved in `outputpath` path

#### preview your we file using Weex Playground App
download & install [weex playground App](http://alibaba.github.io/weex/download.html)
```
$weex your_best_weex.we  --qr
```
a QR code will display in your terminal , using Playground App scan that.


#### start http server
```
$weex -s .
```
a http server will start running , your current directory(.) will be the document root for the server , every weex .we file will be transforme to JS Bundle when access through the server

## Issue & Feedback

[Github Issue List](https://github.com/alibaba/weex_toolchain/issues)

## Changelog
* 160602(0.0.39) : improve weex debugger ui 
* 160525(0.0.38) : add examples , improve create sub command
* 160525(0.0.37) : add `create` sub command for create we file using standard weex template
* 160509(0.0.30) : add --port &  --wsport options , show encoding url when QR displayed
* 160506(0.0.29) : improve --watch & -s feature ; fixing hot-reload with playground App.
* 160505(0.0.25) : support batch transform  & option --watch added
* 160427(0.0.22) : improve -s feedback information & update upstream transformer lib
* 160418 : temporary turnoff H5 preview
* 160401 : format for opensource
* 160331 : update upstream lib , ready for opensource
* 160321 : update HTML5 runtime
* 160301 : add -s option  &  update upstream lib
* 160224 : update upstream weex-html5 lib , improve stability
* 160223 : add -o option for transform weex JS bundle directly
* 160201 : adopt new weex JS bundle style(define / require) & output transformer Error/Warning logs
* 160129 : add  native runtime  support  with --qr option
* 160122 : add -n , -h options &  improve CLI feedback output
* 160119 : update upstream weex-html5 lib
* 160118 : hot reload function & English document
* 160114 : first version 