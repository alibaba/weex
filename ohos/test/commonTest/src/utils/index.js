import { callNative as webCallNative } from '@/utils/api.js';
import { getInfoFromNative } from './h5';
// import Countly from './countly';

const weexModule = weex.requireModule('weexModule');
const navigator = weex.requireModule('navigator');
 
export const isWeex = !/Web/i.test(weex.config.env.platform);
export const isNative = isWeex || process.env.ISHARMONY;
export const isWeb = /Web/i.test(weex.config.env.platform) && !process.env.ISHARMONY;
export const isIos = /iOS/i.test(weex.config.env.platform);
export const h5Ios = isWeb && /iOS/i.test(window.navigator.userAgent);
export const isAndroid = /android/i.test(weex.config.env.platform);
export const h5Android = isWeb && /android/i.test(window.navigator.userAgent);

console.log('building index.js platform:' + weex.config.env.platform + ' ISHARMONY:' + process.env.ISHARMONY);  // platform: web
console.log('building index.js env:' + JSON.stringify(weex.config.env));  // env:{"dpr":3.5,"scale":0.512,"rootValue":75,"rem":38.4,"deviceWidth":1344,"deviceHeight":2772,"platform":"Web","weexVersion":"1.0.36","layoutDirection":"ltr","userAgent":"mozilla/5.0 (linux; android 10; harmonyos; els-an00; hmscore 6.10.4.302) applewebkit/537.36 (khtml, like gecko) chrome/99.0.4844.88 huaweibrowser/13.0.6.302 mobile safari/537.36","appName":"unknown","appVersion":"0.0.0","osName":"unknown","osVersion":"0.0.0","deviceModel":"unknown"}

if (process.env.ISHARMONY) {
  console.log('building index.js 鸿蒙平台 isWeex:' + isWeex + ' isWeb:' + isWeb);
} else {
  console.log('building index.js 非鸿蒙平台 isWeex:' + isWeex + ' isWeb:' + isWeb);
}

if (isWeb) {
  // localStorage.setItem('vConsole_switch_x', 0);
  // localStorage.setItem('vConsole_switch_y', 200);
  // const VConsole = require('vconsole/dist/vconsole.min.js');
  // eslint-disable-next-line
  // var  = new VConsole();
  const eruda = require('eruda/eruda.js');
  eruda.init();
}

export function callNative(name, params = {}, callback) {
  // callup打电话的callback为: function(n){console.log("building jsapi.js callUp callNative 回调"),m(e,t,n)}
  const { platform } = weex.config.env;
  console.log('building callNative platform:' + platform + ' name:' + name + ' params:' + JSON.stringify(params) + ' callback:' + callback + ' callback序列化:' + JSON.stringify(callback));
  // if (/web/i.test(platform)) {
  if (isWeb) {
    webCallNative(name, params, callback);
  } else {
    weexModule.callNative(name, params, callback);
  }
}

let isInWeixin = false;
// 由于ua异步问题，导致isInUmeApp有时拿不到，导致不能跳转，暂时先把isInUmeApp设置为true
let isInUmeApp = true;
let isInWXMinProgram = false;
if (isWeb) {
  const ua = window.navigator.userAgent.toLowerCase();
  console.log('building index.js ua:' + ua);  // ua:mozilla/5.0 (linux; android 10; harmonyos; els-an00; hmscore 6.10.4.302) applewebkit/537.36 (khtml, like gecko) chrome/99.0.4844.88 huaweibrowser/13.0.6.302 mobile safari/537.36
  const { platform = '' } = getInfoFromNative(isWeb) || {};
  if (/MicroMessenger/i.test(ua)) {
    console.log('building MicroMessenger'); 
    isInWeixin = true;
    isInUmeApp = false;
    // let wx = require('weixin-js-sdk')
    // wx.miniProgram.getEnv((res) => {
    //   if (res.miniprogram) {
    //     isInWXMinProgram = true
    //   } else {
    //     console.log('在微信环境，但不在微信小程序环境')
    //   }
    // })
    if (/miniProgram/i.test(ua)) {
      console.log('building miniProgram'); 
      isInWXMinProgram = true;
    }
  } else if (/umetrip/i.test(platform.toLowerCase())) {
    console.log('building umetrip'); 
    isInWeixin = false;
    isInUmeApp = true;
  } else {
    // 走的这里
    console.log('building other'); 
  }
}
export { isInWeixin, isInUmeApp, isInWXMinProgram };

