---
title: <switch>
type: references
order: 2.11
version: 2.1
---

# &lt;switch&gt;

<span class="weex-version">v0.6.1+</span>

The weex builtin component switch is used to create and manage an IOS styled On/Off buttons, for example, the Airplane mode button in the Settings app is a switch button.


## Child Components

There are no child components for the switch component.

## Attributes

* checked &lt;boolean&gt; true|false, default value is false, indicating whether the button is on or not.
* disabled &lt;boolean&gt; true|false, default value is false, indicating whether the button is enable or not.

## Styles
Notes: There are several style properties that you mustn't use on this component. And here are all the invalid properties:

* width
* height
* min-width
* min-height
* margin and margin-xxs
* padding and padding-xxs
* border and border-xxs

Notes: If the container of `<switch>` is not set to `align-items:flex-start`, the switch in android will be stretched. 

common styles: check out [common styles for components](../common-style.html)

## Events

* onappear / ondisappear event. check out [common events](../common-event.html)
* onclick: check out [common events](../common-event.html)
* onchange: check out [common events](../common-event.html)

## Parameters of events' object for onchange event:

* value: the value of the component who dispatched this event, which is the boolean value true or false.
* timestamp: the time stamp of the event.

## Examples

```html
<template>
  <div>
    <div class="example">
      <text class="label">normal</text>
      <switch></switch>
    </div>
    <div class="example">
      <text class="label">checked</text>
      <switch checked="true"></switch>
    </div>
    <div class="example">
      <text class="label">disabled</text>
      <switch disabled="true" checked="true"></switch>
      <switch disabled="true"></switch>
    </div>
    <div class="example">
      <text class="label">onchange</text>
      <switch @change="onchange"></switch>
      <text class="info">{{checked}}</text>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        checked: false
      }
    },
    methods: {
      onchange (event) {
        console.log(`onchage, value: ${event.value}`)
        this.checked = event.value
      }
    }
  }
</script>

<style scoped>
  .example {
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 60px;
  }
  .label {
    font-size: 40px;
    line-height: 60px;
    width: 350px;
    color: #666;
    text-align: right;
    margin-right: 20px;
  }
  .info {
    font-size: 30px;
    line-height: 60px;
    color: #BBB;
    margin-left: 10px;
  }
</style>
```

[try it](../../examples/switch.html)