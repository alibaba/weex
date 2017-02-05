# Common Attribute
<span class="weex-version">0.4</span>

All of weex tags share some common attributes

## id

```
id="logo"
id="item-{{index}}"
```

`id` gives weex tag a unique mark in `<template>` scope. With id attribute you can easily refer a weex tag.

[more information](../syntax/id.md)

## style

```
style="width: 200; height: 200"
style="padding: {{x}}; margin: 0"
```

weex tag inline style.

[more information](../syntax/style-n-class.md)

## class

```
class="button"
class="button {{btnStatus}}"
```

to add classname for weex tag, you can use class attribute for tag classification.

## repeat

```
repeat="{{items}}"
```

provide a list of data, using current tag as a template to repeatedly generate the same weex tags.

[more information](../syntax/display-logic.md)

## if

```
if="{{opened}}"
```

provide a boolean value to decide whether or not to display current tag.

[more information](../syntax/display-logic.md)

## append

```
append="tree/node"
```

by providing the value of `tree` or `node`, it determines the progress of rendering.

[more information](../syntax/render-logic.md)

## Event Handing (on...)

```
onclick="gotoDetail"
onappear="loadMore"
```

register event handlers on weex tag

[more information](../syntax/events.md)

### Notes!
weex is basically following [HTML attribute](https://en.wikipedia.org/wiki/HTML_attribute) naming rule , so please **do not use CamelCase** in your attribute , **kebab-case** with “-” as delimiter is much better.

