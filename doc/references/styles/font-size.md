# `font-size` CSS Property <sup>standard name</sup>

## Summary

The size of the font for an element.

## Details

* type: [length](units/length.md)
* default value:
  * iOS: `32px`
  * Android: platform specify
  * HTML5: `32px`
* apply to: `<text>`, `<input>`

## Compares with CSS Standard

* The effect not apply to all elements, just `<text>` and `<input>`. In another way, it's not inherited.
* The length unit definition is different with CSS Standard. See [more](units/length.md).
* Some standard values like `small`, `large`, `xx-large`, `larger` are not supported.
* The percentage unit is not supported.

## Example

```html
<template>
  <div>
    <text style="font-size: 48px;">Hello World</text>
  </div>
</template>
```
