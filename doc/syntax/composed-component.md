# Composed Component
<span class="weex-version">0.4</span>

if some part of weex file is repeated often , you could create a composed component represent these part.

you can use `<we-element>` tag to create composed component, the value of `name` attribute is the component name.

```html
<we-element name="foo">
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
</we-element>
```

Content of `<we-element>` tag is the same as normal weex file, consists of `<template>`, `<style>` and `<script>` .

Once composed component been defined, you can use it like following.

```html
<we-element name="foo">
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
</we-element>

<template>
  <foo title="..." image="..."></foo>
</template>
```

## Nesting Component

Composed component supports nesting. For easy access nesting component, you should name nesting component with "parent name and hyphen" prefix.

for example: 

```html
<we-element name="foo">
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
</we-element>

<we-element name="foo-list">
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
</we-element>

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


## Notes

- Every composed component have an independent `<style>` work scope.
- If child component have `id` attribute, you can access the context of the child component by `this.$vm(id)`. See more about [find an element](./id.md).
- Please refer to [communicate between components](./comm.md) for more communication issues.

Next is how to [find an element](./id.md).
