# animation
<span class="weex-version">0.4</span>

## Summary

A series of animation api.

## API

### transition(node, options, callback)

#### Arguments

* `node`*(Node)*: An element that will be animated.
* `options`*(object)*: Transition options. 
  * `styles`*(object)*: Specify the names and values of styles to which a transition effect should be applied.
    * `width`*(length)*: the the width of the view when the animation finished.
    * `height`*(length)*: the the height  of the view when the animation finished.
    * `color`*(string)*: the color of the element when the animation finished.
    * `transform`*(object)*: transform function to be applied to the element. Following value is supported.
      * `translate/translateX/translateY`*(string)*: translate the element to the new location. The value can be a pixel or percent
      * `rotate`*(string)*: the unit is degree.
      * `scale`*(string)*: scale up or scale down the element.
  * `duration`*(number)*: Specify the number of milliseconds a transition animation should take to complete. By default, the value is 0ms, meaning that no animation will occur.
  * `timingFuncion`*(string)*: Used to describe how the intermediate values of the styles being affected by a transition effect are calculated. By default, the value is `linear`, and can also be one of `ease-in`, `ease-out`, `ease-in-out`, `linear` or `cubic-bezier(x1, y1, x2, y2)`.
      * if`cubic-bezier(x1, y1, x2, y2)` is set, equation of  0<=x1<=x2<=1 must be met. 
  * `delay`*(number)*: Specify the amount of milliseconds to wait between a change being requested to a property that is to be transitioned and the start of the transition effect. By default, the value is 0ms.
* **callback** Callback which is called after the completion of transition.

#### Note

Animations listed in transform is much faster than other animaions, as they are GPU accelerated. Developers should make their own choice according to their situation.

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
          transform: 'translate(1, 1)',
          transformOrigin: 'center center'
        },
        duration: 0, //ms
        timingFunction: 'ease',
        delay: 0 //ms
      }, function () {
        nativeLog('animation finished.')
      })
    }
  }
</script>
```

