---
title: How it works
type: advanced
order: 1
has_chapter_content: true
version: 0.10
---

# How it works
<span class="weex-version">0.4</span>

## Overview

Weex is a extendable cross-platform solution for dynamic programming and publishing projects. In the source code you can write pages or components with `<template>`, `<style>` and `<script>` tags, and then transform them into bundles for deploying. In server-side we can use these JS bundles for client request. When client get a bundle from server, it will be processed by client-side JavaScript engine and manages the native view rendering, the native API invoking and user interactions.

### Whole Workflow

```
Weex file --------------frontend(source code)
↓ (transform) --------- frontend(build tool)
JS bundle ------------- frontend(bundle code)
↓ (deploy) ------------ server
JS bundle in server --- server
↓ (compile) ----------- client(js-engine)
Virtual DOM tree ------ client(weex-jsframework)
↓ (render) ------------ client(render-engine)
Native view ----------- client(render-engine)
```

According to the workflow above, you need:

* Transformer: A nodejs tool to transform the source code into the bundle code.
* JS Framework: A JavaScript framework runing in the client which manage Weex instance. The instance which created from a JS bundle builds virtual DOM tree. Also it sends/receives native calls for native view rendering, native APIs and user interactions.
* Native Engine: There are many different ports for different platforms: iOS/Android/HTML5. They have the same components design, module APIs design and rendering effect. So they can work with the one and the same JS Framework and JS bundles.

## Transformer

The transformer transforms a source code into a bundle code. The whole work could be divided into three parts:

* Transform `<template>` into a JSON-like tree and transform data-binding attribute into a function prop which return the correct data value. For example: `{% raw %}<foo a="{{x}}" b="1" />{% endraw %}` will be transformed into `{type: "foo", attr: {a: function () {return this.x}, b: 1}}`.
* Transform `<style>` into a JSON tree. For example: `.classname {name: value;}` will be transformed into `{classname: {name: value}}`.
* Join the two above with `<script>` content. The three parts will be joined together and wrapped into a JavaScript AMD module.

A whole example (`main.we`):

```html
<template>
  <foo a="{{x}}" b="1" class="bar"></foo>
</template>
<style>
  .bar {width: 200; height: 200}
</style>
<script>
  module.exports = {
    data: function () {
      return {x: 100}
    }
  }
</script>
```

will transformed into:

```
define('@weex-component/main', function () {
  module.exports = {
    data: function () {
      return {x: 100}
    }
  }
  module.template = {
    type: "foo",
    attr: {
      a: function () {return this.x},
      b: 1,
      classname: ['bar']
    }
  }
  module.style = {
    bar: {width: 200, height: 200}
  }
}
bootstrap('@weex-component/main')
```

Additionally, the transformer could also do more things: combo the bundles, bootstrap with config and external data. For more information, please see the syntax specs.

## NOTICE
Most of Weex utility output JS Bundle after  [Webpack](https://webpack.github.io/) re-bundle. So the eventual format of Weex JSBundle is webpack packed .

## JS Framework

JS Framework will run in native JavaScript engine at the beginning preparation phase. It has `define()` and `bootstrap()` functions for each the bunlde code. Once a JS bundle requested from server, the code will be executed. `define()` will register all modules first, then `bootstrap()` will start compiling main component into virtual DOM and send rendering calls to native.

There are two key methods for the bridge between JS and native:

* `callNative` sends commands from JavaScript to native. So it's called from JavaScript and implemented with native code. All commands are native APIs organized by modules, for example `rendering`, `networking`, `authorizing`, and other client-side features like `toast` etc.
* `callJS` sends commands from native to JavaScript. So it's called from native and implemented by JS Framework. All commands are user interactions or native callbacks.

## Native RenderEngine

Native RenderEngine will supplies many native components and modules for call.

**Component** is an element in the screen which have a certain view and behavior. It could be configured with some attributes and style properties, and could response user interactions. There are some common components like `<div>`, `<text>`, `<image>` etc.

**Module** is a set of APIs which could be called from JS Framework. Some of them also have to make async callbacks to JS Framework, for example: send HTTP request.

During a Weex instance works, Native RenderEngine receives all kinds of module API calls from JS Framework. These calls will create or update components for view and use client-side features like `toast`. When a user interaction or module API callback happens, It will call `callJS()` from JS Framework. These jobs could walk through the Weex instance lifecycle till the instance is destroyed. As is shown in the architecture figure, H5 RenderEngine is a special RenderEngine with almost the same functions as native RenderEngines. 

![arch](https://gtms02.alicdn.com/tps/i2/TB1ootBMpXXXXXrXXXXwi60UVXX-596-397.png)  
Weex Architecture 

### call native from javascript

```
[JS Framework]
↓ callNative
module APIs
  rendering -> components display
  other features
[Native RenderEngine]
```

### call javascript from native

```
[Native RenderEngine]
module APIs callbacks
user interactions
↓ callJS
[JS Framework]
```

### Render Flow

![render flow](https://gtms03.alicdn.com/tps/i3/TB1_SA4MXXXXXXGaXXXpZ8UVXXX-519-337.png)  
Weex Render Flow 

0. Input is virtual dom.
0. **Build Tree**. Parse JSON data (virtual dom) to a Render Tree (RT).
0. **Apply Style**. Attach css style to RT nodes.
0. **Create View**. Create native views for each RT node.
0. **Attach Event**. Attach events for each view.
0. **CSS Layout**. Use [css-layout](https://github.com/facebook/css-layout) to calculate the layout of each view.
0. **Update Frame**. Update layout parameters of each view.
0. Output is Native or H5 Views.

In H5 Render Flow, `CSS Layout` and `Update Frame` are implemented by browser engine like webkit.
