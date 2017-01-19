---
title: navigator
type: references
order: 3.5
version: 2.1
---

# Navigator 

<span class="weex-version">v0.6.1+</span>

As it's known to all that, we can navigate back and forth in the web browser using the navigation bar.
And The navigator module mimics the same behaviors in the iOS/Android application. Without such an ability, We will have to stay in the same page forever, so it is very important. Besides the navigation, the module can let us to specify whether to apply animation or not during the transition.

## API
### push(options, callback)

push a weex page onto the navigator stack, you can specify whether apply animation when pushing. And you can also specify a callback function to be executed after the operation is over.

**parameters**

* options(object): some options.
  * url(stirng): The URL of the weex page to push.
  * animated(string): true, if the weex page is push through animation, otherwise, false. Default value is true.

* callback(object): the callback function to be called after executing this action.

### pop(options, callback)

pop a weex page onto the navigator stack, you can specify whether apply animation when popping. And you can also specify a callback function to be executed after the operation is over.

**parameters**

* options(object): some options.
  * animated(string): true if the weex page is pop through animation; otherwise, false. Default value is true.
* callback(object): the callback function after executing this action.


## Example

```html
<template>
  <div class="wrapper">
    <text class="button" @click="jump">Jump</text>
  </div>
</template>

<script>
  var navigator = weex.requireModule('navigator')
  var modal = weex.requireModule('modal')

  export default {
    methods: {
      jump (event) {
        console.log('will jump')
        navigator.push({
          url: 'http://dotwe.org/raw/dist/519962541fcf6acd911986357ad9c2ed.js',
          animated: "true"
        }, event => {
          modal.toast({ message: 'callback: ' + event })
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

[try it](../../examples/navigator.html)