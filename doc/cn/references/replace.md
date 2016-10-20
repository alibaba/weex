# Replace option

The `replace` option is boolean type. It determined whether this composed component will be replaced with the `<template>` content or just as a normal `<div>` element which include the `<template>` content.

For example:

```
<element name="foo">
  <template>
    <text>Foo</text>
  </template>
  <script>
    module.exports = {
      replace: false // by default
    }
  </script>
</element>

<template>
  <foo></foo>
</template>
```

will rendered as:

```
<div>
  <text>Foo</text>
</div>
```

but:

```
<element name="foo">
  <template>
    <text>Foo</text>
  </template>
  <script>
    module.exports = {
      replace: true
    }
  </script>
</element>

<template>
  <foo></foo>
</template>
```

will rendered as:

```
<text>Foo</text>
```

So you can choose a way you need or like to manage your virtual DOM structure.
