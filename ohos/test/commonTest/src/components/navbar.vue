<style scoped>
.medium {
  font-weight: bold;
}

.wxc-minibar {
  width: 750px;
  height: 90px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.left {
  min-width: 180px;
  flex-direction: row;
}

.middle-title {
  font-size: 34px;
  color: #ffffff;
  height: 40px;
  line-height: 40px;
  font-weight: bold;
}

.right {
  min-width: 180px;
  padding-right: 10px;
  flex-direction: row;
  justify-content: flex-end;
}

.left-button {
  width: 88px;
  height: 88px;
}

.right-button {
  width: 88px;
  height: 88px;
}

.icon-text {
  font-size: 28px;
  color: #ffffff;
}
</style>

<template>
  <div class="wxc-minibar" :style="newBarStyle" v-if="show && isWeex">
    <div
      class="left"
      @click="leftButtonClicked"
      aria-label="返回"
      :accessible="true"
    >
      <slot name="left">
        <image :src="leftButton" v-if="!leftText" class="left-button"></image>
        <text v-if="leftText" class="icon-text" :style="{ color: textColor }">{{
          leftText
        }}</text>
      </slot>
    </div>
    <slot name="middle">
      <text class="middle-title medium" :style="{ color: textColor }">{{
        title
      }}</text>
    </slot>
    <div class="right" @click="rightButtonClicked">
      <slot name="right">
        <image
          v-if="rightButton && !rightText"
          class="right-button"
          :src="rightButton"
          :aria-hidden="true"
        ></image>
        <text
          v-if="rightText"
          class="icon-text"
          :style="{ color: textColor }"
          >{{ rightText }}</text
        >
      </slot>
    </div>
  </div>
</template>

<script>
import { isWeex } from '../utils/index';

const navigator = weex.requireModule('navigator');

export default {
  props: {
    statusbarHeight: {
      type: Number,
      default: 0,
    },
    backgroundColor: {
      type: String,
      default: '#FFFFFF',
    },
    leftButton: {
      type: String,
      default: '../../images/back.png',
    },
    textColor: {
      type: String,
      default: '#3D3D3D',
    },
    rightButton: {
      type: String,
    },
    title: {
      type: String,
      default: '标题',
    },
    leftText: {
      type: String,
      default: '',
    },
    rightText: {
      type: String,
      default: '',
    },
    useDefaultReturn: {
      type: Boolean,
      default: true,
    },
    show: {
      type: Boolean,
      default: true,
    },
    barStyle: {
      type: Object,
      default() {
        return {
          position: 'fixed',
          top: `${this.statusbarHeight}px`,
          'z-index': 100,
        };
      },
    },
    hideNavbar: {
      type: Boolean,
      default: true,
    },
    isFullScreen: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isWeex,
    };
  },
  computed: {
    newBarStyle() {
      const { backgroundColor, barStyle } = this;
      barStyle.top = this.isFullScreen ? `${this.statusbarHeight}px` : '0px';
      return {
        backgroundColor,
        ...barStyle,
      };
    },
  },
  created() {
    if (!this.isWeex) {
      document.title = this.title;
    }
  },
  methods: {
    leftButtonClicked() {
      if (this.useDefaultReturn) {
        navigator.pop({}, () => {});
      }
      this.$emit('leftButtonClicked', {});
    },
    rightButtonClicked() {
      const hasRightContent =
        this.rightText ||
        this.rightButton ||
        (this.$slots && this.$slots.right);
      hasRightContent && this.$emit('rightButtonClicked', {});
    },
  },
};
</script>
