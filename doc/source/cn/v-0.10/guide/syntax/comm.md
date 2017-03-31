---
title: 组件通信
type: guide
order: 3.8
version: 0.10
---

# 组件间通信

## 自定义事件

Weex 支持自定义事件，这里有两个相关的设计：1，监听自定义事件；2，创建自定义事件。

## 监听自定义事件

每个 Weex 的 ViewModel 都支持 `this.$on(type, handler)` 和 `this.$off(type[, handler])` 的 API。`type` 是监听的自定义事件类型，`handler` 是事件处理函数。

当 `handler` 被触发时，会有一个事件对象 `event` 作为第一个参数被传入，事件对象的数据格式基于[事件机制](./events.html)中提到的事件描述对象。

## 创建自定义事件

每个 Weex 的 ViewModel 都支持 `this.$emit(type, detail)` 的 API，可以在当前 ViewModel 中产生一个自定义事件。`type` 是自定义事件的类型，`detail` 则是一个对该事件细节补充描述的 JSON 对象，会以 `event.detail` 的形式出现在处理此事件的函数中。

## 从子组件向父组件通信

首先父组件要监听特定类型的自定义事件，而子组件可以使用 `this._parent` 找到父组件，然后再调用 `this._parent.$emit(type, detail)` 方法，即可实现自下而上的通信。例如：

```html
<element name="foo">
  <template>
    <div>
      <image src="{{imageUrl}}" class="thumb" onclick="test"></image>
      <text>{{title}}</text>
    </div>
  </template>
  <style>
    .thumb { width: 200; height: 200; }
  </style>
  <script>
    module.exports = {
      data: {
        title: '',
        imageUrl: ''
      },
      methods: {
        test: function () {
          // Emit notify to parent
          this._parent.$emit('notify', {a: 1})
        }
      }
    }
  </script>
</element>

<template>
  <div>
    <foo title="Hello" image-url="https://gtms02.alicdn.com/tps/i2/TB1QHKjMXXXXXadXVXX20ySQVXX-512-512.png"></foo>
    <text if="eventType">event: {{eventType}} - {{eventDetail}}</text>
  </div>
</template>

<script>
  module.exports = {
    data: {
      eventType: '',
      eventDetail: {}
    },
    created: function () {
      this.$on('notify', function(event) {
        // When a notify comes, this handler will be run.
        // `event.detail` will be `{a: 1}`
        this.eventType = event.type
        this.eventDetail = JSON.stringify(event.detail)
      })
    }
  }
</script>
```

[体验一下](http://dotwe.org/51e553ef43e5c744d05da1bb811903bf)

## 从父组件向子组件通信

同理，首先子组件要监听特定类型的自定义事件，而父组件可以使用 `this.$vm(id)` 找到父组件，然后再调用 `this.$vm(id).$emit(type, detail)` 方法，即可实现自上而下的通信。例如：

```html
<element name="foo">
  <template>
    <div>
      <image if="imageUrl" src="{{imageUrl}}" class="thumb"></image>
      <text>Foo</text>
    </div>
  </template>
  <style>
    .thumb { width: 200; height: 200; }
  </style>
  <script>
    module.exports = {
      data: {
        imageUrl: ''
      },
      created: function() {
        this.$on('changeImage', function (e) {
          this.imageUrl = e.detail
        }.bind(this))
      }
    }
  </script>
</element>

<template>
  <div>
    <foo id="sub"></foo>
    <text onclick="test">click to update foo</text>
  </div>
</template>

<script>
  module.exports = {
    methods: {
      test: function (e) {
        this.$vm('sub').$emit(
          'changeImage',
          'https://gtms02.alicdn.com/tps/i2/TB1QHKjMXXXXXadXVXX20ySQVXX-512-512.png'
        )
      }
    }
  }
</script>
```

[体验一下](http://dotwe.org/ea616d180620648e66554d42f57db82b)

下一节：[页面整体配置](./config-n-data.html) 
