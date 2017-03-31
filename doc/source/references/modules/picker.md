---
title: picker
type: references
order: 3.11
version: 2.1
---

# picker

<span class="weex-version">v0.9+</span>

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

### `pickTime(options, callback[options])`

pick time

#### Arguments

- `options {Object}`:pick time options
  - `value {string}`:required，the form of value is HH:mm

- `callback {function (ret)}`:the callback function after executing this action.ret {Object} is callback 's parameter：
  - `result {string}`:result is one of success,cancel,error
  - `data {string}`:the selected value，the form of data is HH:mm,it exists when result is success.

## Example

```html
<template>
  <div class="wrapper">
    <div class="group">
      <text class="label">Time: </text>
      <text class="title">{{value}}</text>
    </div>
    <div class="group">
      <text class="button" @click="pickTime">Pick Time</text>
    </div>
  </div>
</template>

<script>
  const picker = weex.requireModule('picker')

  export default {
    data () {
      return {
        value: ''
      }
    },
    methods: {
      pickTime () {
        picker.pickTime({
          value: this.value
        }, event => {
          if (event.result === 'success') {
            this.value = event.data
          }
        })
      }
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
    align-items: center;
  }
  .label {
    font-size: 40px;
    color: #888888;
  }
  .title {
    font-size: 80px;
    color: #41B883;
  }
  .button {
    font-size: 36px;
    width: 280px;
    color: #41B883;
    text-align: center;
    padding-top: 25px;
    padding-bottom: 25px;
    border-width: 2px;
    border-style: solid;
    border-color: rgb(162, 217, 192);
    background-color: rgba(162, 217, 192, 0.2);
  }
</style>
```