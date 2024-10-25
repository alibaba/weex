<template>
  <div class="tab1_wrapper">
    <!-- <text class="tab1_title" :style="{ marginTop: topHeight + 'px' }">系统能力</text> -->
    <scroller
      class="tab1_content"
      :style="{
        height: contentHeight + 'px',
      }"
	  @scroll="testScroll"
    >
      <!-- <text>{{ isFullScreen }}</text>
      <text>{{ statusbarHeight }}</text>
      <text>{{ bottomHeight }}</text>
      <text>{{ fullHeight }}</text>
      <text>{{ contentHeight }}</text> -->
      <!-- <div class="btn-group">
        <text class="font-title">(weex&h5)-全屏</text>
        <text
          class="btn"
          @click="
            setFullscreen(
              {
                isOpen: true,
                showStatusMsg: false,
                statusMsgColor: 1,
              },
              true,
              true,
            )
          "
          >设置全屏(无电量)</text
        >
        <text
          class="btn"
          @click="
            setFullscreen({
              isOpen: true,
              showStatusMsg: true,
              statusMsgColor: 0,
            })
          "
          >设置全屏(白色电量)</text
        >
        <text
          class="btn"
          @click="
            setFullscreen(
              { isOpen: true, showStatusMsg: true, statusMsgColor: 1 },
              true,
            )
          "
          >设置全屏(黑色电量)</text
        >
        <text class="btn" @click="setFullscreen({ isOpen: false }, false)"
          >关闭全屏</text
        >
      </div> -->
      <text class="font-title">(weex&h5)</text>
      <text class="btn" @click="jumpNative">跳转原生页面</text>
      <text class="btn" @click="chooseContact">选择联系人</text>
      <text class="btn" @click="getNetworkType">获取网络状态 wx</text>
      <div class="btn-group">
        <text class="font-title">地理位置</text>
        <text class="btn" @click="getLocation()">地理位置 wx</text>
        <text
          class="btn"
          @click="getLocation({ desc: '地理位置-自定义弹窗文案' })"
          >地理位置-自定义弹窗文案</text
        >
      </div>
      <text class="btn" @click="getBluetooth">获取蓝牙状态</text>
      <text class="btn" @click="authSetting(['userLocation', 'bluetooth', 'addPhoneCalendar', 'writePhotosAlbum', 'camera', 'notification'])">获取授权状态</text>
      <text class="btn" @click="startTrace(['testtrace', 1001])">开始打点测试</text>
      <text class="btn" @click="finishTrace(['finishTrace', 1001])">结束打点测试</text>
      <text class="btn" @click="traceByValue(['traceByValue', 56])">跟踪的数值变量测试</text>
      <text class="btn" @click="pick([['apple', 'banana', 'orange', 'grape']])">挑选测试</text>
      <text class="btn" @click="fetch(['https://httpbin.org/get', 'GET', 'json', {'content-type': 'application/json'}, ])">请求测试</text>
      <div class="btn-group">
        <text class="font-title">获取ip&wifi名称</text>
        <text class="btn" @click="getNetworkInfo('1')">只获取ip</text>
        <text class="btn" @click="getNetworkInfo('2')">获取ip和wifi名称</text>
      </div>
      <div class="btn-group">
        <text class="font-title">调用多媒体功能</text>
        <text class="btn" @click="getPhoto(0)">获取图片(相机) wx</text>
        <text class="btn" @click="getPhoto(1)">获取图片(相册) wx</text>
        <div style="flex-direction: row; align-items: center; flex-wrap: wrap">
          <image
            v-for="(image, index) in imgArray"
            :key="index"
            :src="image"
            style="width: 200px; height: 300px; margin: 10px"
          ></image>
        </div>
      </div>
      <div class="btn-group">
        <text class="font-title">呼起客户端打电话</text>
        <text class="btn" @click="callUp({ isModal: 1 })"
          >打电话(isModal=1)</text
        >
        <text
          class="btn"
          @click="callUp({ isModal: 1, tipWords: '您即将拨打xxx电话' })"
          >打电话(tipWords)</text
        >
        <text class="btn" @click="openCallUpModal">打电话(isModal=0)</text>
      </div>
      <text class="btn" @click="saveImgsToAlbum">保存图片至相册</text>
      <text class="btn" @click="isOpenMsg">检测是否打开消息</text>
      <text class="btn" @click="updateRes()">资源更新</text>
      <text class="btn" @click="getString()">获取剪贴板数据</text>
      <text class="btn" @click="setString()">设置剪贴板数据</text>
      <text class="btn" @click="enableFullScreenHeight()">获取全屏高度</text>
      <text class="btn" @click="setItem()">存储一个数据</text>
      <text class="btn" @click="getItem()">根据键名获取数据</text>
      <text class="btn" @click="removeItem()">根据键名删除数据</text>
      <text class="btn" @click="length()">获取数据总数</text>
      <text class="btn" @click="getAllKeys()">获取所有数据的键名</text>
    </scroller>
    <!-- 写onCancel会触发点击遮罩层关闭；写:copy="true"会触发copy -->
    <modal
      :value="showModal"
      :copy="true"
      :content="content"
      :cancelText="cancelText"
      okText="确认"
      @onCancel="cancelModal"
      @onOk="closeModal"
    ></modal>
    <umeLoading :visible="showLoading"></umeLoading>
    <toast v-if="showToast" :content="content" @close="closeToast"></toast>
  </div>
