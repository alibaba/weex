# `lines` CSS Property

## Summary

**non-standard**

Determines the max lines the text will be wrapped to.

Additionally, this CSS property could work together with [`text-overflow`](text-overflow.md).

## Details

* values: [number](units/number.md)
* default value: `0` (means no maximum lines limitation)
* apply to: `<text>`

## Example

```html
<template>
  <div>
    <text style="
      lines: 3;
    ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non ex id odio feugiat ullamcorper. Fusce posuere nisi vitae eros pretium aliquam. Proin molestie nisl eros, nec commodo ex congue porttitor. Sed ut semper risus, nec mattis neque. Sed ullamcorper nunc eget suscipit tincidunt. Donec a lorem vitae quam aliquet blandit. Suspendisse dictum, nunc in faucibus tincidunt, risus ligula aliquam dui, sed efficitur nisl nibh non ante. Quisque purus felis, maximus convallis condimentum eget, dapibus id elit. Nulla vitae eros orci. Vestibulum sed erat vitae felis dignissim feugiat. In at urna fringilla, semper nisi quis, ornare ligula. Sed consequat bibendum ante, non tincidunt urna consectetur sed. Nam at fermentum nulla. In massa erat, ultricies at consequat quis, cursus pharetra ante. Nulla dolor nisi, hendrerit sit amet ipsum at, tempus efficitur est. Vestibulum eget sem commodo, vehicula eros vitae, malesuada metus.</text>
  </div>
</template>
```
