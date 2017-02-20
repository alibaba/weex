---
title: navigator
type: references
order: 3.5
version: 2.1
---

# `navigator` 导航控制

<span class="weex-version">v0.6.1+</span>

众所周知，在浏览器里，我们可以通过前进或者回退按钮来切换页面，iOS/Android 的 `navigator` 模块就是用来实现类似的效果的。除了前进、回退功能，该模块还允许我们指定在切换页面的时候是否应用动画效果。

## API

### `push(options, callback)`

把一个weex页面URL压入导航堆栈中，可指定在页面跳转时是否需要动画，以及操作完成后需要执行的回调函数

#### 参数

* `options {Object}`：选项参数
  * `url {stirng}`：要压入的 Weex 页面的 URL
  * `animated {string}`：`"true"` 示意为页面压入时需要动画效果，`"false"` 则不需要，默认值为 `"true"`
* `callback {Function}`：执行完该操作后的回调函数

### `pop(options, callback)`

把一个 Weex 页面 URL 弹出导航堆栈中，可指定在页面弹出时是否需要动画，以及操作完成后需要执行的回调函数。

#### 参数

* `options {object}`：选项参数对象
  * `animated {string}`：`"true"` 示意为弹出页面时需要动画效果，`"false"` 则不需要，默认值为 `"true"`
* `callback {function}`：执行完该操作后的回调函数


*注意事项：`animated` 二级参数目前仅支持字符串的 `"true"` 和 `"false"`，传入布尔值类型会导致程序崩溃，未来版本会修复这个问题*

## Example

```html
<template>
  <div class="wrapper">
    <text class="button" @click="jump">Jump</text>
  </div>
</template>

<script>
  var navigator = weex.requireModule('navigator')
  var modal = weex.requireModule('modal')

  export default {
    methods: {
      jump (event) {
        console.log('will jump')
        navigator.push({
          url: 'http://dotwe.org/raw/dist/519962541fcf6acd911986357ad9c2ed.js',
          animated: "true"
        }, event => {
          modal.toast({ message: 'callback: ' + event })
        })
      }
    }
  };
</script>

<style scoped>
  .wrapper {
    flex-direction: column;
    justify-content: center;
  }
  .button {
    font-size: 60px;
    width: 450px;
    text-align: center;
    margin-top: 30px;
    margin-left: 150px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-width: 2px;
    border-style: solid;
    color: #666666;
    border-color: #DDDDDD;
    background-color: #F5F5F5
  }
</style>
```

[try it](../../../examples/navigator.html)
