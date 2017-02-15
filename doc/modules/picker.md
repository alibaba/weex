# picker

## Summary

A series of stream api. It provides function: pick data,pick date,pick time

## API
### `pick(options, callback[options])`

pick data(single column)

#### Arguments

- `options {Object}`:pick options
  - `index {number}`:default selected row
  - `items {array}`:picker's data

- `callback {function (ret)}`:the callback function after executing this action.`ret {Object}` is `callback` 's parameter:
  - `result {string}`:result is one of success,cancel,error
  - `data {number}`:the selected index,it exists when result is success.

#### Example

```html
<template>
  <scroller>
    <div title="picker module">
      <text style="margin-bottom: 20px;">pick value: {{value}}</text>
      <text type="default" size="small" value="single pick" onclick="pick" style="width: 180px;height: 50px; border-color: #26a4f4;font-color: #26a4f4;border-width: 2px"></text>
    </div>
  </scroller>
</template>


<script>
  module.exports = {
    data: {
      value: '',
      index: 0,
    },
    methods: {
      pick: function() {
        var picker = require('@weex-module/picker');
        var items = new Array("Saab","Volvo","BMW");
        var self = this;
        picker.pick({
          'items':items,
          'index':self.index
        },function (ret) {
          var result = ret.result;
          if(result == 'success')
          {
            self.value = items[ret.data];
            self.index = ret.data;
          }
        });
      },
    }
  }
</script>
```

[Have a try](http://dotwe.org/5213cb5cd40106401a93dbe724324400)

### `pickDate(options, callback[options])`

pick date

#### Arguments

- `options {Object}`:pick date options
  - `value {string}`:Required，date picker selected value by default，date's form is yyyy-MM-dd
  - `max {string}`:optional，date’s max value
  - `min {string}`:optional，date's min value

- `callback {function (ret)}`：the callback function after executing this action.ret {Object} is callback 's parameter:
  - `result {string}`:result is one of success,cancel,error
  - `data {string}`:the selected value，the  form of data is yyyy-MM-dd ,it exists when result is success.

#### Example

```html
<template>
  <scroller>
    <div title="picker module">
      <text style="margin-bottom: 20px;">pick value: {{value}}</text>
      <text type="default" size="small" value="pick date" onclick="pickDate" style="width: 180px;height: 50px; border-color: #26a4f4;font-color: #26a4f4;border-width: 2px"></text>
    </div>
  </scroller>
</template>

<script>
  module.exports = {
    data: {
      value: '',
      index: 0,
    },
    methods: {
      pickDate: function() {
        var picker = require('@weex-module/picker');
        var self = this;
        picker.pickDate({
          'value':'2016-11-28',
          'max':'2029-11-28',
          'min':'2015-11-28'
        },function (ret) {
          var result = ret.result;
          if(result == 'success')
          {
            self.value = ret.data;
          }
        });
      }
    }
  }
</script>
```

[Have a try](http://dotwe.org/2ee6fcdd3508db90c84185b40bf49ee3)

### `pickTime(options, callback[options])`

pick time

#### Arguments

- `options {Object}`:pick time options
  - `value {string}`:required，the form of value is HH:mm

- `callback {function (ret)}`:the callback function after executing this action.ret {Object} is callback 's parameter：
  - `result {string}`:result is one of success,cancel,error
  - `data {string}`:the selected value，the form of data is HH:mm,it exists when result is success.

#### Example

```html
<template>
  <scroller>
    <div title="picker module">
      <text style="margin-bottom: 20px;">pick value: {{value}}</text>
      <text type="default" size="small" value="pick time" onclick="pickTime" style="width: 180px;height: 50px; border-color: #26a4f4;font-color: #26a4f4;border-width: 2px"></text>
    </div>
  </scroller>
</template>

<style>
  .input {
    font-size: 60px;
    height: 80px;
    width: 400px;
  }
</style>

<script>
  module.exports = {
    data: {
      value: '',
      index: 0,
    },
    methods: {
      pickTime: function() {
        var picker = require('@weex-module/picker');
        var self = this;
        picker.pickTime({
          'value':'19:24'
        },function (ret) {
          var result = ret.result;
          if(result == 'success')
          {
            self.value = ret.data;
          }
        });
      }
    }
  }
</script>
```

[Have a try](http://dotwe.org/a9851d2773ac784729006d6b2add99c9)
