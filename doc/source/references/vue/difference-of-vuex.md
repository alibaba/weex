---
title: Using Vuex and vue-router   
type: references
order: 10.2
version: 2.1
---

# Using Vuex and vue-router

Vue.js also has many peripheral technology products such as [Vuex](https://github.com/vuejs/vuex) and [vue-router](https://github.com/vuejs/vue-router), etc. Those libraries can also works well in Weex.

> We developed a complete project based on Weex and Vue.js which named [weex-hackernews](https://github.com/weepteam/web-ehackernews). We used Vuex and vue-loader in it, and it works well on both iOS, Android and web.

## Using Vuex

> [Official Vuex documents](https://vuex.vuejs.org/en/)

![Vuex](//vuex.vuejs.org/en/images/vuex.png)

Vuex is a state management pattern + library for Vue.js applications. it's also a library implementation tailored specifically for Vue.js to take advantage of its granular reactivity system for efficient updates. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion.

As a kind of state management library, Vuex is platform-independent, It also can be used in Weex. Read its [official documents](https://vuex.vuejs.org/en/) for more details.

It also integrates with Vue's official [devtools extension](https://github.com/vuejs/vue-devtools) to provide advanced features on web platform, such as zero-config time-travel debugging and state snapshot export / import. (web platform only)

## Using vue-router

> [Official vue-router documents](https://router.vuejs.org/en/)

Creating a Single-page Application with Vue.js + vue-router is dead simple. With Vue.js, you are already composing our application with components. When adding vue-router to the mix, all you need to do is map your components to the routes and let vue-router know where to render them.

However, there are many difference between web and Android or iOS, some features of vue-router are limited in Weex.

### Router mode

vue-router provides three routing modes:

+ `hash`: uses the URL hash for routing. Works in all Vue-supported browsers, including those that do not support HTML5 History API. (**default**)
+ `history`: requires HTML5 History API and server config. See [HTML5 History Mode](https://router.vuejs.org/en/essentials/history-mode.html).
+ `abstract`: works in all JavaScript environments, e.g. server-side with Node.js.

You can pass the `mode` parameter when creating a router:

```js
new Router({
  mode: 'abstract',
  // ...
})
```

Obviously "hash" mode and "history" mode are only available on the web, and have no effect in Weex. That is, you have to use "abstract" mode in Android and iOS. However, **vue-router will automatically be forced into "abstract" mode if no browser API is present.** so, just don't set the `mode` option, or set it to "abstract".

### Programmatic navigation

vue-router use `<router-link>` to create a navigation link, but in which some of the features based on the DOM events, it doesn't work well in the native environment. In Weex, you must use the [Programmatic Navigation](https://router.vuejs.org/en/essentials/navigation.html) to manage the router.

Here is an basic example using `<router-link>`:

```html
<!-- Can only be used on the web, it takes no effects on Android or iOS! -->
<template>
  <div>
    <router-link to="profile">
      <text>Profile</text>
    </router-link>
  </div>
</template>
```

For native platforms, you have to use the `router.push`:

```html
<template>
  <div>
    <text @click="jump">Profile</text>
  </div>
</template>

<script>
  import router from './path/to/router'
  export default {
    methods: {
      jump () {
        router.push('profile')
      }
    }
  }
</script>
```
