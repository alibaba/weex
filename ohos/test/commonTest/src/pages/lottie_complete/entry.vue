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
      :loop="false"
      ref="lottie"
      @createFinish="createFinish"
    ></lottie>
    <text>{{'状态：'+ status}}</text>
  </div>
</template>
<script>
import data from '../../assets/json/Boat_Loader.json';
import calender from '../../assets/json/Calender.json';

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
      status: '无',
    };
  },
  mounted() {
  },
  methods: {
    createFinish() {
      this.status = '初始化完成';
      // {complete:true}
      this.$refs.lottie.play((res) => { this.status = JSON.stringify(res); });
    },
    // complete(res) {
    //   this.status = JSON.stringify(res);
    // },
  },
};
</script>
