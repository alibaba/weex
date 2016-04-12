Weex Modal Demo
===============

## snapshot
![weex demo](http://gtms01.alicdn.com/tps/i1/TB1BR.3MXXXXXbTXpXXOxa1_pXX-622-1104.jpg)

## weex code
```
<template>
    <div class="scroller" scroll-direction="{{directStatus}}" show-scrollbar="{{isShowScrollBar}}">
     <div>
       <text class="discript"  onappear="onappear">Toast test case</text>
       <text class="btn1" onclick="ShowToast" onappear="onappear">Toast</text>
       <text class="discript"  onappear="onappear">Alert test case</text>
       <text class="btn1" onclick="ShowAlert" onappear="onappear">Alert</text>
       <text class="discript"  onappear="onappear">Confirm test case</text>
       <text class="btn1" onclick="ShowConfirm" onappear="onappear">Confirm</text>
       <text class="discript"  onappear="onappear">Prompt test case</text>
       <text class="btn1" onclick="ShowPrompt" onappear="onappear">Prompt</text>
    </div>
    </div>
</template>

<style>
  .block {flex-direction: column;border-width:3;border-color:#94d6da;width:550;border-style:dotted;margin-bottom:5;overflow:hidden;}
  .discript {flex: 1; margin:0;padding:10;color: #777777; font-weight:lighter; font-size:36;background-color: #37dd23;overflow:hidden;font-family: "Open Sans", sans-serif;}
  .scroller{flex-direction:column;background-color:#94d6da;overflow:hidden}
  .btn1 {margin: 20;padding: 5 ;text-align: center; align-items: center; border-radius: 10;alignment-adjust:center;color: #441133;padding: 5; font-size: 35;width:200;border-width:0;font-weight: normal; background-color: #dddddd;font-family: "Open Sans", sans-serif;}
  .btn{ width:320; font-size: 25; border-width: 3; border-color: #cccccc; padding: 5; border-style: solid;border-radius: 3; margin: 5; font-family: "Open Sans", sans-serif;}
</style>

<script>
  module.exports = {
    data: {
      itemList: [
        {itemId: '520421163634', title: '宝贝标题1', pictureUrl: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg'},
        {itemId: '522076777462', title: '宝贝标题2', pictureUrl: 'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg'},
        {itemId: '522076777462', title: '宝贝标题3', pictureUrl: 'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg'}
      ],
      scrollTitle: 'Scroll Title',
      isShowScrollBar:"true",
      directStatus:"vertical"
    },
    methods: {
    ShowToast: function (msg,duration) {
      if (!msg || typeof msg !== 'string') {
        msg = 'I am Toast show!';
      }
       
       duration = duration || 2;
      this.$call('modal','toast',{
                    'message':msg,
                    'duration': duration
                });

      },
      ShowAlert: function (msg,okTitle,cancelTitle) {
        var self = this;
         if (!msg || typeof msg !== 'string') {
          msg = "I am Alert!";
         }
        this.$call('modal','alert',{
                    'message':msg,
                    'okTitle':okTitle,
                    'cancelTitle':cancelTitle
                }, function() {
                   self.ShowToast("Click Alert OK Bnt!!",3);
                });

      },
       ShowConfirm: function (msg,okTitle,cancelTitle) {
          var self = this
           if (!msg || typeof msg !== 'string') {
              msg = "I am Confirm!";
           }
         
          okTitle = okTitle ||"OK";
          cancelTitle = cancelTitle ||"Cancel";
          this.$call('modal','confirm',{
                    'message':msg,
                    'okTitle':okTitle,
                    'cancelTitle':cancelTitle
                }, function(result) {
                     self.ShowToast("Click Confirm  "+result,3);
                });

      }, 
      ShowPrompt: function () {
         var self = this
        this.$call('modal','prompt',{
                    'message':'I am Prompt!',
                    'okTitle':'ok',
                    'cancelTitle':'cancel'
                }, function(result) {
                   self.ShowToast("Click Prompt  "+result,3);
                });
                },

    
      onappear: function (e) {
        var title = e.target.attr.value;
        nativeLog(title);
        nativeLog(this);
        this.scrollTitle = title;
      }
    }
  }
</script>
```

