---
title: navigator
type: references
order: 3.5
version: 0.10
---

# Navigator 
<span class="weex-version">v0.6.1+</span>

As it's known to all that, we can navigate back and forth in the web browser using the navigation bar.
And The navigator module mimics the same behaviors in the iOS/Android application. Without such an ability, We will have to stay in the same page forever, so it is very important. Besides the navigation, the module can let us to specify whether to apply animation or not during the transition.

**example**

```html
<template>
  <div class="div">
    <text class="text" onclick="onItemClick">click me! {{message}}</text>
  </div>
</template>

<script>
  module.exports ={
    data:{
      message:""
    },
    methods:{
      onItemClick:function(e){

        var navigator = require('@weex-module/navigator');
        var params = {'url':'http://weex.alibaba-inc.com/raw/html5/3d2996653c1d129603f9c935b895e998.js','animated':true};
        navigator.push(params, function(e) {
          console.log('i am the callback.')
        });
      }
    }
  }
</script>
<style>
  .div {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 750;
    height: 90;
    padding-left:30;
    padding-right:30;

    border-bottom-width: 1;
    border-style: solid;
    border-color: #dddddd;
  }
  .text{
    width: 750;
    height: 90;
  }
</style>
```

[try it](http://dotwe.org/004a5e3f26290cf5b9ce03806a574633)

## API
### push(options, callback)

push a weex page onto the navigator stack, you can specify whether apply animation when pushing. And you can also specify a callback function to be executed after the operation is over.

**parameters**

* options(object): some options.
  * url(stirng): The URL of the weex page to push.
  * animated(string): true, if the weex page is push through animation, otherwise, false. Default value is true.

* callback(object): the callback function to be called after executing this action.

```javascript
var params = {
  'url': 'navigator-demo.js',
  'animated' : 'true',
}
var navigator = require('@weex-module/navigator');
navigator.push(params, function(e) {
    //callback
});
```

### pop(options, callback)
pop a weex page onto the navigator stack, you can specify whether apply animation when popping. And you can also specify a callback function to be executed after the operation is over.

**parameters**

* options(object): some options.
  * animated(string): true if the weex page is pop through animation; otherwise, false. Default value is true.
* callback(object): the callback function after executing this action.

**example**

```javascript
var params = {
  'animated' : 'true',
}
var navigator = require('@weex-module/navigator');
navigator.pop(params, function(e) {
    //callback
});
```

### close(options, callback)
close a weex page, you can specify a callback function to be executed after the operation is over.

**parameters**

* options(object): some options.
  * animated(string): true, should animation be applied when closing. Default value is true.
* callback(object): the callback function after executing this action.

### setNavBarBackgroundColor(params, callback)
set color for the navigation bar's background color, you can specify a callback function to be executed after the operation is over.

**parameters**

* params(object): some parameters.
  * backgroundColor(string): it's a required param, no default value provided.
* callback(object): the callback function after executing this action.


### setNavBarLeftItem(params,callback)
set left item for the navigation bar, you can specify a callback function to be executed after the operation is over.

**parameters**

* params(object): parameters can not be empty, titleColor depends on title. And If title and icon are provided, only the title and its titleColor will be used. That's to say, icon will only be used when title is not present.
  * title(string): the title for the bar button.
  * titleColor (string): the title color.
  * icon (string): the icon for the bar button, should be an an downloadable image.
* callback(object): the callback function after executing this action.

### clearNavBarLeftItem(callback)
clear left item for the navigation bar, you can specify a callback function to be executed after the operation is over.

**parameters**

* callback(object): the callback function after executing this action.

### setNavBarRightItem(params,callback)
set the right item for the navigation bar, you can specify a callback function to be executed after the operation is over.

**parameters**

* params(object): parameters can not be empty, titleColor depends on title. And If title and icon are provided, only the title and its titleColor will be used. That's to say, icon will be used when title is not present.
  * title(string): the title for the bar button.
  * titleColor (string): the title color.
  * icon (string): the icon for the bar button, should be an an downloadable image.
* callback(object): the callback function after executing this action.

### clearNavBarRightItem(params, callback)
clear the right item for the navigation bar, you can specify a callback function to be executed after the operation is over.
**parameters**

* params(object): optional.
* callback(object): the callback function after executing this action.


### setNavBarMoreItem(params,callback)
set the more item for the navigation bar, you can specify a callback function to be executed after the operation is over.

**parameters**

Actually, the function does nothing.
* params(object): optional.
* callback(object): the callback function after executing this action.

### clearNavBarMoreItem(params, callback)
clear the more item for the navigation bar, you can specify a callback function to be executed after the operation is over.

**parameters**

Actually, the function does nothing.
* params(object): optional.
* callback(object): the callback function after executing this action.

### setNavBarTitle(params,callback)
set the title for the navigation bar, you can specify a callback function to be executed after the operation is over.

**parameters**

* params(object): parameters can not be empty.
  * title(string): the title for the bar button.
* callback(object): the callback function after executing this action.


### clearNavBarTitle(params,callback)
clear the title for the navigation bar, you can specify a callback function to be executed after the operation is over.

**parameters**

* params(object): optional.
* callback(object): the callback function after executing this action.
