<template>
  <navpage
    dataRole="none"
    :height="navBarHeight"
    :title="title"
    backgroundColor="#ff5898"
    titleColor="white"
    leftItemTitle="More"
    leftItemColor="white"
    rightItemSrc="http://gtms02.alicdn.com/tps/i2/TB1ED7iMpXXXXXEXXXXWA_BHXXX-48-48.png"
    @naviBarLeftItemClick="naviBarLeftItemClick"
    @naviBarRightItemClick="naviBarRightItemClick">
    <panel title="push a new page">
      <button type="primary" size="small" value="push" @click.native="push"></button>
    </panel>
    <panel title="pop to the last page">
      <button type="success" size="small" value="pop" @click.native="pop"></button>
    </panel>
  </navpage>
</template>

<script>
  var navigator = require('@weex-module/navigator')
  var getBaseURL = require('../include/base-url.js').getBaseURL
  module.exports = {
    data: function () {
      return {
        navBarHeight: 88,
        title: 'Navigator',
        dir: 'examples',
        baseURL: ''
      }
    },
    components: {
      panel: require('../include/panel.vue'),
      navpage: require('../include/navpage.vue'),
      button: require('../include/button.vue')
    },
    created: function() {
      this.$getConfig(function (config) {
        var env = config.env;
        if(env.platform == 'iOS'){
          var scale = env.scale;
          var deviceWidth = env.deviceWidth / scale;
          this.navBarHeight = 64.0 * 750.0 / deviceWidth;
        }
      }.bind(this));
      this.baseURL = getBaseURL(this)
    },
    methods: {
      naviBarLeftItemClick: function (e) {
        modal.toast({ message: 'naviBarLeftItemClick', duration: 2 })
      },
      naviBarRightItemClick: function (e) {
        modal.toast({ message: 'naviBarRightItemClick', duration: 2 })
      },
      push: function () {
        var params = {
          'url':  this.baseURL + 'vue/components/navigator.js?test=1',
          'animated' : 'true',
        }
        navigator.push(params, function () {});
      },
      pop: function () {
        var params = {
          'url':  this.baseURL + 'vue/components/navigator.js?test=1',
          'animated' : 'true',
        }
        navigator.pop(params, function () {});
      },
    }
  }
</script>
