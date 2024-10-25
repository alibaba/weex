import { setAutoFullscreenNew, isAndroid } from '@/utils/jsapi.js';

const globalEvent = weex.requireModule('globalEvent');

export default {
  data() {
    return {
      statusbarHeight: 0,
      bottomHeight: 0,
      fullHeight: 1330,
    };
  },
  methods: {
    setScreen(
      params = {
        isOpen: true,
        showStatusMsg: true,
        statusMsgColor: 1, // 0 白 1 黑
      },
    ) {
      // 全屏
      setAutoFullscreenNew(params).then((data) => {
        this.fullHeight = data.fullHeight;
        this.bottomHeight = data.bottomHeight;
        this.statusbarHeight = data.statusbarHeight;
      });
      // 安卓底部显隐监听
      if (isAndroid) {
        globalEvent.addEventListener('WXFreshLayoutHeight', (data) => {
          const { env } = weex.config;
          const scale = 750 / env.deviceWidth;
          this.bottomHeight = data.bottomHeight * scale;
        });
      }
    },
  },
};
