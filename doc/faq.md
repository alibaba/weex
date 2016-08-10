# FAQ

## Command errors in Windows

Please install [Git for Windows](https://git-scm.com/download/win) first, see [For Windows](https://github.com/alibaba/weex/tree/dev#for-windows) for more information.


## Gradle errors in Android Studio

Downloading `license-gradle-plugin.jar` may trigger errors, like `Connection reset` or `peer not authenticated`.
Maybe a network problem, try a proxy or VPN.

## Use local image   
Weex's native runtime support load image file from device's disk, all you have to do set the file url like `file:///sdcard/image_new0.png`. As to load image file in your project, Weex is not support yet.   
    
## Error（`The header content contains invalid characters`) in windows
This's is caused by weex-toolkit's dependency 'http-server', whose old version is not working well in chinese windows environment. We have fixed that, you should upgrade weex-toolkit before use that.

## Playground app display nothing (white screen) after scan    
Best way to find out what's happening is read debug log, you can follow [this document](https://github.com/alibaba/weex/blob/doc/doc/tools/how-to-debug.md) to firgure out how to do that.

## About ECMAScript Version

Weex uses JSCore in iOS and uses v8 in Android. So they both support ECMAScript 5 spec. Additionally, we do some polyfills in native environment:

* `Promise` in iOS/Android
* Timer APIs (`setTimeout`/`clearTimeout`/`setInterval`/`clearInterval`) in iOS/Android
* `console` in iOS/Android

In Browser we contains a polyfill of `Promise` temporarily. In the future developers can choose whether to import a polyfill by configurations.

You can also write ES6 syntax by `babel` with `webpack`. The loader will convert ES6 syntax into ES5 automatically.

If you want more ES6 polyfills you can import them into the JS Bundle as you like.

## Dependencies in frontend

In Weex you may have some ways to import/require a component or a JS module. Take ES5 syntax for example:

* `require('xxx.js')`: depends on a JS file
* `require('npm-module-name')`: depends on a NPM module
* `require('xxx.we')`: include a `we` file to register a Weex custom component
* `require('@weex-module/xxx')`: depends on a Weex native module. Notice that it is supported only in `*.we` file not `*.js` file. If you want to use Weex native module in a `*.js` file, temporarily you may write like this:

```javascript
// use this piece of code below to get Weex native module "modal"
var modal
__weex_define__('@weex-temp/x', function (__weex_require__) {
  modal = __weex_require__('@weex-module/modal')
})

// use APIs in "modal" module
modal.toast({message: 'hello'})
```

We will bring a better syntax design in the future.