export function getQuerys(url = weex.config.bundleUrl) {
  const splitedUrl = (url || '').split('?');
  if (splitedUrl.length < 2) {
    return {};
  }
  let qs = splitedUrl[1];
  qs = qs.split('#')[0];
  if (qs.length === 0) {
    return {};
  }

  const paramPairs = qs.split('&');
  const params = {};
  paramPairs.forEach((e) => {
    if (!e || e.length === 0) {
      return;
    }
    const pair = e.split('=');
    if (pair.length < 2) {
      return;
    }
    const key = pair[0];
    const value = pair.slice(1, pair.length).join('=');
    if (value.length === 0) {
      return;
    }
    params[decodeURIComponent(key)] = decodeURIComponent(value);
  });
  return params;
}

export function getQuery(key, url = weex.config.bundleUrl) {
  console.log('@url', url);
  const reg = new RegExp(`[?|&]${key}=([^&]+)`);
  const match = url.match(reg);
  return match && decodeURIComponent(match[1]);
}

export function pushPage(page, params = {}, cb) {
  console.info(' 【 push了 】 ');
  const url = createLink(page, params);
  console.info(url);
  navigator.push(
    {
      url,
      animated: true,
    },
    () => {
      if (cb && typeof cb === 'function') {
        cb();
      }
    },
  );
}

export function popPage(popNum) {
  if (isWeex) {
    popNum ? navigator.pop({ popNum }) : navigator.pop({}, () => {});
  } else {
    popNum
      ? window.history.go(-popNum)
      : callNative('finishWebView', {}, () => {});
  }
}

export function replacePage(page, params = {}, cb) {
  const url = createLink(page, params);
  if (isWeex) {
    navigator.replace(
      {
        url,
        animated: 'true',
      },
      () => {
        if (cb && typeof cb === 'function') {
          cb();
        }
      },
    );
  } else {
    window.location.replace(url);
  }
}

export function createLink(page, params = {}) {
  const args = [];
  if (params.constructor === Object) {
    Object.keys(params).forEach((key) => {
      args.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
      );
    });
  }
  if (weex.config.bundleUrl) {
    const splitedUrl = weex.config.bundleUrl.split('?');
    const hostUrl = splitedUrl[0];
    const wx_tpl = getQuery('_wx_tpl', weex.config.bundleUrl); // eslint-disable-line
    const tplPathList = (wx_tpl || hostUrl).split('/'); // eslint-disable-line
    tplPathList[tplPathList.length - 2] = page;

    let link;
    if (wx_tpl) {
      // eslint-disable-line
      args.unshift(`_wx_tpl=${tplPathList.join('/')}`); // eslint-disable-line
      link = `${hostUrl}?${args.join('&')}`;
    } else if (typeof params === 'string') {
      // 200201跳本项目的情况 weex跳转参数中的sessionParams字符串
      link = `${tplPathList.join('/')}?sessionParams=${encodeURIComponent(
        params,
      )}`;
    } else {
      link = `${tplPathList.join('/')}?${args.join('&')}`;
    }
    // console.info('createLink', link);
    return link;
  }
}

/**
 * 查找静态资源路径
 * @param {String} rp 相对路径，eg: '../../assets/fonts/dinBold.ttf'
 */
export function getAssetsPath(rp) {
  let relativePath = rp;
  if (weex.config.bundleUrl) {
    relativePath = relativePath.split('/') || [];
    const pathIndex = relativePath.findIndex((element) => {
      return element !== '..';
    });
    const splitedUrl = weex.config.bundleUrl.split('?')[0];
    const tplPathList = splitedUrl.split('/');
    let pathPrefixList;
    let pathSuffixList;
    if (pathIndex !== -1) {
      pathPrefixList = tplPathList.slice(0, tplPathList.length - pathIndex - 1);
      pathSuffixList = relativePath.slice(pathIndex);
    } else {
      pathPrefixList = tplPathList.slice(0, tplPathList.length - 1);
      pathSuffixList = relativePath.slice();
    }
    return `${pathPrefixList.join('/')}/${pathSuffixList.join('/')}`;
  }
}

