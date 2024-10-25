<style scoped>
.wrapper {
  align-items: center;
}
.list {
  align-items: center;
}
.video {
  width: 630px;
  height: 350px;
  margin-top: 20px;
}
.video_wrapper {
  width: 750px;
  align-items: center;
  padding-bottom: 40px;
  border-bottom-color: darkblue;
  border-bottom-style: dotted;
  border-bottom-width: 4px;
}
.info_wrapper {
  padding: 0 10px;
  margin-top: 10px;
}
.info {
  font-size: 30px;
}
.btnn {
  border-width: 1px;
  border-color: brown;
  border-style: solid;
  padding: 10px;
  margin: 10px;
}
.bar {
  height: 10px;
  border-bottom-color: darkblue;
  border-bottom-style: dotted;
  border-bottom-width: 2px;
}
</style>

<template>
  <list class="list">
    <cell class="cell">
      <div class="video_wrapper">
        <div class="info_wrapper">
          <text class="info" style="margintop: 100px"
            >第6次：配合晶哥测试代码更新</text
          >
        </div>
        <div class="info_wrapper">
          <text class="info">
            第1个：这里属性：静音播放；
            初始播放状态palyStatus为"play";全屏时显示锁屏按钮showScreenLockButton为true；没有传controls；</text
          >
        </div>
        <div class="info_wrapper">
          <text class="info"
            >第1个：这里事件测：元数据加载进度progress;元数据加载完成触发事件loadedmetadata；播放进度事件timeupdate；</text
          >
        </div>
        <div class="info_wrapper">
          <text class="info">{{ `第一个视频加载进度${buffered1}` }}</text>
        </div>
        <div class="info_wrapper">
          <text class="info">{{
            `第一个视频宽、高、时长: ${width1} ${height1} ${loadedDuration1}`
          }}</text>
        </div>
        <div class="info_wrapper">
          <text class="info">{{
            `第一个视频播放进度${currentTime1}/${duration1}`
          }}</text>
        </div>
        <video
          class="video"
          :src="src1"
          :muted="muted2"
          :playStatus="playStatus1"
          title="冰与火之歌"
          :showScreenLockButton="true"
          @start="(e) => onstart(e, 1)"
          @pause="(e) => onpause(e, 1)"
          @progress="(e) => onprogress(e, 1)"
          @loadedmetadata="(e) => loadedmetadata(e, 1)"
          @timeupdate="(e) => ontimeupdate(e, 1)"
        ></video>
      </div>
    </cell>
    <cell>
      <div class="video_wrapper">
        <div class="info_wrapper">
          <text class="info"
            >第2个：这里属性palyStatus为"pause";传了controls为controls;海报封面：poster;muted初始为静音播放；</text
          >
        </div>
        <div class="info_wrapper">
          <text class="info">第2个：这里事件和第一个视频一样</text>
        </div>
        <div class="info_wrapper">
          <text class="info">{{ `第二个视频加载进度${buffered2}` }}</text>
        </div>
        <div class="info_wrapper">
          <text class="info">{{
            `第二个视频宽、高、时长: ${width2} ${height2} ${loadedDuration2}`
          }}</text>
        </div>
        <div class="info_wrapper">
          <text class="info">{{
            `第二个视频播放进度${currentTime2}/${duration2}`
          }}</text>
        </div>
        <video
          class="video"
          :src="src2"
          :playStatus="playStatus2"
          controls
          :muted="muted2"
          :poster="poster2"
          @start="(e) => onstart(e, 2)"
          @pause="(e) => onpause(e, 2)"
          @progress="(e) => onprogress(e, 2)"
          @loadedmetadata="(e) => loadedmetadata(e, 2)"
          @timeupdate="(e) => ontimeupdate(e, 2)"
        ></video>
      </div>
    </cell>
    <cell>
      <div class="video_wrapper">
        <div class="info_wrapper">
          <text class="info"
            >第3个：这里属性palyStatus为"pause";
            初始controls传值nocontrols，即不显示controls；
            direction传值-90，即进入全屏时，屏幕顺时针90；</text
          >
        </div>
        <div class="info_wrapper">
          <text class="info"
            >第3个：这里事件在下方显示start，pause，finish，fail四个状态；</text
          >
        </div>
        <div class="info_wrapper btnn" @click="changeControl">
          <text class="info">点击这里显示controls</text>
        </div>
        <video
          class="video"
          :src="src3"
          :playStatus="playStatus3"
          :controls="controls"
          :direction="-90"
          @start="(e) => onstart(e, 3)"
          @pause="(e) => onpause(e, 3)"
          @finish="onfinish"
          @fail="onfail"
        ></video>
        <text class="info">第3个视频播放状态：state: {{ state }}</text>
      </div>
    </cell>
    <cell class="cell">
      <div class="video_wrapper">
        <div class="info_wrapper">
          <text class="info"
            >第4个：这里属性没传playStatus，应该默认pause；没传controls；延迟属性initialTime传为30秒；</text
          >
        </div>
        <div class="info_wrapper">
          <text class="info"
            >第4个：这里事件监控fullscreenchange全屏和退出全屏事件，注意返回值；</text
          >
        </div>
        <video
          class="video"
          :src="src1"
          title="冰与火之歌"
          initialTime="30"
          @start="(e) => onstart(e, 4)"
          @pause="(e) => onpause(e, 4)"
          @fullscreenchange="fullscreenchange"
        ></video>
        <text>切换回调：{{ modelcontent }}</text>
      </div>
    </cell>
    <cell class="cell">
      <div class="video_wrapper">
        <div class="info_wrapper">
          <text class="info">第5-1个：竖屏direction不传</text>
        </div>
        <video class="video" :src="src4" title="竖屏direction不传"></video>
        <dir class="bar"></dir>
        <div class="info_wrapper">
          <text class="info">第5-2个：横屏direction不传</text>
        </div>
        <video class="video" :src="src2" title="横屏direction不传"></video>
        <dir class="bar"></dir>
        <div class="info_wrapper">
          <text class="info">第5-3个：竖屏direction为0</text>
        </div>
        <video
          class="video"
          :src="src4"
          title="竖屏direction为0"
          :direction="0"
        ></video>
        <dir class="bar"></dir>
        <div class="info_wrapper">
          <text class="info">第5-4个：横屏direction为0</text>
        </div>
        <video
          class="video"
          :src="src2"
          title="横屏direction为0"
          :direction="0"
        ></video>
        <dir class="bar"></dir>
        <div class="info_wrapper">
          <text class="info">第5-5个：竖屏direction为90</text>
        </div>
        <video
          class="video"
          :src="src4"
          title="竖屏direction为90"
          :direction="90"
        ></video>
        <dir class="bar"></dir>
        <div class="info_wrapper">
          <text class="info">第5-6个：横屏direction为90</text>
        </div>
        <video
          class="video"
          :src="src2"
          title="横屏direction为90"
          :direction="90"
        ></video>
        <dir class="bar"></dir>
        <div class="info_wrapper">
          <text class="info">第5-7个：竖屏direction为-90</text>
        </div>
        <video
          class="video"
          :src="src4"
          title="竖屏direction为-90"
          :direction="-90"
        ></video>
        <dir class="bar"></dir>
        <div class="info_wrapper">
          <text class="info">第5-8个：横屏direction为-90</text>
        </div>
        <video
          class="video"
          :src="src2"
          title="横屏direction为-90"
          :direction="-90"
        ></video>
      </div>
    </cell>
    <cell class="cell">
      <div class="video_wrapper">
        <div class="info_wrapper">
          <text class="info"
            >第6个：这里属性controls为nocontrols;测试自定义导航栏；</text
          >
        </div>
        <div class="info_wrapper">
          <text class="info"
            >第6个：这里事件监听进入和退出全屏事件，并打印出来；</text
          >
        </div>
        <div class="info_wrapper">
          <text class="info"
            >测试：{{ `第6个视频播放进度${currentTime6}/${duration6}` }}</text
          >
          <text>切换回调：{{ modelcontent6 }}</text>
        </div>
        <div class="info_wrapper btnn" @click="changeFullScreen6">
          <text class="info">自定义全屏按钮</text>
        </div>
        <div class="info_wrapper btnn" @click="changeMuted6">
          <text class="info">自定义静音按钮</text>
        </div>
        <div class="info_wrapper btnn" @click="changePlay6">
          <text class="info">自定义播放暂停按钮</text>
        </div>
        <div class="info_wrapper btnn" @click="changeCurrentTime">
          <text class="info">自定义播放进度按钮</text>
        </div>
        <video
          class="video"
          :src="src1"
          title="自定义导航栏"
          controls
          :playStatus="playStatus6"
          :muted="muted6"
          :fullScreen="fullScreen6"
          :currentTime="currTime6"
          @fullscreenchange="fullscreen6cb"
          @start="(e) => onstart(e, 6)"
          @pause="(e) => onpause(e, 6)"
          @timeupdate="(e) => ontimeupdate(e, 6)"
        ></video>
      </div>
    </cell>
    <cell class="cell">
      <div class="video_wrapper">
        <div class="info_wrapper">
          <text class="info">第7个：手势测试</text>
        </div>
        <div class="info_wrapper">
          <text class="info"
            >手势属性都没传：应该默认非全屏关闭所有手势，全屏打开所有手势</text
          >
        </div>
        <video
          class="video"
          :src="src1"
          title="非全屏关闭手势，全屏打开手势"
          @start="(e) => onstart(e, 7)"
          @pause="(e) => onpause(e, 7)"
        ></video>
        <text class="info">第7个视频播放状态：state: {{ state7 }}</text>
      </div>
    </cell>
    <cell class="cell">
      <div class="video_wrapper">
        <div class="info_wrapper">
          <text class="info">第8个：手势测试</text>
        </div>
        <div class="info_wrapper">
          <text class="info">非全屏传值打开所有手势，全屏传值关闭所有手势</text>
        </div>
        <video
          class="video"
          :src="src1"
          title="非全屏传值打开所有手势，全屏传值关闭所有手势"
          :vslideGesture="true"
          :playGesture="true"
          :vslideGestureFullscreen="false"
          :playGestureFullscreen="false"
          @start="(e) => onstart(e, 8)"
          @pause="(e) => onpause(e, 8)"
        ></video>
        <text class="info">第8个视频播放状态：state: {{ state8 }}</text>
      </div>
    </cell>
    <cell class="cell">
      <div class="video_wrapper">
        <div class="info_wrapper">
          <text class="info">第9个：手势测试</text>
        </div>
        <div class="info_wrapper">
          <text class="info"
            >非全屏打开亮度音量播放进度手势，其他传值关闭；全屏关闭亮度音量播放进度手势，其他传值打开</text
          >
        </div>
        <video
          class="video"
          :src="src1"
          title="非全屏打开亮度音量播放进度手势，其他传值关闭；全屏关闭亮度音量播放进度手势，其他传值打开"
          :vslideGesture="true"
          :playGesture="false"
          :vslideGestureFullscreen="false"
          :playGestureFullscreen="true"
          @start="(e) => onstart(e, 9)"
          @pause="(e) => onpause(e, 9)"
        ></video>
      </div>
    </cell>
    <cell class="cell">
      <div class="video_wrapper">
        <div class="info_wrapper">
          <text class="info">第10个：手势测试</text>
        </div>
        <div class="info_wrapper">
          <text class="info"
            >非全屏打开播放暂停手势，其他不传默认关闭；全屏关闭播放暂停手势，其他不传默认打开</text
          >
        </div>
        <video
          class="video"
          :src="src1"
          title="非全屏打开播放暂停手势，其他不传默认关闭；全屏关闭播放暂停手势，其他不传默认打开"
          :playGesture="true"
          :playGestureFullscreen="false"
          @start="(e) => onstart(e, 9)"
          @pause="(e) => onpause(e, 9)"
        ></video>
      </div>
    </cell>
    <cell class="cell">
      <div class="video_wrapper">
        <div class="info_wrapper">
          <text class="info">第11个：objectFit测试</text>
        </div>
        <div class="info_wrapper">
          <text class="info"
            >当视频大小与 video 容器大小不一致时，视频的表现形式:</text
          >
        </div>
        <div class="info_wrapper"><text class="info">contain包含；</text></div>
        <div class="info_wrapper btnn" @click="contain(1)">
          <text class="info">竖屏contain包含</text>
        </div>
        <div class="info_wrapper btnn" @click="contain(2)">
          <text class="info">横屏contain包含</text>
        </div>
        <div class="info_wrapper">
          <text class="info">fill填充:宽高都100% 拉伸展示，可能会变形；</text>
        </div>
        <div class="info_wrapper btnn" @click="contain(3)">
          <text class="info">竖屏fill填充</text>
        </div>
        <div class="info_wrapper btnn" @click="contain(4)">
          <text class="info">横屏fill填充</text>
        </div>
        <div class="info_wrapper">
          <text class="info">cover覆盖: 等比例填满屏幕，超出裁剪；</text>
        </div>
        <div class="info_wrapper btnn" @click="contain(5)">
          <text class="info">竖屏cover覆盖</text>
        </div>
        <div class="info_wrapper btnn" @click="contain(6)">
          <text class="info">横屏cover覆盖</text>
        </div>
      </div>
    </cell>
    <cell class="cell">
      <div class="video_wrapper">
        <div class="info_wrapper">
          <text class="info">第12个：单击测试，有导航栏</text>
        </div>
        <video
          class="video"
          :src="src1"
          title="单击测试"
          @clickevent="clickevent1"
        ></video>
        <div>
          <text class="info">{{ clickEvent1 }}</text>
        </div>
      </div>
    </cell>
    <cell class="cell">
      <div class="video_wrapper">
        <div class="info_wrapper">
          <text class="info">第13个：双击测试，有导航栏</text>
        </div>
        <video
          class="video"
          :src="src1"
          title="双击测试"
          @doubleclick="doubleclick1"
        ></video>
        <div>
          <text class="info">{{ doubleClick1 }}</text>
        </div>
      </div>
    </cell>
    <cell class="cell">
      <div class="video_wrapper">
        <div class="info_wrapper">
          <text class="info">第14个：补充测试初始化静音播放</text>
        </div>
        <div class="info_wrapper btnn" @click="playMuted">
          <text class="info">初始化静音播放</text>
        </div>
      </div>
    </cell>
    <cell class="cell">
      <div style="height: 100px"></div>
    </cell>
  </list>
