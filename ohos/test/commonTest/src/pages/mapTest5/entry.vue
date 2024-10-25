/* eslint-disable no-alert */
<style lang="less" scoped>
.wrapper {
  justify-content: center;
  // padding: 40px;
}
.info {
  height: 150px;
  overflow: hidden;
}
.nav {
  color: rgb(255, 60, 0);
  font-size: 40px;
}
.title {
  color: red;
  font-size: 50px;
}
.item {
  color: rgb(27, 49, 218);
  font-size: 30px;
}
.scroller {
  position: absolute;
  // left: 50px;
  // right: 50px;
  top: 0px;
  bottom: 0px;
  padding: 100px;

  // width: 650px;
}
.amap {
  width: 500px;
  height: 500px;
  border-width: 1px;
  margin-bottom: 10px;
}
.b {
  border-width: 1px;
  border-color: red;
}
.button {
  background-color: aqua;
}
.button-wrong {
  background-color: rgb(234, 54, 18);
}
</style>
<template>
  <scroller class="scroller">
    <div class="wrapper">
      <text class="nav"
        >pointAnnotations 先设置2个点 4s后剩下一个点 点击会有改变</text
      >
      <text class="item">1. pointAnnotations</text>
      <amap
        class="amap"
        :mapType="4"
        :showScale="true"
        zoomLevel="5"
        :pointAnnotations="pointAnnotations"
        @markerClick="markerClick"
      ></amap>
      <text>{{ info }}</text>
      <!-- 第6个问题 -->
      <text class="nav">MapShowArea</text>
      <text class="item">1.MapShowArea 北京-》上海 top 0 amitation true</text>
      <amap
        class="amap"
        :mapType="4"
        :showScale="true"
        :MapShowArea="MapShowArea"
        zoomLevel="8"
      ></amap>
    </div>
  </scroller>
</template>

<script>
// import { xlog } from '../../utils/jsapi.js';
import {
  pointAnnotations,
  MALayerstyle,
  setMapCenter,
  MapShowArea,
  pointAnnotations1,
} from './mapdata.js';
// import label from '../label/entry.vue';

const clipboard = weex.requireModule('clipboard');
const modal = weex.requireModule('modal');
export default {
  components: {},
  data() {
    return {
      info: '我是测试数据',
      pointAnnotations: '',
      MALayerstyle: '',
      setMapCenter: '',
      MapShowArea: '',
      label: 1,
      config: {
        showScale: true,
        scalePosition: {
          x: 100,
          y: 100,
        },
      },
    };
  },
  mounted() {
    setTimeout(() => {
      this.setMapCenter = setMapCenter;
      this.pointAnnotations = pointAnnotations;
      this.MALayerstyle = MALayerstyle;
      this.MapShowArea = MapShowArea;
    }, 1000);
    setTimeout(() => {
      this.pointAnnotations = pointAnnotations1;
    }, 4000);
  },
  methods: {
    markerClick(data) {
      console.log(JSON.stringify(data));
      this.info = data;
      // this.label = JSON.stringify(data);
      // xlog.info(JSON.stringify(data));
    },
    centerLocation(data) {
      console.log(JSON.stringify(data));
      this.info = JSON.stringify(data);
      // this.label = JSON.stringify(data);
      // xlog.info(JSON.stringify(data));
    },

    afterMapCameraChanged(data) {
      const result = JSON.stringify(data);
      this.info = result;
      // this.pointAnnotations = pointAnnotations;
      // this.label = Math.random();
      // xlog.info(JSON.stringify(data));
    },
    onItemClick() {
      /*  clipboard.getString((ret) => {
        clipboard.setString(ret.data);
      }); */
      modal.toast({ message: 'copy' });
      clipboard.setString(this.info);
    },
  },
};
</script>
