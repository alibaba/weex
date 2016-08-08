# `text-overflow` CSS Property <sup>standard name</sup>

## Summary

Determines how overflowed content that is not displayed.

**Note:** It must use with [`lines`](lines.md) style together.

## Details

* values: `clip`, `ellipsis`
* default value: `clip`
* apply to: `<text>`

## Compares with CSS Standard

* The effect not apply to all elements, just `<text>`. In another way, it's not inherited.
* The string unit is not supported.

## Example

```html
<template>
  <div>
    <text style="
      width: 200;
      lines: 1;
      text-overflow: ellipsis;
    ">Hello World World World World World</text>
  </div>
</template>
```