export function findIndex(array, key, value) {
  for (let i = 0; i < array.length; i++) {
    const obj = array[i];
    if (obj[key] === value) {
      return i;
    }
  }
  return -1;
}

/* async function initCountly() {
  const { env } = weex.config;
  await Countly.init({
    app_key: 'a1b1f05fdc665588300a49494a05be6110963b09',
    url: 'https://analytics.umetrip.com/',
    interval: 2000,
    // app_version: env.appVersion,
    app_version: env.weexVersion,
    debug: false,
  });
}

export async function countlyLog() {
  await initCountly();
  let pageName;
  if (isWeex) {
    const bundleUrl = weex.config.bundleUrl.split('?')[0];
    const pathList = bundleUrl.split('/') || [];
    const lastPathList = pathList.slice(-4);
    pageName = lastPathList.join('/');
  }
  Countly.track_pageview(pageName);
  Countly.track_sessions();
  Countly.track_errors();
}

export async function errorHandler(err, vm, info) {
  // console.error(err);
  await initCountly(); // 如果已经初始化了，会直接return
  const error = {
    errCode: 'vue catched',
    exception: err.stack || `${err}`,
  };
  if (info) {
    error.exception = `${error.exception} \n ${info}`;
  }
  Countly.log_error(error);
} */

export function closeAllView(b, channelName) {
  let broadcastInstance = b;
  broadcastInstance = broadcastInstance || new Broadcast(channelName);
  broadcastInstance.onmessage = (event) => {
    const data = event.data || {};
    if (data.type === 'closeView_all') {
      navigator.pop();
    }
  };
}

/**
 * 获取隔离作用域的存储数据
 */
export function getItem(key) {
  const storage = weex.requireModule('UMEWeexStorage');
  return new Promise((resolve) => {
    if (isWeex) {
      storage.getItem(key, (e) => {
        if (e.result === 'success') {
          resolve(e.data);
        } else {
          resolve('');
        }
      });
    } else {
      const { localStorage } = window;
      const data = localStorage.getItem(key);
      resolve(data);
    }
  });
}
/**
 * 设置隔离作用域的存储数据
 */
export function setItem(key, value, cb) {
  const storage = weex.requireModule('UMEWeexStorage');
  if (key) {
    if (isWeex) {
      storage.setItem(key, value, (e) => {
        if (cb && typeof cb === 'function') {
          cb(e.result);
        }
      });
    } else {
      const { localStorage } = window;
      localStorage.setItem(key, value);
      if (cb && typeof cb === 'function') {
        cb();
      }
    }
  }
}
/**
 * 删除数据
 */
export function removeItem(key, cb) {
  const storage = weex.requireModule('UMEWeexStorage');
  if (key) {
    if (isWeex) {
      storage.removeItem(key, (e) => {
        if (cb && typeof cb === 'function') {
          cb(e.result);
        }
      });
    } else {
      const { localStorage } = window;
      localStorage.removeItem(key);
      if (cb && typeof cb === 'function') {
        cb();
      }
    }
  }
}

export function rotateBase64Img(src, maxWidth, degree, callback) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (degree % 90 !== 0) {
    // alert('旋转的角度必须是90的倍数');
    return;
  }
  const quadrant = (degree / 90) % 4;
  const cutCoor = { sx: 0, sy: 0, ex: 0, ey: 0 }; // 裁剪坐标
  const image = new Image();
  image.src = src;
  image.onload = function () {
    let imgW;
    let imgH;
    imgW = image.width;
    imgH = image.height;
    if (maxWidth) {
      if (imgW > maxWidth) {
        imgW = maxWidth;
        imgH *= maxWidth / image.width;
      }
    }
    const size = imgW > imgH ? imgW : imgH;
    // console.log(imgW, imgH);
    canvas.width = size * 2;
    canvas.height = size * 2;
    switch (quadrant) {
      case 0:
        cutCoor.sx = size;
        cutCoor.sy = size;
        cutCoor.ex = size + imgW;
        cutCoor.ey = size + imgH;
        break;
      case 1:
        cutCoor.sx = size - imgH;
        cutCoor.sy = size;
        cutCoor.ex = size;
        cutCoor.ey = size + imgW;
        break;
      case 2:
        cutCoor.sx = size - imgW;
        cutCoor.sy = size - imgH;
        cutCoor.ex = size;
        cutCoor.ey = size;
        break;
      case 3:
        cutCoor.sx = size;
        cutCoor.sy = size - imgW;
        cutCoor.ex = size + imgH;
        cutCoor.ey = size;
        break;
      default:
        break;
    }
    ctx.translate(size, size);
    ctx.rotate((degree * Math.PI) / 180);
    ctx.drawImage(image, 0, 0, imgW, imgH);
    const imageData = ctx.getImageData(
      cutCoor.sx,
      cutCoor.sy,
      cutCoor.ex,
      cutCoor.ey,
    );
    if (quadrant % 2 === 0) {
      canvas.width = imgW;
      canvas.height = imgH;
    } else {
      canvas.width = imgH;
      canvas.height = imgW;
    }
    ctx.putImageData(imageData, 0, 0);
    callback(canvas.toDataURL());
  };
}

