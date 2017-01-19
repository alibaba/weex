<template>
  <example-list :items="items" dir="examples"></example-list>
</template>

<script>
  module.exports = {
    data: function () {
      return {
        items: [
          // common
          {name: 'vue/syntax/hello-world', title: 'Hello World'},
          {name: 'vue/style/index', title: 'Common Style'},
          {name: 'vue/animation', title: 'Animation'},

          // component
          {name: 'vue/components/text', title: 'Text'},
          {name: 'vue/components/image', title: 'Image'},
          {name: 'vue/components/input', title: 'Input'},
          {name: 'vue/components/scroller', title: 'Scroller'},
          {name: 'vue/components/list', title: 'List'},
          {name: 'vue/components/slider', title: 'Slider'},
          {name: 'vue/components/a', title: 'A'},
          {name: 'vue/components/video', title: 'Video'},
          {name: 'vue/components/countdown', title: 'Countdown'},
          {name: 'vue/components/marquee', title: 'Marquee'},
          {name: 'vue/components/web', title: 'Web'},
          {name: 'vue/components/navigator', title: 'Navigator'},
          {name: 'vue/components/tabbar', title: 'Tabbar'},

          // module
          {name: 'vue/modules/instance-api', title: 'Instance API'},
          {name: 'vue/modules/modal', title: 'Modal'},
          {name: 'vue/modules/stream', title: 'Stream'},
          {name: 'vue/modules/storage',title:'Storage'},
          // {name: 'module/clipboard', title: 'Clipboard'}, // 0.8 , developing

          // showcase
          {name: 'vue/showcase/progress', title: 'Progress Bar'},
          {name: 'vue/showcase/itemlist', title: 'List (Advanced)'},
          {name: 'vue/showcase/calculator', title: 'Calculator'},
          // {name: 'vue/showcase/minesweeper', title: 'Minesweeper'},
          // {name: 'vue/showcase/ui', title: 'UI Gallery'},
          // {name: 'vue/showcase/dropdown/dropdown-demo', title: 'Dropdown'}
        ]
      }
    },
    components: {
      exampleList: require('./include/example-list.vue')
    }
  }
</script>
