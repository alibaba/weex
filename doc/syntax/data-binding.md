# Data-Binding

In Weex, we use the *mustache* syntax `{{...}}` to bind data in `<template>` which are defined in `<script>`. Once data and template is bound, the data changes will influence the corresponding template content immediately and automatically.

## Binding data path

```
<template>
  <container>
    <text style="font-size: {{size}}">{{title}}</text>
  </container>
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

The code above will bind the `title` and `size` data field to `template`.

We can also use `.` syntax to bind cascading data structure. Let's look at the following code snippet:

```
<template>
  <container>
    <text style="font-size: {{title.size}}">{{title.value}}</text>
  </container>
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

## In-template expression

Inside data bindings, Weex supports simply javascript expressions, e.g.

```
<template>
  <container style="flex-direction: row;">
    <text>{{firstName + ' ' + lastName}}</text>
  </container>
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

The expression will be evaluated in the data scope of current context.

**NOTE: EACH BINDING CAN ONLY CONTAIN ONE SINGLE EXPRESSION**

## Computed Properties

According to simple operations, in-template expressions are very convenient. But if you want to put more logic into the template, you should use a computed property.

e.g.
```
<template>
  <container style="flex-direction: row;">
    <text>{{fullName}}</text>
    <text onclick="changeName"></text>
  </container>
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

Here we have declared a computed property fullName. The function we provided will be used as the getter function for concating firstName and lastName.

Otherwise when you call `changeName` after click, the setter will be invoked and this.firstName and this.lastName will be updated accordingly.

**NOTE: `data` and `methods` can't have duplicate fields. 'Cause in the execution context -- `this`, we can access both of them.**

## Usage of some special attributes in Data-Binding

### Styles: `style` or `class`

the style of a component can be bind using the `style` attribute:

```
<template>
  <text style="font-size: {{size}}; color: {{color}}; ...">...</text>
</template>
```

while style can also get bound with `class` attribute, multiple classnames can be split by spaces:

```
<template>
  <container>
    <text class="{{size}}"></text>
    <text class="title {{status}}"></text>
  </container>
</template>
```

here if `{{size}}` and `{{status}}` have empty value, then only `class="title"` will be rendered.

* [See more about style and class](./style-n-class.md)

### Event Handler: `on...`

The event handler is an attribute which name has a prefix `on...`. The other part of attribute name is event type and the value is event handler name. We don't need to add mustache around the method name or add parentheses to call it.

```
<template>
  <text onclick="toggle">Toggle</text>
</template>

<script>
  module.exports = {
    methods: {
      toggle: function () {
        // todo
      }
    }
  }
</script>
```

### `if` & `repeat`

`if` attribute can control the display of a component by a truthy/falsy value.

```
<template>
  <container style="flex-direction: column;">
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

We can also use `repeat` attribute to generate a list.

* [See more about display logic control](./display-logic.md)

Next, let's have a look at [style and class](./style-n-class.md).