// 封装broadcast h5不支持
export function Broadcast(channel) {
  let BroadcastInstance;
  if (isWeex) {
    BroadcastInstance = new BroadcastChannel(channel);
  } else if (window.BroadcastChannel) {
    BroadcastInstance = new BroadcastChannel(channel);
  } else {
    BroadcastInstance = {
      postMessage: () => {},
      close: () => {},
    };
  }
  return BroadcastInstance;
}

// 事件截流
export function throttle(action, delay) {
  let timeout = null;
  let lastRun = 0;
  return function (...args) {
    if (timeout) {
      return;
    }
    const elapsed = Date.now() - lastRun;
    const context = this;
    const runCallback = function () {
      lastRun = Date.now();
      timeout = false;
      action.apply(context, args);
    };
    if (elapsed >= delay) {
      runCallback();
    } else {
      timeout = setTimeout(runCallback, delay);
    }
  };
}

export function getDays(values = []) {
  const bigMonth = [1, 3, 5, 7, 8, 10, 12];
  const specialMonth = 2;
  let days = 30;
  const currentMonth = values[1];
  const currentYear = values[0];
  const index = bigMonth.indexOf(currentMonth);
  if (index !== -1) {
    days = 31;
  }
  if (currentMonth === specialMonth) {
    if (currentYear % 4 === 0) {
      days = 29;
    } else {
      days = 28;
    }
  }
  return days;
}

export function dateToString(date = new Date(), full = true) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  month = month > 9 ? month : `0${month}`;
  day = day > 9 ? day : `0${day}`;
  hour = hour > 9 ? hour : `0${hour}`;
  minute = minute > 9 ? minute : `0${minute}`;
  second = second > 9 ? second : `0${second}`;
  let dateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  if (!full) {
    dateTime = `${year}-${month}-${day}`;
  }
  return dateTime;
}

export function bufferToBase64(buffer) {
  if (typeof btoa !== 'function') {
    return '';
  }
  const string = Array.prototype.map
    .call(new Uint8Array(buffer), (code) => String.fromCharCode(code))
    .join('');
  return btoa(string);
}

export function base64ToBuffer(base64) {
  if (typeof atob !== 'function') {
    return new ArrayBuffer(0);
  }
  const string = atob(base64);
  const array = new Uint8Array(string.length);
  Array.prototype.forEach.call(string, (ch, i) => {
    array[i] = ch.charCodeAt(0);
  });
  return array.buffer;
}

export function parseJson(json) {
  let res;
  if (!json) return '';
  if (typeof json === 'string') {
    try {
      res = JSON.parse(json);
    } catch (e) {
      console.log('json parse err!', json, e);
    }
  } else {
    res = json;
  }
  return res;
}

export function handleBack() {
  if (isAndroid) {
    callNative('h5Service', {
      serviceName: ['onBack'],
    }, (res) => {
      console.log(res);
    });
  } else if (isIos) {
    // callNative('noSlider', {}, (res) => {
    //   console.log(res)
    // })
  }
}

const bindEventListener = function (type) {
  const historyEvent = history[type];
  return function () {
    const newEvent = historyEvent.apply(this, arguments);
    const e = new Event(type);
    e.arguments = arguments;
    window.dispatchEvent(e);
    return newEvent;
  };
};

export const initPushStateEvent = () => {
  history.pushState = bindEventListener('pushState');
}