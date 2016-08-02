# `font-family` CSS Property <sup>standard name</sup>

## Summary

Specify a font family name for a certain element.

## Details

* values: `<family-name>` or `<generic-name>` (`serif`, `sans-serif`, `monospace`, `cursive`, `fantasy`)
* default value: system font
* apply to: `<text>`, `<input>`

see more about [generic-name](https://drafts.csswg.org/css-fonts-3/#generic-font-families)

## Compares with CSS Standard

* The effect not apply to all elements, just `<text>` and `<input>`. In another way, it's not inherited.

## Example

```html
<template>
  <div>
    <text style="text-family: monospace;">Hello World</text>
  </div>
</template>
```
