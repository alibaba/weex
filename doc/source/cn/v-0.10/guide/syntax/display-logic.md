---
title: 展示逻辑控制
type: guide
order: 3.4
version: 0.10
---

# 展示逻辑控制

Weex 支持通过两种特殊的特性 `if` 和 `repeat` 确定组件的显示逻辑，这会使得整个界面的展示逻辑控制更加简单灵活。

## `if`

通过设置 `if` 特性值，你可以控制当前组件是否显示。如果值为真，则当前组件会被渲染出来，如果值为假则会被移除。例如：

```html
<template>
  <div>
    <text onclick="toggle">Toggle Image</text>
    <image if="shown" src="{{imageUrl}}" style="width: 512; height: 512;"></image>
  </div>
</template>

<script>
module.exports = {
  data: {
    imageUrl: 'https://gtms02.alicdn.com/tps/i2/TB1QHKjMXXXXXadXVXX20ySQVXX-512-512.png',
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

[体验一下](http://dotwe.org/e0999a51fa404f48bbae177f1569cd0e)

_注意事项：`if="condition"` 和 `if="{% raw %}{{condition}}{% endraw %}"` 都是可以的，两者等价使用。_

_注意事项：`if` 不能用在 `<template>` 的根组件上，否则将无法被 Weex 正常的识别和处理。_

###  `if` 不会阻断子元素的数据更新

下面这个例子在数据更新后 `item` 或 `item.image` 不存在的情况下会报错：

```html
<template>
  <div if="{{(item && item.image)}}" style="width: 200; height: 200;">
    <image style="width: 100; height: 100;" src="{{item.image.url}}"></image>
  </div>
</template>
```

原因在于 Weex 本身的机制是数据更新在 DOM 更新之前，因此 `if` 数据更新之后，不支持阻断其子元素的数据更新，即 `if` 数据更新为 `false` 之后，内部的子元素仍然会触发自身的数据更新，找不到对应字段，导致报错，可参考这个 [issue](https://github.com/alibaba/weex/issues/1758)。

因此，有两种解决方案：

- 为 `img` 组件的 `src` 也增加容错方案：

  ```html
  <div if="{{(item && item.image)}}" style="width: 200; height: 200;">
    <image style="width: 100; height: 100;" src="{{item && item.image && item.image.url}}"></image>
  </div>
  ```

- 如果是在 `repeat` 的列表中，还可以使用 `track-by`强制不复用子元素解决。

## `repeat`

`repeat` 特性用于重复渲染一组相同的组件。它绑定的数据类型必须为数组，数组里的每一项数据可以体现在不同的组件特性、样式、事件绑定等。例如：

``` html
<template>
  <div>
    <div repeat="person in list" class="{{person.gender}}">
      <text>{{person.nickname}}</text>
    </div>
  </div>
</template>

