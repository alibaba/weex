# navigator
<span class="weex-version">0.4</span>
<a href="https://github.com/weexteam/article/wiki/%E6%AC%A2%E8%BF%8E%E5%8F%82%E4%B8%8EWeex%E4%B8%AD%E6%96%87%E6%96%87%E6%A1%A3%E7%BF%BB%E8%AF%91"  class="weex-translate incomplete">cn</a>

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
