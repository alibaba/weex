# `line-height` CSS Property <sup>standard name</sup>

## Summary

Specifies the minimum height of a text line.

## Details

* type: [length](units/length.md)
* default value: depends on system default line height
* apply to: `<text>`

## Compares with CSS Standard

* The effect not apply to all elements, just `<text>`. In another way, it's not inherited.
* The length unit definition is different with CSS Standard. See [more](units/length.md).
* The number unit (`1.5`), percentage unit (`150%`) and `normal` value are not supported.

## Example

```html
<template>
  <div>
    <text style="font-size: 48px;">Hello World</text>
  </div>
</template>
```
