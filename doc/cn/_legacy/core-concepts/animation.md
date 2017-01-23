# Animation

Weex provides the way of calling `$transition(...args)` api to perform a custom animation of a set of CSS properties.

## How to use

Example:

```
this.$transition('foo', {
    styles: {
        color: '#FF0000',
        transform: 'translate(100, 50)'
    },
    duration: 100, //ms
    timingFunction: 'ease',
    delay: 0 //ms
}, function() {
    // when the animation is end.
})
```

According to above code, it performs a animation with the styles of color and transform in 100ms.

## The API

First, provide the id of the node. Second, provide some properties of `styles`, `duration`, `timingFunction` and `delay`. At last, provide a callback function.

- The `styles` property - An object of CSS properties and values that the animation will move toward.
- The `duration` property - A number determining how long the animation will run.
- The `timingFunction` property - A string indicating which easing function to use for the transition.
- The `delay` property - A number determining how long the animation will delay.

For more information, please visite [APIs](api.md).