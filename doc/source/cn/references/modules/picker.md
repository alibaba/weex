---
title: picker
type: references
order: 3.11
version: 2.1
---

# picker

<span class="weex-version">v0.9+</span>

## 概述

以下为 picker 相关的 API，用于数据选择，日期选择，时间选择。（目前 H5 暂不支持该模块）

## API
### `pick(options, callback[options])`

调用单选 picker

#### 参数

- `options {Object}`：调用单选 picker 选项
  - `index {number}`：默认选中的选项
  - `items {array}`：picker 数据源

- `callback {function (ret)}`：执行完读取操作后的回调函数。`ret {Object}` 为 `callback` 函数的参数，有两个属性：
  - `result {string}`：结果三种类型 `success`, `cancel`, `error`
  - `data {number}`：选择的选项,仅成功确认时候存在。

### `pickDate(options, callback[options])`

调用 date picker

#### 参数

- `options {Object}`：调用 date picker 选项
  - `value {string}`：必选，date picker 选中的值，date 的字符串格式为`yyyy-MM-dd`
  - `max {string}`：可选，date 的最大值
  - `min {string}`：可选，date 的最小值

- `callback {function (ret)}`：执行完读取操作后的回调函数。`ret {Object}` 为 `callback` 函数的参数，有两个属性：
  - `result {string}`：结果三种类型 `success`, `cancel`, `error`
  - `data {string}`：选择的值 date 的字符，格式为 `yyyy-MM-dd`, 仅成功确认的时候存在。

### `pickTime(options, callback[options])`

调用 time picker

#### 参数

- `options {Object}`：调用 time picker 选项
  - `value {string}`：必选，time 格式为 `HH:mm`

- `callback {function (ret)}`：执行完读取操作后的回调函数。`ret {Object}` 为 `callback` 函数的参数，有两个属性：
  - `result {string}`：结果三种类型 `success`, `cancel`, `error`
  - `data {string}`：time 格式为 `HH:mm`, 仅成功确认的时候存在。

## 示例

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
