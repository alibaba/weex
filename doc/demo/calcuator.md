Weex Calcuator Demo
===================

## snapshot
![weex demo](http://gtms03.alicdn.com/tps/i3/TB1pQENMXXXXXaLXVXXkIFHLVXX-624-1105.jpg)

## weex code
``` html
<template>
  <container style="background-color: #202020; padding-bottom:5;">
    <text class="result" id="result">{{bindResult()}}</text>
    <container style="flex-direction: row">
      <text class="number" onclick="handler" id="1">1</text>
      <text class="number" onclick="handler" id="2">2</text>
      <text class="number" onclick="handler">3</text>
      <text class="operator" onclick="handler">+</text>
    </container>
    <container style="flex-direction: row">
      <text class="number" onclick="handler">4</text>
      <text class="number" onclick="handler">5</text>
      <text class="number" onclick="handler">6</text>
      <text class="operator" onclick="handler">-</text>
    </container>
    <container style="flex-direction: row">
      <text class="number" onclick="handler">7</text>
      <text class="number" onclick="handler">8</text>
      <text class="number" onclick="handler">9</text>
      <text class="operator" onclick="handler">*</text>
    </container>
    <container style="flex-direction: row">
      <text class="number" onclick="handler">0</text>
      <text class="number" onclick="handler">.</text>
      <text class="number" onclick="clear">AC</text>
      <text class="operator" onclick="calculate">=</text>
    </container>
  </container>
</template>

<style>
  .number {
    background-color: #D5D6D8;
    flex: 1;
    text-align: center;
    height: 100;
    padding: 30;
    margin: 5;
  }
  .operator {
    background-color: #F78D2A;
    flex: 1;
    text-align: center;
    height: 100;
    padding: 30;
    margin: 5;
  }
  .result {
    color: #ffffff;
    background-color: #202020;
    text-align: right;
    height: 100;
    padding: 30;
    margin: 5;
  }
</style>

<script>
  module.exports = {
    data: {
      result: ''
    },
    methods: {
      bindResult: function () {
        return this.result;
      },
      handler: function (e) {
        var value = e.target.attr["value"];
        this.result = this.result + value;
      },
      calculate: function(e) {
        var result = eval(this.result);
        this.result = this.result + " = " + result;
      },
      clear: function(e) {
        this.result = "";
      }
    }
  }
</script>
```


