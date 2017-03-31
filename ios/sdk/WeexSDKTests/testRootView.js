/*
 <template>
   <div style='left:{{left}};top:{{top}};width:{{width}};height:{{height}};background-color:red'>
     <div style='width:100;height:200'>
     </div>
   </div>
 </template>

 */

define('@weex-component/59f2ac24414dd31be265c3f06c218e2f', function(require, exports, module) {
       
       ;
       module.exports = {
       data: function() {
       return {}
       }
       }
       
       
       ;
       module.exports.style = {}
       
       ;
       module.exports.template = {
       "type": "div",
       "style": {
       "left": function() {
       return this.left
       },
       "top": function() {
       return this.top
       },
       "width": function() {
       return this.width
       },
       "height": function() {
       return this.height
       },
       "backgroundColor": "#FF0000"
       },
       "children": [{
                    "type": "div",
                    "style": {
                    "width": 100,
                    "height": 200
                    }
                    }]
       }
       
       ;
       })

// require module
bootstrap('@weex-component/59f2ac24414dd31be265c3f06c218e2f', {
          "transformerVersion": "0.3.1"
          })
