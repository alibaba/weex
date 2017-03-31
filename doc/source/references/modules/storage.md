---
title: storage
type: references
order: 3.6
version: 2.1
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

### getItem(key, callback)

When passed a key name, will return that key's value.

#### Arguments

* `key`*(string)*:  the name of the key you want to retrieve the value of."" or null is not allowed.
* `callback`*(object)*: the callback function after executing this action.  

### removeItem(key, callback)

When passed a key name, will remove that key from the storage.

#### Arguments

* `key`*(string)*:  the name of the key you want to remove."" or null is not allowed.
* `callback`*(object)*: the callback function after executing this action.  

##### Example

```javascript
var storage = weex.requireModule('storage');
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

### getAllKeys(callback)

Returns an array that contains all keys stored in Storage object.

#### Arguments

* `callback`*(object)*: the callback function after executing this action.  

## Example

```html
<template>
  <div class="list">
    <div class="group center">
      <div class="panel"><text class="text">{{state}}</text></div>
    </div>
    <div class="group">
      <div class="panel"><text class="text" @click="setItem">set</text></div>
      <div class="panel"><text class="text" @click="getItem">get</text></div>
      <div class="panel"><text class="text" @click="removeItem">remove</text></div>
      <div class="panel"><text class="text" @click="getAll">all</text></div>
    </div>
  </div>
</template>

<script>
  const storage = weex.requireModule('storage')
  const modal = weex.requireModule('modal')

  export default {
    data () {
      return {
        keys: '[]',
        length: 0,
        state: '----'
      }
    },
    methods: {
      setItem () {
        storage.setItem('name', 'Hanks', event => {
          this.state = 'set success'
          console.log('set success')
        })
      },
      getItem () {
        storage.getItem('name', event => {
          console.log('get value:', event.data)
          this.state = 'value: ' + event.data
        })
      },
      removeItem () {
        storage.removeItem('name', event => {
          console.log('delete value:', event.data)
          this.state = 'deleted'
        })
      },
      getAll () {
        storage.getAllKeys(event => {
          // modal.toast({ message: event.result })
          if (event.result === 'success') {
            modal.toast({
              message: 'props: ' + event.data.join(', ')
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .panel {
    height: 100px;
    flex-direction: column;
    justify-content: center;
    border-width: 2px;
    border-style: solid;
    border-color: rgb(162, 217, 192);
    background-color: rgba(162, 217, 192, 0.2);
  }
  .group {
    flex-direction: row;
    justify-content: space-between;
    width: 650px;
    margin-left: 50px;
    margin-top: 50px;
    margin-bottom: 50px;
  }
  .center {
    justify-content: center;
  }
  .text {
    font-size: 50px;
    text-align: center;
    padding-left: 25px;
    padding-right: 25px;
    color: #41B883;
  }
  .small {
    font-size: 32px;
    padding-left: 35px;
    padding-right: 35px;
    color: #41B883;
  }
</style>
```

[try it](../../examples/storage.html)