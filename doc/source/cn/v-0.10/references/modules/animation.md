---
title: animation
type: references
order: 4.1
version: 0.10
---

# `animation` 动画

流畅且有意义的动画是一个十分有效的提升移动应用用户体验的手段，`animation` 模块被用于在组件上执行动画。动画可以对组件执行一系列简单的变换 (位置、大小、旋转角度、背景颜色和不透明度)。举个例子，如果有一个 `<image>` 组件，通过动画你可以对其进行移动、旋转、拉伸或收缩等动作。

## 示例

```html
<template>
  <div>
    <div id="test" class="test" onclick="run"></div>
  </div>
</template>
<style>
  .test { background-color: #6666ff; width: 200; height: 200; }
</style>
<script>
  var animation = require('@weex-module/animation')
  module.exports = {
    methods: {
      run: function () {
        var testEl = this.$el('test')
        animation.transition(testEl, {
          styles: {
            backgroundColor: '#FF0000',
            transform: 'translate(100px, 100px)'
          },
          duration: 0, //ms
          timingFunction: 'ease',
          'transform-origin': 'center center',
          delay: 0 //ms
        }, function () {
          console.log('animation finished.')
        })
      }
    }
  }
</script>
```

[体验一下](http://dotwe.org/2ae04d3a7017a2ec748cf40905fcd98c)

## API

### `transition(el, options, callback)`

[example](http://dotwe.org/a034a49b5863da099843eb9a0eea9f93)

#### 参数

* `el {Element}`：将要执行动画的元素，通常可以通过调用 [`this.$el(id)`](../api.html) 来获取元素的引用。
* `options {Object}`：描述动画过程的对象。
  * `options.duration {number}`：指定动画的持续时间 (单位是毫秒)，默认值是 `0`，表示没有动画效果。
  * `options.delay {number}`：指定请求动画操作到执行动画之间的时间间隔 (单位是毫秒)，默认值是 `0`，表示没有延迟，在请求后立即执行动画。
  * `options.timingFunction {string}`：描述动画执行的速度曲线，用于使动画变化更为平滑。默认值是 `linear`，表示动画从开始到结束都拥有同样的速度。下表列出了所有合法的属性：

| 属性名 | 描述 | 示例 |
| ---- | ---- | ---- |
| `linear` | 动画从头到尾的速度是相同的 | [example](http://dotwe.org/70e0c243ffde30abd8fd353f8c6d1d9a) |
| `ease-in` | 动画速度由慢到快 | [example](http://dotwe.org/23b104f833039f263957481f2e2c40c9) |
| `ease-out` | 动画速度由快到慢 | [example](http://dotwe.org/04dab95e073a2c3a808e6b01fc20e996) |
| `ease-in-out` | 动画先加速到达中间点后减速到达终点 | [example](http://dotwe.org/fc37ec17d215e786ce336a00457489e3) |
| `cubic-bezier(x1, y1, x2, y2)` | 在三次贝塞尔函数中定义变化过程，函数的参数值必须处于 0 到 1 之间。更多关于三次贝塞尔的信息请参阅 [cubic-bezier](http://cubic-bezier.com/) 和 [Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve). | [example](http://weex.alibaba-inc.com/playground/95d8f15d0014c31d3a1d15728313f2a5) |

* `options.styles {Object}`：设置不同样式过渡效果的键值对，下表列出了所有合法的参数：

| 参数名 | 描述 | 值类型 | 默认值 | 示例 |
| ---- | ---- | ---- | ---- |---- |
| width | 动画执行后应用到组件上的宽度值 | length | 无 | [example](http://dotwe.org/b599d273f996cfdcbeca7bd5c828ca90) |
| height | 动画执行后应用到组件上的高度值 | length | 无 | [example](http://dotwe.org/d0b1ccadf386ba00960d0c8340c682e5) |
| backgroundColor | 动画执行后应用到组件上的背景颜色 | string | none | [example](http://dotwe.org/f4616ee18f6042b63a8fdcd2816b1712) |
| opacity | 动画执行后应用到组件上的不透明度值 | 介于 0 到 1 间的数值 | `1` | [example](http://dotwe.org/f94394173301db83ae6e66d1330a0d0b) |
| transformOrigin | 定义变化过程的中心点. 参数 `x-aris` 可能的值为 `left`、`center`、`right`、长度值或百分比值, 参数 `y-axis` 可能的值为 `top`、`center`、`bottom`、长度值或百分比值 | `x-axis y-axis` | `center center` | [example](http://dotwe.org/de43f5a47de230dd531797458bf7fd3c) |
| transform | 定义应用在元素上的变换类型，支持下表列出的属性 | object | 无 | [example](http://dotwe.org/6766dab0589f7831d4bb6030f4226996) |

`transform`属性的合法值:

| 名称 | 描述 | 值类型 | 默认值 | 示例 |
| ---- | ---- | ---- | ---- | ---- |
| `translate`/`translateX`/`translateY` | 指定元素将已被移动到的新位置 | 像素值或百分比 | 无 | [example](http://dotwe.org/6638e66e296723bbef3e59c83b2b5003) |
| `rotate` | 指定元素将被旋转的角度，单位是度 | number | 无 | [example](http://dotwe.org/ba9e9920594d9388744b2bd0d1b7695d) |
| `scale`/`scaleX`/`scaleY` | 按比例放大或缩小元素 | number | 无 | [example](http://dotwe.org/14b42dde6583ab222bd2b7ed08f241c8) |

* `callback {Function}`：动画执行完毕之后的回调
