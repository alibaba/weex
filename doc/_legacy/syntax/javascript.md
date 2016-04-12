# Data&Logic

The most commonly used statement in script is   `module.exports =  {...}`  .  the object be used for assignment value contain three properties:  `data`, `methods` and `created` .

```html
<script>
module.exports = {
  data: {
    ...
  },
  methods: {
    ...
  },
  created: function() {
    ...
  }
}
</script>
```

## data

value for `data` must be a JSON object

properties of the JSON object can be using in `<template>` and method context .  

please refer to [Data Binding](data-binding.md)  for more information about event.

## `methods`

value for `methods` is a one level JSON object , every properties of the object must be function type.

these function should be using as event handlers .

please refer to [Event](events.md)  for more information .

## `created`

created should be optionally assign with function.  If this function provide , it will be called  just after weex context created.  

###  context

context can be reference by `this`. the object have properties of currenet script  `data` , `methods`  and  weex common API.

data in context is writeable ; methods is executable.

please refer to [Common API](../core-concepts/api.md)  for more information about common API.

###  Notes

- `setTimeout` is available , but  `clearTimeout/setInterval/clearInterval/requestAnimationFrame/cancelAnimationFrame` is not.
-  tag is immutable , we believe interface should be changed by status updates , please refer to [Data Binding](data-binding.md).
-  at present , weex can't using external script (no `<script src="...">`  or `require`) 
