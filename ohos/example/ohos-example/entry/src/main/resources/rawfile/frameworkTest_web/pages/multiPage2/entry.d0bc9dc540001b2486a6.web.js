!function(t){function e(e){for(var a,s,i=e[0],c=e[1],l=e[2],u=0,d=[];u<i.length;u++)s=i[u],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&d.push(o[s][0]),o[s]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);for(p&&p(e);d.length;)d.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],a=!0,i=1;i<n.length;i++){var c=n[i];0!==o[c]&&(a=!1)}a&&(r.splice(e--,1),t=s(s.s=n[0]))}return t}var a={},o={23:0},r=[];function s(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=a,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(n,a,function(e){return t[e]}.bind(null,a));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var i=window.webpackJsonp=window.webpackJsonp||[],c=i.push.bind(i);i.push=e,i=i.slice();for(var l=0;l<i.length;l++)e(i[l]);var p=c;r.push([497,0]),n()}({275:function(t,e,n){var a=n(499);a.__esModule&&(a=a.default),"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);(0,n(6).default)("14b056ce",a,!1,{})},497:function(t,e,n){"use strict";n.r(e);n(9),n(11);var a=n(1),o=n(4),r=n.n(o),s=n(12);window.location.href.includes("static")||new s({theme:"dark"}),r.a.init(a.a);var i=n(612).default;new a.a(a.a.util.extend({el:"#root"},i))},498:function(t,e,n){"use strict";n(275)},499:function(t,e,n){(t.exports=n(5)(!1)).push([t.i,".wrapper[data-v-c1be21c4] {\n  justify-content: center;\n}\n.nav[data-v-c1be21c4] {\n  color: #ff3c00;\n  font-size: 0.53333rem;\n}\n.scroller[data-v-c1be21c4] {\n  position: absolute;\n  top: 0px;\n  bottom: 0px;\n  padding: 1.33333rem;\n  background-color: #ffffd2;\n}\n.btn[data-v-c1be21c4] {\n  width: 6.66667rem;\n  padding: 0.26667rem;\n  margin: 0.26667rem auto 0;\n  border-radius: 0.13333rem;\n  color: #6d7dff;\n  text-align: center;\n  font-size: 0.42667rem;\n  border-style: solid;\n  border-color: #6d7dff;\n  border-width: 1px;\n  opacity: 1;\n}\n.btn-group[data-v-c1be21c4] {\n  border-width: 1px;\n  border-style: solid;\n  border-color: blue;\n  border-radius: 0.13333rem;\n  width: 7.2rem;\n  align-items: center;\n  padding: 0.26667rem;\n  margin-top: 0.26667rem;\n}\n.font-title[data-v-c1be21c4] {\n  color: #333333;\n  font-size: 0.37333rem;\n  line-height: 0.4rem;\n}\n",""])},612:function(t,e,n){"use strict";n.r(e);n(52),n(105);var a=function(){var t=this,e=t._self._c;return e("scroller",{staticClass:"scroller",attrs:{}},[e("div",{staticClass:"wrapper weex-ct weex-div",attrs:{"weex-type":"div"}},[e("p",{staticClass:"nav weex-el weex-text",attrs:{"weex-type":"text"}},[t._v("multiPage2页面")]),t._v(" "),e("div",{staticClass:"btn-group weex-ct weex-div",attrs:{"weex-type":"div"}},[e("p",{staticClass:"font-title weex-el weex-text",attrs:{"weex-type":"text"}},[t._v("navigator")]),t._v(" "),e("p",{staticClass:"btn weex-el weex-text",attrs:{"weex-type":"text","data-evt-click":""},on:{click:t.$stopOuterA,weex$tap:function(e){return e.stopPropagation(),t.jumpPage("multiPage15")}}},[t._v("push(multiPage15)")]),t._v(" "),e("p",{staticClass:"btn weex-el weex-text",attrs:{"weex-type":"text","data-evt-click":""},on:{click:t.$stopOuterA,weex$tap:function(e){return e.stopPropagation(),t.replace("multiPage15")}}},[t._v("replace(multiPage15)")]),t._v(" "),e("p",{staticClass:"btn weex-el weex-text",attrs:{"weex-type":"text","data-evt-click":""},on:{click:t.$stopOuterA,weex$tap:function(e){return e.stopPropagation(),t.navigatorPop()}}},[t._v("pop")])]),t._v(" "),e("div",{staticClass:"btn-group weex-ct weex-div",attrs:{"weex-type":"div"}},[e("p",{staticClass:"font-title weex-el weex-text",attrs:{"weex-type":"text"}},[t._v("globalEvent")]),t._v(" "),e("p",{staticClass:"btn weex-el weex-text",attrs:{"weex-type":"text","data-evt-click":""},on:{click:t.$stopOuterA,weex$tap:function(e){return e.stopPropagation(),t.addForeground()}}},[t._v("监听前台事件")]),t._v(" "),e("p",{staticClass:"btn weex-el weex-text",attrs:{"weex-type":"text","data-evt-click":""},on:{click:t.$stopOuterA,weex$tap:function(e){return e.stopPropagation(),t.removeForeground()}}},[t._v("取消监听前台事件")]),t._v(" "),e("p",{staticClass:"btn weex-el weex-text",attrs:{"weex-type":"text","data-evt-click":""},on:{click:t.$stopOuterA,weex$tap:function(e){return e.stopPropagation(),t.addBackground()}}},[t._v("监听后台事件")]),t._v(" "),e("p",{staticClass:"btn weex-el weex-text",attrs:{"weex-type":"text","data-evt-click":""},on:{click:t.$stopOuterA,weex$tap:function(e){return e.stopPropagation(),t.removeBackground()}}},[t._v("取消监听后台事件")])]),t._v(" "),e("div",{staticClass:"btn-group weex-ct weex-div",attrs:{"weex-type":"div"}},[e("p",{staticClass:"font-title weex-el weex-text",attrs:{"weex-type":"text"}},[t._v("broadcastChannel")]),t._v(" "),e("p",{staticClass:"btn weex-el weex-text",attrs:{"weex-type":"text","data-evt-click":""},on:{click:t.$stopOuterA,weex$tap:function(e){return e.stopPropagation(),t.broadcastPost()}}},[t._v("广播发送")]),t._v(" "),e("p",{staticClass:"btn weex-el weex-text",attrs:{"weex-type":"text","data-evt-click":""},on:{click:t.$stopOuterA,weex$tap:function(e){return e.stopPropagation(),t.broadcastOnmessage()}}},[t._v("广播监听")]),t._v(" "),e("p",{staticClass:"btn weex-el weex-text",attrs:{"weex-type":"text","data-evt-click":""},on:{click:t.$stopOuterA,weex$tap:function(e){return e.stopPropagation(),t.broadcastClose()}}},[t._v("关闭广播")])]),t._v(" "),e("div",{staticClass:"btn-group weex-ct weex-div",attrs:{"weex-type":"div"}},[e("p",{staticClass:"font-title weex-el weex-text",attrs:{"weex-type":"text"}},[t._v("输入框")]),t._v(" "),e("input")])])])};a._withStripped=!0;var o=n(0),r=weex.requireModule("modal"),s=new BroadcastChannel("testbc"),i=n(8).globalEvent,c={components:{},data:function(){},methods:{jumpPage:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e;Object(o.r)(t,n)},navigatorPop:function(){n(8).navigator.pop({animated:"true"},(function(t){console.log("callback: ",JSON.stringify(t))}))},replace:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};Object(o.s)(t,e)},addForeground:function(){i.addEventListener("WXApplicationDidBecomeActiveEvent",(function(t){console.log("Foreground callback successfully!"),r.toast({message:"前台唤醒事件回调成功",duration:.5})})),r.toast({message:"已添加前台监听",duration:.5})},removeForeground:function(){i.removeEventListener("WXApplicationDidBecomeActiveEvent"),console.log("removeEventListener html callback"),r.toast({message:"已取消监听",duration:.5})},addBackground:function(){i.addEventListener("WXApplicationWillResignActiveEvent",(function(t){console.log("Background callback successfully!"),r.toast({message:"后台监听事件回调成功",duration:.5})})),r.toast({message:"已添加后台监听",duration:.5})},removeBackground:function(){i.removeEventListener("WXApplicationWillResignActiveEvent"),console.log("removeEventListener html callback"),r.toast({message:"已取消监听",duration:.5})},broadcastPost:function(){s.postMessage("来自multiPage2的消息test message!")},broadcastOnmessage:function(){s.onmessage=function(t){console.log("multiPage2收到消息："+JSON.stringify(t.data))}},broadcastClose:function(){s.close(),r.alert({message:"已关闭广播test",okTitle:"关闭"},(function(){}))}}},l=(n(498),n(2)),p=Object(l.a)(c,a,[],!1,null,"c1be21c4",null);e.default=p.exports}});