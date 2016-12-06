# `text-decoration` CSS Property <sup>standard name</sup>

## Summary

Draw text decoration (underline, line-through) for an element.

## Details

* values: `none`, `underline`, `line-through`
* default value: `none`
* apply to: `<text>`, `<input>`

## Compares with CSS Standard

* Some standard values like `overline` are not supported.
* The effect not apply to all elements, just `<text>` and `<input>`. In another way, it's not inherited.

## Example

```html
<template>
  <div>
    <text style="text-decoration: underline;">Hello World</text>
  </div>
</template>
```
