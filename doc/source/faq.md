---
title: FAQ
type: faq
layout: post
---

# FAQ

## where are legacy docs?

- [Guide](./v-0.10/guide/index.html)
- [References](./v-0.10/references/index.html)
- [Advanced](./v-0.10/advanced/index.html)
- [Tools](./v-0.10/tools/index.html)

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
Best way to find out what's happening is read debug log, you can follow [this document](./guide/index.html) to firgure out how to do that.

## About ECMAScript Version

Weex uses JSCore in iOS and uses v8 in Android. So they both support ECMAScript 5 spec. Additionally, we do some polyfills in native environment:

* `Promise` in iOS/Android
* Timer APIs (`setTimeout` / `clearTimeout` / `setInterval` / `clearInterval`) in iOS/Android
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

## iOS text line-height style is abnormal

`line-height` style in text component is different from h5 and Android,  text value will be placed at bottom of line box because of iOS native api. We are trying to optimize it.

## Android only support `overflow:hidden`
The `overflow` style in android is `hidden` and cannot be changed. This is the result of Android View framework. This only happens on Android, iOS will work as expected.

## Android do not support emoji
As Android NDK only supports Modified UTF-8, emoji is not support yet. Any attemp to use emoji may cause crash in case of lower than Android 6.0, and unexpected behavior when it is higher than 6.0. Only use Modified UTF-8, **do not** use emoji.

## How to get rid of 750 adaption and calculate width/height in real pixels？

The deviceHeight and deviceWidth got in `this.$getConfig()` is the real device width/height in pixels, not the ones with 750-adapted.

So you can use them to calculate width/height in real pixels.

Suppose you need to display a navigation bar of fixed 88 pixels, the bar's height will be:

```
var height = 88 * 750 / env.deviceWidth 
```


## How to detect an native module/component supported in JavaScript?

### Detect native module

```javascript
var xxx = require('@weex-module/xxx')
if (xxx) {
  // todo: use this module
}
else {
  // todo: handle the exception
}
```

### Detect native component

```html
<template>
  <component is="{{type}}"></component>
</template>

<script>
  var type = 'xxx'
  var xxx = require('@weex-component/xxx')
  if (!xxx) {
    type = 'div' // downgrade to <div>
  }
  module.exports = {
    data: function () {
      return {
        type: type
      }
    }
  }
</script>
```

## How to transfer data between pages

If you have 2 pages, A and B.

0. A -> B, use [storage module](./references/modules/storage.html) to transfer data
0. B -> A, use [storage module](./references/modules/storage.html) to transfer data

## How to use `repeat` in Parent-Child components

If you want, You can make a `repeat` operation between Parent-Child components. But you must be strictly in accordance with the document syntax to write code. If there is no child component defined data, or there is no specify `props` that need to be passed down. It will lead to the page does not render properly.

A correct example:

```html
<element name="child">
  <template>
    <div>
      <text style="font-size:100">{{title}}</text>
    </div>
  </template>
  
  <script>
    module.exports = {
      data: {
        title: null
      }
    }
  </script>
</element>
<template>
  <div>
    <child repeat="item in lists" title="{{ item.title }}"></child>
  </div>
</template>
<script>
  module.exports = {
    data: {
      lists: [
        { title: 'A' },
        { title: 'B' },
        { title: 'C' }
      ]
    },
    ready: function () {
      this.lists.splice(0, 1)
    }
  }
</script>
```

A wrong example：

```html
<element name="child">
  <template>
    <div>
      <text style="font-size:100">{{title}}</text>
    </div>
  </template>
</element>
<template>
  <div>
    <child repeat="item in lists"></child>
  </div>
</template>
<script>
  module.exports = {
    data: {
      lists: [
        { title: 'A' },
        { title: 'B' },
        { title: 'C' }
      ]
    },
    ready: function () {
      this.lists.splice(0, 1)
    }
  }
</script>
```