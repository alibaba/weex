# Special Element

## &lt;content&gt;

The element serves as content distribution outlest in a composed component template. The element itself will be replaced.

alias: `<slot>`

### Code Example

```html
<we-element name="item">
  <template>
    <container>
      <content></content>
    </container>
  </template>
</we-element>

<template>
  <container>
    <item>
      <text>Content Text</text>
    </item>
  </container>
</template>
```

