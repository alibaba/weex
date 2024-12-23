// 标注内容
const pointAnnotations = {
  mark: [
    {
      id: '1',
      lat: '39.912578', // 石景山
      lng: '116.176010',
      height: '30',
      width: '130',
      params: {
        sessionParams: '',
        weexParams: {
          jsBundleEntry: 'frameworkTest/pages/label/entry.js',
          commonJsEntry: 'frameworkTest/pages/commons.js',
          serviceName: '1',
          webUrl:
            'http://static-gray.umetrip.com/weex/frameworkTest/frameworkTest_web/pages/label/entry.html',
          weexId: 'ume_1eee58809591478896ac1c07df62372c',
          weexName: 'frameworkTest',
          weexUrl:
            'http://static-gray.umetrip.com/weex/frameworkTest/frameworkTest.wume',
        },
      },
    },
    {
      id: '8',
      lat: '39.670000', // 大兴
      lng: '116.320000',
      height: '30',
      width: '130',
      params: {
        sessionParams: '',
        weexParams: {
          jsBundleEntry: 'frameworkTest/pages/label/entry.js',
          commonJsEntry: 'frameworkTest/pages/commons.js',
          serviceName: '1',
          webUrl:
            'http://static-gray.umetrip.com/weex/frameworkTest/frameworkTest_web/pages/label/entry.html',
          weexId: 'ume_1eee58809591478896ac1c07df62372c',
          weexName: 'frameworkTest',
          weexUrl:
            'http://static-gray.umetrip.com/weex/frameworkTest/frameworkTest.wume',
        },
      },
    },
  ],
};
const pointAnnotations1 = {
  mark: [
    {
      id: '2',
      lat: '39.910000', // 通州
      lng: '116.720000',
      height: '30',
      width: '130',
      image: 'http://img.umetrip.com/v1/tfs/T1QdhQBXKg1RCvBVdK',
      // 'http://img.umetrip.com/v1/tfs/T1QdhQBXKg1RCvBVdK',
      params: {
        sessionParams: '',
        weexParams: {
          jsBundleEntry: 'frameworkTest/pages/label/entry.js',
          commonJsEntry: 'frameworkTest/pages/commons.js',
          serviceName: '1',
          webUrl:
            'http://static-gray.umetrip.com/weex/frameworkTest/frameworkTest_web/pages/label/entry.html',
          weexId: 'ume_1eee58809591478896ac1c07df62372c',
          weexName: 'frameworkTest',
          weexUrl:
            'http://static-gray.umetrip.com/weex/frameworkTest/frameworkTest.wume',
        },
      },
    },
  ],
};
// 标注内容数据
// iOS高德api
const MALayerstyle = {
  overlayName: 'WeexMAPolyline',
  overlayAttribute: {
    points: [
      {
        lat: '39.912578',
        lng: '116.176010',
      },
      {
        lat: '39.923632693547965',
        lng: '116.40335322003274',
      },
      // {
      //   lat: '39.510251',
      //   lng: '116.410745',
      // },
      // {
      //   lat: '39.912578',
      //   lng: '116.176010',
      // },
    ],
  },
  lineAttribute: {
    fillColor: '#F74F51',
    strokeColor: '#45E457',
    lineJoinType: 2,
    lineWidth: 8,
    lineCapType: 1,
    miterLimit: 1,
    lineDashType: 0,
  },
};
// 故宫 116.40335322003274 39.923632693547965
const setMapCenter = {
  latitude: '39.67000',
  longitude: '116.32000',
  animated: true,
};
const setMapCenterF = {
  latitude: '39.67000',
  longitude: '116.32000',
  animated: false,
};
const MapShowArea = {
  locations: [
    {
      lat: '39.910000', // 北京
      lng: '116.410000',
    },
    {
      lat: '31.242727', // 上海
      lng: '121.513295',
    },
  ],
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  animated: true,
};
const afterMapCameraChanged = {
  lng: '116.176052',
  lat: '39.912616',
  timestamp: 1663564675431,
  zoomLevel: '10.000000',
  type: 'afterMapCameraChanged',
  target: {
    ref: '1278',
    type: 'amap',
    attr: {
      '@styleScope': 'data-v-43b929f6',
    },
    style: {
      width: '500',
      height: '500',
      borderWidth: '1',
      marginBottom: '10',
    },
    event: ['afterMapCameraChanged'],
  },
  currentTarget: {
    ref: '1278',
    type: 'amap',
    attr: {
      '@styleScope': 'data-v-43b929f6',
    },
    style: {
      width: '500',
      height: '500',
      borderWidth: '1',
      marginBottom: '10',
    },
    event: ['afterMapCameraChanged'],
  },
};
export {
  pointAnnotations,
  MALayerstyle,
  setMapCenter,
  MapShowArea,
  afterMapCameraChanged,
  pointAnnotations1,
  setMapCenterF,
};
