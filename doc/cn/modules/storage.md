# storage
<span class="weex-version">0.7</span>
<a href="https://github.com/weexteam/article/wiki/%E6%AC%A2%E8%BF%8E%E5%8F%82%E4%B8%8EWeex%E4%B8%AD%E6%96%87%E6%96%87%E6%A1%A3%E7%BF%BB%E8%AF%91"  class="weex-translate incomplete">cn</a>

## Summary

`storage` is a series of apis, allowing you to for example add, modify or delete stored data items.

## API

### setItem(key, value, callback)

When passed a key name and value, will add that key to the storage,
or update that key's value if it already exists.

#### Arguments

* `key`*(string)*: the name of the key you want to store. "" or null is not allowed.
* `value`*(string)*: the name of the value you want to store."" or null is not allowed.
* `callback`*(object)*: the callback function after executing this action.  

##### Example

```js
var storage = require('@weex-module/storage');
storage.setItem('bar', 'bar-value', function(e) {
  // callback.'e' is an object that contains 'result' and 'data'. e.result indicate wether `setItem` is succeed.
  // e.data will return 'undefined' if success or 'invalid_param' if your key/value is ""/null.
});
```

### getItem(key, callback)

When passed a key name, will return that key's value.

#### Arguments

* `key`*(string)*:  the name of the key you want to retrieve the value of."" or null is not allowed.
* `callback`*(object)*: the callback function after executing this action.  

##### Example

```js
var storage = require('@weex-module/storage');
storage.getItem('foo', function(e) {
  //callback.'e' is an object that contains 'result' and 'data'.
  // use 'e.data' to fetch the value of the key,if not found,'undefined' will return.
});
```

### removeItem(key, callback)

When passed a key name, will remove that key from the storage.

#### Arguments

* `key`*(string)*:  the name of the key you want to remove."" or null is not allowed.
* `callback`*(object)*: the callback function after executing this action.  

##### Example

```js
var storage = require('@weex-module/storage');
storage.removeItem('foo', function(e) {
  // callback. 'e' is an object that contains 'result' and 'data'.
  // e.result will return 'success' or 'failed' according to the executing result.
  // e.data will always return 'undefined' in this function if success.
});
```

### length(callback)

Returns an integer representing the number of data items stored in the Storage object.

#### Arguments

* `callback`*(object)*: the callback function after executing this action.  

##### Example

```js
var storage = require('@weex-module/storage');
storage.length(function(e) {
  // callback. 'e' is an object that contains 'result' and 'data'.
  //e.data will return that number.
});
```

### getAllKeys(callback)

Returns an array that contains all keys stored in Storage object.

#### Arguments

* `callback`*(object)*: the callback function after executing this action.  

##### Example

```js
var storage = require('@weex-module/storage');
storage.getAllKeys(function(e) {
  // callback. 'e' is an object that contains 'result' and 'data'.
  //e.data will return that array of keys.
});
```
