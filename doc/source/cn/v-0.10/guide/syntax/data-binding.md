---
title: 数据绑定
type: guide
order: 3.1
version: 0.10
---

# 数据绑定

Weex使用 _mustache_ 的语法 (`{% raw %}{{...}}{% endraw %}`) 来对 `<template>` 中的模板和 `<script>` 里的数据进行绑定. 一旦数据额模板绑定了, 数据上的修改会实时的在模板内容中生效。

## 数据绑定路径

```html
<template>
  <div>
    <text style="font-size: {{size}}">{{title}}</text>
  </div>
</template>

<script>
  module.exports = {
    data: {
      size: 48,
      title: 'Alibaba Weex Team'
    }
  }
</script>
```

[体验一下](http://dotwe.org/6d18c0e696d33705083e34ef387ac529)

上面的代码会把 `title` 和 `size` 的数值绑定到模板内容上。

我们也可以通过 `.` 符号来绑定数据结构中的字段。看一下下面的代码片段：

```html
<template>
  <div>
    <text style="font-size: {{title.size}}">{{title.value}}</text>
  </div>
</template>

<script>
  module.exports = {
    data: {
      title: {
        size: 48,
        value: 'Alibaba Weex Team'
      }
    }
  }
</script>
```

[体验一下](http://dotwe.org/e291bbe2d5c34fe04db92bc827697a4b)

## 数据绑定表达式

进行数据绑定时，Weex 支持一些简单的 JavaScript 表达式，例如：

```html
<template>
  <div style="flex-direction: row;">
    <text>{{firstName + ' ' + lastName}}</text>
  </div>
</template>

<script>
  module.exports = {
    data: {
      firstName: 'John',
      lastName: 'Smith'
    }
  }
</script>
```

[体验一下](http://dotwe.org/aeef6c2ca9bd9b7c5d039ed84572e1ee)

这些表达式会在当前的上下文中进行运算。

## 计算属性 <sup>v0.5+</sup>

数据绑定表达式已经非常方便了，但如果希望在模板里实现更复杂的逻辑判断，你也可以使用计算属性。例如：

```html
<template>
  <div style="flex-direction: row;">
    <text>{{fullName}}</text>
    <text onclick="changeName" style="margin-left: 10;">CHANGE NAME</text>
  </div>
</template>

<script>
  module.exports = {
    data: {
      firstName: 'John',
      lastName: 'Smith'
    },
    computed: {
      fullName: function() {
        return this.firstName + ' ' + this.lastName
      }
    },
    methods: {
      changeName: function() {
        this.firstName = 'Terry'
      }
    }
  }
</script>
```

[体验一下](http://dotwe.org/276e7c42a2d480d669868476e62b326e)

同样能够达到相同的效果。这里我们引入了一个叫做 `fullName` 的计算属性，由 `firstName` 和 `lastName` 计算而成，在数据绑定的时候，如果 `firstName` 或 `lastName` 发生改变，`fullName` 都会自动重新计算并触发改变。

另外计算属性还支持另外一种写法，就是同时定义一个计算属性的 getter 和 setter，这样的话当下面例子中的 `fullName` 被赋值时，`data` 里的 `firstName` 和 `lastName` 会被自动改变：

```html
<template>
  <div style="flex-direction: row;">
    <text>{{fullName}}</text>
    <text onclick="changeName" style="margin-left: 10;">CHANGE NAME</text>
  </div>
</template>

<script>
  module.exports = {
    data: {
      firstName: 'John',
      lastName: 'Smith'
    },
    computed: {
      fullName: {
        get: function() {
          return this.firstName + ' ' + this.lastName
        },

        set: function(v) {
          var s = v.split(' ')
          this.firstName = s[0]
          this.lastName = s[1]
        }
      }
    },
    methods: {
      changeName: function() {
        this.fullName = 'Terry King'
      }
    }
  }
</script>
```

[体验一下](http://dotwe.org/9f33809592391c566c886029c509c167)

**注意事项：`data`、`methods`、`computed` 中的字段是不能相互重复的，因为它们都会通过组件实例的 `this` 访问到。**

## 数据绑定在 `<template>` 中的特殊用法

### 样式: `style` 或 `class`

组件的样式能够通过 `style` 特性进行绑定：

```html
<template>
  <div>
    <text style="font-size: {{size}}; color: {{color}};">Hello World</text>
  </div>
</template>

<script>
  module.exports = {
    data: {
      size: 32,
      color: '#ff0000'
    }
  }
</script>
```

[体验一下](http://dotwe.org/f53674fa7910d266e0a2d8a5c285d2b1)

样式也能够通过 `class` 特性实现样式绑定，多个 class 名通过空格分隔：

```html
<template>
  <div>
    <text class="{{size}}">Hello</text>
    <text class="title {{status}}">World</text>
  </div>
</template>

<style>
  .large { font-size: 64; }
  .small { font-size: 32; }
  .title { font-weight: bold; }
  .success { color: #00ff00; }
  .error { color: #ff0000; }
</style>

<script>
  module.exports = {
    data: {
      size: 'large',
      status: 'success'
    }
  }
</script>
```

[体验一下](http://dotwe.org/4260897c1526a685672dca95af271493)

在上面的代码中如果 `{% raw %}{{size}}{% endraw %}` 和 `{% raw %}{{status}}{% endraw %}` 是空值, 就只有 `class="title"` 会被解析。

延伸阅读：[style 和 class](./style-n-class.html)

### 事件绑定：`on...`

以 `on...` 开头的就是用于绑定事件的特性，特性名中 `on` 之后的部分就是事件的类型，特性的值就是处理该事件的函数名。_函数名外不需要添加 mustache 语法中的大括号_。例如：

```html
<template>
  <div>
    <text onclick="toggle">Toggle: {{result}}</text>
  </div>
</template>

<script>
  module.exports = {
    data: {
      result: true
    },
    methods: {
      toggle: function () {
        this.result = !this.result
      }
    }
  }
</script>
```

[体验一下](http://dotwe.org/2f9f910a60ffc1ed54c797390d6615e1)

除此之外 Weex 还支持更多的事件处理方式。

延伸阅读：[事件处理](./events.html)

### 展示逻辑控制 `if` & `repeat`

`if` 特性能够通过特性值的真假来控制组建是否显示，_且 mustache 大括号可以省略_。例如：

```html
<template>
  <div style="flex-direction: column;">
    <text onclick="toggle">Toggle</text>
    <image if="{{shown}}" src="{{imageUrl}}" class="logo"></image>
  </div>
</template>

<style>
  .logo { width: 512; height: 512; }
</style>

<script>
  module.exports = {
    data: {
      shown: true,
      imageUrl: 'https://gtms02.alicdn.com/tps/i2/TB1QHKjMXXXXXadXVXX20ySQVXX-512-512.png'
    },
    methods: {
      toggle: function () {
        this.shown = !this.shown
      }
    }
  }
</script>
```

[体验一下](http://dotwe.org/3ec9347e4810f503b641849d214d8c15)

`repeat` 特性可以根据一组数组数据重复生成相同或相似的顺序排列的界面。例如：

```html
<template>
  <div>
    <text repeat="(k,v) in list">{{k}} - {{v}}</text>
  </div>
</template>
<script>
  module.exports = {
    data: {
      list: ['a', 'b', 'c']
    }
  }
</script>
```

[体验一下](http://dotwe.org/db40d2341fdbf16d3d806f502189843d)

延伸阅读：[展示逻辑控制](./display-logic.html)

### 静态模板优化 `static` <sup>v0.9.2+</sup>

`static` 特性可以一次性把数据设置到模板相应的位置上，但是今后不会随着数据的变化而更新。这样可以减少无谓的数据绑定，有效控制和优化长列表、纯静态页面在运行时的开销。不过你也要小心使用不要导致原本需要更新的视图没有触发更新。

```html
<template>
  <div static>
    <text>{{ word }}</text>
  </div>
</template>

<script>
  module.exports = {
    ready: function() {
      this.word = 'Data changes' // UI won't be updated
    },
    data: {
      word: 'Hello static'
    }
  }
</script>
```

[体验一下](http://dotwe.org/dbadfd66463a2c03e3e06d391b0ad8ec)

如上所示，添加 `static` 关键字，渲染结果会是“Hello static”字样，相当于渲染一个静态的节点，`ready` 函数中对数据 `word` 的改变不会更新到视图。

下一篇：[style 和 class](./style-n-class.html)
