---
title: <switch>
type: references
order: 2.11
version: 0.10
---

# &lt;switch&gt;

<span class="weex-version">v0.6.1+</span>

The weex builtin component switch is used to create and manage an IOS styled On/Off buttons, for example, the Airplane mode button in the Settings app is a switch button.

**example**

```html
<template>
  <div>
  <text>muted:</text>
  <switch checked="true" onclick='onclick' onchange='onchange' ondisappear='ondisappear' onappear='onappear'></switch>
</div>
</template>

<script>
  module.exports ={
    methods:{
      onclick:function(e){
        console.log('onclick:' + e.timestamp);
      },
      onchange:function(e){
        console.log('onchage, value:' + e.value);
      },
      ondisappear:function(e){
        console.log('ondisappear, value:' + e.value);
      },
      onappear:function(e){
        console.log('onappear, value:' + e.value);
      },
    }
  }
</script>
```

[try it](http://dotwe.org/7306d24f4f677b6d9935dbd00e3aa981)

## Child Components

There are no child components for the switch component.

## Attributes

* checked &lt;boolean&gt; true|false, default value is false, indicating whether the button is on or not.
* disabled &lt;boolean&gt; true|false, default value is false, indicating whether the button is enable or not.

Other attributes please check out the [common attributes](../common-attrs.html).

## Styles
Notes: There are several style properties that you mustn't use on this component. And here are all the invalid properties:

* width
* height
* min-width
* min-height
* margin and margin-xxs
* padding and padding-xxs
* border and border-xxs

Notes: Specially the width and height related properties is not configurable and the size of this component is fixed to 100x60 (for the design width 750px).

common styles: check out [common styles for components](../common-style.html)

## Events

* onappear / ondisappear event. check out [common events](../common-event.html)
* onclick: check out [common events](../common-event.html)
* onchange: check out [common events](../common-event.html)

## Parameters of events' object for onchange event:

* value: the value of the component who dispatched this event, which is the boolean value true or false.
* timestamp: the time stamp of the event.
