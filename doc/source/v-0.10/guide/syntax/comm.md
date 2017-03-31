---
title: Communications
type: guide
order: 2.8
version: 0.10
---

# Communicate Between Components

## For Child-Parent Communication

Children component can use `this.$dispatch([String type], [Object detail])` method passing information to parent component. first argument meaning type of message , second argument is the message object. If any parent of the child component register the same type of listener using `$on([String type], [Function callback])` method , the callback will be execute with one argument , the message object will be `detail` property of the the argument.

eg:

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

## For Parent-Child Communication

Parent component can use `this.$vm([String id])` get vm instance of child component. you can access child component information using the vm instance.

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
        var foo = this.$vm('fooEl')
        foo.setTitle('...')
        foo.imageUrl = '...'
      }
    }
  }
</script>
```

## Parent to Children (multi-child) Communication

Parent can using `this.$broadcast([String type], [Object detail])` broadcast message to all of children.

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
    <bar></bar>
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

## Siblings Communication

siblings components can using common parent as bridge for passing information

eg:

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

At last, you can learn how to write [config & data](./config-n-data.html) for a Weex page.
