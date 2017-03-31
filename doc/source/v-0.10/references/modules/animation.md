---
title: animation
type: references
order: 3.1
version: 0.10
---

# animation

Smooth and meaningful animation is very effective for enhancing the user experience of mobile application, you can use the `animation` module to perform animation on components. A animation can perform a series of simple transformations  (position, size, rotation, background color, and opacity) on the component. So, if you have a `image` component, you can move, rotate, grow, or shrink it.

## API
### transition(node, options, callback)

[example](http://dotwe.org/5be74019d5e510fa95c5dedec24f7ce5)

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
|`linear`|Specifies a transition effect with the same speed from start to end|[example](http://dotwe.org/d71491ded2bede32df3e8b44b53d5e4f)|
|`ease-in`|Specifies a transition effect with a slow start|[example](http://dotwe.org/23b104f833039f263957481f2e2c40c9)|
|`ease-out`|Specifies a transition effect with a slow end|[example](http://dotwe.org/04dab95e073a2c3a808e6b01fc20e996)|
|`ease-in-out`|Specifies a transition effect with a slow start and end|[example](http://dotwe.org/fc37ec17d215e786ce336a00457489e3)|
|`cubic-bezier(x1, y1, x2, y2)`|Define your own values in the cubic-bezier function. Possible values are parameter values from 0 to 1. More information about cubic-bezier please visit [cubic-bezier](http://cubic-bezier.com/) and [Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve).|[example](http://dotwe.org/95d8f15d0014c31d3a1d15728313f2a5)|    

- `styles` (object): Specify the names and values of styles to which a transition effect should be applied. The allowed attributes are listed in the following table:        

| name | description | value type | default value |example|
| :--- | :--- | :--- | :--- |:---|
|width|The width applied to the component after the animation finished.|length|none|[example](http://dotwe.org/b599d273f996cfdcbeca7bd5c828ca90)|    
|height|The height applied to the component after the animation finished.|length|none|[example](http://dotwe.org/d0b1ccadf386ba00960d0c8340c682e5)|    
|backgroundColor|The background color applied to the component after the animation finished.|string|none|[example](http://dotwe.org/f4616ee18f6042b63a8fdcd2816b1712)|
|opacity|The opacity applied to the component after the animation finished.|number between 0 to 1|`1`|[example](http://dotwe.org/f94394173301db83ae6e66d1330a0d0b)|
|transformOrigin|The povit of transition. The possible values for `x-aris` are `left`/`center`/`right`/length or percent, and possible values of `y-axis` are `top`/`center`/`bottom`/ length or percent|`x-axis y-axis`|`center center`|[example](http://dotwe.org/de43f5a47de230dd531797458bf7fd3c)|
|transform|Transform function to be applied to the element. The properties in the following table are supported|object|none|[example](http://dotwe.org/cfc0388441f5a53a73335885006c13e7)|

properties of `transform`:    

| name | description | value type | default value |example|
| :--- | :--- | :--- | :--- |:---|
|translate/translateX/translateY|Specifies the location of which the element will be translated.|pixel or percent|none|[example](http://dotwe.org/6638e66e296723bbef3e59c83b2b5003)|
|rotate|Specifies the angle of which the element will be rotated, the unit is degree.|number|none|[example](http://dotwe.org/ba9e9920594d9388744b2bd0d1b7695d)|
|scale/scaleX/scaleY|Stretch or shrink the element.|number|none|[example](http://dotwe.org/14b42dde6583ab222bd2b7ed08f241c8)|    

#### callback    
**type:** function

**position:** Callback which is called after the completion of transition.