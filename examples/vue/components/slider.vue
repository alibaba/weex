<template>
  <scroller class="body">
    <panel title="auto-play" type="primary">
      <panel title="auto-play = false" padding-body="0">
        <slider class="slider" append="tree"
          :interval="sliders[1].interval"
          autoPlay="false">
          <indicator class="indicator"></indicator>
          <slider-page v-for="(v,i) in sliders[1].sliderPages" :items="v.items" :key="i"></slider-page>
        </slider>
      </panel>
      <panel title="auto-play = true" padding-body="0">
        <slider class="slider" append="tree"
          :interval="sliders[0].interval"
          :autoPlay="sliders[0].autoPlay">
          <indicator class="indicator"></indicator>
          <slider-page v-for="v in sliders[0].sliderPages" :key="v.index" :items="v.items"></slider-page>
        </slider>
      </panel>
    </panel>
    <panel :title="'Event, ' + eventCnt + ' change'" type="primary">
      <slider class="slider" append="tree"
        :interval="sliders[0].interval"
        :autoPlay="sliders[0].autoPlay"
        @change="handleSliderChange">
        <indicator class="indicator"></indicator>
        <slider-page v-for="v in sliders[0].sliderPages" :key="v.index" :items="v.items"></slider-page>
      </slider>
    </panel>
    <panel title="Indicator" type="primary">
      <panel title="default style" padding-body="0">
        <slider class="slider" append="tree"
          :interval="sliders[0].interval"
          :autoPlay="sliders[0].autoPlay"
          @change="handleSliderChange">
          <indicator class="indicator"></indicator>
          <slider-page v-for="v in sliders[0].sliderPages" :key="v.index" :items="v.items"></slider-page>
        </slider>
      </panel>
      <panel title="width & height" padding-body="0">
        <slider class="slider" append="tree"
          :interval="sliders[0].interval"
          :autoPlay="sliders[0].autoPlay">
          <indicator style="itemColor: #dddddd;width:714px;height:460px;"></indicator>
          <slider-page v-for="v in sliders[0].sliderPages" :key="v.index" :items="v.items"></slider-page>
        </slider>
      </panel>
      <panel title="left & top" padding-body="0">
        <slider class="slider" append="tree"
          :interval="sliders[1].interval"
          :autoPlay="sliders[1].autoPlay">
          <indicator class="indicator" style="top:-140px;left:-240px"></indicator>
          <slider-page v-for="(v,i) in sliders[1].sliderPages" :items="v.items" :key="i"></slider-page>
        </slider>
      </panel>
      <panel title="itemColor & itemSelectedColor" padding-body="0">
        <slider class="slider" append="tree"
          :interval="sliders[2].interval"
          :autoPlay="sliders[2].autoPlay">
          <indicator class="indicator" style="item-selected-color:rgb(217, 83, 79);"></indicator>
          <slider-page v-for="v in sliders[2].sliderPages" :key="v.index" :items="v.items"></slider-page>
        </slider>
      </panel>
      <panel title="itemSize" padding-body="0">
        <slider class="slider" append="tree"
          :interval="sliders[1].interval"
          :autoPlay="sliders[1].autoPlay">
          <indicator style="itemColor: #dddddd;item-size:40px;top:140px;left:180px;width:700px;height:380px;"></indicator>
          <slider-page v-for="(v,i) in sliders[1].sliderPages" :items="v.items" :key="i"></slider-page>
        </slider>
      </panel>
    </panel>
  </scroller>
</template>

<script>
  var img0 = '//gw.alicdn.com/tps/i2/TB1DpsmMpXXXXabaXXX20ySQVXX-512-512.png_400x400.jpg';
  var img1 = '//gw.alicdn.com/tps/i1/TB1M3sQMpXXXXakXXXXApNeJVXX-360-360.png';
  module.exports = {
    data: function () {
      return {
        eventCnt: 0,
        togglePlayMsg: 'pause',
        sliders: [
          {
            interval: 1000,
            autoPlay: true,
            sliderPages: [
              {
                items: [
                  {
                    image: img0,
                    link: '//h5.m.taobao.com/1'
                  },
                  {
                    image: img0,
                    link: '//h5.m.taobao.com/1'
                  }
                ]
              },
              {
                items: [
                  {
                    image: img1,
                    link: '//h5.m.taobao.com/1'
                  },
                  {
                    image: img1,
                    link: '//h5.m.taobao.com/1'
                  }
                ]
              },
              {
                items: [
                  {
                    image: img0,
                    link: '//h5.m.taobao.com/1'
                  },
                  {
                    image: img1,
                    link: '//h5.m.taobao.com/1'
                  }
                ]
              }
            ]
          },
          {
            interval: 3000,
            autoPlay: true,
            sliderPages: [
              {
                items: [
                {
                  image: img0,
                  link: '//h5.m.taobao.com/1'
                },
                {
                  image: img0,
                  link: '//h5.m.taobao.com/1'
                }
                ]
              },
              {
                items: [
                {
                  image: img1,
                  link: '//h5.m.taobao.com/1'
                },
                {
                  image: img1,
                  link: '//h5.m.taobao.com/1'
                }
                ]
              },
              {
                items: [
                {
                  image: img0,
                  link: '//h5.m.taobao.com/1'
                },
                {
                  image: img1,
                  link: '//h5.m.taobao.com/1'
                }
                ]
              }
              ]
            },
            {
              interval: 5000,
              autoPlay: true,
              sliderPages: [
              {
                items: [
                {
                  image: img0,
                  link: '//h5.m.taobao.com/1'
                },
                {
                  image: img0,
                  link: '//h5.m.taobao.com/1'
                }
                ]
              },
              {
                items: [
                {
                  image: img1,
                  link: '//h5.m.taobao.com/1'
                },
                {
                  image: img1,
                  link: '//h5.m.taobao.com/1'
                }
                ]
              },
              {
                items: [
                {
                  image: img0,
                  link: '//h5.m.taobao.com/1'
                },
                {
                  image: img1,
                  link: '//h5.m.taobao.com/1'
                }
                ]
              }
              ]
            }
            ]
      }
    },
    components: {
      panel: require('../include/panel.vue'),
      sliderPage: require('../include/slider-page.vue')
    },
    methods: {
      togglePlay: function() {
        var autoPlay = this.sliders[0].autoPlay
        autoPlay = !autoPlay
        this.sliders[0].autoPlay = autoPlay
        this.togglePlayMsg = autoPlay ? 'pause' : 'play'
      },
      handleSliderChange: function() {
        var nowCnt = this.eventCnt + 1
        this.eventCnt = nowCnt
      },
      setInterval1: function() {
        this.sliders[0].interval = 1000;
      },
      setInterval3: function() {
        this.sliders[0].interval = 3000;
      },
      setInterval5: function() {
        this.sliders[0].interval = 5000;
      }
    }
  };
</script>

<style scoped>
  .body {
    background-color: #ffffff;
  }

  .slider {
    flex-direction: row;
    /*margin-left: 18;*/
    /*margin-right: 18;*/
    width: 690px;
    height: 360px;
  }

  .indicator {
    position: absolute;
    width: 690px;
    height: 420px;
    top: 140px;
    left: 240px;
    itemColor: #dddddd;
    itemSelectedColor: rgb(40, 96, 144);
  }
</style>
