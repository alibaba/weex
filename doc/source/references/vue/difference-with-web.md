---
title: Difference with Web   
type: references
order: 10.1
version: 2.1
---

# Differences between using Vue in Web and Weex

## Platform Differences

Vue.js was designed for the Web platform at the begining. Although it can be based on Weex to develop native applications, there are still many differences between web and native. See [Platform Differences Between Weex and Web](../ platform-difference.html) for more details.

Due to those differences, Weex doesn't support those features in Vue.js (mostly are DOM-related):

+ Event bubbling and capturing are not supported. Event modifiers, such as `.prevent`,` .capture`, `.stop`,` .self` are meaningless in the native environment.
+ The keyboard event modifiers, like `.{KeyCode | keyAlias}` is also meaningless. (see [docs in Vue.js](https://vuejs.org/v2/guide/events.html#Key-Modifiers))
+ No need to call `vm.$mount` manually, the entry component will mount to the root view of the native container by default.
+ `v-html` and` v-text` directives are not supported.

## Functional differences

### Vue 2.0 Runtime-only build

Vue 2.0 provides two available builds, the standalone build and the runtime-only build. see the [official document](https://vuejs.org/v2/guide/installation.html#Standalone-vs-Runtime-only-Build) for more information.

Weex only required the runtime-only build of Vue 2.0 for better performance and less code size.

The specific differences are:

+ The `template` attribute is not supported when defining a component.
+ Does not support using `x-templates`.
+ Does not support using `Vue.compile`.

### Isolate the context of multiple pages

Weex use the "multiple-pages" concept in native, different js bundle will be run in different native views, there context is isolated. Even the `Vue` variable is not the same instance between js bundles. (However, all the js bundle will share the same Weex runtime.)

Based on this feature, the global configurations in `Vue` will only take effect on the current page:

+ `Vue.config`
+ `Vue.component`
+ `Vue.directive`
+ `Vue.filter`
+ `Vue.mixin`
+ `Vue.use`

> Note: Those methods are still work, but its effect will be limited to the current page.

## Restrictions in style

CSS is very flexible, has a lot of properties, support a variety of layout modes. This is the advantage of CSS, but also a bottleneck in browser performance optimization.

The style in Weex is parsed by the native renderer, and for the sake of performance and complexity, Weex makes some trade-offs about CSS features to make it better suited to *"best practices"*.

### Single class selector

Weex only supports to use single class name in `<style>`, does not support *type selectors*, *ID selectors*, *attribute selectors*, *adjacent sibling selectors* and the *combinators*.

```CSS
/* Support single class name selector */
.one-class {
  font-size: 36px;
}

/* Does not support to use combinators between selector */
.parent > .child {
  padding-top: 10px;
}
.foo + .bar {
  margin-left: 20px;
}

/* Does not support attribute selectors. The `v-cloak` directive is not supported */
[V-cloak] {
  color: #FF6600;
}
```

The restriction is only for the style definition, does not affect the use of class names. You can still use multiple class names on a single tag, such as:

```Html
<template>
  <div class="one two three"><div>
</template>
```

### Scoped by default

In Weex, For single file components, the styles written in the `<style>` can only be used in the current component.

In order to maintain consistency with Native, it is recommended that you write the style in the `.vue` file with the` scoped` attribute, that is, `<style scoped>`.

### Supported CSS attributes

Weex supports a subset of CSS, and will continue to expand.

Weex supports *box-model* and *flexbox*, as well as other common styles. See [Weex Common Style](../ common-style.html) and [Supported Web Standards](http://weex.apache.org/references/web-standards.html) for more information.

In addition, you should also pay attention to the following points:

+ No need to write style prefix.
+ Weex doesn't support `display: none;` and therefore doesn't support the `v-show` directive.
+ In order to optimize the efficiency of CSS parser, Weex doesn't support shorthand attributes, involving the following attributes:
  + `flex`
  + `border`, `border-(top|bottom|left|right)`
  + `margin`
  + `padding`
  + `font`
  + `background`

## Differences in development

Because of the platform difference, you have to compile your source file in two different ways:

+ For the web, you can compile source files in any official way, such as Webpack + vue-loader or Browserify + vueify. and require the [weex-vue-render](https://www.npmjs.com/package/weex-vue-render), which is a group of Weex build-in components.
+ For Android and iOS, we've provided [weex-loader](https://github.com/weepteam/weep-loader) to compile the `.vue` files. That is, use Webpack + weex-loader to generate the js bundle that is available for the native.

### Use weex-loader

[weex-loader](https://github.com/weexteam/weex-loader) is a loader for Webpack, see the [official document](http://webpack.github.io/docs/using-loaders.html) to learn how to use it.

One more thing should be reminded is that if the *entry file* of your webpack config is a `.vue` file, you also need to pass an additional ` entry` parameter, usually set to `true`.

```Js
module.exports = {
  // Add the entry parameter for the .vue file
  entry: './path/to/App.vue?entry=true',

  // other configurations ...

  module: {
    loaders: [{

      // matches the .vue file path that contains the entry parameter
      test: /\.vue(\?^^]+)?$/,
      loaders: ['weex-loader']
    }]
  },
}
```

**You don't need to write those additional parameters if you are using `.js` file as entry file.** We recommend using javascript files as the entry file of webpack config.

### Setup native development environments

Since your are using Weex to develop native apps, setup native development environments, both Android and iOS, would be very useful.

See [Integrating Weex to the existing application](../../guide/integrate-to-your-app.html) for more information.
