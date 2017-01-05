# `font-weight` CSS Property <sup>standard name</sup>

## Summary

The weight of the font for an element.

## Details

* values: `normal`, `bold`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`
* normal is equal to 400, bold equel to 700
* default value: `normal`
* apply to: `<text>`, `<input>`
* ios support showing 9 kind of font-weight. 
* android support showing 2 kind of font-weight:400,700, other value will map to 400 or 700
  - normal(400)<- (100,200,300,400,500)
  - bold(700)<- (600,700,800,900)

## Compares with CSS Standard

* Some standard values like `lighter`, `bolder`, number unit are not supported.
* The effect not apply to all elements, just `<text>` and `<input>`. In another way, it's not inherited.

## Example

```html
<template>
  <div>
    <text style="font-size:100px; font-weight: normal">Hello World.</text>
    <text style="font-size:100px; font-weight: 100">Hello World.</text>
    <text style="font-size:100px; font-weight: 200">Hello World.</text>
    <text style="font-size:100px; font-weight: 300">Hello World.</text>
    <text style="font-size:100px; font-weight: 400">Hello World.</text>
    <text style="font-size:100px; font-weight: 500">Hello World.</text>
    <text style="font-size:100px; font-weight: 600">Hello World.</text>
    <text style="font-size:100px; font-weight: 700">Hello World.</text>
    <text style="font-size:100px; font-weight: 800">Hello World.</text>
    <text style="font-size:100px; font-weight: 900">Hello World.</text>
    <text style="font-size:100px; font-weight: bold">Hello World.</text>
  </div>
</template>
```
