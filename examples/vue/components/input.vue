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
  module.exports = {
    data: {
      txtInput: '',
      txtChange: ''
    },
    components: {
      panel: require('weex-vue-components/panel.vue')
    },
    methods: {
      onchange: function(event) {
        this.txtChange = event.value;
        console.log('onchange', event.value);
      },
      oninput: function(event) {
        this.txtInput = event.value;
        console.log('oninput', event.value);
      }
    }
  };
</script>
