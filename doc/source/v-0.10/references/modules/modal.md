---
title: modal
type: references
order: 3.4
version: 0.10
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

**Example:**

```html
<template>
  <div style="height: 200px; width: 400px; background-color: #00bfff;
    justify-content: center; align-items: center" onclick="{{perform}}">
    <text style="font-size: 60px; color: #ffffff">Toast</text>
  </div>
</template>

<script>
  module.exports = {
    methods: {
      perform: function () {
        var modal = require('@weex-module/modal');
        modal.toast({
          'message': 'I am a toast',
          'duration': 3
        });
      }
    }
  }
</script>
```    
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

**Example:**

```html
<template>
  <div>
    <div style="height: 200px; width: 400px; background-color: #00bfff;
  justify-content: center; align-items: center" onclick="{{perform}}">
      <text style="font-size: 60px; color: #ffffff">Alert</text>
    </div>
    <text>{{params}}</text>
  </div>
</template>

<script>
  module.exports = {
    data: {
      params: ''
    },
    methods: {
      perform: function () {
        var modal = require('@weex-module/modal');
        var self = this;
        modal.alert({
          'message': 'I am alert message',
          'okTitle' : 'YES'
        }, function (result) {
          self.params = String(result)
        });
      }
    }
  }
</script>
```

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
**Example:**

```html
<template>
  <div>
    <div style="height: 200px; width: 400px; background-color: #00bfff;
  justify-content: center; align-items: center" onclick="{{perform}}">
      <text style="font-size: 60px; color: #ffffff">Confirm</text>
    </div>
    <text>{{params}}</text>
  </div>
</template>

<script>
  module.exports = {
    data: {
      params: ''
    },
    methods: {
      perform: function () {
        var modal = require('@weex-module/modal');
        var self = this;
        modal.confirm({
          'message': 'I have read and accept the terms.',
          'okTitle' : 'YES',
          'cancelTitle' : 'NO'
        }, function (e) {
          self.params = String(e)
        });
      }
    }
  }
</script>
```    

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

**Example:**    

```html
<template>
  <div>
    <div style="height: 200px; width: 400px; background-color: #00bfff;
  justify-content: center; align-items: center" onclick="{{perform}}">
      <text style="font-size: 60px; color: #ffffff">Prompt</text>
    </div>
    <text>{{params}}</text>
  </div>
</template>

<script>
  module.exports = {
    data: {
      params: ''
    },
    methods: {
      perform: function () {
        var modal = require('@weex-module/modal');
        var self = this;
        modal.prompt({
          'message': 'I am a prompt',
          'okTitle' : 'YES',
          'cancelTitle' : 'NO'
        }, function (e) {
          self.params = JSON.stringify(e)
        });
      }
    }
  }
</script>
```