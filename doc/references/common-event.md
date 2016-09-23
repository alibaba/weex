# Common Events
<span class="weex-version">0.4</span>
<a href="https://github.com/weexteam/article/issues/33"  class="weex-translate">cn</a>

## Click event

If a `click` event is bound to a component, the event will be triggered when the user clicks on it.

**Notes:** The component `input` and `switch` do not currently support this event, please use `change` or `input` event instead.

**event object**

* `type`: `click`
* `target`: The target component where the event is triggered
* `timestamp`: Timestamp when event is triggered.       

## Longpress event      

If a `longpress` event is bound to a component, the event will be triggered when the user long press on it.

**Notes:** The component `input` and `switch` do not currently support this event, please use `change` or `input` event instead.

**event object**

* `type`: `longpress`
* `target`: The target component where the event is triggered
* `timestamp`: Timestamp when event is triggered.     

e.g.     

```html
<template>
    <div>
        <div onlongpress="longpress" onclick="click" class="border">
            <text>Long press</text>
        </div>
    </div>
</template>
<style>
    .border{
        height:80;
        border-width:1;
    }
</style>

<script>
    module.exports ={
        methods: {
            longpress: function(e){
                console.log('long:', e);
            },
            click: function(e){
                console.log('click:', e);
            }
        }
    };
</script>
```        

## Appear event

If a `appear` event is bound to a component inside a scroller, the event will be triggered when the component comes to be visible.

**event object**

* `type`: `appear`
* `target`: The target component where event is triggered
* `timestamp`: Timestamp when event is triggered.
* `direction`: The direction in which the scroller is scrolling. Should be `up` or `down`.

## Disappear event

If a `disappear` event is bound to a component inside a scroller, the event will be triggered when the component scrolls out of viewport and disappears from your sight.

**event object**

* `type`: `disappear`
* `target`: The object where event is triggered
* `timestamp`: Timestamp when event is triggered.
* `direction`: The direction in which the scroller is scrolling. Should be `up` or `down`

## Page event 
<span class="weex-version">0.6.1</span>

Weex provides you with simple management of page status, such as `viewappear` and `viewdisappear`，

The `viewappear` event will be triggered when page is about to show or before any animations are configured for showing. For example, when calling `push` method in navigator module, this event will be trigged in new page. 

The `viewdisappear` event will be triggeded when page is about to dismiss.  

Different from `appear` and `disappear` of component, these two events focus on the status of whole page, `so they must be bound to the root component`.

e.g.

```html
<template>
  <div onviewappear="viewappear" onviewdisappear="viewdisappear">
  		......
  </div>
</template>

<script>
  module.exports = {
    methods: {
      viewappear: function (e) {
        // handle view appear event
      },
      viewdisappear: function (e) {
        // handle view disappear event
    }
  }
</script>
```

In addititon，these events also can be bound to body component which is not root actually such as `wxc-navpage`.


**event object**

* `type`: `viewappear` or `viewdisappear`
* `target`: The object where event is triggered
* `timestamp`: Timestamp when event is triggered.
