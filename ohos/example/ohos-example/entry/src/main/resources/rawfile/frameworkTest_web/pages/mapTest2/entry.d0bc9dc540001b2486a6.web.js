!function(e){function t(t){for(var r,s,i=t[0],l=t[1],m=t[2],p=0,w=[];p<i.length;p++)s=i[p],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&w.push(o[s][0]),o[s]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);for(c&&c(t);w.length;)w.shift()();return n.push.apply(n,m||[]),a()}function a(){for(var e,t=0;t<n.length;t++){for(var a=n[t],r=!0,i=1;i<a.length;i++){var l=a[i];0!==o[l]&&(r=!1)}r&&(n.splice(t--,1),e=s(s.s=a[0]))}return e}var r={},o={12:0},n=[];function s(t){if(r[t])return r[t].exports;var a=r[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=e,s.c=r,s.d=function(e,t,a){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(a,r,function(t){return e[t]}.bind(null,r));return a},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var i=window.webpackJsonp=window.webpackJsonp||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var m=0;m<i.length;m++)t(i[m]);var c=l;n.push([464,0]),a()}({264:function(e,t,a){var r=a(466);r.__esModule&&(r=r.default),"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);(0,a(6).default)("37b28121",r,!1,{})},464:function(e,t,a){"use strict";a.r(t);a(9),a(11);var r=a(1),o=a(4),n=a.n(o),s=a(12);window.location.href.includes("static")||new s({theme:"dark"}),n.a.init(r.a);var i=a(592).default;new r.a(r.a.util.extend({el:"#root"},i))},465:function(e,t,a){"use strict";a(264)},466:function(e,t,a){(e.exports=a(5)(!1)).push([e.i,".wrapper[data-v-615107c4] {\n  justify-content: center;\n}\n.info[data-v-615107c4] {\n  height: 2rem;\n  overflow: hidden;\n}\n.nav[data-v-615107c4] {\n  color: #ff3c00;\n  font-size: 0.53333rem;\n}\n.title[data-v-615107c4] {\n  color: red;\n  font-size: 0.66667rem;\n}\n.item[data-v-615107c4] {\n  color: #1b31da;\n  font-size: 0.4rem;\n}\n.scroller[data-v-615107c4] {\n  position: absolute;\n  top: 0px;\n  bottom: 0px;\n  padding: 1.33333rem;\n}\n.amap[data-v-615107c4] {\n  width: 6.66667rem;\n  height: 6.66667rem;\n  border-width: 1px;\n  margin-bottom: 0.13333rem;\n}\n.b[data-v-615107c4] {\n  border-width: 1px;\n  border-color: red;\n}\n.button[data-v-615107c4] {\n  background-color: aqua;\n}\n.button-wrong[data-v-615107c4] {\n  background-color: #ea3612;\n}\n",""])},592:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e._self._c;return t("scroller",{staticClass:"scroller",attrs:{}},[t("div",{staticClass:"wrapper weex-ct weex-div",attrs:{"weex-type":"div"}},[t("p",{staticClass:"nav weex-el weex-text",attrs:{"weex-type":"text"}},[e._v("zoomLevel && showScale && scalePosition")]),e._v(" "),t("p",{staticClass:"item weex-el weex-text",attrs:{"weex-type":"text"}},[e._v("1.zoomLevel=3 （1000km） showScale=true")]),e._v(" "),t("amap",{staticClass:"amap",attrs:{mapType:4,zoomLevel:3,showScale:!0}}),e._v(" "),t("p",{staticClass:"item weex-el weex-text",attrs:{"weex-type":"text"}},[e._v("2.zoomLevel=16 （100m） showScale=true")]),e._v(" "),t("amap",{staticClass:"amap",attrs:{mapType:4,zoomLevel:16,showScale:!0}}),e._v(" "),t("p",{staticClass:"item weex-el weex-text",attrs:{"weex-type":"text"}},[e._v("3.zoomLevel=20 （ios为10m an为5m） showScale=true")]),e._v(" "),t("amap",{staticClass:"amap",attrs:{mapType:4,zoomLevel:20,showScale:!0}}),e._v(" "),t("p",{staticClass:"item weex-el weex-text",attrs:{"weex-type":"text"}},[e._v("4.zoomLevel=3 showScale=false")]),e._v(" "),t("amap",{staticClass:"amap",attrs:{mapType:4,zoomLevel:3,showScale:!1}}),e._v(" "),t("p",{staticClass:"item weex-el weex-text",attrs:{"weex-type":"text"}},[e._v("5.zoomLevel=3 showScale不设置 默认值")]),e._v(" "),t("amap",{staticClass:"amap",attrs:{mapType:4,zoomLevel:3}}),e._v(" "),t("p",{staticClass:"item weex-el weex-text",attrs:{"weex-type":"text"}},[e._v("6.scalePosition 比例尺位置 只有ios会移动 and不动")]),e._v(" "),t("amap",{staticClass:"amap",attrs:{showScale:!0,scalePosition:{x:150,y:150},zoomLevel:3}})],1)])};r._withStripped=!0;a(25);var o={mark:[{id:"1",lat:"39.912578",lng:"116.176010",height:"30",width:"130",image:"http://img.umetrip.com/v1/tfs/T1QdhQBXKg1RCvBVdK",params:{sessionParams:"",weexParams:{jsBundleEntry:"frameworkTest/pages/label/entry.js",commonJsEntry:"frameworkTest/pages/commons.js",serviceName:"1",webUrl:"http://static-gray.umetrip.com/weex/frameworkTest/frameworkTest_web/pages/label/entry.html",weexId:"ume_1eee58809591478896ac1c07df62372c",weexName:"frameworkTest",weexUrl:"http://static-gray.umetrip.com/weex/frameworkTest/frameworkTest.wume"}}},{id:"8",lat:"39.670000",lng:"116.320000",height:"30",width:"130",image:"http://img.umetrip.com/v1/tfs/T1QdhQBXKg1RCvBVdK",params:{sessionParams:"",weexParams:{jsBundleEntry:"frameworkTest/pages/label/entry.js",commonJsEntry:"frameworkTest/pages/commons.js",serviceName:"1",webUrl:"http://static-gray.umetrip.com/weex/frameworkTest/frameworkTest_web/pages/label/entry.html",weexId:"ume_1eee58809591478896ac1c07df62372c",weexName:"frameworkTest",weexUrl:"http://static-gray.umetrip.com/weex/frameworkTest/frameworkTest.wume"}}}]},n={mark:[{id:"2",lat:"39.910000",lng:"116.720000",height:"30",width:"130",image:"http://img.umetrip.com/v1/tfs/T1QdhQBXKg1RCvBVdK",params:{sessionParams:"",weexParams:{jsBundleEntry:"frameworkTest/pages/label/entry.js",commonJsEntry:"frameworkTest/pages/commons.js",serviceName:"1",webUrl:"http://static-gray.umetrip.com/weex/frameworkTest/frameworkTest_web/pages/label/entry.html",weexId:"ume_1eee58809591478896ac1c07df62372c",weexName:"frameworkTest",weexUrl:"http://static-gray.umetrip.com/weex/frameworkTest/frameworkTest.wume"}}}]},s={overlayName:"WeexMAPolyline",overlayAttribute:{points:[{lat:"39.912578",lng:"116.176010"},{lat:"39.923632693547965",lng:"116.40335322003274"}]},lineAttribute:{fillColor:"#F74F51",strokeColor:"#45E457",lineJoinType:2,lineWidth:8,lineCapType:1,miterLimit:1,lineDashType:0}},i={latitude:"39.67000",longitude:"116.32000",animated:!0},l={locations:[{lat:"39.910000",lng:"116.410000"},{lat:"31.242727",lng:"121.513295"}],top:30,left:0,bottom:0,right:0,animated:!1},m=a(8).clipboard,c=weex.requireModule("modal"),p={components:{},data:function(){return{info:"我是测试数据",pointAnnotations:"",MALayerstyle:"",setMapCenter:"",MapShowArea:"",label:1,config:{showScale:!0,scalePosition:{x:100,y:100}}}},mounted:function(){var e=this;setTimeout((function(){e.setMapCenter=i,e.pointAnnotations=o,e.MALayerstyle=s,e.MapShowArea=l}),1e3),setTimeout((function(){e.pointAnnotations=n}),4e3)},methods:{markerClick:function(e){console.log(JSON.stringify(e)),this.info=e},centerLocation:function(e){console.log(JSON.stringify(e)),this.info=JSON.stringify(e)},afterMapCameraChanged:function(e){var t=JSON.stringify(e);this.info=t},onItemClick:function(){c.toast({message:"copy"}),m.setString(this.info)}}},w=(a(465),a(2)),u=Object(w.a)(p,r,[],!1,null,"615107c4",null);t.default=u.exports}});