---
title: storage
type: references
order: 3.6
version: 2.1
---

# `storage` 本地存储

<span class="weex-version">v0.7+</span>

**备注**：0.7及以上版本可用

`storage` 是一个在前端比较常用的模块，可以对本地数据进行存储、修改、删除，并且该数据是永久保存的，除非手动清除或者代码清除。但是，`storage` 模块有一个限制就是浏览器端（H5）只能存储小于5M的数据，因为在 H5/Web 端的实现是采用 `HTML5 LocalStorage API`。而 Android 和 iOS 这块是没什么限制的。
 storage 常用在一些被用户经常查询，但是又不频繁更新的数据，比如搜索历史、用户的订单列表等。搜索历史一般情况都是作为本地数据存储的，因此使用 storage 比较合适。而用户订单列表是需要本地存储和服务端器检索配合的场景。当一个用户下单后，会经常查阅个人的订单列表。但是，订单的列表数据不是频繁更新的，往往只有在收到货品时，才更新“已签收”，其余平时的状态是“已发货”。因此，可以使用 storage 存储订单列表，可以减少服务器的压力，例如减少 SQL 查询或者缓存的压力。当用户查看订单详情的时候，再更新数据状态。

## API

`storage` 提供了一系列的 API 供我们调用。我们只需要引入该模块，然后调用对应的 API 即可。

### `setItem(key, value, callback)`

该方法可以通过键值对的形式将数据存储到本地。同时可以通过该方法，更新已有的数据。

#### 参数

* `key {string}`：要存储的键，不允许是 `""` 或 `null`
* `value {string}`：要存储的值，不允许是 `""` 或 `null`
* `callback {function (e)}`：执行操作成功后的回调
  * `e.result`：表示设置是否成功，如果成功返回 `"success"`
  * `e.data`：`undefined` 表示设置成功，`invalid_param` 表示 key/value 为 `""` 或者 `null`

这里，对返回值做一个简单的介绍：

`e` 包含两个属性：`e.result` 和 `e.data`。如果 `e.result` 返回值是 “success”，则说明成功。`e.data` 返回 `undefined` 表示设置成功，返回 `invalid_param` 表示` key/value` 为 "" 或者 null。因此，你可以判断两个返回判断是否插入成功。

### `getItem(key, callback)`

传入键名返回对应的键值

#### 参数

* `key {string}`：要获取的值的名称，不允许是 `""` 或 `null`
* `callback {function (e)}`：执行操作成功后的回调
  * `e.result`：表示设置是否成功，如果成功返回 `"success"`
  * `e.data`：获取对应的键值字符串，如果没有找到则返回 `undefined`

### `removeItem(key, callback)`

传入一个键名将会删除本地存储中对应的键值

#### 参数

* `key {string}`：要删除的值的名称，不允许是 `""` 或 `null`
* `callback {function (e)}`：执行操作成功后的回调.
  * `e.result`：表示删除是否成功，如果成功返回 `"success"`
  * `e.data`：`undefined` 表示删除成功

### `length(callback)`

返回本地存储的数据中所有存储项数量的整数

#### 参数

* `callback {function (e)}`：执行操作成功后的回调
  * `e.result`：表示设置是否成功，如果成功返回 `"success"`
  * `e.data`：当前已存储项的数量


### `getAllKeys(callback)`

返回一个包含全部已存储项键名的数组

#### 参数

* `callback {function (e)}`：执行操作成功后的回调。
  * `e.result`：表示设置是否成功，如果成功返回 `"success"`
  * `e.data`：所有键名组成的数组

## 示例

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

[try it](../../../examples/storage.html)

## 其它参考

* [W3school: html5 localStorage](http://www.w3school.com.cn/html5/html_5_webstorage.asp)
* [storage 模块完整的 Demo](https://github.com/alibaba/weex/blob/dev/examples/module/storage-demo.we)
