# navigator
## Summary

A series of navigator operation apis like `push`, `pop`.

## API

### push(options, callback)


#### Arguments

* `options`*(object)*: some options.
  * `url`*(stirng)*: The navigation item URL to push on the stack.
  * `animated`*(string)*:  `true`if the navigation page should be animated; otherwise, `false`.
* `callback`*(object)*: the callback function when execute the push action.  

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
  * `animated`*(string)*:  `true`if the navigation page should be animated; otherwise, `false`.
* `callback`*(object)*: the callback function when execute the pop action.  
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
