---
title: <video>
type: references
order: 2.14
version: 0.10
---

# &lt;video&gt;

<span class="weex-version">v0.6.1+</span>

`<video>` 组件可以让我们在 Weex 页面中嵌入视频内容。

## 子组件

- `<text>` 是唯一合法的子组件。

### 特性

- `src {string}`：内嵌的视频指向的URL
- `play-status {string}`：可选值为 `play` | `pause`，用来控制视频的播放状态，`play` 或者 `pause`，默认值是 `pause`。
- `auto-play {boolean}`：可选值为  `true` | `false`，当页面加载初始化完成后，用来控制视频是否立即播放，默认值是 `false`。

## 样式

- 通用样式：支持所有通用样式

  - 盒模型
  - `flexbox` 布局
  - `position`
  - `opacity`
  - `background-color`

  查看 [组件通用样式](../common-style.html)

## 事件

- `start`：当 playback 的状态是 Playing 时触发
- `pause`：当 playback 的状态是 Paused 时触发
- `finish`：当 playback 的状态是 Finished 时触发
- `fail`：当 playback 状态是 Failed 时触发

## 示例

```html
<template>
  <div>
    <text>Big Eater!</text>
    <video class="video" onstart="onstart" onpause="onpause" onfinish="onfinish" onfail="onfail"
      auto-play="false" play-status="pause" src="{{src}}" style="width:750;height:500;"></video>
    <text>state: {{msg}}</text>
  </div>
</template>

<style>
</style>

<script>
  module.exports ={
    data: {
      msg: '',
      src:'http://flv2.bn.netease.com/videolib3/1611/01/XGqSL5981/SD/XGqSL5981-mobile.mp4'
    },
    methods:{
      onstart:function(e){
        this.msg = 'onstart'
      },
      onpause:function(e){
        this.msg = 'onpause'
      },
      onfinish:function(e){
        this.msg = 'onfinish'
      },
      onfail:function(e){
        this.msg = 'onfinish'
      },
    }
  }
</script>
```

[体验一下](http://dotwe.org/d83a00bbd180bd5dc4e7f9381d39b4dd)
