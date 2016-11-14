<template>
  <div style="padding: 5px;">
    <text class="result">{{result}}</text>
    <div class="row">
      <text class="btn" @click="input">1</text>
      <text class="btn" @click="input">2</text>
      <text class="btn" @click="input">3</text>
      <text class="btn btn-operator" @click="input">+</text>
    </div>
    <div class="row">
      <text class="btn" @click="input">4</text>
      <text class="btn" @click="input">5</text>
      <text class="btn" @click="input">6</text>
      <text class="btn btn-operator" @click="input">-</text>
    </div>
    <div class="row">
      <text class="btn" @click="input">7</text>
      <text class="btn" @click="input">8</text>
      <text class="btn" @click="input">9</text>
      <text class="btn btn-operator" @click="input">*</text>
    </div>
    <div class="row">
      <text class="btn" @click="input">0</text>
      <text class="btn" @click="input">.</text>
      <text class="btn" @click="clear">AC</text>
      <text class="btn btn-operator" @click="calculate">=</text>
    </div>
  </div>
</template>

<style>
  .row {
    flex-direction: row;
  }

  .result {
    text-align: right;
    background-color: #666;
    font-size: 40px;
    color: white;
  }

  .btn {
    flex: 1;
    text-align: center;
    background-color: #eee;
    font-size: 36px;
  }

  .btn, .result {
    height: 100px;
    padding: 30px;
    margin: 5px;
  }

  .btn-operator {
    background-color: #669;
    font-size: 40px;
    color: white;
  }
</style>

<script>
  var OP = ['+', '-', '*', '/'];
  module.exports = {
    data: {
      result: '',
      inputs: []
    },
    methods: {
      input: function(e) {
        var value = e.target.attr['value'];
        var inputs = this.inputs;
        var lastOne = inputs.length ? inputs[inputs.length - 1] : '';
        if (OP.indexOf(lastOne) > -1 && OP.indexOf(value) > -1) {
          return;
        }
        inputs.push(value);
        var buf = [], char;
        for (var i = 0; i < inputs.length; i++) {
          char = inputs[i];
          if (OP.indexOf(char) > -1) {
            char = ' ' + char + ' ';
          }
          buf.push(char);
        }
        this.result = buf.join('');
      },
      calculate: function() {
        var result = eval(this.result);
        this.inputs = [result];
        this.result = result;
      },
      clear: function() {
        this.inputs = [];
        this.result = '';
      }
    }
  }
</script>