</template>

<script>
import { pushPage } from '../../utils/index';

export default {
  data() {
    return {
      state: '----',
      state7: '----',
      state8: '----',
      src1: 'https://xitong-static.oss-cn-beijing.aliyuncs.com/video/202007171029.small.mp4',
      src2: 'https://www.umetrip.com/activity/shutl/jpy.mp4',
      src3: 'https://www.umetrip.com/activity/shutl/zyc.mp4',
      src4: 'https://cloud.video.taobao.com//play/u/1768198696/p/1/e/6/t/1/239439242603.mp4',
      poster1:
        'http://img.umetrip.com/getImage/67,04dece41d0ac11d6?module=entertain',
      poster2:
        'http://img.umetrip.com/jboss/UmeImageMagic/api/fileSystem/getFileByFid/42,0223d5415e986e4b?module=entertain',
      buffered1: '0%',
      loadedDuration1: 0,
      currentTime1: 0,
      duration1: 0,
      width1: 0,
      height1: 0,
      muted2: true,
      buffered2: '0%',
      loadedDuration2: 0,
      currentTime2: 0,
      duration2: 0,
      width2: 0,
      height2: 0,
      controls: 'nocontrols',
      playStatus1: 'play',
      playStatus2: 'pause',
      playStatus3: 'pause',
      playStatus4: 'pause',
      playStatus6: 'pause',
      playStatus12: 'pause',
      playStatus13: 'pause',
      showLockBtn: false,
      fullScreen6: false,
      muted6: false,
      currTime6: 0,
      currentTime6: 0,
      duration6: 0,
      clickEvent: {},
      doubleClick: {},
      modelcontent: '',
      modelcontent6: '',
      clickEvent1: {},
      doubleClick1: {},
    };
  },
  created() {},
  methods: {
    clickevent1(event) {
      this.clickEvent1 = JSON.stringify(event.detail);
    },
    doubleclick1(event) {
      this.doubleClick1 = JSON.stringify(event.detail);
    },
    clickevent(event) {
      this.clickEvent = JSON.stringify(event.detail);
      if (event.detail.play) {
        this.playStatus12 = 'pause';
      } else {
        this.playStatus12 = 'play';
      }
    },
    doubleclick(event) {
      this.doubleClick = JSON.stringify(event.detail);
      if (event.detail.play) {
        this.playStatus13 = 'pause';
      } else {
        this.playStatus13 = 'play';
      }
    },
    changeLock() {
      this.showLockBtn = true;
    },
    changeControl() {
      this.controls = 'controls';
    },
    changeFullScreen6() {
      this.fullScreen6 = !this.fullScreen6;
    },
    fullscreen6cb(event) {
      this.modelcontent6 += JSON.stringify(event.detail);
      if (event.detail) {
        if (event.detail.fullScreen) {
          // 进入全屏
          this.fullScreen6 = true;
        } else {
          // 退出全屏
          this.fullScreen6 = false;
        }
      }
    },
    changeMuted6() {
      this.muted6 = !this.muted6;
    },
    changePlay6() {
      if (this.playStatus6 === 'pause') {
        this.playStatus6 = 'play';
      } else {
        this.playStatus6 = 'pause';
      }
    },
    changeCurrentTime() {
      const xx = parseInt(this.currentTime6, 10);
      this.currTime6 = xx + 50;
    },
    onstart(event, index) {
      if (index === 3) {
        this.state = 'onstart';
      }
      if (index === 7) {
        this.state7 = 'onstart';
      }
      if (index === 8) {
        this.state8 = 'onstart';
      }
      console.log(`第${index}个视频开始了，其他视频停止`);
    },
    onpause(event, index) {
      if (index === 3) {
        this.state = 'onpause';
      }
      if (index === 7) {
        this.state7 = 'onpause';
      }
      if (index === 8) {
        this.state8 = 'onpause';
      }
      this[`playStatus${index}`] = 'pause';
      console.log(`第${index}个视频暂停了`);
    },
    onfinish() {
      this.state = 'onfinish';
    },
    onfail() {
      this.state = 'onfail';
    },
    onprogress(event, index) {
      const detail = event.detail || {};
      console.log(JSON.stringify(detail));
      this[`buffered${index}`] = `${parseInt(detail.buffered * 100, 10)}%`;
    },
    fullscreenchange(event) {
      console.log('收到fullscreenchange的回调');
      console.log(JSON.stringify(event.detail));
      this.modelcontent += JSON.stringify(event.detail);
    },
    loadedmetadata(event, index) {
      const detail = event.detail || {};
      console.log(JSON.stringify(detail));
      if (detail.width) {
        this[`width${index}`] = detail.width.toFixed(2);
        this[`height${index}`] = detail.height.toFixed(2);
        this[`loadedDuration${index}`] = detail.duration.toFixed(2);
      }
    },
    onwaiting() {
      console.log('js收到视频出现缓冲');
    },
    ontimeupdate(event, index) {
      const detail = event.detail || {};
      console.log(JSON.stringify(detail));
      this[`currentTime${index}`] =
        detail.currentTime && detail.currentTime.toFixed(2);
      this[`duration${index}`] = detail.duration && detail.duration.toFixed(2);
    },
    contain(idx) {
      let src = '';
      let objectFit = '';
      const muted = 0;
      // eslint-disable-next-line default-case
      switch (idx) {
        case 1:
          src =
            'https://cloud.video.taobao.com//play/u/1768198696/p/1/e/6/t/1/239439242603.mp4';
          objectFit = 'contain';
          break;
        case 2:
          src = 'https://www.umetrip.com/activity/shutl/jpy.mp4';
          objectFit = 'contain';
          break;
        case 3:
          src =
            'https://cloud.video.taobao.com//play/u/1768198696/p/1/e/6/t/1/239439242603.mp4';
          objectFit = 'fill';
          break;
        case 4:
          src = 'https://www.umetrip.com/activity/shutl/jpy.mp4';
          objectFit = 'fill';
          break;
        case 5:
          src =
            'https://cloud.video.taobao.com//play/u/1768198696/p/1/e/6/t/1/239439242603.mp4';
          objectFit = 'cover';
          break;
        case 6:
          src = 'https://www.umetrip.com/activity/shutl/jpy.mp4';
          objectFit = 'cover';
          break;
      }
      pushPage('videoFit', { src, objectFit, muted });
    },
    playMuted() {
      const src = 'https://www.umetrip.com/activity/shutl/jpy.mp4';
      const objectFit = 'contain';
      const muted = 1;
      pushPage('videoFit', { src, objectFit, muted });
    },
  },
};
</script>
