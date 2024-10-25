<style scoped>
.lottie1 {
  width: 500px;
  height: 440px;
  margin-top: 20px;
  border-width: 1px;
  border-color: #41b24e;
}
.lottie2 {
  width: 500px;
  height: 400px;
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
    <div  v-if="status1">
      <lottie
      class="lottie1"
      :sourceJson="sourceJson"
      :loop="false"
      ref="lottie1"
      @createFinish="createFinish"
    ></lottie>
    </div>
    <scroll-view v-else>
      <lottie
      class="lottie2"
      :sourceJson="sourceJson2"
      :loop="false"
      ref="lottie2"
      @createFinish="createFinish2"
    ></lottie>
    </scroll-view>
    <text style="margin-top:300px;">{{'状态：'+ status}}</text>
  </div>
</template>
<script>
import data from '../../assets/json/Boat_Loader.json';
import calender from '../../assets/json/Calender.json';

export default {
  data() {
    return {
      status1: true,
      status2: false,
      sourceJson: JSON.stringify(data),
      sourceJson2: JSON.stringify(calender),
      // sourceUrl: 'https://gray.umetrip.com/assets/json/car_order_animation.json',
      sourceUrl2:
        'http://img.umetrip.com/fs/serviceRecommend/static/149,115761b771bc7e31',
      speed: '',
      loop: true,
      resizeMode: 'cover',
      status: '无',
    };
  },
  mounted() {
    setTimeout(() => {
      this.status1 = false;
      // this.$refs.lottie1.stop();
    }, 1000);
  },
  methods: {
    createFinish() {
      this.status = '初始化完成111';
      this.$refs.lottie1.play(() => {});
    },
    createFinish2() {
      this.status = '初始化完成222';
      this.$refs.lottie2.play(() => {});
    },
    // complete(res) {
    //   this.status = JSON.stringify(res);
    // },
  },
};
</script>
