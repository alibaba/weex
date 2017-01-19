---
title: Path
type: references
order: 1.9
version: 2.1
has_chapter_content: true
---

# Path

<span class="weex-version">0.9</span>

This article will cover uri (url) usage in Weex. Including using image/typeface resources, deal with relative uri and how to access local and packaged asset files. 

## Schemes

* Local   
Weex SDK provide `local` scheme to access resources packaged with application, and of cource, it's not working in the HTML5 runtime.   
Currently, developers can use this scheme with `image` and text's font file location.    
  * In iOS, it's always locate file in 'bundle resources'. For example, a `image` component with `local:///app_icon` will load image file named 'app_icon' in bundle resouce, and font file work in the same way.    
  * In Android, image component will load from 'drawable' resource folder like 'res/drawable-xxx'. But load font file is different, android framework can not load font file from 'res', so SDK will load it from `asserts` folder.

* HTTP/HTTPS   
It's working in the same way as in web, Weex support these at very beginning.   

* File    
Use `file` scheme to access local disk file. This scheme has its limitations: You would not hard coded a file url in source page. Because not matter it's running in different platform(iOS, Android) or not, the content will be totally different in another device, which is depend to the specific device.
So one possible case is getting the file url in runtime dynamically, which you can use it to diaplay a local disk image, or maybe upload it later.

## Relative URI

[Like we do in HTML](https://www.w3.org/TR/html4/types.html#type-uri), weex process 'relative URI' in the same way. The relative URI, which start with `/`,`.`,`..`,`//`, will resolve by the bunle url.
Means URL start with `/` will resolve to the root folder as bundle js file, `.` and `..` will resolve to current and parent folder, and `//` will resolve to same scheme bundle js have.

## URI Adapter

All the above is the default implementation, developers can extend or override these their own by providing a 'URI Adapter'. Same as the other adapters, Custom adapter should be set before Weex SDK is initializing.