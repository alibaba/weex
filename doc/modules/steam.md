## &lt;WXStreamModule> Module

Built-in module for sending http request

### Main purpose

- Send http reqeust

### Example

    <template>
      <scroller style="flex-direction: column;">
        <TC_Support_MainTitle title="TC_BizModule_SendHttp"></TC_Support_MainTitle>
        <div>
            <text class= "btn" value = '{{btntxt}}' onclick = "sendHttp"></text>
        </div>
        <TC_Support_SubTitle title="Response status："></TC_Support_SubTitle>
        <div style="flex-direction:column; margin-top:5; padding-top:5; padding-bottom:5;">
            <text class="textarea" >{{resultType}}</text>
        </div>
        <TC_Support_SubTitle title="Request result："></TC_Support_SubTitle>
        <div style="flex-direction:column; margin-top:5; padding-top:5; padding-bottom:5;">
            <text class="textarea">{{resultData}}</text>
        </div>
      </scroller>
    </template>

    <style>
    .btn{ width:710; font-size: 25; border-width: 3; border-color: #cccccc; padding: 5; border-style: solid;border-radius: 3; margin: 5;font-family: "Open Sans", sans-serif; }
    .textarea{width: 710; height: 300; font-size: 30;}
    </style>

    <script>
      module.exports = {
        data: {
          btntxt:'Send http request',
          resultType:'Waitng for response',
          resultData:'Waiting for response'
        },
        methods: {  
          sendHttp:function (e) {
            this.btntxt='Clicked，Waitng for response';
            this.$sendHttp({
              method: "GET",
              url: "http://g.alicdn.com/mtb/app-hytpl/1.2.6/tbm.js",
            }, function(ret) {
              if(ret.indexOf('e=setTimeout(b,300))},!1),b()}(window)')>=0){
                this.resultType="Success";
                this.resultData=JSON.stringify(ret);
              }else{
                this.resultType="Failure";
              }
              this.btntxt='Response has been recevied，click for sending http request again';
            }.bind(this));
          }
        }
      }
    </script>
    