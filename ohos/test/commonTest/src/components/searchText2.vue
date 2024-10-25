<template>
  <div>
    <div v-if="showNav" ref="navbar" id="navbar123" class="ume_minibar" :style="newBarStyle">
      <div class="wxc-minibar-box" :style="{ height: navbarHeight + 'px' }">
        <div
            aria-label="返回"
            :accessible="true"
            :style="{ height: navbarHeight + 'px', 'justify-content': 'center' }"
            @click="leftButtonClicked"
        >
          <slot name="left">
            <div
                :style="{
              height: navbarHeight + 'px',
              width:
                leftText || rightText
                  ? navType === 'input' || navType === 'search'
                    ? '88px'
                    : '180px'
                  : '88px',
              'justify-content': 'center',
            }"
            >
              <image
                  ref="navLeftIcon"
                  :src="imageJson[leftButton] || leftButton || LeftIconDark"
                  v-if="!leftText"
                  class="left-button"
              ></image>
              <image
                  ref="navLeftIconDark"
                  :src="imageJson[leftButtonAfter] || leftButtonAfter || LeftIcon"
                  v-if="!leftText"
                  class="left-button opacity-o"
              ></image>
              <text
                  v-if="leftText"
                  ref="navLeftText"
                  class="icon-text icon-leftText"
                  :class="[
                navType === 'input' || navType === 'search' ? 'icon-text2' : '',
              ]"
                  :style="leftTextStyle"
              >{{ leftText }}</text
              >
              <text
                  v-if="leftText"
                  ref="navLeftTextDark"
                  class="icon-text icon-leftText opacity-o"
                  :class="[
                navType === 'input' || navType === 'search' ? 'icon-text2' : '',
              ]"
                  :style="leftTextColorAfter"
              >{{ leftText }}</text
              >
            </div>
          </slot>
        </div>
        <div
            id="middle"
            class="middle_box"
            :style="{ height: navbarHeight + 'px' }"
            @click="middleClicked"
        >
          <slot name="middle">
            <div
                v-if="navType === 'text'"
                class="middle_title_container"
                :style="{
              height: navbarHeight + 'px',
            }"
            >
              <text
                  ref="navMiddleText"
                  :class="[
                'middle-title',
                'medium',
              ]"
                  :style="textTitleStyle"
              >{{ title }}</text
              >
              <text
                  ref="navMiddleTextDark"
                  :class="[
                'middle-title',
                'medium',
                'opacity-o',
              ]"
                  :style="textTitleStyleAfter"
              >{{ title }}</text
              >
            </div>
            <div
                v-if="navType === 'input'"
                :style="{
              height: navbarHeight + 'px',
              width: searchWidth + 'px',
              'justify-content': 'center',
            }"
            >
              <div class="search_wrap">
                <input
                    :value="searchText"
                    id="input"
                    type="text"
                    class="search_input"
                    :placeholder="searchDefaultText"
                    return-key-type="input"
                    :placeholder-color="placeholderColor"
                    :style="computedInputStyle"
                    ref="inputRef"
                    @input="navInput"
                    @focus="navFocus"
                    @blur="navBlur"
                    @return="navSearch"
                />
                <image
                    class="searchIcon"
                    :src="searchIcon || SearchIconDark"
                />
                <image
                    v-if="detectShowClose"
                    id="searchclear"
                    class="closeImg"
                    :style="closeIconStyle"
                    :src="searchIconClear || SearchCloseIcon"
                    @click="searchClear()"
                ></image>
              </div>
            </div>
            <div
                v-if="navType === 'search'"
                :style="{
              height: navbarHeight + 'px',
              width: searchWidth + 'px',
              'justify-content': 'center',
            }"
            >
              <div class="search_wrap">
                <div
                    ref="searchModel"
                    class="search_input justify-c"
                    :style="computedSearchStyle"
                >
                  <slot name="defaultText">
                    <text :style="computedSearchTextStyle">{{
                        searchDefaultText
                      }}</text>
                  </slot>
                </div>
                <div
                    ref="searchModelDark"
                    class="search_input justify-c opacity-o"
                    :style="computedSearchStyleAfter"
                >
                  <slot name="defaultTextAfter">
                    <text
                        :style="computedSearchTextStyleAfter"
                        data-test="defaultText"
                    >{{ searchDefaultText }}</text
                    >
                  </slot>
                </div>
                <image
                    ref="searchIcon"
                    class="searchIcon"
                    :src="searchIcon || SearchIconDark"
                />
                <image
                    ref="searchIconAfter"
                    class="searchIcon opacity-o"
                    :src="searchIconAfter || SearchIcon"
                />
              </div>
            </div>
          </slot>
        </div>
        <div
            id="rightTest"
            :style="{ height: navbarHeight + 'px' }"
            @click="rightButtonClicked"
        >
          <slot name="right">
            <div
                :style="{
              height: navbarHeight + 'px',
              width:
                leftText || rightText
                  ? navType === 'input' || navType === 'search'
                    ? '128px'
                    : '180px'
                  : '88px',
            }"
                class="rightStyle"
            >
              <image
                  ref="navRightIcon"
                  v-if="rightButton && !rightText"
                  class="right-button"
                  :src="rightButton"
              ></image>
              <image
                  ref="navRightIconDark"
                  v-if="rightButtonAfter && !rightText"
                  class="right-button opacity-o"
                  :src="rightButtonAfter"
              ></image>
              <text
                  v-if="rightText"
                  ref="navRightText"
                  class="icon-text icon-rightText"
                  :class="[
                navType === 'input' || navType === 'search' ? 'icon-text1' : '',
              ]"
                  :style="rightTextStyle"
              >{{ rightText }}</text
              >
              <text
                  v-if="rightText"
                  ref="navRightTextDark"
                  class="icon-text icon-rightText opacity-o"
                  :class="[
                navType === 'input' || navType === 'search' ? 'icon-text1' : '',
              ]"
                  :style="rightTextColorAfter"
              >{{ rightText }}</text
              >
            </div>
          </slot>
        </div>
      </div>
    </div>
    <scroller class="scroller"
              id="scroll123"
              ref="scroller"
              @scroll="touchStart"
              @loadmore="loadMore"
              :loadmoreoffset="100"
              :offset-accuracy="100"
    >
      <div class="row" v-for="row in rows" :key="row.id">
        <text class="cellBox">{{row.name}}</text>
      </div>
    </scroller>
  </div>
