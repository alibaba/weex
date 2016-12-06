# navigator
<span class="weex-version">0.4</span>

## Summary

A series of navigator operation apis like `push`, `pop`.

## API

### push(options, callback)


#### Arguments

* `options`*(object)*: some options.
  * `url`*(stirng)*: The URL of the weex page to push.
  * `animated`*(string)*:  `true`if the weex page is push through animation, otherwise, `false`.
* `callback`*(object)*: the callback function after executing this action.  

##### Example

```js
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



#### Arguments

* `options`*(object)*: some options.
  * `animated`*(string)*:  `true` if the weex page is pop through animation; otherwise, `false`.
* `callback`*(object)*: the callback function after executing this action.  
##### Example

```js
var params = {
    'animated' : 'true',
}
var navigator = require('@weex-module/navigator');
navigator.pop(params, function(e) {
	//callback
});
```