<style>
  .male { background-color: #9999ff; }
  .female { background-color: #ff9999; }
</style>

<script>
module.exports = {
  data: {
    list: [
      { gender: 'male', nickname: 'Li Lei' },
      { gender: 'female', nickname: 'Han Meimei' },
      { gender: 'male', nickname: 'Jim Green' }
    ]
  }
}
</script>
```

[体验一下](http://dotwe.org/8c87aac2820531090181c32fca41e913)

此外，`repeat` 特性还支持绑定数组中数据项目的索引值。例如：

``` html
<template>
  <div>
    <div repeat="(index, person) in list" class="{{person.gender}}">
      <text>{{index}} - {{person.nickname}}</text>
    </div>
  </div>
</template>

<style>
  .male { background-color: #9999ff; }
  .female { background-color: #ff9999; }
</style>

<script>
module.exports = {
  data: {
    list: [
      { gender: 'male', nickname: 'Li Lei' },
      { gender: 'female', nickname: 'Han Meimei' },
      { gender: 'male', nickname: 'Jim Green' }
    ]
  }
}
</script>
```

[体验一下](http://dotwe.org/65d348256ab5c54aa996d3ee6b4ea115)

每一个昵称之前都有对应数组项目的索引值。

_注意事项：同样的 `repeat="..."` 和 `repeat="{% raw %}{{...}}{% endraw %}"` 都是可以的，两者等价使用。_

_注意事项：`if` 不能用在 `<template>` 的根组件上，否则将无法被 Weex 正常的识别和处理。_

**注意事项: 当你修改 `repeat` 中的数组时，在写法上会受到一定的限制，具体如下：**

**直接通过“角标”修改数组的某个项目 (如 `this.items[0] = ...`) 是不会触发视图自动更新的。我们在数组的原型上提供了一个额外的方法：`this.items.$set(index, item)` 来完成相同的事情。**

```javascript
// 和 `this.items[0] = ...` 作用相同，但会自动触发视图更新
this.items.$set(0, { childMsg: 'Changed!'})
```

**直接通过修改 `length` 来改变数组长度 (如 `this.items.length = 0`) 也是不会触发视图自动更新的。我们推荐您直接赋值一个新的空数组把旧的替换掉。**

```javascript
// 和 `this.items.length = 0` 作用相同，但会自动触发视图更新
this.items = []
```

### `repeat` 特性中的 `$index` 形参

在 `repeat` 特性值中，如果没有指定索引值的形参，则可以通过绑定形参 `$index` 来展示数组项目的索引值。例如：

``` html
<template>
  <div>
    <div repeat="person in list" class="{{person.gender}}">
      <text>{{$index}} - {{person.nickname}}</text>
    </div>
  </div>
</template>

<style>
  .male { background-color: #9999ff; }
  .female { background-color: #ff9999; }
</style>

<script>
module.exports = {
  data: {
    list: [
      { gender: 'male', nickname: 'Li Lei' },
      { gender: 'female', nickname: 'Han Meimei' },
      { gender: 'male', nickname: 'Jim Green' }
    ]
  }
}
</script>
```

[体验一下](http://dotwe.org/65d348256ab5c54aa996d3ee6b4ea115)

渲染效果和上一个例子应该是相同的。

### 在 `repeat` 中使用 `track-by` 特性追踪变化

通常情况下，当更新 `repeat` 中绑定的数组时，所有数组项目关联的组件都会被重新渲染。如果其中部分索引值对应的数据未发生变更，那么最好是让这些组件在渲染层保持原样，仅更新数据有变化的节点。Weex 提供了 `track-by` 特性来辅助判断哪些数组项目发生了改变。

首先 `track-by` 特性的值必须是在每一条数组项目中都有且值没有重复的一个字段名，用来区分和追踪每一条数据项增删与否或次序变化与否的关键依据。每当数组发生变化之后，新老数组数据会根据 `track-by` 特性值所代表的字段重新匹配，然后再决定渲染层应该新建或删除一个组件？还是移动一个组件？还是讲组件保持原来的位置。默认的 `track-by` 的值就是数组的索引值。例如：

``` html
<template>
  <div>
    <div repeat="person in list" class="{{person.gender}}">
      <text>{{$index}} - {{person.id}} - {{person.nickname}}</text>
    </div>
    <text>----</text>
    <div repeat="person in list" class="{{person.gender}}" track-by="id">
      <text>{{$index}} - {{person.id}} - {{person.nickname}}</text>
    </div>
    <text>----</text>
    <!-- something wrong here: duplicated track-by value -->
    <div repeat="person in list" class="{{person.gender}}" track-by="nickname">
      <text>{{$index}} - {{person.id}} - {{person.nickname}}</text>
    </div>
  </div>
</template>

<style>
  .male { background-color: #9999ff; }
  .female { background-color: #ff9999; }
</style>

<script>
module.exports = {
  data: {
    list: [
      { id: 11, gender: 'male', nickname: 'Li Lei' },
      { id: 22, gender: 'female', nickname: 'Han Meimei' },
      { id: 33, gender: 'male', nickname: 'Jim Green' }
    ]
  },
  ready: function () {
    this.list.unshift({ id: 44, gender: 'female', nickname: 'Han Meimei' })
  }
}
</script>
```

[体验一下](http://dotwe.org/c124bfc21e6d92271356acbea232089b)

这种情况下，第一个列表的更新策略是：

1. 把第一个 `<text>` 赋值为 `Han Meimei`
2. 第二个赋值为 `Li Lei`
3. 第三个赋值为 `Han Meimei`
4. 最后新建一个 `<text>` 并赋值为 `Jin Green`

第二个列表的更新策略是：

1. 在最前面新建一个 `<text>` 并赋值为 `Han Meimei`

第三个列表的更新会遇到问题，因为有两个数组项目的 `nickname` 值都是 `Han Meimei` 所以造成意料之外的渲染结果 (只渲染了三个数组项目)。

下一节：[渲染过程控制](./render-logic.html)
