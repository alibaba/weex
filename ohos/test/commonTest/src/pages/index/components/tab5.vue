<template>
  <div class="myWrapper" :style="{ height: contentHeight + 'px' }">
    <div class="flex_row">
      <!-- <text class="tab4_title">业务API</text> -->
      <image
        v-if="rightBtnNum == 1"
        class="right_btn icon"
        :style="{ top: statusbarHeight }"
        src="http://img.umetrip.com/v1/tfs/T1QdhQBXKg1RCvBVdK"
        @click="commonShare"
      />
      <div
        v-else-if="rightBtnNum == 2"
        class="right_btn"
        :style="{ top: statusbarHeight + 'px' }"
      >
        <div class="flex_row">
          <image
            src="../../images/refresh_back.png"
            class="icon"
            @click="refresh"
          />
          <image src="../../images/scan_back.png" class="icon" @click="scan" />
        </div>
      </div>
    </div>
    <scroller
      ref="list"
      class="tab_content"
      :show-scrollbar="true"
      :style="{ height: contentHeight + 'px' }"
    >
      <!-- <text>{{ contentHeight }}</text>
      <text>{{ fullHeight }}-{{ statusbarHeight }}-{{ bottomHeight }}</text> -->
      <!-- 1 通用能力 -->
      <div class="btn-group bigger-group" ref="container">
        <div class="group-title-wrapper" @click="toggle.one = !toggle.one">
          <text class="font-title">1 (weex&h5) 通用能力</text>
          <text class="font-title">{{ toggle.one ? "[收起]" : "[展开]" }}</text>
        </div>
        <div v-if="toggle.one" class="all_center">
          <text class="btn" @click="getSessionParams">获取业务参数</text>
          <div class="btn-group">
            <text class="font-title">支付-呼起收银台</text>
            <text class="btn" @click="commonPay(1)">呼起通用支付</text>
            <text class="btn" @click="commonPay(2)">呼起浮框收银台</text>
          </div>
          <text class="btn" @click="chooseAnduploadImage">上传图片 wx</text>
          <text class="btn" @click="toFaceDetect1">扫脸并返回结果</text>
          <text class="btn" @click="toFacialDetect">扫脸并返回url wx</text>
          <text class="btn b" @click="cancelNetworkClick"
            >(weex)取消pb请求</text
          >
          <text>{{ cancelNetwork.info }}</text>
          <div class="image_wrapper">
            <image
              v-for="(image, index) in upImg"
              :key="index"
              :src="image"
              style="width: 200px; height: 300px; margin: 10px"
            ></image>
          </div>
          <!-- <text class="btn" @click="toFaceDetect">人脸检测</text> -->
        </div>
      </div>
      <div class="btn-group bigger-group">
        <div class="group-title-wrapper" @click="toggle.two = !toggle.two">
          <text class="font-title">2 (weex&h5) 分享 wx</text>
          <text class="font-title">{{ toggle.two ? "[收起]" : "[展开]" }}</text>
        </div>
        <div v-if="toggle.two" class="all_center">
          <text
            class="btn"
            @click="
              commonShare('990023').then((res) => {
                this.callback(res);
              })
            "
            >分享(微博/wx好友/wx朋友圈/qq/航旅圈/存图-图)</text
          >
          <text
            class="btn"
            @click="
              commonShare('990024').then((res) => {
                this.callback(res);
              })
            "
            >分享(微博/wx好友/wx朋友圈/qq-链接/小程序)</text
          >
          <text class="btn" @click="openMiniprog"
            >呼起微信小程序(openMiniprog)</text
          >
          <!-- 直接分享 -->
          <text class="btn" @click="goShare({ sharedChannel: 1, sharedWay: 2 })"
            >weibo1_url2</text
          >
          <text class="btn" @click="goShare({ sharedChannel: 2, sharedWay: 2 })"
            >wxFriend2_url2</text
          >
          <text class="btn" @click="goShare({ sharedChannel: 3, sharedWay: 2 })"
            >wxMoment3_url2</text
          >
          <text class="btn" @click="goShare({ sharedChannel: 4, sharedWay: 2 })"
            >qq4_url2</text
          >
          <text class="btn" @click="goShare({ sharedChannel: 2, sharedWay: 6 })"
            >wxFriend2_miniprog6</text
          >
          <text
            class="btn"
            @click="
              captureScreen_share('0', '1', { sharedChannel: 1, sharedWay: 3 })
            "
            >截屏(path)分享 weibo1_img3</text
          >
          <text
            class="btn"
            @click="
              captureScreen_share('0', '0', { sharedChannel: 1, sharedWay: 3 })
            "
            >截屏(base64)分享 weibo1_img3</text
          >
          <text
            class="btn"
            @click="
              captureScreen_share('0', '0', { sharedChannel: 2, sharedWay: 3 })
            "
            >截屏(base64)分享 wxFriend2_img3</text
          >
          <text
            class="btn"
            @click="
              captureScreen_share('0', '0', { sharedChannel: 3, sharedWay: 3 })
            "
            >截屏(base64)分享 wxMoment3_img3</text
          >
          <text
            class="btn"
            @click="
              captureScreen_share('0', '0', { sharedChannel: 4, sharedWay: 3 })
            "
            >截屏(base64)分享 qq4_img3</text
          >
          <text
            class="btn"
            @click="
              captureScreen_share('0', '0', { sharedChannel: 7, sharedWay: 3 })
            "
            >直接-截屏(base64)分享 snsShareParams7_img3</text
          >
          <text class="btn">（以下为是否显示toast测试）</text>
          <text
            class="btn"
            @click="
              goShare({ sharedChannel: 2, sharedWay: 2, showToast: false })
            "
            >直接-微信圈url-Toast:false</text
          >
          <text
            class="btn"
            @click="
              captureScreen_share('0', '0', {
                sharedChannel: 1,
                sharedWay: 3,
                showToast: true,
              })
            "
            >直接-截屏(base64)分享 weibo1_img3-Toast:true</text
          >
          <text
            class="btn"
            @click="
              commonShare('990023', false).then((res) => {
                this.callback(res);
              })
            "
            >分享(微博/wx好友/wx朋友圈/qq/航旅圈/存图-图-Toast:false)</text
          >
          <text
            class="btn"
            @click="
              commonShare('990023', true).then((res) => {
                this.callback(res);
              })
            "
            >分享(微博/wx好友/wx朋友圈/qq/航旅圈/存图-图-Toast:true)</text
          >
          <!-- <text class="btn" @click="openMiniPro"
            >拉起微信小程序(jumpNative-500501)</text
          > -->
        </div>
      </div>
      <!-- 2 分享 -->
      <text class="btn" @click="captureScreen('1', '0')"
        >截整个scroller(base64)并分享 需要关掉展开</text
      >
      <text class="btn" @click="captureScreen('1', '1')"
        >截整个scroller(path)并分享 需要关掉展开</text
      >
      <!-- 3 获取用户信息 -->
      <div class="btn-group bigger-group">
        <div class="group-title-wrapper" @click="toggle.three = !toggle.three">
          <text class="font-title">3 (weex&h5) 获取用户信息</text>
          <text class="font-title">{{
            toggle.three ? "[收起]" : "[展开]"
          }}</text>
        </div>
        <div v-if="toggle.three" class="all_center">
          <text class="btn" @click="getUserInfo">获取用户信息</text>
          <text class="btn" @click="getReqHeader">获取请求头信息</text>
        </div>
      </div>
      <!-- 4 跳转native页面相关 -->
      <div class="btn-group bigger-group">
        <div class="group-title-wrapper" @click="toggle.four = !toggle.four">
          <text class="font-title">4 (weex&h5) 跳转native页面相关</text>
          <text class="font-title">{{
            toggle.four ? "[收起]" : "[展开]"
          }}</text>
        </div>
        <div v-if="toggle.four" class="all_center">
          <text class="btn" @click="jumpNative('jumpNative')">jumpNative</text>
          <div class="btn-group">
            <text class="font-title">跳转客户端机场/航司列表</text>
            <text class="btn" @click="getAirlineList"
              >获取航司列表(老-getAirlineList)</text
            >
            <text class="btn" @click="jumpNativeList(1)"
              >跳转至客户端选择机场(198038)</text
            >
            <text class="btn" @click="jumpNativeList(2)"
              >跳转至客户端选择城市(120007)</text
            >
          </div>
        </div>
      </div>
      <!-- 5 操作页面 -->
      <div class="btn-group bigger-group">
        <div class="group-title-wrapper" @click="toggle.five = !toggle.five">
          <text class="font-title">5 操作页面</text>
          <text class="font-title">{{
            toggle.five ? "[收起]" : "[展开]"
          }}</text>
        </div>
        <div v-if="toggle.five" class="all_center">
          <text class="btn b" @click="verticalSlider"
            >(h5 ios)控制ios h5外框上下滑动</text
          >
          <text class="btn" @click="toNavigator"
            >(weex)navigator-pop到指定页面</text
          >
          <div class="btn-group">
            <text class="font-title">(weex&h5)-侧滑</text>
            <text class="btn" @click="noSlider(false)"
              >iOS禁止侧滑/Android禁止物理键返回</text
            >
            <text class="btn" @click="noSlider(true)">打开iOS侧滑</text>
            <text class="btn" @click="pushPage('h5back')">h5back(h5)</text>
          </div>
          <text class="btn b" @click="finishWebView">(h5)finishWebView</text>
          <div class="btn-group">
            <text class="font-title">(weex&h5)-全屏</text>
            <text
              class="btn"
              @click="
                setFullscreen({
                  isOpen: true,
                  showStatusMsg: false,
                  statusMsgColor: 1,
                })
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
                setFullscreen({
                  isOpen: true,
                  showStatusMsg: true,
                  statusMsgColor: 1,
                })
              "
              >设置全屏(黑色电量)</text
            >
            <text class="btn" @click="setFullscreen({ isOpen: false }, false)"
              >关闭全屏</text
            >
          </div>
          <div class="btn-group">
            <text class="font-title">(weex)截屏</text>
            <text class="btn" @click="captureScreen('0', '0')"
              >截当前屏幕(base64)并分享</text
            >
            <text class="btn" @click="captureScreen('0', '1')"
              >截当前屏幕(path)并分享</text
            >
            <!-- <text class="btn" @click="captureScreen('1', '0')"
              >截整个scroller(base64)并分享</text
            >
            <text class="btn" @click="captureScreen('1', '1')"
              >截整个scroller(path)并分享</text
            > -->
            <text
              class="btn"
              @click="
                captureScreen('0', '0', { iosCompress: 0, androidCompress: 0 })
              "
              >压缩截屏(ios 0 and 1)</text
            >
            <text
              class="btn"
              @click="
                captureScreen('0', '0', {
                  iosCompress: 0.1,
                  androidCompress: 10,
                })
              "
              >压缩截屏(ios 0.1 and 10)</text
            >
            <text class="btn" @click="captureScreen('0', '0')"
              >压缩截屏(default ios 0.7 and 80)</text
            >
            <text
              class="btn"
              @click="
                captureScreen('0', '0', {
                  iosCompress: 1,
                  androidCompress: 100,
                })
              "
              >压缩截屏(ios 1 and 100)</text
            >
            <!-- 截屏图片展示区 -->
            <!-- <div class="image-wrapper">
              <NewImage
                v-for="(ele, index) in imgArray"
                :key="index"
                :imagesrc="ele"
              ></NewImage>
            </div> -->
            <image :src="share.img" style="width: 200px; height: 300px"></image>
          </div>
          <div class="btn-group">
            <text>(h5)-横竖屏切换</text>
            <text class="btn" @click="jumpWeb('webTest_h5')">webTest_h5</text>
          </div>
          <div class="btn-group">
            <text>(weex)-横竖屏切换</text>
            <text class="btn" @click="towebH5">全屏weex横竖屏</text>
            <text class="btn" @click="towebH5NotFull">非全屏weex横竖屏</text>
          </div>
          <!-- <text class="btn" @click="onRefresh">onRefresh</text>
            <text class="btn" @click="clearCache">clearCache</text> -->
          <!-- <div class="btn-group">
            <text class="font-title">weex向native页面发通知</text>
            <text class="btn b" @click="fireNotification(false)"
              >(?)向客户端发送全局消息</text
            >
            <text class="btn b" @click="fireNotification(true)"
              >(?)向客户端发送局部消息</text
            >
          </div> -->
          <text class="btn b" @click="onRefresh">(h5)刷新h5页面</text>
          <div class="btn-group">
            <text>跳h5全屏isFullScreen</text>
            <text class="btn" @click="jumpWeb('webTest_h5_full')">带参数 </text>
            <text class="btn" @click="jumpWeb('webTest_h5_full_harsh')"
              >带参数 有hash</text
            >
            <text class="btn" @click="jumpWeb('webTest_h5_full_param')"
              >param参数</text
            >
          </div>
          <!-- <text class="btn b" @click="clearCache">(?)clearCache</text>
          <text class="btn b" @click="onReturn">(?)onReturn</text> -->
        </div>
      </div>

      <!-- 6 导航栏 -->
      <div class="btn-group bigger-group">
        <div class="group-title-wrapper" @click="toggle.six = !toggle.six">
          <text class="font-title">6 (h5) 导航栏</text>
          <text class="font-title">{{ toggle.six ? "[收起]" : "[展开]" }}</text>
        </div>
        <div v-if="toggle.six" class="all_center">
          <text class="btn" @click="changeTitle"
            >(先关全屏)修改状态栏/导航栏颜色</text
          >
          <text class="btn" @click="onClosed">(先关全屏，只测ios)onClosed</text>
          <text class="btn" @click="setTopRightShare"
            >(先关全屏)右上角分享</text
          >
          <text class="btn" @click="expandTopRightBtn"
            >(先关全屏)右上角两个按钮</text
          >
          <text
            class="btn"
            @click="
              setFullscreen({
                isOpen: true,
                showStatusMsg: false,
                statusMsgColor: 0,
              })
            "
            >设置全屏(无电量)</text
          >
          <text class="btn" @click="setFullscreen({ isOpen: false }, false)"
            >关闭全屏</text
          >
        </div>
      </div>

      <!-- 7 存储能力 -->
      <div class="btn-group bigger-group">
        <div class="group-title-wrapper" @click="toggle.seven = !toggle.seven">
          <text class="font-title">7 (weex) 存储能力</text>
          <text class="font-title">{{
            toggle.seven ? "[收起]" : "[展开]"
          }}</text>
        </div>
        <div v-if="toggle.seven" class="all_center">
          <text class="btn" @click="setItem('testKey1')">setItem testKey1</text>
          <div class="btn-group">
            <text class="font-title">带隔离作用域存储</text>
            <text class="btn" @click="getItem('testKey1')"
              >getItem testKey1</text
            >
            <text class="btn" @click="jumpWeex('commonTest_prod')"
              >跳转另一个weex项目并getItem</text
            >
          </div>
          <text class="btn" @click="removeItem('testKey1')"
            >removeItem testKey1</text
          >
          <text class="btn" @click="getAllKeys()">getAllKeys</text>
          <text class="btn b" @click="commonGetStorage"
            >(weex&h5)取出已存储的数据</text
          >
        </div>
      </div>

      <!--8 日志上传 -->
      <div class="btn-group bigger-group">
        <div class="group-title-wrapper" @click="toggle.eight = !toggle.eight">
          <text class="font-title">8 (weex&h5)日志上传</text>
          <text class="font-title">{{
            toggle.eight ? "[收起]" : "[展开]"
          }}</text>
        </div>
        <div v-if="toggle.eight" class="all_center">
          <text
            class="btn"
            @click="
              sensorsRecommendLogNew({
                serviceId: 6088,
                serviceName: '6088-有trackName-有trackParam',
                groupId: 101611,
                jsonData: {
                  trackName: 'frameworkTest',
                  trackParam: { with_mark: '2', order: '3' },
                },
              })
            "
            >weex神策服务推荐打点</text
          >
          <text class="btn" @click="xlog('I')"
            >xlog日志上传(info-umeWeexLog)</text
          >
          <!-- <text class="btn b" @click="uploadThirdMonitoringLog"
            >(?) uploadThirdMonitoringLog</text
          > -->
        </div>
      </div>

      <!-- 9 业务功能 -->
      <div class="btn-group bigger-group">
        <div class="group-title-wrapper" @click="toggle.nine = !toggle.nine">
          <text class="font-title">9 (weex&h5) 业务功能</text>
          <text class="font-title">{{
            toggle.nine ? "[收起]" : "[展开]"
          }}</text>
        </div>
        <div v-if="toggle.nine" class="all_center">
          <div class="btn-group">
            <text class="font-title">(ios weex&h5)-客户端业务组件</text>
            <text class="btn" @click="callNativePrice"
              >native价格明细弹窗(ios)</text
            >
            <text class="btn" @click="callNativeTicketComment"
              >native机票评价弹窗(ios)</text
            >
            <text class="btn" @click="callPayPwd()">钱包支付弹窗</text>
          </div>
          <text class="btn b" @click="getContactList"
            >(weex)获取私聊消息人列表</text
          >
          <text class="btn b" @click="sns_sharePublicDone"
            >(weex)圈子分享成功通知</text
          >
        </div>
      </div>

      <!-- 10 (jsapi小册3.3) 基础能力 -->
      <div class="btn-group bigger-group">
        <div class="group-title-wrapper" @click="toggle.ten = !toggle.ten">
          <text class="font-title">10 基础能力</text>
          <text class="font-title">{{ toggle.ten ? "[收起]" : "[展开]" }}</text>
        </div>
        <div v-if="toggle.ten" class="all_center">
          <div class="btn-group">
            <text class="font-title">(weex)强制升级</text>
            <text class="btn" @click="updatePkg"
              >强制升级-挪包/拉旧包(weexTest)</text
            >
            <text class="btn" @click="deletePkg">强制升级-删包</text>
            <text class="btn" @click="toWeexTest2({})">正常跳(weexTest2)</text>
            <text
              class="btn"
              @click="toWeexTest2({ minVersion: '1.0.2', nostrict: 1 })"
              >非严格跳(weexTest2)</text
            >
            <text
              class="btn"
              @click="toWeexTest2({ minVersion: '1.0.2', nostrict: 0 })"
              >严格跳(weexTest2)</text
            >
          </div>
          <text class="btn" @click="toWeexWebview()"
            >(weex)weex-webview双向通信</text
          >
          <div class="btn-group">
            <text class="font-title">(weex&h5)图片缓存</text>
            <text class="btn" @click="testImageCache(1)">本地图片缓存</text>
            <text class="btn" @click="testImageCache(2)">服务器图片缓存</text>
            <div>
              <image
                v-if="showImage == 1"
                src="../../images/like.png"
                style="width: 100px; height: 100px"
              ></image>
              <image
                v-if="showImage == 2"
                src="http://img.umetrip.com/jboss/UmeImageMagic/api/fileSystem/getFileByFid/44,0226cec379724288?module=serviceRecommend"
                style="width: 100px; height: 100px"
              ></image>
            </div>
          </div>
        </div>
      </div>

      <!-- 11 (jsapi小册3.4) 第三方业务能力 -->
      <div class="btn-group bigger-group">
        <div
          class="group-title-wrapper"
          @click="toggle.eleven = !toggle.eleven"
        >
          <text class="font-title">11 第三方业务能力</text>
          <text class="font-title">{{
            toggle.eleven ? "[收起]" : "[展开]"
          }}</text>
        </div>
        <div v-if="toggle.eleven" class="all_center">
          <div class="btn-group">
            <text class="font-title">(weex)第三方业务能力</text>
            <text class="btn b" @click="getAuthorize">呼起用户授权弹窗</text>
            <text class="btn b" @click="getUnionid">获取unionid</text>
          </div>
        </div>
      </div>
      <div></div>
    </scroller>
    <modal
      :copy="true"
      :value="showModal"
      :content="content"
      okText="确认"
      @onOk="closeModal"
      @onCancel="showModal = false"
      :modal-style="modalStyle"
    ></modal>
    <umeLoading
      :visible="showLoading"
      :loading-style="loadingStyle"
    ></umeLoading>
    <toast v-if="showToast" :content="content" @close="closeToast"></toast>
  </div>
