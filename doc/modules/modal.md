# modal
<span class="weex-version">0.4</span>
<a href="https://github.com/weexteam/article/wiki/%E6%AC%A2%E8%BF%8E%E5%8F%82%E4%B8%8EWeex%E4%B8%AD%E6%96%87%E6%96%87%E6%A1%A3%E7%BF%BB%E8%AF%91"  class="weex-translate incomplete">cn</a>

## Summary

A series of modal dialog api like `toast`, `alert`, `confirm` and `prompt`.

## API

### toast(options)

#### Arguments

* `options`*(object)*: some options.
  * `message`*(string)*: the message that the toast shows.
  * `duration`*(number)*: the duration(seconds) that the toast shows.


##### Example

```javascript
var modal = require('@weex-module/modal');
modal.toast({'message': 'I am toast!', 'duration': 1});
```

### alert(options, callback)

#### Arguments

* `options`*(object)*: some options.
  * `message`*(string)*: the message that the alert shows.
  * `okTitle`*(string)*: the title of alert button, default is OK.
* `callback`*(function)*: callback when complete.

#### Example

```javascript
var arg1 = 'I am alert!';
var arg2 = 'I am ok';
var modal = require('@weex-module/modal');
modal.alert({
  message: arg1,
  okTitle: arg2
}, function() {
  // TODO after the alert is complete.
})
```
    
### confirm(options, callback)

#### Arguments

* `options`*(object)*: some options.
  * `message`*(string)*: the message that the confirm shows.
  * `okTitle`*(string)*: the title of confirm button, default is 'OK'.
  * `cancelTitle`*(string)*: the title of cancel button, default is 'Cancel'.
* `callback`*(function)*: callback when complete.

This method has a callback function whose arguments will be:

* `result`*(string)*: the title of the button that clicked by user.
  
#### Example

```javascript
var arg1 = 'I am alert!'
var arg2 = 'I am ok'
var arg3 = 'I am cancel'
var modal = require('@weex-module/modal');
modal.confirm({
  message: arg1,
  okTitle: arg2,
  cancelTitle: arg3
}, function(result) {
  nativeLog(result)
  // TODO after the confirm is complete.
});
```

### prompt(options, callback)

#### Arguments

* `options`*(object)*: some options.
  * `message`*(string)*: the message that the prompt shows.
  * `okTitle`*(string)*: the title of confirm button, default is 'OK'.
  * `cancelTitle`*(string)*: the title of cancel button, default is 'Cancel'.
* `callback`*(function)*: callback when complete.
   
This method has a callback function whose arguments will be:

* `res`*(object)*: the argument will be a object, which has attributes `result` and `data`, like `{ result: 'OK', data: 'hello world' }`
  * `result`*(string)*: the title of the button that clicked by user.
  * `data`*(string)*: the value of the text that entered by user.

#### Example

```javascript
var arg1 = 'I am prompt!'
var arg2 = 'I am ok'
var arg3 = 'I am cancel'
var modal = require('@weex-module/modal');
modal.prompt({
  message: arg1,
  okTitle: arg2,
  cancelTitle: arg3
}, function(res) {
  nativeLog(res.result + ', ' + res.data);
  // TODO after the prompt is complete.
});
```



