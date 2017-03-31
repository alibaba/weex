---
title: stream
type: references
order: 3.7
version: 2.1
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

    * type(string): response type, 'json','text' or 'jsonp'(same as 'json' in native implementation)

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

### Note

 - Default Content-Type is 'application/x-www-form-urlencoded'. (The type specified in fetch is the response type!)
 - You need to set the Content-Type header to 'application/json' manually if you want to post the json body.

### Example

```html
<template>
  <div class="wrapper">
    <div class="group">
      <text class="title">Weex Star :</text>
      <text class="count">{{weexStar}}</text>
    </div>
    <div class="group">
      <text class="title">Vue Star :</text>
      <text class="count">{{vueStar}}</text>
    </div>
  </div>
</template>

<script>
  var stream = weex.requireModule('stream')
  export default {
    data () {
      return {
        weexStar: 'unknown',
        vueStar: 'unknown'
      }
    },

    methods: {
      getStarCount (repo, callback) {
        return stream.fetch({
          method: 'GET',
          type: 'json',
          url: 'https://api.github.com/repos/' + repo
        }, callback)
      }
    },
    created () {
      this.getStarCount('alibaba/weex', res => {
        this.weexStar = res.ok ? res.data.stargazers_count : '(network error)'
      })
      this.getStarCount('vuejs/vue', res => {
        this.vueStar = res.ok ? res.data.stargazers_count : '(network error)'
      })
    }
  }
</script>


<style scoped>
  .wrapper {
    flex-direction: column;
    justify-content: center;
  }
  .group {
    flex-direction: row;
    justify-content: center;
    margin-bottom: 40px;
  }
  .title {
    font-size: 45px;
    color: #888888;
  }
  .count {
    font-size: 45px;
    font-weight: bold;
    margin-left: 12px;
    color: #41B883;
  }
</style>
```

[try it](../../examples/stream.html)