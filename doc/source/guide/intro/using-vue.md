---
title: Using Vue
type: guide
order: 4.3
version: 2.1
---

# Using Vue

## Vue in Weex

[Vue.js](https://vuejs.org/) is an excellent progressive JavaScript framework written by [Evan You](https://twitter.com/youyuxi) which is very ease and flexible to use. Developers can write `*.vue` files with friendly `<template>`, `<style>`, `<script>` tags to build componentized web app.

![a vue file](//cn.vuejs.org/images/vue-component.png)

In Oct 2016 Vue.js has launched 2.0. It brings virtual-DOM and pre-compiler for HTML template. So it makes Vue.js possible to run in JS-only environment without HTML / CSS parser. And also the virtual-DOM layer makes Vue 2.x possible to render native UI through JavaScript.

Now Weex and Vue has supported each other officially. Weex put Vue 2.x as its built-in JS Framework, and Vue has already been able to develop native mobile app.

**Links**

* [Weex tutorial](../index.html)
* [Vue Introduction](https://vuejs.org/v2/guide/)
* [How Weex works](./index.html)

## New Features of Vue 2.x in Weex

### Stream Rendering

In Weex, developers can use `<foo append="tree|node">` to customize the rendering granularity to balance different UI complexity and business logic in order to get the best first-paint performance. `append=tree` means that the entire node, including all its child nodes, will be one-time rendered to native UI after all of the nodes generated completely. And `append=node` means just render the current node itself first and its child nodes will be futher rendered later.

<!-- dotwe demo -->

### Two-way Data Binding in Form Controls

In Weex, we provide the same `v-model` directive as web dev exprience for both `<input>` and `<textarea>` components. Developers can write `<input v-model="message">` or `<textarea v-model="message">` to bind data `message` and show it on the text box automatically. When user modifies the text box, the value of data `message` will be automatically updated.

<!-- dotwe demo -->

### Isolate Each Page Contexts

As described in [how Weex works](./index.html), all Weex's JS bundles share a JavaScript instance. So how can we make Vue 2.x used in multiple JS bundles completely isolated, and that one page which extends or rewrites Vue does not affect other pages becomes a problem. Through the collaboration between Weex and Vue. The problem has been solved.

<!-- html5 apis -->

### `<transition>`

Weex supports the awesome `<transition>` syntax in Vue 2.x. Developers can easily define the transition of an interface in both states with `<transition>` tag.

## Notice

Web development and native development, after all, there are some differences in functionality and development experience, which are essentially the differences between the native development platform and the Web platform, and Weex is trying to narrow the scope of this difference. See [differences of Vue 2.x between Weex and web](../../references/vue/index.html)

## Using Vue-related Libs

Vue.js also has more cool related libs. For example [Vuex](https://github.com/vuejs/vuex) and [vue-router](https://github.com/vuejs/vue-router). They all work well in Weex. For using Vuex and vue-router, see [Using Vuex and vue-router in Weex](../../references/vue/difference-of-vuex.html)。

> We developed a complete project based on Weex and Vue 2.x which named [weex-hackernews](https://github.com/weepteam/web-ehackernews). It includes WeexSDK with Vue 2.x in iOS, Android and web. Also we use Vuex and vue-router. The whole project uses the same source code for three different platforms.
