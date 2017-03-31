---
title: Special Element
type: references
order: 1.10
version: 0.10
---

# Special Element

## Content

The element serves as content distribution outlet in a composed component template. The element itself will be replaced.

alias: 'slot'.

## Example

As shown in the example, 'content' replaced by 'text'.

```html
<we-element name="item">
  <template>
    <div>
      <content></content>
    </div>
  </template>
</we-element>

<template>
  <div>
    <item>
      <text>Content Text</text>
    </item>
  </div>
</template>
```
