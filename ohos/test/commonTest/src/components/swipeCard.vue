<style>
.container {
  background-color: #eeeeee;
}
.border {
  height: 800px;
  padding-left: 35px;
  padding-right: 35px;
  padding-top: 100px;
}
.box {
  width: 680px;
  height: 450px;
  background-color: #651fff;
}
.head {
  background-color: #651fff;
  width: 680px;
  height: 120px;
  flex-direction: row;
  align-items: center;
}
.content {
  width: 680px;
  height: 240px;
  background-color: #651fff;
  padding-left: 24px;
  padding-top: 24px;
  padding-right: 24px;
  box-sizing: border-box;
}
.footer {
  width: 680px;
  height: 90px;
  background-color: #fff;
  align-items: center;
  justify-content: flex-end;
  padding-right: 25px;
  flex-direction: row;
  box-sizing: border-box;
}
.action {
  font-size: 35px;
  padding-right: 20px;
}
.desc {
  font-size: 32px;
  color: #fff;
  padding-left: 24px;
}
.avatar {
  width: 96px;
  height: 96px;
  border-radius: 48px;
  background-color: #cddc39;
  margin-left: 36px;
  margin-right: 48px;
}
.username {
  color: #fff;
  font-size: 32px;
}
</style>

<template>
  <div class="container">
    <div class="border">
      <div ref="my" class="box" @horizontalpan="touchStart">
        <div class="head">
          <div class="avatar" />
          <text class="username">HACKER</text>
        </div>

        <div class="content">
          <text class="desc"
            >Google announced a new version of Nearby Connections for fully
            offline.high bandwidth peer to peer device communications.</text
          >
        </div>

        <div class="footer">
          <text class="action">SHARE</text>
          <text class="action" style="color: #7c4dff">EXPLORE</text>
        </div>
      </div>
    </div>

    <div style="width: 750; align-items: center; justify-content: center">
      <text style="font-size: 40">Swipeable Card</text>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Binding from 'weex-bindingx';
// import { isIos } from '../utils/index';
// import { xlog } from '../utils/jsapi.js';
import { isIos, xlog } from '@/utils/jsapi.js';
export default {
  data() {
    return {
      x: 0,
      y: 0,
      isInAnimation: false,
      gesToken: 0,
      opacity: 1,
    };
  },
  mounted() {
    // var my = this.getEl(this.$refs.my);
    // Binding.prepare && Binding.prepare({
    //   anchor: my,
    //   eventType: 'pan'
    // })
    // iOS第一次不触发手势事件
    if (isIos) {
      this.touchStart();
    }
  },
  methods: {
    getEl: function (e) {
      return e.ref;
    },
    touchStart: function (e) {
      var self = this;
      if (this.isInAnimation === true) {
        xlog.log('we are in animation, drop pan gesture...');
        if (this.gesToken) {
          Binding.unbind({
            eventType: 'pan',
            token: self.gesToken,
          });
          this.gesToken = undefined;
        }
        return;
      }
      var my = this.getEl(this.$refs.my);
      var translate_x_origin = 'x+0';
      var opacity_x_origin = '1-abs(x)/600';
      var gesTokenObj = Binding.bind(
        {
          anchor: my,
          eventType: 'pan',
          props: [
            {
              element: my,
              property: 'transform.translateX',
              expression: translate_x_origin,
            },
            {
              element: my,
              property: 'opacity',
              expression: opacity_x_origin,
            },
          ],
        },
        function (e) {
          if (e.state === 'end') {
            self.x += e.deltaX;
            self.y += e.deltaY;
            self.opacity = 1 - Math.abs(e.deltaX) / 600;
            // anim
            self.bindTiming();
          }
        },
      );
      self.gesToken = gesTokenObj.token;
    },
    bindTiming: function () {
      this.isInAnimation = true;
      var my = this.getEl(this.$refs.my);
      var self = this;
      // should equal with timing duration
      var exit_origin = 't>1000';
      var changed_x;
      var final_x;
      var final_opacity;
      var translate_x_origin;
      var shouldDismiss = false;
      if (self.x >= -750 / 2 && self.x <= 750 / 2) {
        shouldDismiss = false;
        final_x = 0;
        changed_x = 0 - self.x;
        final_opacity = 1;
        translate_x_origin = `easeOutElastic(t,${self.x},${changed_x},1000)`;
      } else if (self.x < -750 / 2) {
        shouldDismiss = true;
        final_x = -750;
        changed_x = -750 - self.x;
        final_opacity = 0;
        translate_x_origin = `easeOutExpo(t,${self.x},${changed_x},1000)`;
      } else {
        // x > 750/2
        final_x = 750;
        shouldDismiss = true;
        changed_x = 750 - self.x;
        final_opacity = 0;
        translate_x_origin = `easeOutExpo(t,${self.x},${changed_x},1000)`;
      }
      var changed_opacity = final_opacity - self.opacity;
      var opacity_origin = `linear(t,${self.opacity},${changed_opacity},1000)`;
      var result = Binding.bind(
        {
          eventType: 'timing',
          exitExpression: exit_origin,
          props: [
            {
              element: my,
              property: 'transform.translateX',
              expression: translate_x_origin,
            },
            {
              element: my,
              property: 'opacity',
              expression: opacity_origin,
            },
          ],
        },
        function (e) {
          if (e.state === 'end' || e.state === 'exit') {
            // reset x
            self.x = final_x;
            self.isInAnimation = false;
            if (shouldDismiss) {
              // remove card from hierarchy
            }
          }
        },
      );
    },
  },
};
</script>
