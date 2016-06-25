# How to preview weex code in browser ?

## weex-toolkit

We strongly suggest you use weex-toolkit to preview weex code in your browser. This tool were Node.JS based, so you need to install Node at first. Please download and install latest stable version of Node from [https://nodejs.org/en/download/stable/](https://nodejs.org/en/download/stable/). Then you can install weex-toolkit using npm install:

```
npm install -g weex-toolkit
```

Check whether the toolkit is working by typeing `weex` in cmd line. Normally you should see the following help text:

```
Options:
  --qr     display QR code for native runtime, 
  -o,--output  transform weex we file to JS Bundle, output path (single JS bundle file or dir)
  -s,--server  start a http file server, weex .we file will be transforme to JS bundle on the server , specify local root path using the option  
  ......
  --help  Show help                    
```

If all works well, navigate to the path the xxx.we file you want to preview in, and type the command:
```
weex xxx.we
```

A browser window will open automatically to display the page you want to preview:

![preview page](http://gtms02.alicdn.com/tps/i2/TB1y151LVXXXXXXaXXXoRYgWVXX-495-584.jpg)