</template>
<script>
import compMixin from "../../../mixin/compMixin";
import jumpMixin from "../../../mixin/jumpMixin";
import {
  jumpParams,
  share,
  uploadThirdMonitoringLog_Data as advert,
} from "../../../utils/constants";
import comment from "../../../assets/json/comment.json";
import carPriceMapInfo from "../../../assets/json/priceDetail.json";
import NewImage from "../../../components/newImage.vue";

import {
  getAssetsPath,
  pushPage,
  isWeex,
  isAndroid,
  removeItem,
  callNative,
} from "@/utils/index.js";

import {
  isInUmeApp,
  setItem,
  getItem,
  callNativeComponent,
  getSessionParams,
  getReqHeader,
  commonPay,
  openMiniprog,
  fireNotification,
  getUserInfo,
  sensorsRecommendLog,
  sensorsOtherLog,
  chooseAnduploadImage,
  startFaceDetect,
  changeTitle,
  xlog,
  wx,
  setTopRightBtn,
  expandTopRightBtn,
  nativeSlider,
  jumpNative,
  cancelNetwork,
  startFacialDetect,
  captureScreen,
  finishWebView,
  clearCache,
  onClosed,
  onRefresh,
  onReturn,
  getContactList,
  sns_sharePublicDone,
  commonGetStorage,
  getAuthorize,
  getAirlineList,
  uploadThirdMonitoringLog,
  deleteWeexPackage,
  updateWeexPackage,
  verticalSlider,
  getUnionid,
  isWeb,
  callPayPwd,
  commonShare,
} from "../../../utils/jsapi.js";
// import { commonShare } from '../../../utils/jsapi';
import { isInWXMinProgram } from "../../../utils";

