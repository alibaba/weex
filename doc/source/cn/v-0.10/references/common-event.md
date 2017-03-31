---
title: 通用事件
type: references
order: 1.10
version: 0.10
---

# 通用事件

Weex 提供了通过事件触发动作的能力，例如在用户点击组件时执行 JavaScript。下面列出了可被添加到 Weex 组件上以定义事件动作的属性：

## `click`

当组件上发生点击手势时被触发。

**注意：**

`<input>` 和 `<switch>` 组件目前不支持 `click` 事件，请使用 `change` 或 `input` 事件来代替。

### 事件对象

- `type`: `click`
- `target`: 触发点击事件的目标组件
- `timestamp`: 触发点击事件时的时间戳

### 示例

点击按钮，将弹出弹框，再点击弹框 `×`，关闭弹框。

```html
<template>
  <div>
    <div>
      <text class="btn" onclick="openDialog">Show Dialog</text>
    </div>

    <div id="dialog" class="dialog" if="{{isShowDialog}}">
      <div class="dialog-backdrop"></div>
      <div class="dialog-content">
        <div class="dialog-header">
          <text class="dialog-title">{{dialogTitle}}</text>
          <text class="close" onclick="closeDialog">×</text>
        </div>
        <div class="dialog-body">
          <text>{{dialogBody}}</text>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.dialog-backdrop {
  opacity: .5;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000000;
}
.dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  justify-content: center;
  align-items: center;
}
.dialog-content {
  width: 450;
  background-color: #ffffff;
}
.dialog-header {
  padding: 20;
  border-bottom-width: 1;
  border-bottom-style: solid;
  border-bottom-color: #efefef;
}
.dialog-body {
  padding: 20;
}
.close {
  font-size: 50;
  position: absolute;
  right: 10;
  top: 10;
}
.btn {
  text-align: center;
  color: #ffffff;
  padding: 12;
  background-color: #3071a9;
  border-color: #285e8e;
  border-radius: 4;
}
</style>

<script>
  module.exports = {
    data: {
      isShowDialog: false,
      dialogTitle: 'HELLO',
      dialogBody: 'Weex is best!'
    },
    methods: {
      openDialog: function (e) {
        this.isShowDialog = true
      },
      closeDialog: function (e) {
        this.isShowDialog = false
      }
    }
  }
</script>
```

