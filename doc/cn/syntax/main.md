# 语法综述
<span class="weex-version">0.4</span>


*Weex的语法来自[Vue.js](http://vuejs.org/)的启发。*

Weex页面页面由 `<template>`， `<style>` ， `<script>` 组成。

- `<template>`: *必须*, 使用类HTML的语法描述页面结构，内容由多个标签组成，不同的标签代表不同的组件。
- `<style>`: *可选* , 使用类CSS的语法描述页面的具体展现形式。
- `<script>`: *可选*, 使用JavaScript描述页面中的数据和页面的行为，Weex中的数据定义也在`<script>`中进行。

```html
<template>
  <!-- (required) the structure of page -->
</template>

<style>
  /* (optional) stylesheet */
</style>

<script>
  /* (optional) the definition of data, methods and life-circle */
</script>
```

## `<template>`

`<template>` 中的标签组织类似如下代码:

```html
<template>
  <container>
    <image style="width: 200; height: 200;" src="http://gtms02.alicdn.com/tps/i2/TB1QHKjMXXXXXadXVXX20ySQVXX-512-512.png"></image>
    <text>Alibaba Weex Team</text>
  </container>
</template>
```

`container`标签是一个根节点，其下包含描述图片的`image` 标签和描述一段文字的 `text` 标签。

和HTML中类似，不同标签代表的元素/组件有各自的属性,其中一些组件还能有子组件.

根节点: 每个 `template` 标签中的最顶层标签，我们称为根节点。下面是目前我们支持的三种不同的根节点:

- `<container>`: 普通根节点
- `<scroller>`:  滚动器根节点,适用于需要全页滚动的场景
- `<list>`:  列表根节点,适用于其中包含重复的子元素的列表场景

目前Weex仅支持以上三种根节点

* [内置组件列表](../components/main.md).

## `<style>`

你能把Weex中的样式语法理解为CSS的一个子集，两者有一些细微的区别

第一种写法是，你能在标签上，直接通过内联 `style` 属性编写样式. 第二种写法，通过标签中的 `class` 属性与 `<style>`标签中定义的样式建立对应关系，让`style`标签中定义的样式作用于特定标签之上.
以下是例子:

```html
<template>
  <container>
    <text style="font-size: 64;">Alibaba</text>
    <text class="large">Weex Team</text>
  </container>
</template>

<style>
  .large {font-size: 64;}
</style>
```

上面的两个`text`组件都被设置了同样的字体大小，但分别用了两种不同的方式.

* [Weex公共样式](../references/common-style.md)


### 注意!
Weex 遵循 [HTML 属性](https://en.wikipedia.org/wiki/HTML_attribute) 命名规范 , 所以属性命名时请不要使用陀峰格式(CamelCase) , 采用以“-”分割的long-name形式。

## `<script>`

`<script>`中的代码遵循 JavaScript(ES5)语法. 描述页面中的数据和页面的行为。 下面是一个例子:

```html
<template>
  <container>
    <text>The time is {{datetime}}</text>
    <text>{{title}}</text>
    <text>{{getTitle()}}</text>
  </container>
</template>

<script>
  module.exports = {
    data: {
      title: 'Alibaba',
      datetime: null
    },
    methods: {
      getTitle: function () {
        return 'Weex Team'
      }
    },
    created: function() {
      this.datetime = new Date().toLocaleString()
    }
  }
</script>
```

上面 `<script>` 标签中定义了被赋值给 `module.exports`的对象.其作用是让三个`<text>`标签显示当前时间,'Alibaba' 和 'Weex Team'。`<script>`中的`data`存储可以用于在`<template>`标签中进行 [数据绑定](./data-binding.md) 的数据, 当这些数据变更时,被进行了数据绑定的标签也会自动更新. 这些数据在`<script>`中的各个方法内可以通过`this.x`读写.

* [组件定义参考文档](../references/component-defs.md)

下面，让我们来看一下 [数据绑定](./data-binding.md)。
