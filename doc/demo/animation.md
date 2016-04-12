Animation Demo
==============

## snapshot
![weex demo](http://gtms02.alicdn.com/tps/i2/TB19xUQMXXXXXc0XFXX0xzaVVXX-640-1112.gif)

## weex code
``` html
<template>
  <div class="container">
    <div class="btns">
      <text class="btn" onclick="rotate">Rotate</text>
      <text class="btn" onclick="scale">Scale</text>
      <text class="btn" onclick="color">BackgroundColor</text>
      <text class="btn" onclick="opacity">Opacity</text>
      <text class="btn" onclick="translate">Translate</text>
      <text class="btn" onclick="transform">Transform</text>
      <text class="btn" onclick="composite">All</text>
    </div>
    <div onclick="viewclick" id="block" class="block" style="transform-origin:{{transformOrigin}}">
      <text>Test</text>
    </div>
  </div>
</template>
<style>
  .block {
    position: absolute;
    width: 250;
    height: 250;
    top: 250;
    left: 250;
    background-color: #FF0000;
  }
  .btns {
    width: 750;
    flex-wrap: wrap;
    flex-direction: row;
  }
  .btn {
    margin-left: 5;
    margin-right: 5;
    margin-top: 10;
    background-color: #CCCCCC;
    padding-top: 5;
    padding-bottom: 5;
    padding-left: 5;
    padding-right: 5;

  }
</style>
<script>
  module.exports = {
    data: {
      transformOrigin: 'center center',
      current_rotate: 0,
      current_scale: 1,
      current_color: '#FF0000',
      current_opacity: 1,
      current_translate: '',
      current_transform: '',
      isStop: true
    },
    methods: {
      anim: function (styles, timingFunction, duration, callback) {
        this.$call('animation','transition', this._ids.block.el.ref, {
          styles: styles,
          timingFunction: timingFunction,
          duration: duration
        }, callback);
      },
      rotate: function () {
        var self = this;
        self.current_rotate += 90;
        self.anim({
          transform: 'rotate(' + self.current_rotate + 'deg)'
        }, 'ease-in-out', 500, function () {
          if (self.current_rotate === 360) {
            self.current_rotate = 0;
          } else {
            self.rotate();
          }
        });
      },
      translate: function () {
        this.current_translate = this.current_translate ? '' : 'translate(50%, 50%)';
        this.anim({
          transform: this.current_translate
        }, 'ease-in', 500, function (){});
      },
      scale: function () {
        var self = this;
        self.current_scale = self.current_scale === 2 ? .5 : 2
        self.anim({
          transform: 'scale(' + self.current_scale + ')'
        }, 'linear', 500, function () {});
      },
      transform: function () {
        var self = this;
        this.current_transform = this.current_transform ? '' : 'rotate(45deg) scale(1.5)';
        this.anim({
          transform: this.current_transform,
          transformOrigin: 'left top'
        }, 'ease-out', 500, function(){
          if (self.current_transform !== '') {
            self.anim({
              transform: 'rotate(90deg) scale(3.5)',
              transformOrigin: 'left top'
            }, 'ease-out', 500, function(){})
          } else {

          }
        });
      },
      composite: function () {
        var self = this;
        self.current_transform = self.current_transform ? '' : 'rotate(45deg) scale(1.5) translate(50%, 50%)';
        self.current_color = self.current_color === '#FF0000' ? '#FFFF00' : '#FF0000';
        self.current_opacity = self.current_opacity === 1 ? 0.1 : 1;
        this.anim({
          transform: this.current_transform,
          transformOrigin: 'left top',
          backgroundColor: self.current_color,
          opacity: self.current_opacity
        }, 'ease-out', 1000, function(){});
      },
      color: function () {
        var self = this;
        self.current_color = self.current_color === '#FF0000' ? '#FFFF00' : '#FF0000';
        self.anim({
          backgroundColor: self.current_color
        }, 'linear', 500, function () {});
      },
      opacity: function () {
        var self = this;
        self.current_opacity = self.current_opacity === 1 ? 0.1 : 1;
        self.anim({
          opacity: self.current_opacity
        }, 'linear', 500, function () {});
      },
      viewclick: function() {
        nativeLog('@@@@@@@');
        this.$call('modal','alert',{
          'message':'111',
          'okTitle':'2222',
          'cancelTitle':'322222333'
        }, function() {
        });
      },

      ready: function () {
      }
    }
  };
</script>
```


