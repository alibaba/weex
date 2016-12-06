# stream
<span class="weex-version">0.4</span>


## Summary

A series of stream api. It provides a network request.

## API

### fetch(options, callback,progressCallback)

### Arguments

* `options`*(object)*: the request options.
  * `method`*(string)*: the HTTP method `GET` or `POST`.
  * `url`*(string)*: the request url.
  * `headers`*(object)*: the HTTP request headers.
  * `type`*(string)*: request type, 'json','text' or 'jsonp'(same as 'json' in native implementation)
  * `body`*(string)*: the HTTP body.
* `callback`*(function)*: A callback function whose argument is the response object of the request. Callback function will receive a `response` object:   
  * `status`*(number)*：response status code.
  * `ok`*(boolean)*: true if status code is bewteen 200～299.
  * `statusText`*(string)*：status text 
  * `data`: response data. It's a object if request option is `json`/`jsonp`, or *(string)* in other type value.
  * `headers`*(object)*: response headers
* `progressCallback`*(function)*: A progress callback. This callback will be invoked before request finished:   
  * `readyState`*(number)*: Current request state.'1':request connection opened;'2':response headers received.;'3':response data is loading;
  * `status`*(number)*：response status code.
  * `length`*(number)*: bytes of data have received. You can read full length of response from 'headers'.
  * `statusText`*(string)*：status text 
  * `headers`*(object)*: response headers



### Example

```javascript
stream.fetch({
  method: 'GET',
  url: "http://httpbin.org/get",
  type:'json'
}, function(response) {
  //process response
},function(response){
  //progress response
  console.log("current bytes received:"+response.length);
  
});
```
  
    
