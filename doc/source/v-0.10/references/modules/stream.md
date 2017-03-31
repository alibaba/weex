---
title: stream
type: references
order: 3.7
version: 0.10
---

# stream

A series of stream api. It provides a network request.

## API

### fetch(options, callback,progressCallback)

Start a network request, use two callbacks to receive server's response data.

**Arguments**

* options(object): the request options, key value style dictionary.

    * method(string): the HTTP method `GET` or `POST`.

    * url(string): the request url.

    * headers(string): the HTTP request headers.

    * type(string): request type, 'json','text' or 'jsonp'(same as 'json' in native implementation)

    * body(string): the HTTP body.

* callback(function): A callback function whose argument is the response object of the request. Callback function will receive a `response` object.

    * status(number): response status code.

    * ok(boolean): true if status code is bewteen 200～299.

    * statusText(string): status text

    * data(string): response data. It's a object if request option is `json`/`jsonp`, or *(string)* in other type value.

    * headers(object): response headers

* progressCallback(function):  A progress callback. This callback will be invoked before request finished.

    * readyState(number): Current request state.'1':request connection opened;'2':response headers received.;'3':response data is loading;

    * status(number): response status code.

    * length(number): bytes of data have received. You can read full length of response from 'headers'.

    * statusText(string): status text.

    * headers(object): response headers.

### Example

```html
<template>
  <div>
    <text onclick="startStream">click here to start stream</text>
  </div>
</template>

<script>
  module.exports = {
    methods: {
      startStream: function () {
        var stream_module = require('@weex-module/stream');
        stream_module.fetch({
          method: 'GET',
          url: "http://httpbin.org/get",
          type:'json'
        }, function(response) {
          //finished response
          console.log("all received:",response);
        },function(response){
          //progress response
          console.log("current bytes received:",response.length);
        });
      }
    }
  }
</script>
```
[Try it](http://dotwe.org/6e4ede64fdfe070b9696cc4cc3bdd086)
