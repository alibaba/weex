---
title: storage
type: references
order: 3.6
version: 0.10
---

# storage
<span class="weex-version">v0.7+</span>

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

```javascript
var storage = require('@weex-module/storage');
storage.setItem('bar', 'bar-value', function(e) {
  // callback.'e' is an object that contains 'result' and 'data'. e.result indicate whether `setItem` is succeed.
  // e.data will return 'undefined' if success or 'invalid_param' if your key/value is ""/null.
});
```

### getItem(key, callback)

When passed a key name, will return that key's value.

#### Arguments

* `key`*(string)*:  the name of the key you want to retrieve the value of."" or null is not allowed.
* `callback`*(object)*: the callback function after executing this action.  

##### Example

```javascript
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

```javascript
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

```javascript
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

```javascript
var storage = require('@weex-module/storage');
storage.getAllKeys(function(e) {
  // callback. 'e' is an object that contains 'result' and 'data'.
  //e.data will return that array of keys.
});
```
