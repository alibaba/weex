# stream

## Summary

A series of stream api. It provides a network request.

## API

### sendHttp(params, callback)

### Arguments

* `params`*(object)*: the request parameters.
  * `method`*(string)*: the HTTP method like `GET`, `POST`.
  * `url`*(string)*: the request url.
  * `header`*(object)*: the HTTP request header.
  * `body`*(string)*: the HTTP body.
* `callback`*(function)*: A callback function whose argument is the response string of the request.

### Example

```javascript
var stream = require('@weex-module/stream');
stream.sendHttp({
  method: 'GET',
  url: 'path/to/a/uri', // can't not support CORS yet!
}, function(ret) {
  // TODO after response
});
```
  
    