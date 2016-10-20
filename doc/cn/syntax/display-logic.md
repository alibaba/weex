# 显示逻辑控制器
<span class="weex-version">0.4</span>

Weex前端语义支持通过两种特殊属性（`if`和`repeat`）的设置来确定组件的显示状态，这会使得整个页面布局显得更加灵活。

 > **Notes:** The display logic could't apply on the root element within `<template>`, please don't use `if` or `repeat` directive on it.

## `if`

通过设置`if`属性值，可以控制当前组件节点的显示状态。如果设为true，则会将当前节点置于DOM中渲染，反之则会从DOM中移除。

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

`repeat`属性用于控制具有相同样式或属性的组件节点做重复渲染。它绑定的数据类型必须为数组，其中每个数组项的属性会分别绑定到需要重复渲染的各子组件上。

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

此外，weex同样支持不在repeat数组中的数据绑定到重复渲染的组件节点上。

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

### `repeat`属性扩展


#### 使用 `$index` 获取当前节点所绑定的数据在`repeat`数组中的索引值.
<span class="weex-version">0.5</span>

例如：

```html
<div repeat="{{list}}">
  <text>No. {{$index + 1}}</text>
<div>
```

#### 获取`repeat`数组的属性值.
<span class="weex-version">0.5</span>

例如：

```html
<div repeat="{{v in list}}">
  <text>No. {{$index + 1}}, {{v.nickname}}</text>
</div>
```

```html
<div repeat="{{(k, v) in list}}">
  <text>No. {{k + 1}}, {{v.nickname}}</text>
</div>
```

#### 使用`track-by` 追踪特殊的属性
<span class="weex-version">0.5</span>

通常情况下，当更新`repeat`数组时，所有数组元素关联的组件节点都会被重新渲染。如果其中部分节点的数据在更新前后未发生变更，那么最好是让这些节点保持原样，仅更新数据有变化的节点，weex提供了`track-by`属性能帮您轻松搞定。

**注意: `track-by`属性的设置不支持数据绑定的方式**

例如：

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

如前所述，当更新repeat数组时，如果检测到属性nickname的值前后一致，那么它所绑定的子节点将不被重新渲染。

## 简化写法

对于if和repeat的使用，可以简化处理，即`if="show"`和`if="{{show}}"`所表达的前端语义相同。更多[mustache](https://mustache.github.io/)

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

很显然，这两个text文本会被同时显示出来。

下一篇： [渲染逻辑控制器](./render-logic.md).
