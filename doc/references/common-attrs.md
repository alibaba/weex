# Common Attribute

All of weex tags share some common attribute

## id

```
id="logo"
id="item-{{index}}"
```

`id` give weex tag unique mark for `<template>` scope . with id attribute you can easily reference weex tag.

[more information](/syntax/id.md)

## style

```
style="width: 200; height: 200"
style="padding: {{x}}; margin: 0"
```

weex tag inline style.

[more information](/syntax/style-n-class.md)

## class

```
class="button"
class="button {{btnStatus}}"
```

add classname for weex tag, you can using class attribute for tag classify

## repeat

```
repeat="{{items}}"
```

provide a list of data , using current tag as template  repeat generate weex tag .

[more information](/syntax/display-logic.md)

## if

```
if="{{opened}}"
```

provide a boolean value to decide whether or not display current tag.

[more information](/syntax/display-logic.md)

## append

```
append="tree/node"
```

by providing the value of `tree` or `node`,  it determine the progress of rendering.

[more information](/syntax/render-logic.md)

##  Event Handing (onclick / onappear ...)

```
onclick="gotoDetail"
onappear="loadMore"
```

register event handlers on weex tag

[more information](/syntax/events.md)
