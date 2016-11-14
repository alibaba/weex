<template>
  <div>
    <text class="title1">Assets: &#xe606;&#xe605;&#xe604;&#xe603;&#xe602;&#xe601;&#xe600;</text>
    <text class="title2">http ttf: &#xe606;&#xe605;&#xe604;&#xe603;&#xe602;&#xe601;&#xe600;</text>
    <text class="title3">http woff: &#xe606;&#xe605;&#xe604;&#xe603;&#xe602;&#xe601;&#xe600;</text>
    <text class="title4">file: &#xe606;&#xe605;&#xe604;&#xe603;&#xe602;&#xe601;&#xe600;</text>
  </div>

</template>
<style>
  .title1 {
    color: red;
    font-size: 36;
    font-family: iconfont1;
  }

  .title2 {
    color: red;
    font-size: 36;
    font-family: iconfont2;
  }

  .title3 {
    color: red;
    font-size: 36;
    font-family: iconfont3;
  }

  .title4 {
    color: red;
    font-size: 36;
    font-family: iconfont4;
  }
</style>

<script>
  var domModule = require('@weex-module/dom');
  module.exports = {
    created: function() {
      //目前支持ttf、woff文件，不支持svg、eot类型
      domModule.addRule('font-face', {
        'font-family': "iconfont1",
        'src' : "url('iconfont.ttf')"
      });
      domModule.addRule('font-face', {
        'font-family': "iconfont2",
        'src': "url('http://at.alicdn.com/t/font_1469606063_76593.ttf')"
      });
      domModule.addRule('font-face', {
        'font-family': "iconfont3",
        'src': "url('http://at.alicdn.com/t/font_1469606522_9417143.woff')"
      });
      domModule.addRule('font-face', {
        'font-family': "iconfont4",
        'src': "url('file:///storage/emulated/0/Android/data/com.alibaba.weex/cache/http:__at.alicdn.com_t_font_1469606063_76593.ttf')"
      });
    }
  }
</script>
