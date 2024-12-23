<template>
<div class="tab2_wrapper" :style="{ height: contentHeight + 'px' }">
    <scroller class="tab2_content" :style="{ height: contentHeight + 'px' }">
        <text class="btn" @click="scrollTo(1)">(weex)bindingx</text>
        <text class="btn" @click="scrollTo(2)">(weex)lottie</text>
        <text class="btn" @click="pushPage('lottie_complete')">(weex)lottie-结束事件</text>
        <div class="btn-group">
            <!-- <text class="font-title">(weex)imagePreview组件</text> -->
            <text class="font-title">(weex)点击图片测imagePreview</text>
            <image :src="imageList[0].src" style="width: 200px; height: 200px" @click="showSlider = true"></image>
        </div>
        <!-- 地图组件 -->
        <div class="btn-group">
            <text class="font-title">地图组件</text>
            <text class="btn" @click="pushPage('mapTest1')">mapTest1</text>
            <text class="btn" @click="pushPage('mapTest2')">mapTest2</text>
            <text class="btn" @click="pushPage('mapTest3')">mapTest3</text>
            <text class="btn" @click="pushPage('mapTest4')">mapTest4</text>
            <text class="btn" @click="pushPage('mapTest5')">mapTest5</text>
        </div>

        <div ref="swipeCard">
            <swipeCard v-if="showSwipeCard && isWeex"></swipeCard>
        </div>
        <div ref="wxLottie">
            <wx-lottie v-if="showLottie && isWeex"></wx-lottie>
        </div>
        <div class="btn-group">
            <text>(weex)video组件</text>
            <text class="btn" @click="pushPage('video')">video</text>
        </div>
        <div class="btn-group">
            <text>(weex)umeWebview</text>
            <text class="btn" @click="pushPage('umewebview-communication')">weex与h5通信</text>
        </div>
        <div class="btn-group">
            <text>(weex)list</text>
            <text class="btn" @click="pushPage('list_scrollbar')">list_scrollbar</text>
            <text class="btn" @click="pushPage('long_list')">长列表优化测试</text>
        </div>
    </scroller>
    <picker :visibility="showPicker" :pick-list="pickList" :cur-value="curValue" :pickerStyle="{ position }" @pickerCancel="pickerCancel" @pickerConfirm="pickerConfirm"></picker>
    <date-picker :visibility="showDatePicker" :in-options="options" :pickerStyle="{ position }" @pickerCancel="datePickerCancel" @pickerConfirm="datePickerConfirm"></date-picker>
    <div class="slider-wrapper" v-if="showSlider">
        <div class="slider-overlay" @click="showSlider = false"></div>
        <slider class="slider" show-indicators="true" :style="{ height: 900 + 'px' }">
            <div class="frame" v-for="(img, index) in imageList" :key="index">
                <imagePreview class="img-br" :resize="img.resize" :ref="'imageFrame' + index" :src="img.src" :scaleable="true" :scaleMin="img.scaleMin" :scaleMax="img.scaleMax" :style="{ width: '750px', height: fullHeight + 'px' }" @load="onload" @click="onClick" @clickevent="onClickevent" @doubleclick="onDoubleclick"></imagePreview>
            </div>
            <indicator class="slider-indicator"></indicator>
        </slider>
    </div>

    <modal :value="showModal" :content="content" okText="确认" @onOk="closeModal" :modal-style="{ position: position }"></modal>
    <umeLoading :visible="showLoading" :loading-style="{ position: position }"></umeLoading>
    <toast v-if="showToast" :content="content" @close="closeToast" :toastStyle="{ position: position }"></toast>
</div>
</template>

  
<script>
import picker from '../../../components/picker.vue';
import datePicker from '../../../components/datePicker.vue';
import compMixin from '../../../mixin/compMixin';
import swipeCard from '../../../components/swipeCard.vue';
import wxLottie from '../../../components/wxLottie.vue';
import {
    share,
    jumpParams
} from '../../../utils/constants.js';
import {
    xlog,
    removeItem,
    callNative,
    jumpNative,
} from '@/utils/jsapi.js';

import {
    Broadcast,
    getAssetsPath,
    pushPage,
    isWeex,
    isAndroid
} from '@/utils/index.js'

