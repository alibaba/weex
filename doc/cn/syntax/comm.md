# 组件之间通信
<span class="weex-version">0.4</span>

## 子-父 通信

子组件可以使用`this.$dispatch([String type], [Object detail])` 方法传递消息给父组件。
第一个参数定义消息类型，第二个参数为消息对象。如果父组件中的任何子组件使用`$on([String type], [Function callback])`注册监听事件，则回调执行第一个参数，参数中的 `detail`属性是消息数据。

例如：

```html
<we-element name="foo">
  <template>
    <div>
      <image src="{{imageUrl}}" onclick="test"></image>
      <text>{{title}}</text>
    </div>
  </template>
  <script>
    module.exports = {
      data: {
        title: '',
        imageUrl: ''
      },
      methods: {
        test: function () {
          this.$dispatch('notify', {a: 1})
        }
      }
    }
  </script>
</we-element>

<template>
  <foo title="..." image-url="..."></foo>
</template>

<script>
  module.exports = {
    created: function () {
      this.$on('notify', function(e) {
        //  when <foo> image tag  be clicked ,the function will be executing.
        // e.detail is  `{a: 1}`
      })
    }
  }
</script>
```

## 父 - 子 通信

父组件可以使用 `this.$([String id])` 来获取子组件的上下文。你可以使用上下文对象访问子组件的信息。

```html
<we-element name="foo">
  <template>
    <div>
      <image src="{{imageUrl}}"></image>
      <text>{{title}}</text>
    </div>
  </template>
  <script>
    module.exports = {
      data: {
        title: '',
        imageUrl: ''
      },
      methods: {
        setTitle: function (t) {
          this.title = t
        }
      }
    }
  </script>
</we-element>

<template>
  <div>
    <text onclick="test">click to update foo</text>
    <foo id="fooEl" title="..." image-url="..."></foo>
  </div>
</template>

<script>
  module.exports = {
    methods: {
      test: function (e) {
        var foo = this.$('fooEl')
        foo.setTitle('...')
        foo.imageUrl = '...'
      }
    }
  }
</script>
```

## 父 - 子（多子）通信

父组件可以使用`this.$broadcast([String type], [Object detail])` 广播消息给所有子组件。

eg:

```html
<we-element name="bar">
  <template>
    <div>
      <image src="{{imageUrl}}"></image>
    </div>
  </template>
  <script>
    module.exports = {
      data: {
        imageUrl: ''
      },
      created: function() {
        var self = this
        this.$on('changeImage', function(e) {
          self.imageUrl = e.detail.imageUrl
        })
      }
    }
  </script>
</we-element>

<we-element name="foo">
  <template>
    <div>
      <bar></bar>
      <text>{{title}}</text>
    </div>
  </template>
  <script>
    module.exports = {
      data: {
        title: ''
      },
      created: function() {
        var self = this
        this.$on('changeTitle', function(e) {
          self.title = e.detail.title
        })
      }
    }
  </script>
</we-element>

<template>
  <div>
    <text onclick="test">click to update foo</text>
    <foo></foo>
    <foo></foo>
  </div>
</template>

<script>
  module.exports = {
    methods: {
      test: function (e) {
        this.$broadcast('changeTitle', {
          title: '...'
        })
        this.$broadcast('changeImage', {
          imageUrl: '...'
        })
      }
    }
  }
</script>
```

## 兄弟间通信

兄弟组件间通过公共的父组件作为桥梁来传递消息。

例如：

```html
<we-element name="foo">
  <template>...</template>
  <script>
    module.exports = {
      methods: {
        callbar: function () {
          this.$dispatch('callbar', {a: 1})
        }
      }
    }
  </script>
</we-element>

<we-element name="bar">
  <template>...</template>
  <script>
    module.exports = {
      created: function() {
        this.$on('callbar', function(e) {
          // e.detail.a
        })
      }
    }
  </script>
</we-element>

<template>
  <div>
    <foo></foo>
    <bar></bar>
  </div>
</template>

<script>
  module.exports = {
    created: function () {
      var self = this
      this.$on('callbar', function(e) {
        self.$broadcast('callbar', e.detail)
      })
    }
  }
</script>
```

最后，你将学习怎么给Weex页面写 [配置 & 数据](./config-n-data.md)。
