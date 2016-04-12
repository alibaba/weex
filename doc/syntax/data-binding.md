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

## Binding method call or expression

An JavaScript function call or expression can also get bound, e.g.

```
<template>
  <container style="flex-direction: column;">
    <text style="font-size: {{size}};">{{getFullName()}}</text>
  </container>
</template>

<script>
  module.exports = {
    data: {
      size: 48,
      firstName: 'John',
      lastName: 'Smith'
    },
    methods: {
      getFullName: function () {
        // 'John SMITH'
        return this.firstName + ' ' + this.lastName.toUpperCase()
      }
    }
  }
</script>
```

Here the return value of `getFullName()` is bound to the `<text>` content.

Now we add a event, so that we can see how data change reflects to view change:

```
<template>
  <container>
    <text onclick="changeName">Click to Change!</text>
    <text style="font-size: {{size}}">{{getFullName()}}</text>
  </container>
</template>

<script>
  module.exports = {
    data: {
      size: 20,
      firstName: 'John',
      lastName: 'Smith'
    },
    methods: {
      getFullName: function () {
        // 'John SMITH'
        return this.firstName + ' ' + this.lastName.toUpperCase()
      },
      changeName: function () {
        this.firstName = 'Mike'
      }
    }
  }
</script>
```

In this case, after we click the "Click to Change!" button, the `changeName()` method will be called, and the `firstName` field will change.Then the return value of `changeName()` get changed, Which results to the change of name displayed in the view.

Once we have data-binding, the data changes will automatically trigger view changes. No more code needed :)

Note: `data` and `methods` can't have duplicate fields, cause in the execution context -- `this`, we can access both of them.

* [See more usage of `this` in vm APIs](/references/api.md)

### Usage of some special attributes in Data-Binding

#### Styles: `style` or `class`

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

* [See more about style and class](/syntax/style-n-class.md)

#### Event Handler: `on...`

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

#### `if` & `repeat`

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

* [See more about display logic control](/syntax/display-logic.md)

Next, let's have a look at [style and class](/syntax/style-n-class.md).

