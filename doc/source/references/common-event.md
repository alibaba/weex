---
title: Common Events
type: references
order: 5
version: 2.1
has_chapter_content: true
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

## Longpress event

If a `longpress` event is bound to a component, the event will be triggered when user long press on it.    
**Notes: ** The `input` and `switch` component does not currently support the `click` event, please use `change` or `input` event instead.    

### event object

- `type` : `longpress` 
- `target` : The target component where the event is triggered
- `timestamp` : Timestamp when event is triggered    

## Appear event    

If a appear event is bound to a component inside a scrollable container, the event will be triggered when the component comes to be visible.    

### event object

- `type` : `appear` 
- `target` : The target component where the event is triggered
- `timestamp` : Timestamp when event is triggered  
- `direction` : The direction in which the scroller is scrolling. Could be `up` or `down`.

## Disappear event

If a `disappear` event is bound to a component inside a scrollable container, the event will be triggered when the component scrolls out of viewport and disappears from your sight.    

### event object

- `type` : `disappear` 
- `target` : The target component where the event is triggered
- `timestamp` : Timestamp when event is triggered  
- `direction` : The direction in which the scroller is scrolling. Could be `up` or `down`. 

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


## Example

```html
<template>
  <div>
    <div class="box" @click="onclick" @longpress="onlongpress" @appear="onappear"  @disappear="ondisappear"></div>
  </div>
</template>

<script>
  const modal = weex.requireModule('modal')
  export default {
    methods: {
      onclick (event) {
        console.log('onclick:', event)
        modal.toast({
          message: 'onclick',
          duration: 0.8
        })
      },
      onlongpress (event) {
        console.log('onlongpress:', event)
        modal.toast({
          message: 'onlongpress',
          duration: 0.8
        })
      },
      onappear (event) {
        console.log('onappear:', event)
        modal.toast({
          message: 'onappear',
          duration: 0.8
        })
      },
      ondisappear (event) {
        console.log('ondisappear:', event)
        modal.toast({
          message: 'ondisappear',
          duration: 0.8
        })
      }
    }
  }
</script>

<style scoped>
  .box {
    border-width: 2px;
    border-style: solid;
    border-color: #BBB;
    width: 250px;
    height: 250px;
    margin-top: 250px;
    margin-left: 250px;
    background-color: #EEE;
  }
</style>
```