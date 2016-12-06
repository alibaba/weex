# `position` CSS Property <sup>standard name</sup>

## Summary

The rule for positioning an element.

## Details

* values: `relative`, `absolute`, `fixed`, `sticky`
* default value: `relative`
* apply to: all elements except `<indicator>`

## Compares with CSS Standard

* `static` value is not supported.
* The default value is `relative` not `static`.

## Example

```html
<template>
  <div style="height: 10000px;">
    <text style="position: fixed; bottom: 40px;" onclick="scrollToTop">Go to top</text>
  </div>
</template>
```
