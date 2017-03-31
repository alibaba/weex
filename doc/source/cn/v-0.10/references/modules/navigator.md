---
title: navigator
type: references
order: 4.5
version: 0.10
---

# `navigator` 导航控制
<span class="weex-version">v0.6.1+</span>

众所周知，在浏览器里，我们可以通过前进或者回退按钮来切换页面，iOS/Android 的 `navigator` 模块就是用来实现类似的效果的。除了前进、回退功能，该模块还允许我们指定在切换页面的时候是否应用动画效果。

## 示例

```html
<template>
  <div class="div">
    <text class="text" onclick="onItemClick">click me! {{message}}</text>
  </div>
</template>

<script>
  var navigator = require('@weex-module/navigator')
  var nextUrl = 'http://dotwe.org/raw/dist/6cd1703a45d7b2752cf05303069ce881.js'
  module.exports ={
    data:{
      message:''
    },
    methods:{
      onItemClick:function(e){
        var params = {'url':nextUrl,'animated':'true'}
        navigator.push(params, function(e) {
          console.log('i am the callback.')
        });
      }
    }
  }
</script>
<style>
  .div {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 750;
    height: 90;
    padding-left:30;
    padding-right:30;

    border-bottom-width: 1;
    border-style: solid;
    border-color: #dddddd;
  }
  .text{
    width: 750;
    height: 90;
  }
</style>
```

[体验一下](http://dotwe.org/dba03a1660e6242778fd19d3d8f5944b)

## API

### `push(options, callback)`

把一个weex页面URL压入导航堆栈中，可指定在页面跳转时是否需要动画，以及操作完成后需要执行的回调函数

#### 参数

* `options {Object}`：选项参数
  * `url {stirng}`：要压入的 Weex 页面的 URL
  * `animated {string}`：`"true"` 示意为页面压入时需要动画效果，`"false"` 则不需要，默认值为 `"true"`
* `callback {Function}`：执行完该操作后的回调函数

#### 示例

```javascript
var navigator = require('@weex-module/navigator')
var params = {
  url: 'navigator-demo.js',
  animated: 'true'
}
navigator.push(params, function () {
  // callback
})
```

### `pop(options, callback)`

把一个 Weex 页面 URL 弹出导航堆栈中，可指定在页面弹出时是否需要动画，以及操作完成后需要执行的回调函数。

#### 参数

* `options {object}`：选项参数对象
  * `animated {string}`：`"true"` 示意为弹出页面时需要动画效果，`"false"` 则不需要，默认值为 `"true"`
* `callback {function}`：执行完该操作后的回调函数

#### 示例

```javascript
var navigator = require('@weex-module/navigator')
var params = {
  animated: 'true'
}
navigator.pop(params, function () {
  // callback
})
```

*注意事项：`animated` 二级参数目前仅支持字符串的 `"true"` 和 `"false"`，传入布尔值类型会导致程序崩溃，未来版本会修复这个问题*
