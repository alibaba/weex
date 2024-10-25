<template>
  <div>
    <search-text
        :statusbarHeight="80"
        :navbarHeight="88"
        :backgroundColor="backgroundColor"
        leftButton
        leftButtonAfter
        useDefaultReturn
        :rightButton="rightButton"
        :rightText="rightText"
        :rightButtonAfter="rightButtonAfter"
        :title="title"
        :leftTextStyle="leftTextStyle"
        :rightTextStyle="rightTextStyle"
        :textAfterColor="textAfterColor"
        :isScrollChange="true"
        :navType="navType"
        :titleStyle="titleStyle"
        :searchWidth="534"
        :searchIcon="searchIcon"
        :searchIconAfter="searchIconAfter"
        :searchBG="searchBG"
        :searchBGAfter="searchBGAfter"
        :searchDefaultText="searchDefaultText"
        defaultTextColor
        defaultTextColorAfter
        :searchIconClear="searchIconClear"
        :searchText="searchText"></search-text>

  </div>
</template>

<script>
/**
 * :leftText="leftText"
 :rightText="rightText"
 */
import searchText from "../../components/searchText2.vue";

export default {
  created() {

  },
  components: {
    searchText
  },
  data() {
    return {
      backgroundColor: [0, 122, 204],
      leftbutton: '',
      rightButton: '',
      rightButtonAfter: '',
      title: '*****scroller demo2****',
      textAfterColor: 'red',
      // leftText: '',
      rightText: '确认',
      leftTextStyle: {},
      rightTextStyle: {},
      titleStyle: {},
      searchIcon: '',
      searchIconAfter: '',
      searchBGAfter: '',
      searchDefaultText: '',
      searchIconClear: '',
      searchText: '',
      searchBG: '#b9d1ea',
      navType: 'text',
      rows: [],
    }
  }
}
</script>

<style>

</style>