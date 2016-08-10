# Display Logic Control
<span class="weex-version">0.4</span>
<a href="https://github.com/weexteam/article/issues/12"  class="weex-translate">cn</a>

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

### A extension of repeat syntax

#### use default `$index` for the index of array.
<span class="weex-version">0.5</span>
 
e.g.

```html
<div repeat="{{list}}">
  <text>No. {{$index + 1}}</text>
<div>
```

#### specify the key and value of array.
<span class="weex-version">0.5</span>

e.g.

```html
<div repeat="{% raw %}{{v in list}}{% endraw %}">
  <text>No. {{$index + 1}}, {{v.nickname}}</text>
</div>
```

```html
<div repeat="{% raw %}{{(k, v) in list}}{% endraw %}">
  <text>No. {{k + 1}}, {{v.nickname}}</text>
</div>
```

#### use `track-by` to specify unique attribute
<span class="weex-version">0.5</span>
 
By default when replacing an array, `repeat` will cause the entire list to be re-rendered. However you can use `track-by` to specify an unique attribute as a hint, so that weex can reuse existing elements as much as possible.

**NOTE: DO NOT USE DATA-BINDING SYNTAX FOR `track-by`**

e.g.
```html
<template>
  <container>
    <container repeat="{{list}}" track-by="nickname" class="{{gender}}">
      <image src="{{avatar}}"></image>
      <text>{{nickname}} - {{group}}</text>
    </container>
  </container>
</template>
```

Later on, when you replace the array including an item of the same nickname, it knows it can reuse the existing scope and DOM elements associated with the same nickname.

## Omitted mustache wrapper

Particularly for the `if` and `repeat` attribute, the [mustache](https://mustache.github.io/) wrapper in values could be omitted: just the same as data-binding syntax.

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

Next is [render logic control](./render-logic.md).
