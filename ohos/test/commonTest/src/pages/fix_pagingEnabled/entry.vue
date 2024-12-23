<template>
  <div class="full-page">
    <list class="list-wrap" :show-scrollbar="false" :paging-enabled="true">
      <cell
          @appear="onAppear"
          @disappear="onDisappear"
      >
        <div :style="{ backgroundColor: 'red', height: fullHeight + 'px'}" class="item"></div>
      </cell>
      <cell
        @appear="onAppear"
        @disappear="onDisappear"
      >
        <div :style="{ backgroundColor: 'green', height: fullHeight + 'px'}" class="item"></div>
      </cell>
      <cell>
        <div :style="{ backgroundColor: 'blue', height: fullHeight + 'px'}" class="item"></div>
      </cell>
      <cell>
        <div :style="{ backgroundColor: 'yellow', height: fullHeight + 'px'}" class="item"></div>
      </cell>
      <cell
        @disappear="onDisappear"
      >
        <div :style="{ backgroundColor: 'purple', height: fullHeight + 'px'}" class="item"></div>
      </cell>
      <cell>
        <div :style="{ backgroundColor: 'orange', height: fullHeight + 'px'}" class="item"></div>
      </cell>
      <cell>
        <div :style="{ backgroundColor: 'pink', height: fullHeight + 'px'}" class="item"></div>
      </cell>
      <cell
        @appear="onAppear"
      >
        <div :style="{ backgroundColor: 'black', height: fullHeight + 'px'}" class="item"></div>
      </cell>
      <cell>
        <div :style="{ backgroundColor: 'white', height: fullHeight + 'px'}" class="item"></div>
      </cell>
      <cell>
        <div :style="{ backgroundColor: 'gray', height: fullHeight + 'px'}" class="item"></div>
      </cell>
    </list>
    <div></div>
     <div> <div></div></div>
  </div>
</template>

<script>
import screenMixin from '@/mixin/screenMixin';

export default {
  mixins: [screenMixin],
  data() {
    return {
      itemList: [
        'red',
        'green',
        'blue',
        'yellow',
        'purple',
        'orange',
        'pink',
        'black',
        'white',
        'gray',
      ],
    };
  },
  created() {
    this.setScreen({
      isOpen: true,
      showStatusMsg: true,
      statusMsgColor: 0,
    });
  },
  methods: {
    onAppear(ext){
      console.log('显示了', ext)
    },
    onDisappear(ext){
      console.log('隐藏了', ext)
    }
  },
};
</script>

<style scoped>
.list-wrap {
  width: 750px;
  flex: 1;
}
.item {
  width: 750px;
}
</style>