[体验一下](http://dotwe.org/6c1dd48b419e614f92581930f42fd366)

## `longpress`

如果一个组件被绑定了 `longpress` 事件，那么当用户长按这个组件时，该事件将会被触发。

**注意：**

`<input>` 和 `<switch>` 组件目前不支持 `click` 事件，请使用 `change` 或 `input` 事件来代替。

### 事件对象
- `type` : `longpress`
- `target` : 触发长按事件的目标组件
- `timestamp` : 长按事件触发时的时间戳

### 示例

长按按钮，变换背景色。

```html
<template>
  <div style="width: 400; height: 200; background-color: {{bg}};
    justify-content: center; align-items: center;" onlongpress="{{update}}">
    <text style="font-size: 60">Press me</text>
  </div>
</template>

<script>
  module.exports = {
    data: {
      bg: '#FF0000'
    },
    methods: {
      update: function () {
        this.bg = this.bg === '#FF0000' ? '#00FF00' : '#FF0000'
      }
    }
  }
</script>
```

[体验一下](http://dotwe.org/14a646ea3d7d5e1de5baaca9061a48b3)

## Appear 事件

如果一个位于某个可滚动区域内的组件被绑定了 `appear` 事件，那么当这个组件的状态变为在屏幕上可见时，该事件将被触发。

### 事件对象

- `type` : `appear`
- `target` : 触发 Appear 事件的组件对象
- `timestamp` : 事件被触发时的时间戳
- `direction` : 触发事件时屏幕的滚动方向，`up` 或 `down`

### 示例

当滚到最下方时，最后一个 `item` 出现，将会弹出弹框。

```html
<template>
  <scroller onviewappear="{{viewappear}}" onviewdisappear="{{viewdisappear}}">
    <div class="item">
      <text>scroll 1</text>
    </div>
    <div class="item">
      <text>scroll 2</text>
    </div>
    <div class="item">
      <text>scroll 3</text>
    </div>
    <div class="item">
      <text>scroll 4</text>
    </div>
    <div class="item">
      <text>scroll 5</text>
    </div>
    <div class="item">
      <text>scroll 6</text>
    </div>
    <div class="item">
      <text>scroll 7</text>
    </div>
    <div class="item">
      <text>scroll 8</text>
    </div>
    <div class="item">
      <text>scroll 9</text>
    </div>
    <div class="item">
      <text>scroll 10</text>
    </div>
    <div class="item" onappear="alertMsg" >
      <text>I will alert a message when I appeared.</text>
    </div>
  </scroller>
</template>

<style>
  .list {
    height: 850;
  }

  .count {
    font-size: 48;
    margin: 10;
  }

  .indicator {
    height: 40;
    width: 40;
    color: #45b5f0;
  }

  .row {
    width: 750;
  }

  .item {
    justify-content: center;
    border-bottom-width: 2;
    border-bottom-color: #c0c0c0;
    height: 200;
    padding: 20;
  }
</style>

<script>
  var modal = require('@weex-module/modal')
  module.exports = {
      data: {},
      methods: {
        alertMsg: function (e) {
          modal.alert({
            message: 'I am appeared.',
            okTitle: 'Appear'
          }, function() {
          })
        },
        viewappear: function () {
          nativeLog('>>>>>', 'viewappear')
        },
        viewdisappear: function () {
          nativeLog('>>>>>', 'viewdisappear')
        }
      }
  }
</script>
```

[体验一下](http://dotwe.org/4d5335f086dfc9964caed5b1fe4b1aa7)

## Disappear 事件

如果一个位于某个可滚动区域内的组件被绑定了 `disappear` 事件，那么当这个组件被滑出屏幕变为不可见状态时，该事件将被触发。

### 事件对象

- `type` : `disappear`
- `target` : 触发 Disappear 事件的组件对象
- `timestamp` : 事件被触发时的时间戳
- `direction` : 触发事件时屏幕的滚动方向，`up` 或 `down`

### 示例

当向下滚动到第一个 `item` 消失后，将会弹出弹框。

```html
<template>
  <scroller onviewappear="{{viewappear}}" onviewdisappear="{{viewdisappear}}">
    <div class="item" ondisappear="alertMsg" >
      <text>I will alert a message when I disappeared.</text>
    </div>
    <div class="item">
      <text>scroll 1</text>
    </div>
    <div class="item">
      <text>scroll 2</text>
    </div>
    <div class="item">
      <text>scroll 3</text>
    </div>
    <div class="item">
      <text>scroll 4</text>
    </div>
    <div class="item">
      <text>scroll 5</text>
    </div>
    <div class="item">
      <text>scroll 6</text>
    </div>
    <div class="item">
      <text>scroll 7</text>
    </div>
    <div class="item">
      <text>scroll 8</text>
    </div>
    <div class="item">
      <text>scroll 9</text>
    </div>
    <div class="item">
      <text>scroll 10</text>
    </div>
  </scroller>
</template>

<style>
  .list {
    height: 850;
  }

  .count {
    font-size: 48;
    margin: 10;
  }

  .indicator {
    height: 40;
    width: 40;
    color: #45b5f0;
  }

  .row {
    width: 750;
  }

  .item {
    justify-content: center;
    border-bottom-width: 2;
    border-bottom-color: #c0c0c0;
    height: 200;
    padding: 20;
  }
</style>

<script>
  var modal = require('@weex-module/modal')
  module.exports = {
      data: {},
      methods: {
        alertMsg: function (e) {
          modal.alert({
            message: 'I am disappeared.',
            okTitle: 'Disappear'
          }, function() {
          })
        },
        viewappear: function () {
          nativeLog('>>>>>', 'viewappear')
        },
        viewdisappear: function () {
          nativeLog('>>>>>', 'viewdisappear')
        }
      }
  }
</script>
```

[体验一下](http://dotwe.org/eefa176009207a429bbaf475f6ee92d1)

## Page 事件

*注意：仅支持 iOS 和 Android，H5 暂不支持。*

Weex 通过 `viewappear` 和 `viewdisappear` 事件提供了简单的页面状态管理能力。

`viewappear` 事件会在页面就要显示或配置的任何页面动画被执行前触发，例如，当调用 `navigator` 模块的 `push` 方法时，该事件将会在打开新页面时被触发。`viewdisappear` 事件会在页面就要关闭时被触发。

与组件的 `appear` 和 `disappear` 事件不同的是，`viewappear` 和 `viewdisappear` 事件关注的是整个页面的状态，所以**它们必须绑定到页面的根元素上**。

特殊情况下，这两个事件也能被绑定到非根元素的body组件上，例如`wxc-navpage`组件。

### 事件对象

- `type` : `viewappear` 或 `viewdisappear`
- `target` : 触发事件的组件对象
- `timestamp` : 事件被触发时的时间戳

### 示例

进出页面时，都会弹框提示。

```html
<template>
  <scroller onviewappear="{{alertViewappearMsg}}" onviewdisappear="{{alertViewdisappearMsg}}">
    <div class="item">
      <text>scroll 1</text>
    </div>
    <div class="item">
      <text>scroll 2</text>
    </div>
    <div class="item">
      <text>scroll 3</text>
    </div>
    <div class="item">
      <text>scroll 4</text>
    </div>
    <div class="item">
      <text>scroll 5</text>
    </div>
    <div class="item">
      <text>scroll 6</text>
    </div>
    <div class="item">
      <text>scroll 7</text>
    </div>
    <div class="item">
      <text>scroll 8</text>
    </div>
    <div class="item">
      <text>scroll 9</text>
    </div>
    <div class="item">
      <text>scroll 10</text>
    </div>
    <div class="item" onappear="alertMsg" >
      <text>scroll 11</text>
    </div>
  </scroller>
</template>

<style>
  .list {
    height: 850;
  }

  .count {
    font-size: 48;
    margin: 10;
  }

  .indicator {
    height: 40;
    width: 40;
    color: #45b5f0;
  }

  .row {
    width: 750;
  }

  .item {
    justify-content: center;
    border-bottom-width: 2;
    border-bottom-color: #c0c0c0;
    height: 200;
    padding: 20;
  }
</style>

<script>
  var modal = require('@weex-module/modal')
  module.exports = {
      data: {},
      methods: {
        alertViewappearMsg: function () {
          modal.alert({
            message: 'viewappear.',
            okTitle: 'viewappear'
          }, function() {
          })
        },
        alertViewdisappearMsg: function () {
          modal.alert({
            message: 'viewdisappear.',
            okTitle: 'viewdisappear'
          }, function() {
          })
        }
      }
  }
</script>
```

[体验一下](http://dotwe.org/450205a8f8612381422220ce88a562ff)
