# animation
<span class="weex-version">0.4</span>
<a href="https://github.com/weexteam/article/wiki/%E6%AC%A2%E8%BF%8E%E5%8F%82%E4%B8%8EWeex%E4%B8%AD%E6%96%87%E6%96%87%E6%A1%A3%E7%BF%BB%E8%AF%91"  class="weex-translate incomplete">cn</a>

## Summary

A series of animation api.

## API

### transition(node, options, callback)

#### Arguments

* `node`*(Node)*: An element that will be animated.
* `options`*(object)*: Transition options. 
  * `styles`*(object)*: Specify the names and values of styles to which a transition effect should be applied.
    * `color`*(string)*: the color of the element when the animaiton finished.
    * `transform`*(object)*: transform fuction to be applied to the element. Following value is supported.
      * `translate/translateX/translateY`*(string)*: translate the element to the new location. The value can be a pixel or percent
      * `rotate`*(string)*: the unit is degree.
      * `scale`*(string)*: scale up or scale down the element.
  * `duration`*(number)*: Specify the number of milliseconds a transition animation should take to complete. By default, the value is 0ms, meaning that no animation will occur.
  * `timingFuncion`*(string)*: Used to describe how the intermediate values of the styles being affected by a transition effect are calculated. By default, the value is `linear`, and can also be one of `ease-in`, `ease-out`, `ease-in-out`, `linear` or `cubic-bezier(x1, y1, x2, y2)`.
  * `delay`*(number)*: Specify the amount of milliseconds to wait between a change being requested to a property that is to be transitioned and the start of the transition effect. By default, the value is 0ms.
  * `transform-origin`*(string)*: The center of scale and rotation. The value can be number of pixel in `x, y` format or keyword like `left`, `right`, `bottom`, `top`, `center`.
* **callback** Callback which is called after the completion of transition.

#### Example

```html
<template>
  <div class="ct">
    <div id="test"></div>
  </div>
</template>

<script>
  module.exports = {
    ready: function () {
      var animation = require('@weex-module/animation');
      var testEl = this.$el('test');
      animation.transition(testEl, {
        styles: {
          color: '#FF0000',
          transform: 'translate(1, 1)'
        },
        duration: 0, //ms
        timingFunction: 'ease',
        transform-origin: 'center center',
        delay: 0 //ms
      }, function () {
        nativeLog('animation finished.')
      })
    }
  }
</script>
```

