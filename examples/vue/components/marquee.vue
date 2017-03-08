<template>
  <scroller>
    <panel title="Marquee" type="primary">
      <marquee
        :step="marquee.height * 2"
        :count="marquee.list.length"
        :interval="marquee.interval"
        :duration="marquee.duration"
        :style="{
          width: 700,
          height: marquee.height * 2,
          backgroundColor: 'rgb(223, 240, 216)',
          borderRadius: 8,
          paddingLeft: 10,
          paddingRight: 10
        }"
        @change="marqueeChange">
        <div
          v-for="(item,i) in marquee.list"
          :key="i"
          :style="{
            height: marquee.height * marquee.length,
            paddingTop: marquee.height * 0.5,
            paddingBottom: marquee.height * 0.5,
            overflow: 'hidden'
          }">
          <text
            :style="{
              height: marquee.height,
              color: 'rgb(60, 118, 61)',
              fontSize: 28
            }">{{item.text}}</text>
        </div>
      </marquee>
    </panel>
  </scroller>
</template>

<script>
  module.exports = {
    data: function () {
      return {
        marquee: {
          height: 30,
          duration: 1500,
          interval: 2000,
          list: [
            {text: 'Introducing Bots on Messenger'},
            {text: 'Capturing 3D 360-Stereo VR Video'},
            {text: 'The Future of Video on Facebook'},
            {text: 'Announcing Vue.js 2.0'},
            {text: 'Not Your Average Virtual-DOM'},
            {text: 'Templates, JSX, or Hyperscript?'}
          ]
        }
      }
    },
    components: {
      panel: require('../include/panel.vue'),
      marquee: require('../include/marquee.vue')
    },
    methods: {
      marqueeChange: function (e) {
        console.log(e)
      }
    }
  }
</script>
