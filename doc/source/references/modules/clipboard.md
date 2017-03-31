---
title: clipboard
type: references
order: 3.2
version: 2.1
---

# clipboard
<span class="weex-version">v0.8+ (developing)</span>

clipboard allows you to `getString()` or `setString()` from the system clipboard.

Not long ago, We're still suffering from such a situation that we got a verification code sent by SMS, and we had no way to get the code from the SMS text but to typed it by our hands. How frustrated it is! But now you can enable your app to get the code from the system clipboard by calling  `clipboard.getString()` .

## Caution

* only support text.
* only works on Android and iOS. NOT works for html5, for web security reason.

## API

### getString(callback)

reads from clipboard.

##### Arguments

`callback(function)`: the callback function after executing this action. `data` is the return value.

### setString(text)

sets the text to clipboard, having the same effect as copying manually.

##### Arguments

`text(string)`: the text copied to clipboard.

### Example

```html
<template>
  <div>
    <div class="div">
      <text class="text" @click="onItemClick">{{message}}</text>
    </div>
    <div class="div">
      <text class="text" @click="setContent">Click to copy: {{tobecopied}}</text>
    </div>
  </div>
</template>

<script>
  const clipboard = weex.requireModule('clipboard')

  export default {
    data () {
      return {
        tobecopied: 'yay!',
        message: 'nothing.'
      }
    },

    methods: {
      setContent () {
        clipboard.setString(this.tobecopied)
      },
      onItemClick () {
        this.message = 'clicked! '
        clipboard.getString(ret => {
          this.message = 'text from clipboard:' + ret.data
        })
      }
    }
  }
</script>

<style scoped>
  .div {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 750px;
    height: 90px;
    padding-left: 30px;
    padding-right: 30px;

    border-bottom-width: 1px;
    border-style: solid;
    border-color: #DDDDDD;
  }
  .text {
    width: 750px;
    height: 90px;
  }
</style>
```

[try it](../../examples/clipboard.html)