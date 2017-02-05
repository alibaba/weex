<template>
  <scroller>
    <panel title="input" type="primary">
      <input
        type="text"
        placeholder="Text Input"
        class="input"
        autofocus="true"
        value=""
        @change="onchange"
        @input="oninput"
      />
      <text>oninput: {{txtInput}}</text>
      <text>onchange: {{txtChange}}</text>
    </panel>
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
  var modal = require('@weex-module/modal')
  module.exports = {
    data: function () {
      return {
        txtInput: '',
        txtChange: ''
      }
    },
    components: {
      panel: require('../include/panel.vue')
    },
    methods: {
      onchange: function(event) {
        this.txtChange = event.value;
        modal.toast({
          message: 'onchange: ' + event.value,
          duration: 2
        })
      },
      oninput: function(event) {
        this.txtInput = event.value;
        modal.toast({
          message: 'onitput: ' + event.value,
          duration: 1
        })
      }
    }
  };
</script>
