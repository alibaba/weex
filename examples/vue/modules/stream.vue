<template>
  <scroller>
    <panel title="stream.fetch" type="primary">
      <panel title="method = GET">
        <text>{{getResult}}</text>
      </panel>
      <panel title="method = GET / type = jsonp">
        <text>{{getJsonpResult}}</text>
      </panel>
      <panel title="method = POST">
        <text>{{postResult}}</text>
      </panel>
      <panel title="method = PUT">
        <text>{{putResult}}</text>
      </panel>
      <panel title="method = DELETE">
        <text>{{deleteResult}}</text>
      </panel>
      <panel title="method = HEAD">
        <text>{{headResult}}</text>
      </panel>
      <panel title="method = PATCH">
        <text>{{patchResult}}</text>
      </panel>
    </panel>
  </scroller>
</template>

<script>
  var stream = weex.requireModule('stream');
  module.exports = {
    data: function () {
      return {
        getJsonpResult: 'loading...',
        getResult: 'loading...',
        postResult: 'loading...',
        putResult: 'loading...',
        deleteResult: 'loading...',
        headResult: 'loading...',
        patchResult: 'loading...'
      }
    },
    components: {
      panel: require('../include/panel.vue')
    },
    created: function() {
      var me = this;
      var GET_URL_JSONP = 'http://jsfiddle.net/echo/jsonp/?callback=anything&result=content_in_response';
      var GET_URL = 'http://httpbin.org/get';
      var POST_URL = 'http://httpbin.org/post';
      var PUT_URL = 'http://httpbin.org/put';
      var DELETE_URL = 'http://httpbin.org/delete';
      var HEAD_URL = 'http://httpbin.org/status/418';
      var PATCH_URL = 'http://httpbin.org/patch';

      stream.fetch({
        method: 'GET',
        url: GET_URL_JSONP,
        type:'jsonp'
      }, function(ret) {
        if(!ret.ok){
          me.getJsonpResult = "request failed";
        }else{
          console.log('get:'+ret);
          me.getJsonpResult =  JSON.stringify(ret.data);
        }
      },function(response){
        console.log('get jsonp in progress:'+response.length);
        me.getJsonpResult = "bytes received:"+response.length;
      });

      stream.fetch({
        method: 'GET',
        url: GET_URL,
        type:'json'
      }, function(ret) {
        if(!ret.ok){
          me.getResult = "request failed";
        }else{
          console.log('get:'+ret);
          me.getResult = JSON.stringify(ret.data);
        }
      },function(response){
        console.log('get in progress:'+response.length);
        me.getResult = "bytes received:"+response.length;
      });

      stream.fetch({
        method: 'POST',
        url: POST_URL,
        type:'json'
      }, function(ret) {
        if(!ret.ok){
          me.postResult = "request failed";
        }else{
          console.log('get:'+JSON.stringify(ret));
          me.postResult = JSON.stringify(ret.data);
        }
      },function(response){
        console.log('get in progress:'+response.length);
        me.postResult = "bytes received:"+response.length;
      });

      stream.fetch({
        method: 'PUT',
        url: PUT_URL,
        type:'json'
      }, function(ret) {
        if(!ret.ok){
          me.putResult = "request failed";
        }else{
          console.log('get:'+JSON.stringify(ret));
          me.putResult = JSON.stringify(ret.data);
        }
      },function(response){
        console.log('get in progress:'+response.length);
        me.putResult = "bytes received:"+response.length;
      });

      stream.fetch({
        method: 'DELETE',
        url: DELETE_URL,
        type:'json'
      }, function(ret) {

        if(!ret.ok){
          me.deleteResult = "request failed";
        }else{
          console.log('get:'+JSON.stringify(ret));
          me.deleteResult = JSON.stringify(ret.data);
        }
      },function(response){
        console.log('get in progress:'+response.length);
        me.deleteResult = "bytes received:"+response.length;
      });

      stream.fetch({
        method: 'HEAD',
        url: HEAD_URL,
        type:'json'
      }, function(ret) {
        if(ret.statusText !== 'I\'m a teapot'){
          me.headResult = "request failed";
        }else{
          console.log('get:'+JSON.stringify(ret));
          me.headResult = ret.statusText;
        }
      },function(response){
        console.log('get in progress:'+response.length);
        me.headResult = "bytes received:"+response.length;
      });

      stream.fetch({
        method: 'PATCH',
        url: PATCH_URL,
        type:'json'
      }, function(ret) {
        if(!ret.ok){
          me.patchResult = "request failed";
        }else{
          console.log('get:'+JSON.stringify(ret));
          me.patchResult = JSON.stringify(ret.data);
        }
      },function(response){
        console.log('get in progress:'+response.length);
        me.patchResult = "bytes received:"+response.length;
      });
    }
  };
</script>
