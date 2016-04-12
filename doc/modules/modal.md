## &lt;WXModalUIModule> Module


### Main purpose

Encuslate of Toast, Dialog, with toast, alert, confirm, prompt method

### Example
- toast

      <template>
          <div class="scroller" scroll-direction="{{directStatus}}" show-scrollbar="{{isShowScrollBar}}">

             <div style="top:10;flex-direction:row;width:250;background-color: #ddddff">
               <text onclick="ShowToast" onappear="onappear">ShowToast</text>
            </div>
        
          </div>
      </template>

      <script>
        module.exports = {
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

            }
          }
        }
      </script>


- alert

      <template>
          <div class="scroller" scroll-direction="{{directStatus}}" show-scrollbar="{{isShowScrollBar}}">

             <div style="top:10;flex-direction:row;width:250;background-color: #ddddff">
               <text onclick="ShowAlert" onappear="onappear">ShowAlert</text>
            </div>
        
          </div>
      </template>

      <script>
        module.exports = {
          methods: {
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

            }
          }
        }
      </script>

- confirm

      <template>
          <div class="scroller" scroll-direction="{{directStatus}}" show-scrollbar="{{isShowScrollBar}}">

             <div style="top:10;flex-direction:row;width:250;background-color: #ddddff">
               <text onclick="ShowConfirm" onappear="onappear">ShowConfirm</text>
            </div>
        
          </div>
      </template>

      <script>
        module.exports = {
          methods: {
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

            }
          }
        }
      </script>

- prompt

      <template>
          <div class="scroller" scroll-direction="{{directStatus}}" show-scrollbar="{{isShowScrollBar}}">

             <div style="top:10;flex-direction:row;width:250;background-color: #ddddff">
               <text onclick="ShowPrompt" onappear="onappear">ShowPrompt</text>
            </div>
        
          </div>
      </template>

      <script>
        module.exports = {
          methods: {
            ShowPrompt: function () {
               var self = this
              this.$call('modal','prompt',{
                          'message':'I am Prompt!',
                          'okTitle':'ok',
                          'cancelTitle':'cancel'
                      }, function(result) {
                         self.ShowToast("Click Prompt  "+result,3);
                      });
            }
          }
        }
      </script>