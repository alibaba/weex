---
title: animation
type: references
order: 3.1
version: 2.1
---

# `animation` 动画

流畅且有意义的动画是一个十分有效的提升移动应用用户体验的手段，`animation` 模块被用于在组件上执行动画。动画可以对组件执行一系列简单的变换 (位置、大小、旋转角度、背景颜色和不透明度)。举个例子，如果有一个 `<image>` 组件，通过动画你可以对其进行移动、旋转、拉伸或收缩等动作。

## API

### `transition(el, options, callback)`

#### 参数

* `el {Element}`：将要执行动画的元素，通常可以通过调用 [`this.$el(id)`](../api.html) 来获取元素的引用。
* `options {Object}`：描述动画过程的对象。
  * `options.duration {number}`：指定动画的持续时间 (单位是毫秒)，默认值是 `0`，表示没有动画效果。
  * `options.delay {number}`：指定请求动画操作到执行动画之间的时间间隔 (单位是毫秒)，默认值是 `0`，表示没有延迟，在请求后立即执行动画。
  * `options.timingFunction {string}`：描述动画执行的速度曲线，用于使动画变化更为平滑。默认值是 `linear`，表示动画从开始到结束都拥有同样的速度。下表列出了所有合法的属性：

| 属性名 | 描述 | 示例 |
| ---- | ---- | ---- |
| `linear` | 动画从头到尾的速度是相同的 |
| `ease-in` | 动画速度由慢到快 |
| `ease-out` | 动画速度由快到慢 |
| `ease-in-out` | 动画先加速到达中间点后减速到达终点 |
| `cubic-bezier(x1, y1, x2, y2)` | 在三次贝塞尔函数中定义变化过程，函数的参数值必须处于 0 到 1 之间。更多关于三次贝塞尔的信息请参阅 [cubic-bezier](http://cubic-bezier.com/) 和 [Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve). |

* `options.styles {Object}`：设置不同样式过渡效果的键值对，下表列出了所有合法的参数：

| 参数名 | 描述 | 值类型 | 默认值 | 示例 |
| ---- | ---- | ---- | ---- |---- |
| width | 动画执行后应用到组件上的宽度值 | length | 无 |
| height | 动画执行后应用到组件上的高度值 | length | 无 |
| backgroundColor | 动画执行后应用到组件上的背景颜色 | string | none |
| opacity | 动画执行后应用到组件上的不透明度值 | 介于 0 到 1 间的数值 | `1` |
| transformOrigin | 定义变化过程的中心点. 参数 `x-aris` 可能的值为 `left`、`center`、`right`、长度值或百分比值, 参数 `y-axis` 可能的值为 `top`、`center`、`bottom`、长度值或百分比值 | `x-axis y-axis` | `center center` |
| transform | 定义应用在元素上的变换类型，支持下表列出的属性 | object | 无 |

`transform`属性的合法值:

| 名称 | 描述 | 值类型 | 默认值 | 示例 |
| ---- | ---- | ---- | ---- | ---- |
| `translate`/`translateX`/`translateY` | 指定元素移动的偏移量 | 像素值或百分比 | 无 |
| `rotate` | 指定元素将被旋转的角度，单位是度 | number | 无 |
| `scale`/`scaleX`/`scaleY` | 按比例放大或缩小元素 | number | 无 |

* `callback {Function}`：动画执行完毕之后的回调

## Example

```html
<template>
  <div class="wrapper">
    <div ref="test" @click="move" class="box"></div>
  </div>
</template>

<script>
  const animation = weex.requireModule('animation')
  const modal = weex.requireModule('modal')

  export default {
    methods: {
      move () {
        var testEl = this.$refs.test;
        animation.transition(testEl, {
          styles: {
            color: '#FF0000',
            transform: 'translate(250px, 100px)',
            transformOrigin: 'center center'
          },
          duration: 800, //ms
          timingFunction: 'ease',
          delay: 0 //ms
        }, function () {
          modal.toast({ message: 'animation finished.' })
        })
      }
    }
  }
</script>

<style scoped>
  .box {
    width: 250px;
    height: 250px;
    background-color: #DDD;
  }
</style>
```

[try it](../../../examples/animation.html)
