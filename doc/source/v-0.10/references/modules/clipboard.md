---
title: clipboard
type: references
order: 3.2
version: 0.10
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

Example

```js
var clipboard = require('@weex-module/clipboard');
clipboard.getString(function(ret) {
  // callback. 'ret' is an object that contains 'result' and 'data'.
  // use 'ret.data' to fetch the value.
  console.log("read from clipboard is " + ret.data);
});

```
### setString(text)

sets the text to clipboard, having the same effect as copying manually.

##### Arguments

`text(string)`: the text copied to clipboard.
Example

```js
var clipboard = require('@weex-module/clipboard');
clipboard.setString("SomeStringHere");
```
