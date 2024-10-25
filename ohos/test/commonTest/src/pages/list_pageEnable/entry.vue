<template>
  <div class="full-page">
    <list class="list-wrap" :show-scrollbar="false" :paging-enabled="true">
      <cell 
        v-for="(item, index) in itemList" 
        :key="index"
        :item="item"
        :index="index"
        @appear="onAppear(event, index,item)"
        @disappear="onDisappear(event, index,item)"
      >
        <div :style="{ backgroundColor: item, height: fullHeight + 'px'}" class="item"></div>
      </cell>
    </list>
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
    onAppear(ext, item, index){
      console.log('显示了', ext, item, index)
    },
    onDisappear(ext, item, index){
      console.log('隐藏了', ext, item, index)
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
