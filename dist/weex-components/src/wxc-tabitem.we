<template>
    <div class="container" style="background-color: {{backgroundColor}}"  onclick="onclickitem">
        <image class="top-line" src = "http://gtms03.alicdn.com/tps/i3/TB1mdsiMpXXXXXpXXXXNw4JIXXX-640-4.png"></image>
        <image class="tab-icon" src = {{icon}}></image>
        <text class="tab-text" style="color: {{titleColor}}">{{title}}</text>
    </div>  
</template>

<style>
    .container {
        flex: 1; 
        flex-direction: column; 
        align-items:center; 
        justify-content:center; 
        height: 88;
    }
    .top-line {
        position: absolute; 
        top: 0; 
        left: 0; 
        right: 0; 
        height: 2;
    }
    .tab-icon {
        margin-top: 5; 
        width: 40; 
        height: 40
    }
    .tab-text {
        margin-top: 5; 
        text-align: center;  
        font-size: 20;
    }
</style>

<script>
    module.exports = {
        data: {
          index: 0,
          title: '',
          titleColor: '#000000',
          icon: '',
          backgroundColor: '#ffffff',
        },
        methods: {
          onclickitem: function (e) {
            var vm = this;
            var params = {
              index: vm.index
            };
            vm.$dispatch('tabItem.onClick', params);
          }
        }
    }
</script>