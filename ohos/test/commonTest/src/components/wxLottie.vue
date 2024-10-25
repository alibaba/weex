<style scoped>
.lottie1 {
  width: 500px;
  height: 440px;
}
.lottie2 {
  width: 500px;
  height: 440px;
  margin-top: 20px;
}
.playBtn {
  background-color: #41b24e;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  color: #ffffff;
  text-align: center;
  font-size: 32px;
}
</style>

<template>
  <div style="align-items: center">
    <lottie
      class="lottie1"
      :sourceJson="sourceJson2"
      :loop="true"
      ref="lottie"
      @createFinish="play(1)"
    ></lottie>
    <div class="btnWrapper">
      <!-- <text class="playBtn" @click="playOnce(1)">play</text>
      <text class="playBtn" @click="pauseOnce(1)">pause</text>
      <text class="playBtn" @click="stopOnce(1)">stop</text> -->
      <text class="playBtn" @click="changeStatus(1)">{{
        status1 === 'play' ? '暂停' : '播放'
      }}</text>
      <text class="playBtn" @click="stop(1)">停止</text>
      <text class="playBtn" @click="getStatus(1)">播放状态</text>
      <text class="playBtn" @click="playFromProgress(1)"
        >指定进度的播放动画</text
      >
       <text class="playBtn" @click="playFromProgress1()"
        >指定进度的播放动画-reverse</text
      >
    </div>
    <lottie
      class="lottie2"
      :sourceUrl="sourceUrl2"
      ref="lottieJson"
      :loop="true"
      @createFinish="play(2)"
    ></lottie>
    <div class="btnWrapper">
      <text class="playBtn" @click="changeStatus(2)">{{
        status2 === 'play' ? '暂停' : '播放'
      }}</text>
      <text class="playBtn" @click="stop(2)">停止</text>
      <text class="playBtn" @click="getStatus(2)">播放状态</text>
      <text class="playBtn" @click="playFromProgress(2)"
        >指定进度的播放动画</text
      >
    </div>
  </div>
</template>
<script>
import data from '../assets/json/Boat_Loader.json';
import calender from '../assets/json/Calender.json';

export default {
  data() {
    return {
      status1: 'play',
      status2: 'play',
      sourceJson: JSON.stringify(data),
      sourceJson2: JSON.stringify(calender),
      // sourceUrl: 'https://gray.umetrip.com/assets/json/car_order_animation.json',
      sourceUrl2:
        'http://img.umetrip.com/fs/serviceRecommend/static/149,115761b771bc7e31',
      speed: '',
      loop: true,
      resizeMode: 'cover',
    };
  },
  mounted() {},
  methods: {
    play(tag) {
      // console.log('lottie createFinish');
      let ref;
      if (tag === 1) {
        ref = this.$refs.lottie;
      } else {
        ref = this.$refs.lottieJson;
      }
      ref.play(() => {
        // console.log(JSON.stringify(result));
      });
      this[`status${tag}`] = 'play';
    },
    changeStatus(tag) {
      let ref;
      if (tag === 1) {
        ref = this.$refs.lottie;
      } else {
        ref = this.$refs.lottieJson;
      }
      const status = `status${tag}`;
      this[status] = this[status] === 'play' ? 'pause' : 'play';
      if (this[status] === 'play') {
        ref.play(() => {
          // console.log(JSON.stringify(result));
        });
      } else {
        ref.pause();
      }
    },
    stop(tag) {
      let ref;
      if (tag === 1) {
        ref = this.$refs.lottie;
      } else {
        ref = this.$refs.lottieJson;
      }
      ref.stop();
      this[`status${tag}`] = 'stop';
    },
    getStatus(tag) {
      let ref;
      if (tag === 1) {
        ref = this.$refs.lottie;
      } else {
        ref = this.$refs.lottieJson;
      }
      ref.isAnimationPlaying((result) => {
        // console.log('进入isAnimationPlaying回调');
        weex.requireModule('modal').alert({
          message: JSON.stringify(result),
        });
      });
    },
    playOnce(tag) {
      let ref;
      if (tag === 1) {
        ref = this.$refs.lottie;
      } else {
        ref = this.$refs.lottieJson;
      }
      ref.play();
    },
    pauseOnce(tag) {
      let ref;
      if (tag === 1) {
        ref = this.$refs.lottie;
      } else {
        ref = this.$refs.lottieJson;
      }
      ref.pause();
    },
    playFromProgress(tag) {
      let ref;
      if (tag === 1) {
        ref = this.$refs.lottie;
      } else {
        ref = this.$refs.lottieJson;
      }
      this[`status${tag}`] = 'play';
      ref.playFromProgress(0, 0.5, () => {
        // console.log(JSON.stringify(result));
      });
    },
    playFromProgress1() {
      const ref = this.$refs.lottie;
      this['status1'] = 'play';
      ref.playFromProgress(0.5, 0, () => {
        // console.log(JSON.stringify(result));
      });
    },
  },
};
</script>
