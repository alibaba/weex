# List

One column multi-item fixed height container . If overall height of items  higher then  height of  list container , these items is scrollable and optimized for high performance .

## Item
 `<cell>`, `<header>`, `<footer>`  is  available item of list . `<header>` must be first one  and `<footer>` must be last. you can only use `<cell>` in list.

## Style

- [common style](/references/common-style.md)
- flexbox an other box model style
- position
- opacity / background-color

### Notes
height of list must be determined ( list style must contain  `height`  or  pair of `top` `bottom`  or flex value if outter container `flex-direction` value is  `column` )

## Event
list support `click` / `appear` / `disappear` ,please refer to  [Common Events](/references/common-event.md)

## Code Example

```html
<template>
  <list>
    <header class="header">
      <text>...</text>
    </header>

    <cell repeat="{{list}}">
      <text>{{name}}: ${{price}}</text>
    </cell>

    <footer class="footer">
      <image src="..."></image>
    </footer>
  </list>
</template>

<script>
  module.exports = {
    data: {
      list: [
        {name: '...', price: 100},
        {name: '...', price: 500},
        {name: '...', price: 1.5},
        ...
      ]
    }
  }
</script>
```
