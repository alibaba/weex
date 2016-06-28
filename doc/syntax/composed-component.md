# Composed Component
<span class="weex-version">0.4</span>
<a href="https://github.com/weexteam/article/issues/2"  class="weex-translate">cn</a>

If some part of weex file is reused often, you could create a composed component represent these part.

You can create a file named `foo.we` to define a composed component, the component name is just `<foo>`.

```html
<!-- foo.we -->
<template>
  <container style="flex-direction: row;">
    <image src="{{image}}" style="width:100;height:100;"></image>
    <text>{{title}}</text>
  </container>
</template>
<script>
  module.exports = {
    data: {
      title: null,
      image: null
    }
  }
</script>
```

The content of `foo.we` also consists of `<template>`, `<style>` and `<script>`.

Once composed component been defined, you can use `<foo>` in a file which is in the same folder with `foo.we`.

```html
<template>
  <foo title="..." image="..."></foo>
</template>
```

## Nesting Components

Composed component supports nesting. For example:

```html
<!-- somepath/foo.we -->
<template>
  <container style="flex-direction: row;">
    <image src="{{image}}"></image>
    <text>{{title}}</text>
  </container>
</template>
<script>
  module.exports = {
    data: {
      title: null,
      image: null
    }
  }
</script>
```

```html
<!-- somepath/foo-list.we -->
<template>
  <container>
    <text>{{description}}</text>
    <foo repeat="{{list}}" title="{{text}}" image="{{img}}"></foo>
  </container>
</template>
<script>
  module.exports = {
    data: {
      description: '',
      list: []
    }
  }
</script>
```

```html
<!-- somepath/main.we -->
<template>
  <foo-list list="{{list}}"></foo-list>
</template>
<script>
  module.exports = {
    data: {
      list: [
        {text: '...', img: '...'},
        {text: '...', img: '...'},
        {text: '...', img: '...'},
        ...
      ]
    }
  }
</script>
```

The `main.we` uses `<foo-list>` from `foo-list.we`. And `<foo-list>` uses `<foo>` from `foo.we`.

## Notes

- Every composed component have an independent `<style>` work scope.
- If child component have `id` attribute, you can access the context of the child component by `this.$vm(id)` and find an element by `this.$el(id)`. See more about [find an element](./id.md).
- Please refer to [communicate between components](./comm.md) for more communication issues.

Next is how to [find an element](./id.md).