</template>

<script>
import { isWeb, isInUmeApp, callNative } from '../utils/index'
import imageJson from '../assets/json/navbar.json';
// import BindingX from 'weex-bindingx/lib/index.weex.js';
import BindingX from "weex-bindingx"

const navigator = weex.requireModule('navigator');

export default {
  model: {
    prop: 'searchText',
  },
  props: {
    statusbarHeight: {
      type: Number,
      default: 80,
    },
    navbarHeight: {
      type: Number,
      default: 88,
    },
    searchWidth: {
      type: Number,
      default: 534,
    },
    backgroundColor: {
      type: [String, Array],
      default: '#fff',
    },
    leftButton: {
      type: String,
      default: '',
    },
    leftButtonAfter: {
      type: String,
      default: '',
    },
    textAfterColor: {
      type: String,
      default: '#3D3D3D',
    },
    inputTextColor: {
      type: String,
      default: '#333333',
    },
    searchBG: {
      type: String,
      default: '#f5f6f9',
    },
    searchBGAfter: {
      type: String,
      default: 'rgba(255,255,255,0.4)',
    },
    searchDefaultText: {
      type: String,
      default: '',
    },
    titleStyle: {
      type: Object,
      default() {
        return {};
      },
    },
    titleStyleAfter: {
      type: Object,
      default() {
        return {};
      },
    },
    rightButton: {
      type: String,
      default: '',
    },
    defaultTextColor: {
      type: String,
      default: '#999999',
    },
    defaultTextColorAfter: {
      type: String,
      default: '#ffffff',
    },
    rightButtonAfter: {
      type: String,
      default: '',
    },
    searchIcon: {
      type: String,
      default: '',
    },
    searchIconAfter: {
      type: String,
      default: '',
    },
    searchIconClear: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    leftText: {
      type: String,
      default: '',
    },
    rightText: {
      type: String,
      default: '',
    },
    navType: {
      type: String,
      default: 'text',
    },
    searchText: {
      type: String,
      default: '',
    },
    isScrollChange: {
      type: Boolean,
      default: true,
    },
    useDefaultReturn: {
      type: Boolean,
      default: true,
    },
    leftTextStyle: {
      type: Object,
      default() {
        return {};
      },
    },
    rightTextStyle: {
      type: Object,
      default() {
        return {};
      },
    },
    inputStyle: {
      type: Object,
      default() {
        return {};
      },
    },
    searchStyle: {
      type: Object,
      default() {
        return {};
      },
    },
    searchStyleAfter: {
      type: Object,
      default() {
        return {};
      },
    },
    closeIconStyle: {
      type: Object,
      default() {
        return {};
      },
    },
    placeholderColor: {
      type: String,
      default: '#333333',
    },
    h5ShowNavbar: {
      type: Boolean,
      default: false,
    },
    distance: {
      type: Number,
      default: 540,
    },
    isCloseWebview: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isHarmonyUmeApp: isInUmeApp,
      LeftIcon: imageJson.LeftIcon,
      LeftIconDark: imageJson.LeftIconDark,
      SearchIcon: imageJson.SearchIcon,
      SearchIconDark: imageJson.SearchIconDark,
      SearchCloseIcon: imageJson.SearchCloseIcon,
      imageJson,
      rows: [],
      // scrollBinding: Object,
    };
  },
  computed: {

    showNav() {
      console.log(this.imageJson);
      console.log('启动页面', this.isHarmonyUmeApp || h5ShowNavbar);
      const {h5ShowNavbar} = this;
      return this.isHarmonyUmeApp || h5ShowNavbar;
    },
    newBarStyle() {
      const {backgroundColor, statusbarHeight, isScrollChange, navbarHeight} =
          this;
      console.log(backgroundColor, statusbarHeight, isScrollChange, navbarHeight);
      return {
        position: 'fixed',
        top: 0,
        'z-index': 100,
        height: `${statusbarHeight + navbarHeight}px`,
        backgroundColor: isScrollChange
            ? `rgba(${backgroundColor[0]}, ${backgroundColor[1]}, ${backgroundColor[2]}, 1)`
            : backgroundColor,
      };
    },
    leftTextColorAfter() {
      return {
        ...this.leftTextStyle,
        color: this.textAfterColor,
      };
    },
    rightTextColorAfter() {
      return {
        ...this.rightTextStyle,
        color: this.textAfterColor,
      };
    },
    computedInputStyle() {
      return {
        width: `${this.searchWidth}px`,
        placeholderColor: this.placeholderColor,
        backgroundColor: this.searchBG,
        color: this.inputTextColor,
        ...this.inputStyle,
      };
    },
    computedSearchStyle() {
      return {
        width: `${this.searchWidth}px`,
        backgroundColor: this.searchBG,
        ...this.searchBarStyle,
      };
    },
    computedSearchStyleAfter() {
      return {
        width: `${this.searchWidth}px`,
        backgroundColor: this.searchBGAfter,
      };
    },
    computedSearchTextStyle() {
      return {
        ...this.searchStyle,
        color: this.defaultTextColor,
      };
    },
    computedSearchTextStyleAfter() {
      return {
        ...this.searchStyleAfter,
        color: this.defaultTextColorAfter,
      };
    },
    detectShowClose() {
      return this.searchText.length > 0;
    },
    textTitleStyle() {
      const width = this.leftText || this.rightText ? '390px' : '574px';
      const style = {
        color: '#333333',
        fontSize: '34px',
      };
      return {
        ...style,
        ...this.titleStyle,
        width,
      };
    },
    textTitleStyleAfter() {
      const width = this.leftText || this.rightText ? '390px' : '574px';
      return {
        color: '#333333',
        fontSize: '34px',
        ...this.titleStyleAfter,
        width,
      };
    },
  },
  created() {
    console.log("isWeb", isWeb);
    for (let i = 0; i < 80; i++) {
      this.rows.push({id: i, name: 'row ' + i})
    }
    if (!this.isHarmonyUmeApp) {
      document.title = this.title;
      if (this.h5ShowNavbar) {
        // 用于判断webview是否只打开了一个页面,即判断页面栈中是否只有一个页面
        this.firstPageMark = sessionStorage.getItem('first-page-mark');
        if (!this.firstPageMark) {
          history.replaceState({firstPage: true}, null);
          sessionStorage.setItem('first-page-mark', '1');
        }
      }
    }

  },
  methods: {
    touchStart(e) {
      console.log('touchStart触发了。');
      this.bindScroll(e.target, this.$refs);
    },
    bindScroll(anchors, refs) {
      console.log('=======================');
      const expressionList = [];
      refs && Object.keys(refs).forEach((key) => {
        const reg = /After$/;
        const expression = reg.test(key) ? `0+y/${this.distance}` : `1-y/${this.distance}`;
        const item = {
          element: this.getEl(refs[key]),
          property: 'opacity',
          expression,
        };
        expressionList.push(item);
      });
      this.backgroundColor &&
      this.isScrollChange &&
      setTimeout(() => {
        const distance = this.distance;
        const navbar = this.getEl(this.$refs.navbar);
        const leftIcon = this.getEl(this.$refs.navLeftIcon);
        const leftIconDark = this.getEl(this.$refs.navLeftIconDark);
        const rightIcon = this.getEl(this.$refs.navRightIcon);
        const navMiddleText = this.getEl(this.$refs.navMiddleText);
        const navMiddleTextDark = this.getEl(this.$refs.navMiddleTextDark);
        const rightIconDark = this.getEl(this.$refs.navRightIconDark);
        const navRightText = this.getEl(this.$refs.navRightText);
        const navRightTextDark = this.getEl(this.$refs.navRightTextDark);
        const navLeftText = this.getEl(this.$refs.navLeftText);
        const navLeftTextDark = this.getEl(this.$refs.navLeftTextDark);
        const searchIcon = this.getEl(this.$refs.searchIcon);
        const searchIconAfter = this.getEl(this.$refs.searchIconAfter);
        const searchInput = this.getEl(this.$refs.searchInput);
        const searchInputDark = this.getEl(this.$refs.searchInputDark);
        const searchModel = this.getEl(this.$refs.searchModel);
        const searchModelDark = this.getEl(this.$refs.searchModelDark);
        const anchor = this.getEl(anchors);
        this.scrollBinding = BindingX.bind({
          eventType: 'scroll',
          anchor: anchor,
          props: [
            {
              element: navbar,
              property: 'background-color',
              expression: `rgba(${this.backgroundColor[0]}, ${this.backgroundColor[1]}, ${this.backgroundColor[2]}, y > 0 ? min(y/${distance}, 1) : 0)`,
            },
            {
              element: leftIcon,
              property: 'opacity',
              expression: `y/${distance}`,
            },
            {
              element: leftIconDark,
              property: 'opacity',
              expression: `0+y/${distance}`,
            },
            {
              element: navMiddleTextDark,
              property: 'opacity',
              expression: `0+y/${distance}`,
            },
            {
              element: navMiddleText,
              property: 'opacity',
              expression: `1-y/${distance}`,
            },
            {
              element: rightIcon,
              property: 'opacity',
              expression: `1-y/${distance}`,
            },
            {
              element: rightIconDark,
              property: 'opacity',
              expression: `0+y/${distance}`,
            },
            {
              element: navRightText,
              property: 'opacity',
              expression: `1-y/${distance}`,
            },
            {
              element: navRightTextDark,
              property: 'opacity',
              expression: `0+y/${distance}`,
            },
            {
              element: navLeftText,
              property: 'opacity',
              expression: `1-y/${distance}`,
            },
            {
              element: navLeftTextDark,
              property: 'opacity',
              expression: `0+y/${distance}`,
            },
            {
              element: searchIcon,
              property: 'opacity',
              expression: `1-y/${distance}`,
            },
            {
              element: searchIconAfter,
              property: 'opacity',
              expression: `0+y/${distance}`,
            },
            {
              element: searchInput,
              property: 'opacity',
              expression: `1-y/${distance}`,
            },
            {
              element: searchInputDark,
              property: 'opacity',
              expression: `0+y/${distance}`,
            },
            {
              element: searchModel,
              property: 'opacity',
              expression: `1-y/${distance}`,
            },
            {
              element: searchModelDark,
              property: 'opacity',
              expression: `0+y/${distance}`,
            },
            ...expressionList,
          ],
        });
      }, 200);
    },
    loadMore() {
      // 加载更多数据
      console.log("start loadMore")
      for (let i = 0; i < 5; i++) {
        this.rows.push('row' + this.rows.length);
      }
    },

    // 此方法暂时保留,可用于后续实现导航栏滑动渐变到透明,停止滑动后恢复成原来颜色.在scroller中调用serollend事件即可
    onScrollEnd(e){
      console.log('scrollend', JSON.stringify(e))
      if (e.isTrusted && this.scrollBinding.token) {
        console.log('scrollend222222', this.scrollBinding.token, this.backgroundColor[1])
        BindingX.unbindAll()
        const navbar = this.getEl(this.$refs.navbar);
        const leftIcon = this.getEl(this.$refs.navLeftIcon);
        const leftIconDark = this.getEl(this.$refs.navLeftIconDark);
        const rightIcon = this.getEl(this.$refs.navRightIcon);
        const navMiddleText = this.getEl(this.$refs.navMiddleText);
        const navMiddleTextDark = this.getEl(this.$refs.navMiddleTextDark);
        const rightIconDark = this.getEl(this.$refs.navRightIconDark);
        const navRightText = this.getEl(this.$refs.navRightText);
        const navRightTextDark = this.getEl(this.$refs.navRightTextDark);
        const navLeftText = this.getEl(this.$refs.navLeftText);
        const navLeftTextDark = this.getEl(this.$refs.navLeftTextDark);
        const searchIcon = this.getEl(this.$refs.searchIcon);
        const searchIconAfter = this.getEl(this.$refs.searchIconAfter);
        const searchInput = this.getEl(this.$refs.searchInput);
        const searchInputDark = this.getEl(this.$refs.searchInputDark);
        const searchModel = this.getEl(this.$refs.searchModel);
        const searchModelDark = this.getEl(this.$refs.searchModelDark);
        this.scrollBinding = BindingX.bind({
          eventType: 'timing',
          duration: 200,
          props: [
            {
              element: navbar,
              property: 'background-color',
              expression: `rgba(${this.backgroundColor[0]}, ${this.backgroundColor[1]}, ${this.backgroundColor[2]} , 1)`,
            },
            {
              element: leftIcon,
              property: 'opacity',
              expression: '1',
            },
            {
              element: leftIconDark,
              property: 'opacity',
              expression: '1',
            },
            {
              element: navMiddleTextDark,
              property: 'opacity',
              expression: '1',
            },
            {
              element: navMiddleText,
              property: 'opacity',
              expression: '1',
            },
            {
              element: rightIcon,
              property: 'opacity',
              expression: '1',
            },
            {
              element: rightIconDark,
              property: 'opacity',
              expression: '1',
            },
            {
              element: navRightText,
              property: 'opacity',
              expression: '1',
            },
            {
              element: navRightTextDark,
              property: 'opacity',
              expression: '1',
            },
            {
              element: navLeftText,
              property: 'opacity',
              expression: '1',
            },
            {
              element: navLeftTextDark,
              property: 'opacity',
              expression: '1',
            },
            {
              element: searchIcon,
              property: 'opacity',
              expression: '1',
            },
            {
              element: searchIconAfter,
              property: 'opacity',
              expression: '1',
            },
            {
              element: searchInput,
              property: 'opacity',
              expression: '1',
            },
            {
              element: searchInputDark,
              property: 'opacity',
              expression: '1',
            },
            {
              element: searchModel,
              property: 'opacity',
              expression: '1',
            },
            {
              element: searchModelDark,
              property: 'opacity',
              expression: '1',
            }
          ],
        });
      }
    },
    leftButtonClicked() {
      if (this.useDefaultReturn) {
        // 当降级为h5页面且当前页面栈中只有一个页面，那么再后退的话关闭webview
        if (!this.isHarmonyUmeApp && isWeb() && this.h5ShowNavbar && history.state && history.state.firstPage) {
          if (this.isCloseWebview) {
            callNative('finishWebView', {}, () => {
              console.log('webview closed');
            });
          } else {
            this.$emit('closeWebview')
          }
        } else {
          navigator.pop({}, () => {
          });
        }
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
    middleClicked() {
      (this.navType === 'text' || this.navType === 'search') &&
      this.$emit('middleClicked', {});
    },
    navInput(e) {
      this.navType === 'input' && this.$emit('input', e.value);
      this.navType === 'input' && this.$emit('navInput', e);
    },
    navFocus() {
      this.navType === 'input' && this.$emit('navFocus', {});
    },
    navBlur() {
      this.navType === 'input' && this.$emit('navBlur', {});
    },
    navSearch(e) {
      this.navType === 'input' && this.$emit('navSearch', e);
    },
    searchClear(e) {
      this.navType === 'input' && this.$emit('input', '');
      this.navType === 'input' && this.$emit('searchClear', e);
    },
    getEl(e) {
      const ref = e ? e.ref : e;
      return e;
    },
  },
};
</script>

<style scoped>
.medium {
  font-weight: bold;
}

.ume_minibar {
  margin-top: 100px;
  width: 750px;
  flex-direction: row;
  align-items: flex-start;
}

.wxc-minibar-box {
  width: 750px;
  flex-direction: row;
  align-items: center;
}

.opacity-o {
  opacity: 0;
}

.middle_box {
  flex: 1;
}

.middle-title {
  text-align: center;
  overflow: hidden;
  font-weight: bold;
  position: absolute;
  lines: 1;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.left-button {
  width: 88px;
  height: 88px;
  position: absolute;
}

.right-button {
  width: 88px;
  height: 88px;
  position: absolute;
}

.icon-text {
  font-size: 30px;
  color: #666666;
  position: absolute;
  width: 180px;
  lines: 1;
}

.icon-text1 {
  width: 128px;
}

.icon-text2 {
  width: 88px;
}

.rightStyle {
  align-items: flex-end;
  justify-content: center;
}

.icon-leftText {
  padding-left: 32px;
  padding-right: 16px;
}

.icon-rightText {
  padding-left: 16px;
  padding-right: 32px;
  text-align: right;
}

.searchIcon {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 18px;
  left: 30px;
}

.search_wrap {
  height: 66px;
}

.search_input {
  height: 66px;
  border-radius: 39px;
  padding-left: 70px;
  padding-right: 70px;
  position: absolute;
}

.closeImg {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 18px;
  right: 20px;
}

.justify-c {
  justify-content: center;
}

.middle_title_container {
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex: 1;
}

.scroller {
  margin-top: 168px;
  height: 800px;
}

.cellBox {
  width: 100%;
  height: 200px;
  margin-top: 50px;
  background: #f5f5f5;
}
</style>
