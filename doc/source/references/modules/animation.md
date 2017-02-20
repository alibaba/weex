---
title: animation
type: references
order: 3.1
version: 2.1
---

# animation

Smooth and meaningful animation is very effective for enhancing the user experience of mobile application, you can use the `animation` module to perform animation on components. A animation can perform a series of simple transformations  (position, size, rotation, background color, and opacity) on the component. So, if you have a `image` component, you can move, rotate, grow, or shrink it.

## API
### transition(node, options, callback)

#### Arguments
##### node    

**type:** node

**position:** An element that will be animated, normally you can get this by calling `this.$el(id)`.   

##### options    

**type:** object   

**position:** Transition options.    
- `duration` (number): Specifies the number of milliseconds of animation execution, the default value is `0`, means that no animation will occur.    
- `delay` (number): Specifies the amount of milliseconds to wait between a change being requested to a property that is to be transitioned and the start of the transition effect. The default value is `0`.   
- `timingFunction` (string): Used to describe how the intermediate values of the styles being affected by a transition effect are calculated, default value is `linear`, the allowed attributes are listed in the following table:    

|name|description|example|
|:--|:--|:--|
|`linear`|Specifies a transition effect with the same speed from start to end|
|`ease-in`|Specifies a transition effect with a slow start|
|`ease-out`|Specifies a transition effect with a slow end|
|`ease-in-out`|Specifies a transition effect with a slow start and end|
|`cubic-bezier(x1, y1, x2, y2)`|Define your own values in the cubic-bezier function. Possible values are parameter values from 0 to 1. More information about cubic-bezier please visit [cubic-bezier](http://cubic-bezier.com/) and [Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve).|  

- `styles` (object): Specify the names and values of styles to which a transition effect should be applied. The allowed attributes are listed in the following table:        

| name | description | value type | default value |example|
| :--- | :--- | :--- | :--- |:---|
|width|The width applied to the component after the animation finished.|length|none| 
|height|The height applied to the component after the animation finished.|length|none|
|backgroundColor|The background color applied to the component after the animation finished.|string|none|
|opacity|The opacity applied to the component after the animation finished.|number between 0 to 1|`1`|
|transformOrigin|The povit of transition. The possible values for `x-aris` are `left`/`center`/`right`/length or percent, and possible values of `y-axis` are `top`/`center`/`bottom`/ length or percent|`x-axis y-axis`|`center center`|
|transform|Transform function to be applied to the element. The properties in the following table are supported|object|none|

properties of `transform`:    

| name | description | value type | default value |
| :--- | :--- | :--- | :--- |
|translate/translateX/translateY|Specifies the location of which the element will be translated.|pixel or percent|none|
|rotate|Specifies the angle of which the element will be rotated, the unit is degree.|number|none|
|scale/scaleX/scaleY|Stretch or shrink the element.|number|none|  

#### callback    
**type:** function

**position:** Callback which is called after the completion of transition.

### Example

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

[try it](../../examples/animation.html)