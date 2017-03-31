---
title: storage
type: references
order: 4.6
version: 0.10
---

# `storage` 本地存储 
<span class="weex-version">v0.7+</span>

**备注**：0.7及以上版本可用

`storage` 是一个在前端比较常用的模块，可以对本地数据进行存储、修改、删除，并且该数据是永久保存的，除非手动清除或者代码清除。但是，`storage` 模块有一个限制就是浏览器端（H5）只能存储小于5M的数据，因为在 H5/Web 端的实现是采用 `HTML5 LocalStorage API`。而 Android 和 iOS 这块是没什么限制的。
 storage 常用在一些被用户经常查询，但是又不频繁更新的数据，比如搜索历史、用户的订单列表等。搜索历史一般情况都是作为本地数据存储的，因此使用 storage 比较合适。而用户订单列表是需要本地存储和服务端器检索配合的场景。当一个用户下单后，会经常查阅个人的订单列表。但是，订单的列表数据不是频繁更新的，往往只有在收到货品时，才更新“已签收”，其余平时的状态是“已发货”。因此，可以使用 storage 存储订单列表，可以减少服务器的压力，例如减少 SQL 查询或者缓存的压力。当用户查看订单详情的时候，再更新数据状态。

这里，我们简单模拟“搜索”记录的场景。在搜索的时候写入，然后读取出来展示成列表。 

```html
<template>
  <div style="background-color:#F6F6F6;">
    <div class="search_view">
      <input class="search" placeholder="Please input" onchange="change"/>
      <text class="btn" onclick="search">Search</text>
    </div>
    <text class="item">History</text>
    <list>
      <cell repeat="(i, v) in items">
        <text class="item">{{v}}</text>
      </cell>  
    </list>  
  </div>
</template>

<style>
  .search_view{
    height:70;
    margin-top:20;
    margin-left:10;
    margin-right:10;
    flex-direction:row;
  }
  .search{
    height:70;
    border-width:1;
    border-color:#dddddd;
    padding-left:10;
    font-size:28;
    flex:1;
  }
  .btn{
    width:80;
    text-align:center;
    justify-content:center;
    font-size:28;
    background-color:#1A89EA;
    color:#ffffff;
  }
  .item{
    text-align:center;
    font-size:25;
    height:50;
    margin-top:10;
    color:#5E5E5E;
    border-bottom-width:1;
    border-bottom-color:#dddddd;
    justify-content:center;
  }
</style>

<script>
  var storage = require('@weex-module/storage');
  module.exports = {
    data: {
      items: [],
      keywords:''
    },
    created: function(){
      var that = this;
      storage.getAllKeys(function(e) {
        if(e.result == 'success' && e.data.length){
          e.data.forEach(function(item){
            if(item.indexOf('search_') > -1){
              that.items.push(item.split('search_')[1]);
            }
          });
        }
      });
    },
    methods:{
      search: function(){
      	var that = this;
      	if(!this.keywords) return;
        storage.setItem('search_' + this.keywords, this.keywords, function(e) {
        	that.items.push(that.keywords);
		 });
      },
      change: function(e){
        if(!e.value) return;
        this.keywords = e.value;
      }
    }
  };
</script>
```

[体验一下](http://dotwe.org/b0f9a8f5df916c91bfb39e54e03a9ba8)

这里，逐一解释下上面的代码。`input` 组件监听了 `change` 事件，可以保存用户输入的搜索关键字。如果用户点击了搜索按钮，则将关键字存储到 storage。这里，使用了 `search_` 作为 storage key 的前缀。因此，我们在页面加载时，在 `created` 生命周期中可以先使用 `storage.getAllKeys` 获取所有的 `key`。如果 `key` 包含了 `search_ `，则说明是搜索记录。因此，将该记录压入数组 items 中，于是界面就会展示出搜索记录的列表。

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

#### 示例

```javascript
var storage = require('@weex-module/storage')
storage.setItem('bar', 'bar-value', function (e) {
  e.result
  e.data
})
```

这里，对返回值做一个简单的介绍：

`e` 包含两个属性：`e.result` 和 `e.data`。如果 `e.result` 返回值是 “success”，则说明成功。`e.data` 返回 `undefined` 表示设置成功，返回 `invalid_param` 表示` key/value` 为 "" 或者 null。因此，你可以判断两个返回判断是否插入成功。

### `getItem(key, callback)`

传入键名返回对应的键值

#### 参数

* `key {string}`：要获取的值的名称，不允许是 `""` 或 `null`
* `callback {function (e)}`：执行操作成功后的回调
  * `e.result`：表示设置是否成功，如果成功返回 `"success"`
  * `e.data`：获取对应的键值字符串，如果没有找到则返回 `undefined`

#### 示例

```javascript
var storage = require('@weex-module/storage')
storage.getItem('foo', function (e) {
  e.data
});
```

### `removeItem(key, callback)`

传入一个键名将会删除本地存储中对应的键值

#### 参数

* `key {string}`：要删除的值的名称，不允许是 `""` 或 `null`
* `callback {function (e)}`：执行操作成功后的回调.
  * `e.result`：表示删除是否成功，如果成功返回 `"success"`
  * `e.data`：`undefined` 表示删除成功

#### 示例

```javascript
var storage = require('@weex-module/storage')
storage.removeItem('foo', function (e) {
  e.result
  e.data
})
```

### `length(callback)`

返回本地存储的数据中所有存储项数量的整数

#### 参数

* `callback {function (e)}`：执行操作成功后的回调
  * `e.result`：表示设置是否成功，如果成功返回 `"success"`
  * `e.data`：当前已存储项的数量

#### 示例

````javascript
var storage = require('@weex-module/storage')
storage.length(function (e) {
  e.result
  e.data
})
````

### `getAllKeys(callback)`

返回一个包含全部已存储项键名的数组

#### 参数

* `callback {function (e)}`：执行操作成功后的回调。
  * `e.result`：表示设置是否成功，如果成功返回 `"success"`
  * `e.data`：所有键名组成的数组

#### 示例

````javascript
var storage = require('@weex-module/storage')
storage.getAllKeys(function (e) {
  e.result
  e.data
})
````

## 其它参考

* [W3school: html5 localStorage](http://www.w3school.com.cn/html5/html_5_webstorage.asp)
* [storage 模块完整的 Demo](https://github.com/alibaba/weex/blob/dev/examples/module/storage-demo.we)
