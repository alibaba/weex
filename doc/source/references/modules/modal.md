---
title: modal
type: references
order: 3.4
version: 2.1
---

# modal  

Weex provides a series of message boxes: `toast`, `alert`, `confirm` and `prompt`.    

## API    
### toast(options)   

A toast provides simple feedback about an operation in a small popup. For example, navigating away from an email before you send it triggers a "Draft saved" toast to let you know that you can continue editing later. Toasts automatically disappear after a timeout.    

#### Arguments
- `options` (object): toast options.
 - `message` (string): the text message that the toast shows.
 - `duration` (number): the duration(seconds) that the toast shows.   
 
### alert(options, callback)    

An alert box is often used if you want to make sure information comes through to the user.    
When an alert box pops up, the user will have to click "OK" to proceed.    

#### Arguments  

- `options` (object): alert box options.
 - `message` (string): the text message that the alert shows.
 - `okTitle` (string): the text of positive button, default is 'OK'.
 - `callback` (function): callback when complete.    
  This method has a callback function whose arguments will be:    
- `result` (string): the title text of the confirm button that clicked by user.

### confirm(options, callback)    
A confirm box is often used if you want the user to verify or accept something.    

When a confirm box pops up, the user will have to click either confirm or cancel button to proceed.    

#### Arguments
- `options` (object): confirm box options.
  - `message` (string): the message that the confirm shows.
  - `okTitle` (string): the title of confirm button, default is 'OK'.
  - `cancelTitle` (string): the title of cancel button, default is 'Cancel'.
- `callback` (function): callback when complete.

This method has a callback function whose arguments will be:    
- `result`(string): the title text of the button that clicked by user.    

### prompt(options, callback)    

A prompt box is often used if you want the user to input a value before entering a page.    
When a prompt box pops up, the user will have to click either confirm or cancel button to proceed after entering an input value.    

#### Arguments    
- `options` (object): some options.
  - `message` (string): the message that the prompt shows.
  - `okTitle` (string): the title text of confirm button, default is 'OK'.
  - `cancelTitle` (string): the title text of cancel button, default is 'Cancel'.
- `callback` (function): callback when complete.     
  This method has a callback function whose arguments will be:    
- `ret` (object): the argument will be a object, which has attributes `result` and `data`,  like `{ result: 'OK', data: 'hello world' }`
  - `result` (string): the title of the button that clicked by user.
  - `data` (string): the value of the text that entered by user.     

## Example

```html
<template>
  <div class="wrapper">
    <text class="button" @click="showToast">Toast</text>
    <text class="button" @click="showAlert">Alert</text>
    <text class="button" @click="showConfirm">Confirm</text>
    <text class="button" @click="showPrompt">Prompt</text>
  </div>
</template>

<script>
  var modal = weex.requireModule('modal')

  export default {
    methods: {
      showToast (event) {
        console.log('will show toast')
        modal.toast({
          message: 'This is a toast',
          duration: 0.3
        })
      },
      showAlert (event) {
        console.log('will show alert')
        modal.alert({
          message: 'This is a alert',
          duration: 0.3
        }, function (value) {
          console.log('alert callback', value)
        })
      },
      showConfirm (event) {
        console.log('will show confirm')
        modal.confirm({
          message: 'Do you confirm ?',
          duration: 0.3
        }, function (value) {
          console.log('confirm callback', value)
        })
      },
      showPrompt (event) {
        console.log('will show prompt')
        modal.prompt({
          message: 'This is a prompt',
          duration: 0.3
        }, function (value) {
          console.log('prompt callback', value)
        })
      }
    }
  };
</script>

<style scoped>
  .wrapper {
    flex-direction: column;
    justify-content: center;
  }
  .button {
    font-size: 60px;
    width: 450px;
    text-align: center;
    margin-top: 30px;
    margin-left: 150px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-width: 2px;
    border-style: solid;
    color: #666666;
    border-color: #DDDDDD;
    background-color: #F5F5F5
  }
</style>
```

[try it](../../examples/modal.html)