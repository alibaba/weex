---
title: <wxc-tabbar>
type: references
order: 3.2
version: 0.10
---

# &lt;wxc-tabbar&gt;

`<wxc-tabbar>` 是一个名为 `weex-components` 依赖库的自定义组件。`<wxc-tabbar>` 能在窗口的底部显示 tab 页面，我们可以在不同的 tab 页面之间切换。

用法：在 `script` 标签中通过一个 `require` 语句引入，即：`require('weex-components');`

**示例**

```html
<template>
  <div style="flex-direction: column;">
    <wxc-tabbar tab-items = {{tabItems}}></wxc-tabbar>
  </div>
</template>

<script>
  require('weex-components');

  module.exports = {
    data: {},
    methods: {
      // more
    }
  }
</script>
```

在 `require('weex-components');` 之前 ，需要在工程目录下执行以下命令：

```bash
npm install weex-components
```

## 子组件

该组件不支持子组件。

## 特性

- `selected-index {number}`：设置默认选中的 tab 索引，默认值为 0（第一个 tab）。
- `selected-color {color}`：设置当标题被选中时标题的颜色，默认为红色。
- `unselected-color {color}`：设置当标题不被选中时标题的颜色，默认为黑色。
- `tab-items {Array[Object]}`：该属性接受一个 `tabitems` 对象数组, 分别对应到对应的 tab 页面，tab 页面的顺序跟对象数组的位置对应。
  我们可以通过设置每一项的属性来配置 tabbar 的外观：

  - `index {integer}`：必填属性，指明了 tabitem 的次序。
  - `title {string}`：设置 tabitem 的标题，非必填，当标题为空时，标题将不会被显示
  - `titleColor {color}`：设置 tabitem 的标题颜色，默认是黑色
  - `image {string}`：当 tab 页面不被选中时显示的 icon，当不提供时，什么也不显示。
  - `selectedImage {string}`：设置 tab 页面被选中时显示的图片，不提供图片时，什么也不显示。
  - `src {string}`：设置 tab 对应的 Weex 页面的 url，为 http 开头。
  - `visibility {string}`：值为 `visible` | `hidden`，该属性指明了 tab 页面的显示状态，默认值是 visible

## 样式

- 通用样式：支持所有通用样式

  - 盒模型
  - `flexbox` 布局
  - `position`
  - `opacity`
  - `background-color`

  查看 [组件通用样式](../common-style.html)

## 事件

- `tabBar.onClick`：当 tab 页面被选中时触发，需要在 `ready` 或者 `create` 生命周期中注册，如：

  **示例**

  ```html
  <template>
    <div style="flex-direction: column;">
      <wxc-tabbar tab-items="{{tabItems}}"></wxc-tabbar>
    </div>
  </template>

  <script>
    require('weex-components');
    module.exports = {
      data: {
        // ...
      },
      created: function() {
        var vm = this;
        vm.$on('tabBar.onClick',function(e){
          var detail= e.detail;
          console.log('tabBar.onClick ' + detail.index);
        });
      },
      methods: {
      }
    }
  </script>
  ```

- 通用事件
  支持所有通用事件：

  - `click`
  - `longpress`
  - `appear`
  - `disappear`

  查看 [通用事件](../common-event.html)

## 示例

**注意：**

[dotwe](http://dotwe.org) 平台暂不支持 `wxc-xxx` 类型的组件。

```html
<template>
  <div>
    <wxc-tabbar tab-items="{{tabItems}}"></wxc-tabbar>
  </div>
</template>

<script>
  require('weex-components');
  module.exports = {
    data: {
      dir: 'examples',
      tabItems: [
        {
          index: 0,
          title: 'tab1',
          titleColor: '#000000',
          icon: '',
          image: 'http://gtms01.alicdn.com/tps/i1/TB1qw.hMpXXXXagXXXX9t7RGVXX-46-46.png',
          selectedImage: 'http://gtms04.alicdn.com/tps/i4/TB16jjPMpXXXXazXVXX9t7RGVXX-46-46.png',
          src: 'http://dotwe.org/raw/dist/ba202bcd277285c7f3cf79f9b1055dce.js?itemId=tab1',
          visibility: 'visible',
        },
        {
          index: 1,
          title: 'tab2',
          titleColor: '#000000',
          icon: '',
          image: 'http://gtms03.alicdn.com/tps/i3/TB1LEn9MpXXXXaUXpXX9t7RGVXX-46-46.png',
          selectedImage: 'http://gtms02.alicdn.com/tps/i2/TB1qysbMpXXXXcnXXXX9t7RGVXX-46-46.png',
          src: 'http://dotwe.org/raw/dist/7e24b83c5868dbd4462e30549999245d.js?itemId=tab2',
          visibility: 'hidden',
        },
        {
          index: 2,
          title: 'tab3',
          titleColor: '#000000',
          icon: '',
          image: 'http://gtms01.alicdn.com/tps/i1/TB1B0v5MpXXXXcvXpXX9t7RGVXX-46-46.png',
          selectedImage: 'http://gtms04.alicdn.com/tps/i4/TB1NxY5MpXXXXcrXpXX9t7RGVXX-46-46.png',
          src: 'http://dotwe.org/raw/dist/8a8b49b67084423e097a6b7f549f1453.js?itemId=tab3',
          visibility: 'hidden',
        }
      ],
    },
    created: function() {
      var vm = this;
      vm.$on('tabBar.onClick',function(e){
        var detail= e.detail;
        console.log('tabBar.onClick ' + detail.index);
      });
    },
    methods: {}
  }
</script>
```
