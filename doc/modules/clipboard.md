# clipboard
<span class="weex-version">since 0.8</span>
<a href="https://github.com/weexteam/article/wiki/%E6%AC%A2%E8%BF%8E%E5%8F%82%E4%B8%8EWeex%E4%B8%AD%E6%96%87%E6%96%87%E6%A1%A3%E7%BF%BB%E8%AF%91"  class="weex-translate incomplete">cn</a>

## Summary

`clipboard` allows you to `getString()` or `setString()` from the system clipboard.<br>
Image a scene, you have send a verification code by SMS. Now most phone has a feature to capture the code from whole SMS text, and copy to the clipboard. In the past, you need to input the code manually. Now just click a button which calls `clipboard.getString()` .<p>

*AUCTION* 
- only support text. 
- only works in Android and iOS. NOT works in html5, for web security reason.

## API

### getString(callback)

read from clipboard.

#### Arguments

* `callback`*(function)*: the callback function after executing this action. `data` is the return value. 

#### Example

```javascript
var clipboard = require('@weex-module/clipboard');
clipboard.getString(function(ret) {
  // callback. 'ret' is an object that contains 'result' and 'data'.
  // use 'ret.data' to fetch the value.
  console.log("read from clipboard is " + ret.data);
});
```

### setString(text)

set the text into clipboard, as the same as copy manully. 

#### Arguments

* `text`*(string)*: the string to copy into the clipboard.

#### Example

```javascript
var clipboard = require('@weex-module/clipboard');
clipboard.setString("SomeStringHere");
```

