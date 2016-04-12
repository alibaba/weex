# Display Logic Control

There are two attributes for display logic control: `if` and `repeat`. We can create Weex page structure and effects more flexible with them.

## `if`

`if` attribute can control the display of a component by a truthy/falsy value. If the value is truthy, then the component will generated, otherwise it will be removed.

```html
<template>
  <container>
    <text onclick="toggle">Toggle</text>
    <image src="..." if="{{shown}}"></image>
  </container>
</template>

<script>
  module.exports = {
    data: {
      shown: true
    },
    methods: {
      toggle: function () {
        this.shown = !this.shown
      }
    }
  }
</script>
```

## `repeat`

`repeat` statement is just for array rendering. Every item in an array is also a structed data. This means in `repeat`ed component, you can bind their item properties directly.

```html
<template>
  <container>
    <container repeat="{{list}}" class="{{gender}}">
      <image src="{{avatar}}"></image>
      <text>{{nickname}}</text>
    </container>
  </container>
</template>

<style>
  .male {...}
  .female {...}
</style>

<script>
  module.exports = {
    data: {
      list: [
        {gender: 'male', nickname: 'Li Lei', avatar: '...'},
        {gender: 'female', nickname: 'Han Meimei', avatar: '...'},
        ...
      ]
    }
  }
</script>
```

The origin data properties which not belongs to the array will also be bound:

```html
<template>
  <container>
    <container repeat="{{list}}" class="{{gender}}">
      <image src="{{avatar}}"></image>
      <text>{{nickname}} - {{group}}</text>
    </container>
  </container>
</template>

<style>
  .male {...}
  .female {...}
</style>

<script>
  module.exports = {
    data: {
      group: '...',
      list: [
        {gender: 'male', nickname: 'Li Lei', avatar: '...'},
        {gender: 'female', nickname: 'Han Meimei', avatar: '...'},
        ...
      ]
    }
  }
</script>
```

## Omitted mustach wrapper

Particularly for the `if` and `repeat` attribute, the mustache wrapper in values could be omitted: just the same as data-binding syntax.

```html
<template>
  <container>
    <text if="shown">Hello</text>
    <text if="{{shown}}">Hello</text>
  </container>
</template>

<script>
  module.exports = {
    data: function () {return {shown: true}}
  }
</script>
```

The two `<text>` components are both displayed.

Next is [render logic control](/syntax/render-logic.md).