</template>
<script>
// import { popPage, isWeex } from '../../../utils/index';
// import {
//   chooseContact,
//   getLocation,
//   getNetworkType,
//   getBluetooth,
//   chooseImage,
//   saveImgsToAlbum,
//   callUp,
//   isOpenMsg,
//   toOpenMsg,
// } from '../../../utils/jsapi';
import { base64 } from '../../../utils/constants.js';
import compMixin from '../../../mixin/compMixin';
import {
  chooseContact,
  getLocation,
  getNetworkType,
  getBluetooth,
  chooseImage,
  saveImgsToAlbum,
  callUp,
  isOpenMsg,
  toOpenMsg,
  popPage,
  updateRes,
} from '@/utils/jsapi.js';

import { callNative, isWeex } from '@/utils/index.js'

const clipboard = weex.requireModule('clipboard');
const deviceInfo = weex.requireModule('deviceInfo');
const modal = weex.requireModule('modal');

export default {
  mixins: [compMixin],
  props: {
    isFullScreen: {
      type: Boolean,
    },
    toggleFullScreen: {
      type: Function,
      default: () => {},
    },
    contentHeight: {
      type: Number,
      default: 0,
    },
    topHeight: {
      type: Number,
      default: 20,
    },
    statusbarHeight: {
      type: Number,
      default: 20,
    },
    bottomHeight: {
      type: Number,
      default: 0,
    },
    fullHeight: {
      type: Number,
      default: 1000,
    },
  },
  data() {
    return {
      isWeex,
      info: '',
      imgArray: [],
      customModal: 0,
      cancelText: '',
      sliderStatus: true, // 是否打开测滑
    };
  },
  methods: {
	testScroll: function(e) {
      console.log('test-------滑动')
    },
    getlocation_def(desc) {
      const param = {};
      if (desc) {
        param.desc = desc;
      }
      callNative('getLocation', param, (r) => {
        let res = r;
        try {
          if (typeof res === 'string') {
            res = JSON.parse(res);
          }
          const data = res.data || {};
          const result = {
            latitude: data.latitude,
            longitude: data.longitude,
          };
          this.callback(result);
        } catch (error) {
          this.callback(error);
        }
        // if (timeoutId) clearTimeout(timeoutId)
      });
    },
    getNetworkInfo(type) {
      let params = {};
      if (type) {
        params = { type };
      }
      callNative('getNetworkInfo', params, this.callback);
    },
    setFullscreen(params, flag = true) {
      this.toggleFullScreen(flag);
      // this.$emit('toggleFullScreen', flag, flag2);
      // xlog.info('tab1 param', params);
      this.$emit('callback', 'setFullscreen', params);
      // this.$emit('setFullscreen', params);
    },
    callback(result) {
      this.showModal = true;
      if (result.data) {
        try {
          result.data = JSON.parse(result.data);
        } catch (e) {
          console.log('parse error');
        }
      }
      let result1 = result;
      try {
        result1 = JSON.parse(result);
      } catch (e) {
        result1 = result;
      }

      this.content = JSON.stringify(result1);
    },
    jumpNative() {
      callNative('jumpNative', {
      pageId: 10,
      action: true,
      params: {},
      }, (r) => {
        
      });
    },
    chooseContact() {
      chooseContact().then((data) => {
        // this.callback(`chooseContact-${JSON.stringify(data)}`);
        this.callback(data);
      });
    },
    getLocation(param) {
      this.info = param;
      getLocation(param).then((data) => {
        // this.callback(`getLocation-${JSON.stringify(data)}`);
        this.callback(data);
      });
    },
    getBluetooth() {
      getBluetooth().then((data) => {
        // this.callback(`getBluetooth-${JSON.stringify(data)}`);
        this.callback(data);
      });
    },
    authSetting(param) {
      let p = {}
      if (param) {
        p = { authList: param };
      }
      callNative('authSetting', p, (r) => {
        this.callback(r);
        // console.info(`and callNative onBack ${JSON.stringify(res)}`);
      });
    },
    startTrace(param) {
      let p = {}
      p= {name:param[0], taskId:param[1]};
      callNative('startTrace', p, (r) => {
        this.callback(r);
        console.info(`startTrace ${JSON.stringify(r)}`);
      });
    },
    finishTrace(param) {
      let p = {}
      p= {name:param[0], taskId:param[1]};
      callNative('finishTrace', p, (r) => {
        this.callback(r);
        console.info(`finishTrace ${JSON.stringify(r)}`);
      });
    },
    traceByValue(param) {
      let p = {}
      p= {name:param[0], value:param[1]};
      callNative('traceByValue', p, (r) => {
        this.callback(r);
        console.info(`traceByValue ${JSON.stringify(r)}`);
      });
    },

    pick(param) {
      let p = {}
      let items = param[0];
      let self = this;
      p= {options: {index:self.index, items:items}};
      callNative('pick', p, (r) => {
        this.callback(r);
        console.info(`pick ${JSON.stringify(r)}`);
      });
    },
    fetch(param) {
      let GET_URL = param[0];
      let method = param[1];
      const type = param[2];
      let headers= param[3];

      let p= {};
      p= {method: method, url: GET_URL, type: type, headers:headers};
      callNative('fetch', p, (r) => {
        this.callback(r);
        console.info(`fetch ${JSON.stringify(r)}`);
      });
    },
    getNetworkType() {
      getNetworkType().then((data) => {
        // this.callback(`getNetworkType-${JSON.stringify(data)}`);
        this.callback(data);
      });
    },
    getPhoto(tag, count = 1) {
      chooseImage(tag, count).then((data) => {
        data.forEach((i) => {
          const item = `data:image/png;base64,${i}`;
          this.imgArray.push(item);
        });
      });
    },
    saveImgsToAlbum() {
      saveImgsToAlbum([base64.longImg]).then((data) => {
        // this.callback(`saveImgsToAlbum-${JSON.stringify(data)}`);
        this.callback(data);
      });
    },
    callUp(params = {}) {
      console.log('building tab1.vue callUp');
      callUp({
        phoneNumber: '13530735770',
        isModal: params.isModal, // 是否弹窗询问
        tipWords: params.tipWords || '', // 弹窗里的说明文案
      }).then((data) => {
        console.log('building tab1.vue callUp then');
        // this.callback(`callUp-${JSON.stringify(data)}`);
        this.callback(data);
      });
    },
    updateRes() {
      console.log('building tab1.vue updateRes');
      updateRes().then((data) => {
        console.log('building tab1.vue updateRes then');
        this.callback(data);
      });
    },
    // 弹窗。 customModal = 2，关闭时调 callUp({isModal: 0})
    openCallUpModal() {
      this.customModal = 2;
      this.showModal = true;
      this.content = '这是js自定义的打电话弹框';
    },
    // 没打开则弹窗。customModal = 1，关闭时调 toOpenMsg
    isOpenMsg() {
      isOpenMsg().then((data) => {
        if (data.data.isOpen === 0) {
          this.customModal = 1;
          this.showModal = true;
          this.content = '是否打开消息？';
        } else {
          this.showModal = true;
          this.content = '已打开消息';
        }
        // this.callback(`isOpenMsg-${JSON.stringify(data)}`);
        this.callback(data);
      });
    },
    toOpenMsg() {
      toOpenMsg().then((data) => {
        // this.callback(`toOpenMsg-${JSON.stringify(data)}`);
        this.callback(data);
      });
    },
    cancelModal() {
      this.showModal = false;
      this.cancelText = '';
    },
    closeModal() {
      this.showModal = false;
      if (this.customModal === 1) {
        this.toOpenMsg();
      } else if (this.customModal === 2) {
        this.callUp({ isModal: 0 });
      } else if (this.customModal === 3) {
        popPage();
      }
      this.customModal = 0;
    },
    getString() {
      clipboard.getString((text)=>{
        modal.alert({message:'剪贴板内容为：' + text.data, okTitle: '关闭'}, ()=>{console.log('剪贴板内容为：'+ text.data)});
      });
    },
    setString() {
      clipboard.setString('setString');
    },
    enableFullScreenHeight() {
      deviceInfo.enableFullScreenHeight((height)=>{
        modal.alert({message:'屏幕高度为：' + height.data, okTitle: '关闭'}, ()=>{console.log('屏幕高度为：'+ height.data)});
      });
    },
    setItem() {
      let key = "setItemKey";
      let value = "set item value";
      let weexPreferences = weexExt.requireModule("UMEWeexStorage");
      weexPreferences.setItem(key, value, (res) => {
        console.log(
          "WANG weexPreferences setItem callback" + JSON.stringify(res)
        );
      });
    },
    getItem() {
      let key = "setItemKey";
      let weexPreferences = weexExt.requireModule("UMEWeexStorage");
      weexPreferences.getItem(key, (res) => {
        console.log(
          "WANG weexPreferences getItem callback" + JSON.stringify(res)
        );
      });
    },
    removeItem() {
      let key = "setItemKey";
      let weexPreferences = weexExt.requireModule("UMEWeexStorage");
      weexPreferences.removeItem(key, (res) => {
        console.log(
          "WANG weexPreferences weex_removeItem callback" + JSON.stringify(res)
        );
      });
    },
    length() {
      let key = "setItemKey";
      let weexPreferences = weexExt.requireModule("UMEWeexStorage");
      weexPreferences.length((res) => {
        console.log(
          "WANG weexPreferences length callback" + JSON.stringify(res)
        );
      });
    },
    getAllKeys() {
      let key = "setItemKey";
      let weexPreferences = weexExt.requireModule("UMEWeexStorage");
      weexPreferences.getAllKeys((res) => {
        console.log(
          "WANG weexPreferences getAllKeys callback" + JSON.stringify(res)
        );
      });
    },
  },
};
</script>
<style scoped>
.br {
  border-width: 12px;
  border-color: red;
}
.tab1_wrapper {
  align-items: center;
  justify-content: center;
  width: 750px;
}
.tab1_title {
  font-size: 36px;
  font-weight: bold;
  height: 90px;
  line-height: 90px;
  text-align: center;
  color: #ffffff;
}
.tab1_content {
  width: 750px;
  background-color: #ffffff;
  align-items: center;
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
.btn:active {
  opacity: 0.8;
}
.btn-group {
  border-width: 1px;
  border-style: solid;
  border-color: blue;
  border-radius: 10px;
  width: 540px;
  align-items: center;
  padding: 20px;
  margin-top: 20px;
}
.font-title {
  color: #333333;
  font-size: 28px;
  line-height: 30px;
}
</style>