<template>
  <scroller class="scroller">
    <div class="wrapper">
      <text class="nav">mapType 地图颜色 showsUserLocation显示用户位置</text>
      <text class="item">1 mapType不设置-默认值 showsUserLocation="false"</text>
      <amap class="amap" :showsUserLocation="false" zoomLevel="8"></amap>
      <text class="item">2. mapType=0 showsUserLocation不传 默认值 </text>
      <amap class="amap" :mapType="0" zoomLevel="8"></amap>
      <text class="item">3. mapType=1 showsUserLocation="true" </text>
      <amap
        class="amap"
        :mapType="1"
        :showsUserLocation="true"
        zoomLevel="8"
      ></amap>
      <text class="item">4. mapType=2 showsUserLocation="true"</text>
      <amap
        class="amap"
        :mapType="2"
        :showsUserLocation="true"
        zoomLevel="8"
      ></amap>
      <text class="item">5. mapType=3 showsUserLocation="true"</text>
      <amap
        class="amap"
        :mapType="3"
        :showsUserLocation="true"
        zoomLevel="8"
      ></amap>
      <text class="item">6. mapType=4 showsUserLocation="true"</text>
      <amap
        class="amap"
        :mapType="4"
        :showsUserLocation="true"
        zoomLevel="8"
      ></amap>
      <text class="item">7. mapType=5 showsUserLocation="true"</text>
      <amap
        class="amap"
        :mapType="5"
        :showsUserLocation="true"
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
.btn {
  width: 500px;
  padding: 20px;
  margin: 20px auto 0;
  border-radius: 10px;
  color: #6d7dff;
  text-align: center;
  font-size: 32px;
  border-style: solid;
  border-color: #6d7dff;
  border-width: 1px;
  opacity: 1;
}
</style>