// const EnvImage = !isWeex ? Image : GImage;
const dom = weex.requireModule('dom');
const tab2 = Broadcast('UmeLDP');
const position = isWeex ? 'fixed' : 'absolute';
const imageList = [{
        scaleMin: 0.5,
        scaleMax: 2,
        resize: 'contain',
        src: 'http://img.umetrip.com/fs/snspost/user/155,124f741809972c28',
    },
    {
        scaleMin: 0.5,
        scaleMax: 1,
        resize: 'cover',
        src: 'http://img.umetrip.com/fs/snspost/user/153,124f741e89dc6ac1',
    },
    {
        scaleMin: 1,
        scaleMax: 2,
        resize: 'stretch',
        src: 'http://img.umetrip.com/fs/snspost/user/153,124f7424ede17768',
    },
    {
        scaleMin: 0.25,
        scaleMax: 3,
        resize: 'contain',
        src: 'http://img.umetrip.com/fs/snspost/user/154,124fa0c81e23f257',
    },
    {
        scaleMin: 0.5,
        scaleMax: 2,
        resize: 'contain',
        src: '../../images/no-result.png',
    },
    {
        scaleMin: 0.5,
        scaleMax: 2,
        resize: 'contain',
        src: `data:image/png;base64,${share.longImg}`,
    },
];
const pickList = [
    [{
            label: '全部',
            value: 'all'
        },
        {
            label: '卡折',
            value: 'card'
        },
        {
            label: '证件',
            value: 'credentials'
        },
        {
            label: '钱包箱包',
            value: 'wallet'
        },
        {
            label: '数码产品',
            value: 'digital'
        },
        {
            label: '衣物鞋包',
            value: 'clothes'
        },
        {
            label: '其他',
            value: 'others'
        },
    ],
];
const options = {
    start: '2021-1-5',
    end: '2022-2-25',
};
export default {
    mixins: [compMixin],
    components: {
        picker,
        datePicker,
        swipeCard,
        // airportList,
        wxLottie,
    },
    props: {
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
            showPicker: false,
            pickList,
            imageList,
            position,
            options,
            curValue: ['wallet'],
            airportOrCity: 'airport',
            showDatePicker: false,
            showSwipeCard: false,
            showAirportList: false,
            showLottie: false,
            showTxt: false,
            showSlider: false,
            showBrower: false,
            currentIndex: 0,
            currentImageUrl: '',
            ref: '',
        };
    },
    beforeCreate() {
        const url = getAssetsPath('../../../assets/fonts/dinBold.ttf');
        // const url = 'file:///var/mobile/Containers/Data/Application/2F219113-9EA7-4E1C-BCF9-1BFA1AE341CA/Documents/UmeWeexFile/ume_1eee58809591478896ac1c07df62372c/4.1.3/airTicketProd/assets/fonts/dinBold.ttf'
        const temp = isAndroid ? 'weex' : 'UmeWeexFile';
        const useUrl = `${url.split(temp)[0]}${temp}/ume_242a2da8df4f41e089eed9a8c4660470/6.0.0/airTicketProd/assets/fonts/dINAlternateBold.ttf`;
        xlog.log(`fonts路径:${url}`);
        xlog.log(`useUrl:${useUrl}`);
        dom.addRule('fontFace', {
            fontFamily: 'dinBold',
            src: `url('${useUrl}')`,
            // 'src': "url('http://img.umetrip.com/fs/h5/static/150,11e7fb4292ba7a6a')"
        });
    },
    created() {},
    beforeDestroy() {
        tab2.close();
    },
    methods: {
        jumpWeex(name, flag) {
            const proj = jumpParams[name];
            const param = {
                pageId: 200201,
                params: {
                    sessionParams: proj.sessionParams,
                    weexParams: proj.weexParams,
                },
            };
            flag === 'native' ?
                callNative('jumpNative', param, this.callback) :
                jumpNative(param).then((res) => this.callback(res));
        },
        onload(e) {
            console.log(`图片的load事件触发了${JSON.stringify(e)}`);
        },
        pushPage(page, params = {}) {
            let newParams = params;
            if (page === 'webview') {
                newParams = {
                    src: 'http://172.24.143.24:8004/index.html?flightNo=MF3113&flightDate=2022-07-28&adept=PEK&adest=SHA&isTakeOff=true#/example',
                };
            }
            pushPage(page, newParams);
        },
        getData() {},
        jumpWeb(name) {
            const proj = jumpParams[name];
            const param = {
                pageId: 200200,
                params: {
                    url: proj.url
                },
            };
            if (proj.isFullScreen) {
                param.params.isFullScreen = proj.isFullScreen;
            }
            callNative('jumpNative', param, () => {});

        },
        showModalFn(content = '这是一个弹框') {
            this.showModal = true;
            this.content = content;
        },
        showToastFn(content = '这是一个消息') {
            this.showToast = true;
            this.content = content;
        },
        showLoadingFn() {
            this.showLoading = true;
            const loadingId = setTimeout(() => {
                this.showLoading = false;
                clearTimeout(loadingId);
            }, 2000);
        },
        pickerCancel() {
            this.showPicker = false;
        },
        pickerConfirm(item, index) {
            xlog.log(index, item);
            this.showPicker = false;
            this.showModalFn(item);
        },
        datePickerCancel() {
            this.showDatePicker = false;
        },
        datePickerConfirm(item, index) {
            xlog.log(index, item);
            this.showDatePicker = false;
            this.showModalFn(JSON.stringify(item));
        },
        changeAirCity(tag) {
            this.airportOrCity = tag === 1 ? 'airport' : 'city';
            this.showAirportList = true;
        },
        cleanAirportData() {
            removeItem('interCityList');
            removeItem('civilCityList', () => {
                this.showToast = true;
                this.content = '删除成功';
            });
        },
        scrollTo(tag) {
            let ref;
            if (tag === 1) {
                this.showSwipeCard = true;
                ref = this.$refs.swipeCard;
            } else if (tag === 2) {
                this.showLottie = true;
                ref = this.$refs.wxLottie;
            }
            if (ref) {
                const tempId = setTimeout(() => {
                    dom.scrollToElement(ref, {
                        offset: 0,
                        animated: true,
                    });
                    clearTimeout(tempId);
                }, 100);
            }
        },
        airportListCorfirm(args) {
            xlog.log(args);
            this.showAirportList = false;
            this.showModalFn(JSON.stringify(args));
        },
        onClickevent() {
            xlog.log('clickevent事件执行了');
            this.showSlider = false;
            // this.showToast = true
            // this.content = 'clickevent事件执行了'
        },
        /*  callNativePayPwd() {
          callNativeComponent('payPwd', {
            title: '密码确认',
            type: 3,
            status: 1,
          }).then(() => {
            // console.log(data);
          });
        },
        compressImage() {
          let ref = this.$refs.canvas_holder;
          const size = isWeex
            ? { width: 750, height: 400 }
            : {
                width: parseInt(ref.style.width, 10) * 75,
                height: parseInt(ref.style.height, 10) * 75,
              };
          if (!isWeex) {
            ref.width = size.width;
            ref.height = size.height;
          }
          if (isWeex) {
            if (enable) {
              ref = enable(ref, { bridge: WeexBridge });
              ref.width = size.width;
              ref.height = size.height;
            }
          }
          const ctx = ref.getContext('2d');
          const image = new EnvImage();
          image.src = 'https://gw.alicdn.com/tfs/TB1KwRTlh6I8KJjy0FgXXXXzVXa-225-75.png';
          image.onload = function (e) {
            // console.log(JSON.stringify(e));
            const target = e.target || {};
            const { naturalWidth } = target;
            const { naturalHeight } = target;
            ctx.drawImage(image, 0, 0, naturalWidth, naturalHeight);
            // console.log('1111', ref.toDataURL);
          };
        },
        onBrowerClick(index, item) {
          this.currentIndex = index;
          this.currentImageUrl = item;
          const ref = this.$refs[`image${index}`][0];
          // dom.getComponentRect(ref, result => {
          //   let size = result.size || {}
          // console.log(JSON.stringify(size))
          // })
          this.ref = ref && ref.ref;
          this.showBrower = true;
        },
        onload(e) {
         console.log(`图片的load事件触发了${JSON.stringify(e)}`);
        },
        // onClick(e) {
        // console.log('click事件执行了');
        // this.showToast = true
        // this.content = 'click事件执行了'
        // },
        // onDoubleclick(e) {
          // console.log('doubleclick事件执行了');
        // this.showToast = true
        // this.content = 'doubleclick事件执行了'
        // }, */
    },
};
</script>

  
<style scoped>
.tab2_wrapper {
    align-items: center;
    justify-content: center;
    background-color: #6d7dff;
    width: 750px;
    /* overflow: hidden; */
}

.tab2_title {
    font-size: 36px;
    font-weight: bold;
    height: 90px;
    line-height: 90px;
    text-align: center;
    color: #ffffff;
}

.tab2_content {
    width: 750px;
    background-color: #ffffff;
    align-items: center;
    /* padding-top: 20px; */
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

.font-title {
    color: #333333;
    font-size: 28px;
    line-height: 30px;
}

.din_bold_font {
    font-family: dinBold;
    font-size: 110px;
    color: #d45c50;
}

.bold_font {
    font-size: 110px;
    color: #d45c50;
}

.gcanvas {
    width: 750px;
    height: 400px;
    background-color: #6d7dff;
}

.slider-wrapper {
    position: absolute;
    left: 0;
    width: 750px;
    top: 0;
    bottom: 0;
    align-items: center;
    justify-content: center;
}

.slider-overlay {
    position: absolute;
    left: 0;
    width: 750px;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);

}

.slider {
    width: 750px;
}

.slider-indicator {
    position: absolute;
    width: 750px;
    height: 8px;
    item-size: 8px;
    bottom: 100px;
}

.img-br {
    border-width: 2px;
    border-style: solid;
    border-color: red;
}
</style>
