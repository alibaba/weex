<template>
    <div class="wrapper">
        <embed class="content" style="visibility:{{visibility}}" repeat={{tabItems}} src={{src}} type="weex"></embed>
        <div class="tabbar" append = "tree">
            <wxc-tabitem repeat={{tabItems}} index={{index}} icon={{icon}} title={{title}} title-color={{titleColor}}></wxc-tabItem>
        </div>
    </div>
</template>

<style>
    .wrapper { 
        width: 750; 
        position: absolute; 
        top: 0; 
        left: 0; 
        right: 0; 
        bottom: 0;
    }
    .content { 
        position: absolute; 
        top: 0; left: 0; 
        right: 0; 
        bottom: 0; 
        margin-top: 0;  
        margin-bottom: 88;
    }
    .tabbar { 
        flex-direction: row; 
        position: fixed; 
        bottom: 0; 
        left: 0; 
        right: 0;  
        height: 88;
    }
</style>

<script>
    module.exports = {
        data: {
          tabItems: [ ],
          selectedIndex: 0,
          selectedColor: '#ff0000',
          unselectedColor: '#000000',
        },
        created: function () {
          this.selected(this.selectedIndex);

          this.$on('tabItem.onClick',function(e){
            var detail= e.detail;
            this.selectedIndex = detail.index;
            this.selected(detail.index);

            var params = {
              index: detail.index
            };
            this.$dispatch('tabBar.onClick', params);
          });
        },
        methods: {
            selected: function(index) {
              for(var i = 0; i < this.tabItems.length; i++) {
                var tabItem = this.tabItems[i];
                if(i == index){
                  tabItem.icon = tabItem.selectedImage;
                  tabItem.titleColor = this.selectedColor;
                  tabItem.visibility = 'visible';
                }
                else {
                  tabItem.icon = tabItem.image;
                  tabItem.titleColor = this.unselectedColor;
                  tabItem.visibility = 'hidden';
                }
              }
            },  
        }
    }
</script>