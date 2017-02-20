---
title: Common Events
type: references
order: 1.9
version: 0.10
---

# Common Events

Weex provide the ability to let events trigger action, like starting a JavaScript when a user click on a component. Bellow are the common event attributes that can be added to weex components to define event actions.    

## Click event

The onclick attribute fires on a click gesture on the element.    
**Notes: ** The `input` and `switch` component does not currently support the `click` event, please use `change` or `input` event instead.    

### event object

- `type` : `click` 
- `target` : The target component where the event is triggered
- `timestamp` : Timestamp when event is triggered    

**Example:**    

```html
<template>
  <text style="font-size: 60px" onclick="{{update}}">I am {{name}}</text>
</template>

<script>
  module.exports = {
    data: {
      name: 'Tom'
    },
    methods: {
      update: function () {
        this.name = this.name === 'Tom' ? 'Jerry' : 'Tom'
      }
    }
  }
</script>
```   


## Longpress event

If a `longpress` event is bound to a component, the event will be triggered when user long press on it.    
**Notes: ** The `input` and `switch` component does not currently support the `click` event, please use `change` or `input` event instead.    

### event object

- `type` : `longpress` 
- `target` : The target component where the event is triggered
- `timestamp` : Timestamp when event is triggered    

**Example:**

```html
<template>
  <div style="width: 400px; height: 200px; background-color: {{bg}};
    justify-content: center; align-items: center;" onlongpress="{{update}}">
    <text style="font-size: 60px">Press me</text>
  </div>
</template>

<script>
  module.exports = {
    data: {
      bg: '#FF0000'
    },
    methods: {
      update: function () {
        this.bg = this.bg === '#FF0000' ? '#00FF00' : '#FF0000'
      }
    }
  }
</script>
```    

## Appear event    

If a appear event is bound to a component inside a scrollable container, the event will be triggered when the component comes to be visible.    

### event object

- `type` : `appear` 
- `target` : The target component where the event is triggered
- `timestamp` : Timestamp when event is triggered  
- `direction` : The direction in which the scroller is scrolling. Could be `up` or `down`.   

[example](http://dotwe.org/3fa162a65fbf0c7e2655fbc1bebbfc38)    

## Disappear event

If a `disappear` event is bound to a component inside a scrollable container, the event will be triggered when the component scrolls out of viewport and disappears from your sight.    

### event object

- `type` : `disappear` 
- `target` : The target component where the event is triggered
- `timestamp` : Timestamp when event is triggered  
- `direction` : The direction in which the scroller is scrolling. Could be `up` or `down`.   

[example](http://dotwe.org/3fa162a65fbf0c7e2655fbc1bebbfc38)    

## Page event

Weex provides you with simple management of page status, such as `viewappear` and `viewdisappear`.    
The `viewappear` event will be triggered when page is about to show or before any animations are configured for showing. For example, when calling `push` method in `navigator` module, this event will be trigged in new page.    
The `viewdisappear` event will be triggeded when page is about to dismiss.    
Different from `appear` and `disappear` of component, these two events focus on the status of whole page, so **they must be bound to the root component**.    
In addititon, these events also can be bound to body component which is not root actually such as `wxc-navpage`.     

### event object

- `type` : `viewappear` or `viewdisappear` 
- `target` : The target component where the event is triggered
- `timestamp` : Timestamp when event is triggered 
   
[example](http://dotwe.org/3fa162a65fbf0c7e2655fbc1bebbfc38)    