const UMEStorage = weex.requireModule("UMEWeexStorage") || {};
let isFlag = false;
let changeColor = false;
export default {
  components: { NewImage },
  mixins: [compMixin, jumpMixin],
  props: {
    contentHeight: {
      type: Number,
      default: 0,
    },
    topHeight: {
      type: Number,
      default: 0,
    },
    statusbarHeight: {
      type: Number,
      default: 0,
    },
    bottomHeight: {
      type: Number,
      default: 0,
    },
    fullHeight: {
      type: Number,
      default: 1000,
    },
    toggleFullScreen: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      info: "",
      share: {
        shareChannel: 0,
        shareWay: 0,
        sharePageId: "990023",
        imgArray: [],
        info: "",
        img: "",
      },
      toggle: {
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
        six: false,
        seven: false,
        eight: false,
        nine: false,
        ten: false,
        eleven: false, // 三方
        twelve: false,
      },
      isAndroid,
      customModal: 0,
      showImage: 0,
      userInfo: {},
      modalStyle: {
        position: isWeex ? "fixed" : "absolute",
      },
      loadingStyle: {
        position: isWeex ? "fixed" : "absolute",
      },
      imgArray: [],
      upImg: [],
      rightBtnNum: 0,
      openVerticalSlider: true,
      cancelNetwork: {
        rqCount: 0,
        cancelCount: 0,
        rqResCount: 0,
        cancelIds: [],
        info: "",
      },
    };
  },
  created() {},

  methods: {
    throttle(func, delay = 500) {
      // let isFlag = false;
      return function (...args) {
        if (isFlag) return;
        func.apply(this, args);
        isFlag = true;
        setTimeout(() => {
          isFlag = false;
        }, delay);
      };
    },
    captureScreen(p1, p2, p3) {
      // this.info += `-1${p1}${p2}${p3 || ''}`;
      const throttledFunc = this.throttle(this.captureScreen_0, 1000);
      throttledFunc(p1, p2, p3);
    },
    captureScreen_share(p1, p2, p3) {
      // this.info += `-1${p1}${p2}${p3 || ''}`;
      const throttledFunc = this.throttle(this.captureScreen_share_0, 1000);
      throttledFunc(p1, p2, p3);
    },
    captureScreen_share_0(type, expectedType = "0", extraPrams = {}) {
      this.share.info += extraPrams;
      const el = this.$refs.container;
      // 经测试，jsFramework会判断传入的数据类型，如果是element对象，则转为el.ref传给客户端，所以客户端拿到的是el.ref
      const param = {
        type, // '0': 截屏幕，'1': 截长图
        ref: el.ref,
        expectedType, // '0': 返回base64数据，'1': 返回path路径
      };
      captureScreen(param).then((result) => {
        const data = result.data || {};
        const imgData = data.imgData || "";
        let shareParam = {
          isDirectShare: true,
          ...extraPrams,
          sharePageId: "990023",
          imageType: expectedType,
          isDownloadImg: true,
          longImage: imgData,
        };
        // 1-新浪微博；2-微信好友；3-微信朋友圈；4-QQ好友, 7-航旅圈
        if (extraPrams.sharedChannel === 7) {
          shareParam = {
            ...shareParam,
            snsShareParams:
              '{    "targetPageId": "200201",   "source": "sns_airlineMap",     "parameter": {       "sessionParams": "source=sns_airlineMap",       "weexParams": {          "weexName": "UmeCircle",          "serviceName": "航旅圈子",          "jsBundleEntry": "UmeCircle/pages/public/entry.js",          "commonJsEntry": "UmeCircle/pages/commons.js",          "weexId": "ume_92cfb3ea90934cf8aa2a49743f6dbbc0",          "weexUrl": "http://static.umetrip.com/weex/UmeCircle/UmeCircle.wume",          "webUrl": "https://static.umetrip.com/weex/UmeCircle/UmeCircle_web/pages/public/entry.html"       }    } }',
          };
        }
        commonShare(shareParam).then((res) => {
          this.callback(res);
          console.log("分享", res);
          xlog.log(`commonShare回调：${JSON.stringify(res)}`);
        });
      });
    },
    goShare(param) {
      this.share.info = ` c${param.sharedChannel}-w${param.sharedWay}`;
      if (param.sharedChannel === 2 && param.sharedWay === 6) {
        commonShare({
          isDirectShare: true,
          ...param,
          ...share.wxFriend2_miniprog6,
        }).then((res) => {
          console.log("分享", res);
          this.callback(res);
        });
        this.share.info += "miniprog26";
      } else if (param.sharedWay === 2 && param.sharedChannel === 2) {
        commonShare({
          isDirectShare: true,
          ...param,
          ...share.share_802019,
        }).then((res) => {
          console.log("分享", res);
          this.callback(res);
        });
      } else if (param.sharedWay === 2) {
        commonShare({
          isDirectShare: true,
          ...param,
          ...share.url2,
        }).then((res) => {
          console.log("分享", res);
          this.callback(res);
        });
      }
    },
    captureScreen_0(type, expectedType = "0", extraPrams = {}) {
      // this.info += type + expectedType + extraPrams;
      const el = this.$refs.list;
      // 经测试，jsFramework会判断传入的数据类型，如果是element对象，则转为el.ref传给客户端，所以客户端拿到的是el.ref
      const param = {
        type, // '0': 截屏幕，'1': 截长图
        ref: el.ref,
        expectedType, // '0': 返回base64数据，'1': 返回path路径
        ...extraPrams,
      };
      captureScreen(param).then((result) => {
        const data = result.data || {};
        let imgData = data.imgData || "";
        if (expectedType === "0") {
          imgData = imgData.replace(/[\r\n]/g, "");
          const imgDataBase64 = `data:image/png;base64,${imgData}`;
          this.share.img = imgDataBase64;
        } else if (expectedType === "1") {
          this.share.img = imgData;
        }
        commonShare({
          sharePageId: "922019",
          imageType: expectedType,
          longImage: imgData,
        }).then((res) => {
          xlog.log(`commonShare回调：${JSON.stringify(res)}`);
        });
      });
    },
    // 神策服务推荐打点
    sensorsRecommendLogNew(card, ti = "") {
      if (isWeex) {
        sensorsRecommendLog(card, ti);
      } else {
        try {
          return "web服务推荐打点成功";
        } catch (err) {
          return err;
        }
      }
    },
    // 神策服务自定义打点
    sensorsOtherLogNew(trackName, ti = "", trackParam) {
      return new Promise((resolve, reject) => {
        if (isWeex) {
          sensorsOtherLog(trackName, ti, trackParam);
        } else {
          try {
            resolve("web自定义打点成功");
          } catch (err) {
            reject(err);
          }
        }
      });
    },
    callPayPwd() {
      const param = {
        type: 2,
        status: 1, // 默认是1 打出密码错误信息为-1
        title: "密码确认",
        name: "充值金额",
        amount: "0.1",
      };
      // ios本地点不出来弹窗，上devops才有
      // callPayPwd(param).then((res) => {
      //   this.callback(res);
      // });
      callNative("callPayPwd", param, this.callback);
    },
    jumpWeb(name) {
      const proj = jumpParams[name];
      const param = {
        pageId: 200200,
        params: { url: proj.url },
      };
      if (proj.isFullScreen) {
        param.params.isFullScreen = proj.isFullScreen;
      }
      console.log("@@@@", param);
      callNative("jumpNative", param, () => {});
      // callNative('jumpNative', param, this.callback);
      // jumpNative(param);
    },
    updatePkg() {
      // weexUrl和md5是weexTest的，其他都是weexTest2的
      const params = {
        weexId: jumpParams.weexTest2_gray.weexParams.weexId,
        weexUrl: jumpParams.weexTest1_gray.weexParams.weexUrl,
        // weexUrl: weexParams.weexTest_weexUrl.prod,
        md5: "049a31aef52eb9b15c15f5963b1cc7bd", // weexTest灰度更新则更新 1.2.0
        timestamp: "1",
        versionCode: "1.0.0",
      };
      updateWeexPackage(params).then((data) => {
        this.callback(data);
      });
    },
    deletePkg() {
      deleteWeexPackage({
        weexId: jumpParams.weexTest2_gray.weexParams.weexId,
        versionCode: "1.0.0",
      }).then((data) => {
        this.callback(data);
      });
    },
    jumpWeex(name) {
      const proj = jumpParams[name];
      const param = {
        pageId: 200201,
        params: {
          sessionParams: proj.sessionParams,
          weexParams: proj.weexParams,
        },
      };
      jumpNative(param).then(() => {});
      // jumpNative(param).then((res) => this.callback(res));
    },
    uploadThirdMonitoringLog() {
      const cardResult = JSON.stringify(advert.cardResult);
      advert.cardResult = cardResult;
      console.log("uploadThirdMonitoringLog入参：", advert);
      this.callback(advert);
      uploadThirdMonitoringLog(advert).then((data) => {
        this.callback(data);
      });
    },
    cancelNetworkClick() {},
    getAuthorize() {
      getAuthorize({ scopeNames: ["name_mobile"] }).then((data) => {
        this.callback(data);
      });
    },
    getUnionid() {
      getUnionid().then((data) => {
        this.callback(data);
      });
    },
    verticalSlider() {
      this.openVerticalSlider = !this.openVerticalSlider;
      verticalSlider({ isOpen: this.openVerticalSlider }).then((data) => {
        this.callback(data);
      });
    },
    commonGetStorage() {
      // storageName-source: sns_airlineMap：航线图，sns_homeCalendar：时光机
      commonGetStorage({ storageName: "sns_homeCalendar" }).then((data) => {
        this.callback(
          (data.data &&
            data.data.storageValue &&
            data.data.storageValue.length) ||
            0
        );
      });
    },
    sns_sharePublicDone() {
      sns_sharePublicDone({ content: "sns_sharePublicDone" }).then((data) => {
        this.callback(data);
      });
    },
    getContactList() {
      getContactList().then((data) => {
        this.callback(data);
      });
    },
    onReturn() {
      onReturn().then((data) => {
        this.callback(data);
      });
    },
    testImageCache(tag) {
      this.showImage = tag;
    },
    toFaceDetect() {
      startFaceDetect({
        specificCert: true,
        certNo: "211381199001301012",
      }).then((data) => {
        xlog.log(`startFaceDetect回调${JSON.stringify(data)}`);
        this.callback(data);
      });
    },
    towebH5() {
      pushPage("webH5");
    },
    towebH5NotFull() {
      pushPage("webH5_notFull");
    },
    toNavigator() {
      pushPage("navigator");
    },
    commonShare(id, type) {
      if (isInWXMinProgram) {
        const params = {
          gS: 2,
          data: {
            nL: 1, // 在该原生分享页面，用来判断是否有数据
            nI: 1, // 当前活动是否需要提前完成认证
            nU: 1, // 当前活动是否需要提前获取头像昵称
            nS: 1, // 当前活动是否需要右上角三个点的分享
            contInfo: {
              pageTitle: "打卡长征路，重温红色心", // 公共分享页的页面title
              contImg:
                "http://img.umetrip.com/fs/entertain/static/136,0eadf5860020e7d2", // 公共分享页的展示内容图片链接
              btnImg:
                "http://img.umetrip.com/fs/test/temp/156,16d5501d719dd165", // 公共分享页的按钮图片链接
            },
            shareInfo: {
              title: "打卡长征路，重温红色心", // 分享小程序卡片的title
              imageUrl:
                "http://img.umetrip.com/fs/test/temp/152,16d54d662658bbe3", // 分享小程序卡片的配图
              targetUrl: "/pages/web/index", // 分享小程序卡片的对应的小程序原生页，必填
              isH5: 1, // 分享小程序卡片对应的小程序页面是否需要嵌入H5
              H5Url:
                "http://gray.umetrip.com/weex/frameworkTest/frameworkTest_web/pages/thirdApi/entry.html", // 嵌入的H5链接
            },
          },
        };
        commonShare(params).then((res) => {
          console.log(res);
        });
        return;
      }
      if (type === false || type === true) {
        id === "990023"
          ? commonShare({ ...share.c123478_w37_990023, showToast: type }).then(
              (res) => {
                this.callback(res);
              }
            )
          : commonShare({ ...share.c1234_w26_990024, sowToast: type }).then(
              (res) => {
                this.callback(res);
              }
            );
      } else {
        id === "990023"
          ? commonShare(share.c123478_w37_990023).then((res) => {
              this.callback(res);
            })
          : commonShare(share.c1234_w26_990024).then((res) => {
              this.callback(res);
            });
      }
    },
    onClosed() {
      onClosed().then((data) => {
        this.callback(data);
      });
    },
    onRefresh() {
      onRefresh().then((data) => {
        this.callback(data);
      });
    },

    getAirlineList() {
      getAirlineList({ currentCode: "HU" }).then((data) => {
        this.callback(data);
      });
    },
    pushPage(page, params = {}) {
      let newParams = params;
      if (page === "webview") {
        newParams = {
          src: "http://172.24.143.24:8004/index.html?flightNo=MF3113&flightDate=2022-07-28&adept=PEK&adest=SHA&isTakeOff=true#/example",
        };
      }
      pushPage(page, newParams);
    },
    jumpNativeList(tag) {
      let pageId;
      let params = {};
      if (tag === 1) {
        pageId = 198038;
        params = {
          currentCode: "CAN",
        };
      } else if (tag === 2) {
        params = {
          airline: "ALL",
          deptCode: "PEK",
          destCode: "CTU",
          deptCodeType: 1,
          destCodeType: 1,
          sourceFrom: "journeyAttentionForCity",
          type: 1,
          isDept: true,
          groupStyle: "",
        };
        pageId = 120007;
      }
      const last = new Date().getTime();
      jumpNative({
        pageId,
        action: true,
        params,
      }).then((data) => {
        xlog.log(`选择机场数据${JSON.stringify(data)}`);
        // this.callback(data);
        const duration = (new Date().getTime() - last) / 1000;
        data.duration = `${parseInt(duration, 10)}s`;
        this.callback(data);
      });
    },
    finishWebView() {
      finishWebView().then((data) => {
        this.callback(data);
      });
    },
    clearCache() {
      clearCache().then((data) => {
        this.callback(data);
      });
    },
    callback(result) {
      this.showModal = true;
      this.content = JSON.stringify(result);
    },
    async getSessionParams() {
      const data = await getSessionParams({
        lon: "",
        lat: "",
        rcver: "",
      });
      xlog.log(`获取到的业务参数${JSON.stringify(data)}`);
      this.callback(data);
    },
    getUserInfo() {
      getUserInfo().then((data) => {
        xlog.log(`getUserInfo返回的数据: ${JSON.stringify(data)}`);
        this.userInfo = data;
        this.callback(data);
      });
    },
    getReqHeader() {
      getReqHeader().then((data) => {
        xlog.log(`getReqHeader返回的数据: ${JSON.stringify(data)}`);
        this.callback(data);
      });
    },
    commonPay(payType = 1) {
      const payParams = {};
      let bizContent = {};
      bizContent =
        '{"notifyType":"3","merchantId":"37","orderId":"PAYTEST2020060319181692307","amount":"0.01","productName":"测试产品","productDesc":"测试产品","notifyUrl":"umeentertain.callBackToMerchantSVC","signType":"MD5"}';
      payParams.signature = "c9c5b1d7556dcf17c4ea7ac1e6ae1b73";
      payParams.bizContent = bizContent;
      commonPay(payType, payParams).then((data) => {
        xlog.info(`commonPay的返回结果：${JSON.stringify(data)}`);
        this.callback(data);
      });
    },
    openMiniprog() {
      openMiniprog({
        userName: "gh_266737106011",
        path: "pages/test/msg/msg?query1=value1&query2=value2",
        miniProgramType: 2,
      }).then((data) => {
        this.callback(data);
      });
    },
    openMiniPro() {
      jumpNative({
        pageId: 500501,
        params: {
          userName: "gh_266737106011",
          path: "/pages/airline/index/index?query1=value1&query2=value2",
          programType: 0,
          scheme: "weixin://dl/business/?t=KskkThTIshb",
          innerParameter: {
            sessionParams:
              "url=https%3A%2F%2Fwww.aliyun.com%2Fabout%2Factivity%2Fcny%3FhardwareAcceleration%3D1&st=advert_1001284_no",
            weexParams: {
              weexId: "ume_3160c5b594714fb2a58b5f9bb4bf335e",
              weexName: "正在跳转",
              webUrl:
                "https://gray.umetrip.com/weex/weexBase/weexBase_web/pages/webview/entry.html",
              weexUrl: "https://gray.umetrip.com/weex/weexBase/weexBase.wume",
              jsBundleEntry: "weexBase/pages/webview/entry.js",
            },
          },
          innerPageId: "200201",
        },
      }).then((data) => {
        xlog.log("跳了");
        this.callback(data);
      });
    },

    sensorsRecommendLog() {
      const card = {
        serviceId: 6088,
        serviceName: "6088-有trackName-有trackParam",
        groupId: 101611,
        jsonData: {
          trackName: "frameworkTest",
          trackParam: { with_mark: "2", order: "3" },
        },
      };
      sensorsRecommendLog(card, "业务API");
      // const msg = sensorsRecommendLog(card, '业务API');
      // this.callback(msg);
    },
    noSlider(isLip) {
      // xlog.info('@@@@@@!!');
      if (this.sliderStatus !== isLip) {
        this.sliderStatus = isLip;
        const cb = () => {
          xlog.info(`@@@@@@@@@@${this}`);
          this.content = "确定要返回吗？";
          this.showModal = true;
          this.customModal = 3;
          this.cancelText = "取消";
        };
        nativeSlider(isLip, cb);
      }
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
    xlog(tag) {
      switch (tag) {
        case "D":
          xlog.debug("testFunc", "测试debug内容");
          break;
        case "I":
          xlog.info("测试info内容, 方法是 umeWeexLog");
          break;
        case "W":
          xlog.warn("testFunc", "测试warn内容");
          break;
        case "E":
          xlog.error("testFunc", "测试error内容");
          break;
        case "F":
          xlog.fatal("testFunc", "测试fatal内容");
          break;
        default:
          break;
      }
    },
    setFullscreen(params, flag = true) {
      this.toggleFullScreen(flag);
      console.log("tab setFullscreen");
      this.$emit("callback", "setFullscreen", params);
    },
    changeTitle() {
      if (changeColor) {
        changeTitle({
          backgroundColor: "#6d7dff",
          titleWordColor: "#ffffff",
          btnColor: 0,
          topColor: 0,
        });
        changeColor = !changeColor;
      } else {
        changeTitle({
          backgroundColor: "#41b24e",
          titleWordColor: "#000000",
          btnColor: 1,
          topColor: 1,
        });
        changeColor = !changeColor;
      }
    },
    setTopRightShare() {},
    expandTopRightBtn() {},
    scan() {
      this.showModal = true;
      this.content = "点击了scan按钮";
    },
    refresh() {
      this.showModal = true;
      this.content = "点击了刷新按钮";
    },
    callNativePayPwd() {
      callNativeComponent("payPwd", {
        title: "密码确认",
        type: 3,
        status: 1,
      }).then((data) => {
        xlog.log(data);
      });
    },
    callNativePrice() {
      const params = {
        title: "价格明细",
        priceDetail: carPriceMapInfo,
      };
      callNativeComponent("pickupPriceDetail", params).then((data) => {
        xlog.log(`价格弹窗的回调执行了${JSON.stringify(data)}`);
        console.log(`building tab5.vue 回调, 价格弹窗的回调执行了${JSON.stringify(data)}`);
      });
    },
    callNativeTicketComment() {
      callNativeComponent("airTicketComment", comment).then((data) => {
        xlog.log(`点评组件的回调执行了${JSON.stringify(data)}`);
      });
    },
    chooseAnduploadImage() {
      chooseAnduploadImage(1, 2, "Weex", "caac/comment-img", this).then(
        (data) => {
          this.callback(data);
          xlog.log(`返回的数据: ${JSON.stringify(data)}`);
          xlog.info(`xlog返回的数据: ${JSON.stringify(data)}`);
          // this.upImg = [];
          data.forEach((ele) => {
            this.upImg.push(ele.getFileByFid);
          });
        }
      );
    },
    jumpNative(page) {
      const sessionId = this.userInfo.sessionId || "";
      pushPage(page, {
        userId: sessionId.split("$$")[0],
      });
    },
    setItem() {
      // setItem('testKey1', 'value1 frameworkTest', this.callback);
      UMEStorage.setItem("testKey1", "testValue1 frameworkTest", (data) => {
        xlog.log(JSON.stringify(data));
        this.callback(data);
      });
    },
    getItem() {
      // getItem('testKey1').then((res) => {
      //   this.callback(res);
      // });
      UMEStorage.getItem("testKey1", (data) => {
        xlog.log(JSON.stringify(data));
        this.callback(data);
      });
    },
    removeItem(key) {
      UMEStorage.removeItem(key, (data) => {
        xlog.log(JSON.stringify(data));
        this.callback(data);
      });
    },
    getAllKeys() {
      UMEStorage.getAllKeys((data) => {
        xlog.log(JSON.stringify(data));
        this.callback(data);
      });
    },
    toWeexWebview() {
      // let src = '../../web/radar.html?radarData=%7B%22airplaneAgeScore%22:4.3,
      // %22seatComfortScore%22:5.4,%22flightCrowdScore%22:4,%22flightQuietScore%22:3.9,
      // %22checkSpeedScore%22:3.9,%22flightRoomyScore%22:5.4%7D'
      // let src = 'https://m.ximalaya.com/explore/subject_detail?id=9545&use_lottie=false'
      // let src = 'https://m.ximalaya.com/gatekeeper/gohome-2021?utm_source=hlzhwyb&alias=white1&hardwareAcceleration=1&did=673&token=nRa%2BW2e8F1Ti5WnvK%2FLH4UKUEA4sOi%2B3e6T3bTR%2FZhTQkYN%2FVuoBFcrn4jOji%2Ba%2FIJ9bjl%2FyLkZWIsC5kRrqpVcc2UKlbycWKKwbF5Dh54RIKhHCC20UbCibLpQ81zz5'
      pushPage("webview", {
        title: "weex webview",
        src: "../../web/test.html",
      });
    },
    fireNotification(useDelegate) {
      fireNotification(
        "pickupServiceStatus",
        {
          orderStatus: "6",
        },
        useDelegate
      ).then((data) => {
        this.callback(data);
        xlog.log(`通知返回${JSON.stringify(data)}`);
      });
    },
    toFacialDetect() {
      let params = null;
      if (isInWXMinProgram) {
        params = {
          H5Url:
            "http://gray.umetrip.com/weex/frameworkTest/frameworkTest_web/pages/thirdApi/entry.html",
          H5route: "",
          parameter: {},
        };
      }
      startFacialDetect(params).then((data) => {
        this.callback(data);
      });
    },
    toFaceDetect1() {
      startFaceDetect().then((data) => {
        console.log(`startFaceDetect回调${JSON.stringify(data)}`);
        this.callback(data);
      });
    },
  },
};
</script>
<style src="../../../assets/css/global.css"></style>
<style scoped>
.myWrapper {
  align-items: center;
  justify-content: center;
  background-color: #6d7dff;
  width: 750px;
}
.tab4_title {
  font-size: 36px;
  font-weight: bold;
  height: 90px;
  line-height: 90px;
  text-align: center;
  color: #ffffff;
}
.tab_content {
  width: 750px;
  background-color: #ffffff;
  align-items: center;
}
.tab4_list {
  width: 750px;
  background-color: #ffffff;
  align-items: center;
}
.tab4_cell {
  align-items: center;
  width: 750px;
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
.btn-group {
  border-width: 1px;
  border-style: solid;
  border-color: blue;
  border-radius: 10px;
  width: 540px;
  /* justify-content: center; */
  align-items: center;
  padding: 20px;
  margin-top: 20px;
}
.bigger-group {
  width: 580px;
  border-width: 1px;
  border-style: dashed;

  /* justify-content: center;
  align-items: center;
  text-align: center; */
}
.font-title {
  color: #333333;
  font-size: 28px;
  line-height: 50px;
}
.group-title-wrapper {
  width: 500px;
  /* border-width: 1px; */
  flex-direction: row;
  justify-content: space-between;
}

/* . {
  width: 750px;
  align-items: center;
} */
.right_btn {
  position: fixed;
  right: 20px;
}

.icon {
  width: 88px;
  height: 88px;
}
.image-wrapper {
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.b {
  border-width: 5px;
}
</style>
