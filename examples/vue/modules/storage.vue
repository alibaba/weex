<template>
  <scroller>
    <panel title="storage API" type="primary">
      <panel title="setItem">
        <text>{{setItemResult}}</text>
      </panel>
      <panel title="getItem">
        <text>{{getItemResult}}</text>
      </panel>
      <panel title="length">
        <text>{{lengthResult}}</text>
      </panel>
      <panel title="getAllKeys">
        <text>{{getAllKeysResult}}</text>
      </panel>
      <panel title="removeItem">
        <text>{{removeItemResult}}</text>
      </panel>
    </panel>
  </scroller>
</template>


<script>
  var storage = weex.requireModule('storage')
  module.exports = {
    data: function () {
      return {
        setItemResult:'loading',
        getItemResult:'loading',
        removeItemResult:'loading',
        lengthResult:'loading',
        getAllKeysResult:'loading'
      }
    },
    components: {
      panel: require('../include/panel.vue')
    },
    created: function() {
      var me = this

      //setItem
      storage.setItem('foo','foo-value',function(e){
        console.log('set [foo<->foo-value]:'+JSON.stringify(e))
        me.setItemResult = 'foo:'+JSON.stringify(e)+'\n'
      })
      storage.setItem('bar','bar-value',function(e){
        console.log('set [bar<->bar-value]:'+JSON.stringify(e))
        me.setItemResult = me.setItemResult + 'bar:'+JSON.stringify(e)
      })

      //getItem
      storage.getItem('foo',function(e){
        console.log('get foo result:'+JSON.stringify(e))
        me.getItemResult = 'get foo,value is '+e.data+'\n'
      })
      storage.getItem('bar',function(e){
        console.log('get bar result:'+JSON.stringify(e))
        me.getItemResult += 'get bar,value is '+e.data
      })

      //length
      storage.length(function(e){
        console.log('length:'+JSON.stringify(e))
        me.lengthResult = 'current length is ' + e.data
      })

      //getAllKeys
      storage.getAllKeys(function(e){
        console.log('getAllKeys:'+JSON.stringify(e))
        me.getAllKeysResult = '' + e.data
        //me.getAllKeysResult +=' '+ typeof e.data
      })

      //removeItem
      storage.removeItem('foo',function(e){
        console.log('remove foo:'+JSON.stringify(e))
        me.removeItemResult = 'remove item foo '+e.result
      })
    }
  }
</script>
