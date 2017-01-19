---
title: Preview in browser 
type: guide
order: 3
has_chapter_content: false
chapter_title: How-tos
version: 0.10
---

# How to preview weex code in browser ?

## weex-toolkit

We strongly suggest you use weex-toolkit to preview weex code in your browser. This tool is Node.JS based, so you need to install Node at first. Please download and install latest stable version of Node from [https://nodejs.org/en/download/stable/](https://nodejs.org/en/download/stable/). Then you can install weex-toolkit using npm install:

```bash
$ npm install -g weex-toolkit
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

```bash
weex xxx.we
```

A browser window will be opened automatically to display the page you want to preview:

![preview page](https://gtms02.alicdn.com/tps/i2/TB1y151LVXXXXXXaXXXoRYgWVXX-495-584.jpg)

