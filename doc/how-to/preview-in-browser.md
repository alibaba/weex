# How to preview weex code in browser ?
<a href="https://github.com/weexteam/article/wiki/%E6%AC%A2%E8%BF%8E%E5%8F%82%E4%B8%8EWeex%E4%B8%AD%E6%96%87%E6%96%87%E6%A1%A3%E7%BF%BB%E8%AF%91"  class="weex-translate incomplete">cn</a>

## weex-toolkit

We strongly suggest you use weex-toolkit to preview weex code in your browser. This tool is Node.JS based, so you need to install Node at first. Please download and install latest stable version of Node from [https://nodejs.org/en/download/stable/](https://nodejs.org/en/download/stable/). Then you can install weex-toolkit using npm install:

```
npm install -g weex-toolkit
```

Check that the toolkit does work by typing `weex` in the command line. Normally you should see the following help text:

```
Options:
  --qr     display QR code for native runtime, 
  -o,--output  transform weex we file to JS Bundle, output path (single JS bundle file or dir)
  -s,--server  start a http file server, weex .we file will be transforme to JS bundle on the server , specify local root path using the option  
  ......
  --help  Show help                    
```

If all work well, navigate to the path the xxx.we file you want to preview in, and type the command:
```
weex xxx.we
```

A browser window will be opened automatically to display the page you want to preview:

![preview page](http://gtms02.alicdn.com/tps/i2/TB1y151LVXXXXXXaXXXoRYgWVXX-495-584.jpg)

