import {
  callNative,
  isInUmeApp,
  isWeb,
  isWeex,
  isIos,
  isAndroid,
  isInWeixin,
  getQuery,
  Broadcast,
  h5Ios,
  pushPage,
  parseJson,
  isNative
} from './index';

import { registerService } from '@/utils/api.js';
import { getInfoFromNative } from './h5';

const modal = weex.requireModule('modal');
const navigator = weex.requireModule('navigator');
const globalEvent = weex.requireModule('globalEvent');


let wx = {};
if (isInWeixin) {
  wx = require('weixin-js-sdk');
  const url = `https://www.umetrip.com/weixinrobotmsg/weixin/api/jssignature.do?url=${encodeURIComponent(
    window.location.href,
  )}`;
  fetch('get', url, {}, {}, {}, { useUrlBase: false, isResolveAll: true }).then(
    (json) => {
      const { appId } = json;
      const { timestamp } = json;
      const { nonceStr } = json;
      const { signature } = json;
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId, // 必填，公众号的唯一标识
        timestamp, // 必填，生成签名的时间戳
        nonceStr, // 必填，生成签名的随机串
        signature, // 必填，签名，见附录1
        jsApiList: [
          'chooseImage', // 相册
          'getLocalImgData', // 获取图片base64
          'getLocation', // 获取地理位置
          'getNetworkType', // 获取网络状态接口
        ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
    },
  );
}
export { wx };

let rsid = ''; // 39470051$$3ac3c75ef84b4e2089bc61152f939801
let rcuuid = ''; // xa95d38568aee4bdabb43fdb1be4c3e08
/**
 * 解析客户端返回的结果
 * @param {function} resolve promise resolve 回调
 * @param {function} reject promise reject 回调
 * @param {object} result 客户端返回的结果
 * @param {number} type 1 res, 2 res.data, 3 res.status, 4 res||'', 5 res||{}
 */
function handleResult(resolve, reject, result, type) {
  console.log('building jsapi.js handleResult 回调');
  let res = result;
  try {
    if (typeof res === 'string') {
      res = JSON.parse(res);
    }
    if (type === 1) {
      resolve(res);
    } else if (type === 2) {
      // console.log('20220901', res.data);
      resolve(res.data);
    } else if (type === 3) {
      resolve(res.status);
    } else if (type === 4) {
      resolve(res.data || '');
    } else if (type === 5) {
      resolve(res.data || {});
    } else {
      resolve(res);
    }
  } catch (error) {
    reject(error);
  }
}
export function onReturn() {
  return new Promise((resolve, reject) => {
    callNative('onReturn', {}, (res) => {
      handleResult(resolve, reject, res);
    });
  });
}
/**
 * 挪weex包
 * @param {object} param
 * @param {string} param.weexid
 * @param {string} param.weexUrl
 * @param {string} param.md5
 * @param {string} param.timestamp
 * @param {string} param.versionCode
 * @returns {Promise}
 */
export function updateWeexPackage(param) {
  return new Promise((resolve, reject) => {
    callNative('updateWeexPackage', param, (res) => {
      handleResult(resolve, reject, res);
    });
  });
}
/**
 * 删weex包
 * @param {object} param
 * @param {object} param.weexId
 * @param {object} param.versionCode
 * @returns {Promise}
 */
export function deleteWeexPackage(param) {
  return new Promise((resolve, reject) => {
    callNative('deleteWeexPackage', param, (res) => {
      handleResult(resolve, reject, res);
    });
  });
}
/**
 * 广告曝光打点上传-第三方监测（目前只有广告使用）, 需先判断group里面businessType等于“ADVERT”，方可执行方法
 * @param {object} param
 * @param {number} param.type 点击102 /曝光103
 * @param {string} param.sv serviceId
 * @param {string} param.st track
 * @param {array} param.impressionUrlList 曝光
 * @param {array} param.clickUrlList 点击
 * @param {number} param.ofe 成功标志,曝光成功0 ,点击跳转Scheme成功 0, 点击跳转小程序成功 0 , 点击跳转外链失败，走兜底跳转 1
 * @returns {Promise}
 */
export function uploadThirdMonitoringLog(param = {}) {
  return new Promise((resolve, reject) => {
    callNative('uploadThirdMonitoringLog', param, (res) => {
      handleResult(resolve, reject, res);
    });
  });
}

/**
 * 取消发出去的pb协议
 * @param {object} param
 * @param {string} param.cancelId 取消请求唯一Id
 * @returns {Promise}
 */
export function cancelNetwork(param = {}) {
  return new Promise((resolve) => {
    callNative('cancelNetwork', { cancelId: param.cancelId }, (r) => {
      let res = r;
      if (typeof res === 'string') {
        res = JSON.parse(res);
      }
      resolve(res);
    });
  });
}
/**
 * 拉起航司选择列表
 * @param {object} param
 * @param {string} [param.currentCode] 当前航司二字码
 * @returns {Promise}
 */
export function getAirlineList(param = {}) {
  return new Promise((resolve, reject) => {
    callNative('getAirlineList', param, (res) => {
      handleResult(resolve, reject, res);
    });
  });
}
/**
 * 提前向用户发起授权请求。调用后会立刻弹窗询问用户是否同意授权小程序使用某项功能或获取用户的某些数据。未登录未认证状态下，用户需先登录和认证。
 * @param {object} param 传给客户端的参数
 * @param {string} param.scopeNames 第三方用户申请的授权列表，如['name_mobile', 'faceCapture']
 * @returns {Promise}
 */
export function getAuthorize(param = {}) {
  return new Promise((resolve, reject) => {
    callNative('getAuthorize', { scopeNames: param.scopeNames }, (res) => {
      handleResult(resolve, reject, res);
    });
  });
}
/**
 * 获取用户唯一身份标识。需要中台把本项目weexId配到白名单
 * @returns {Promise}
 */
export function getUnionid() {
  return new Promise((resolve, reject) => {
    callNative('getUnionid', {}, (res) => {
      handleResult(resolve, reject, res);
    });
  });
}
/**
 * 控制ios webview外框上下滑动的情况
 * @param {object} param 传给客户端的参数
 * @param {boolean} param.isOpen true则允许webview框上下滑动，false则禁止webview框上下滑动
 * @returns {Promise}
 */
export function verticalSlider(param = {}) {
  return new Promise((resolve, reject) => {
    callNative('verticalSlider', { isOpen: param.isOpen }, (res) => {
      handleResult(resolve, reject, res);
    });
  });
}
/**
 * weex或者H5通过jsapi从端上取出存储到本地的资源
 * @param {object} param 传给客户端的参数
 * @param {string} param.storageName 存储的键名
 * @returns {Promise}
 */
export function commonGetStorage(param = {}) {
  return new Promise((resolve, reject) => {
    callNative(
      'commonGetStorage',
      { storageName: param.storageName },
      (res) => {
        handleResult(resolve, reject, res);
      },
    );
  });
}
/**
 * 通过分享进入圈子的发布页，发表成功后向客户端发通知
 * @param {object} param 传给客户端的参数
 * @param {string} param.content 分享完成后客户端弹的toast文案
 * @returns {Promise}
 */
export function sns_sharePublicDone(param = {}) {
  return new Promise((resolve, reject) => {
    callNative('sns_sharePublicDone', { content: param.content }, (res) => {
      handleResult(resolve, reject, res);
    });
  });
}

/**
 * 获取私聊消息人列表
 * @returns {Promise}
 */
export function getContactList() {
  return new Promise((resolve, reject) => {
    callNative('getContactList', {}, (res) => {
      handleResult(resolve, reject, res);
    });
  });
}
/**
 * 在ios的导航栏左侧 显示关闭按钮
 * @returns {Promise}
 */
export function onClosed() {
  return new Promise((resolve, reject) => {
    callNative('onClosed', {}, (res) => {
      handleResult(resolve, reject, res);
    });
  });
}
/**
 * 刷新当前页面接口
 * @returns {Promise}
 */
export function onRefresh() {
  return new Promise((resolve, reject) => {
    callNative('onRefresh', {}, (res) => {
      handleResult(resolve, reject, res);
    });
  });
}

/**
 * 关闭当前webview
 * @returns {Promise}
 */
export function finishWebView() {
  return new Promise((resolve, reject) => {
    callNative('finishWebView', {}, (res) => {
      handleResult(resolve, reject, res);
    });
  });
}
/**
 * 清除缓存
 * @returns {Promise}
 */
export function clearCache() {
  return new Promise((resolve, reject) => {
    callNative('clearCache', {}, (res) => {
      handleResult(resolve, reject, res);
    });
  });
}
/**
 * 调用客户端截屏功能
 * @param {object} param
 * @param {string} [param.type='0'] '0': 截当前屏幕 '1': 自定义dom或者截长图
 * @param {object} [param.ref] 如果是自定义区域截图或者截长图，传给客户端对应的View索引，客户端根据索引找到WXComponent
 * @param {number} [param.iosCompress=0.7] ios压缩比率，0~1之间，包括0和1
 * @param {number} [param.androidCompress=80] android压缩比率，0～100之间，包括0和100
 * @param {string} param.expectedType '0': 返回base64数据 '1': 返回路径path
 * @returns {Promise}
 */
export function captureScreen(param = {}) {
  return new Promise((resolve, reject) => {
    callNative('captureScreen', param, (res) => {
      handleResult(resolve, reject, res);
    });
  });
}
/**
 * 人脸识别
 * @returns {Promise}
 */
export function startFacialDetect() {
  return new Promise((resolve, reject) => {
    callNative('startFacialDetect', {}, (res) => {
      handleResult(resolve, reject, res);
    });
  });
}
/**
 * 呼起客户端打电话
 * @param {object} params phoneNumber 电话号码; isModal 是否弹窗询问 1：弹窗；0：不弹窗;tipWords 弹窗里的说明文案，isModal为1时使用
 * @param {string} params.phoneNumber 电话号码
 * @param {number} [params.isModal=1] 是否弹窗询问 1：弹窗；0：不弹窗
 * @param {string} [params.tipWords=''] 弹窗里的说明文案，isModal为1时使用
 * @returns {Promise<{status:number,statusMessage:string}>}
 * {status:number, statusMessage:string}
 * status: 10001 用户取消操作, 11111 操作成功; statusMessage: 错误文案
 * @version h5(and_5.0.10;ios_5.0.10);weex(and_5.0.10;ios_5.0.10)
 */
export function callUp({ phoneNumber = '', isModal = 1, tipWords = '' }) {
  console.log('building jsapi.js callUp phoneNumber:' + phoneNumber);  // platform: web
  return new Promise((resolve, reject) => {
    console.log('building jsapi.js callUp callNative phoneNumber:' + phoneNumber);
    callNative('callUp', { phoneNumber, isModal, tipWords }, (res) => {
      console.log('building jsapi.js callUp callNative 回调');
      handleResult(resolve, reject, res);
    });
  });
}

/**
 * 更新资源
 * @returns {Promise<{status:number,statusMessage:string}>}
 * {status:number, statusMessage:string}
 * @version h5(and_5.0.10;ios_5.0.10);weex(and_5.0.10;ios_5.0.10)
 */
 export function updateRes() {
  console.log('building jsapi.js updateRes');
  return new Promise((resolve, reject) => {
    console.log('building jsapi.js updateRes callNative');
    callNative('updateRes', { 'count': 100 }, (res) => {
      console.log('building jsapi.js updateRes callNative 回调');
      handleResult(resolve, reject, res);
    });
  });
}

/**
 * 检测【消息通知】功能是否打开
 * @returns {Promise<{status:number,data:{isOpen:number},statusMessage:string}>}
 * {status:number,  data:{isOpen:number}, statusMessage:string}
 * status: 10002 检测功能调用失败, 11111 检测功能调用成功;data.isOpen: 1 表示已打开, 0 表示未打开； statusMessage: 错误文案
 */
export function isOpenMsg() {
  return new Promise((resolve, reject) => {
    callNative('isOpenMsg', {}, (res) => handleResult(resolve, reject, res));
  });
}
/**
 * 跳转对应设置页面，引导用户打开【消息通知】功能
 * @returns {Promise<{status:number,data:{isOpen:number},statusMessage:string}>}
 * {status:number,  data:{isOpen:number}, statusMessage:string}
 * status: 10002 跳转失败, 11111 跳转成功; data.isOpen: 1 表示消息通知功能已打开, 0 表示消息通知功能未打开; statusMessage: 错误文案
 */
export function toOpenMsg() {
  return new Promise((resolve, reject) => {
    callNative('toOpenMsg', {}, (res) => handleResult(resolve, reject, res));
  });
}
/**
 * 保存长图到手机相册 （客户端可能要先弹窗询问）
 * @param {string[]} imgArray 需要保存的长图数组，里面每一项都是一个BASE64码
 * @returns {Promise<{status:number, statusMessage:string}>}
 * {status:number, statusMessage:string}
 * status: 10001 用户取消操作, 10002 保存失败, 11111 保存成功 ;data statusMessage: 错误文案
 * @version h5(and_6.0.0;ios_6.0.0);weex(and_6.0.0;ios_6.0.0)
 */
export function saveImgsToAlbum(imgArray) {
  return new Promise((resolve, reject) => {
    callNative('saveImgsToAlbum', { imgArray }, (res) => {
      handleResult(resolve, reject, res);
    });
  });
}

export function getHeader() {
  const p1 = new Promise((resolve) => {
    if (rsid && rcuuid) {
      resolve({
        rsid,
        rcuuid,
      });
    } else {
      try {
        callNative('getUserInfo', {}, (r) => {
          let result = r;
          // 经测试，这个异步api一般在100ms以内
          if (typeof result === 'string') {
            result = JSON.parse(result);
          }
          if (result.status === 11111) {
            rsid = result.data.sessionId;
            rcuuid = result.data.rcuuid;
          }
          resolve({
            rsid,
            rcuuid,
          });
        });
      } catch (error) {
        xlog.log(error);
        resolve({
          rsid: '',
          rcuuid: '',
        });
      }
    }
  });
  const p2 = new Promise((resolve) => {
    const tempId = setTimeout(() => {
      resolve({
        rsid,
        rcuuid,
      });
      if (tempId) {
        clearTimeout(tempId);
      }
    }, 2000);
  });
  return Promise.race([p1, p2]);
}
/**
 * 选择图片且上传接口
 * @param {*} sourceType - 0: 相机，1: 相册
 * @param {*} count - 选择相片的数量
 * @param {*} source - 上传接口的source，h5/Weex
 * @param {*} moduleName - 上传接口的moduleName，找伍彬配
 */
export async function chooseAnduploadImage(
  sourceType,
  count = 1,
  source,
  moduleName,
  vm = {},
) {
  const filePaths = await chooseImage(sourceType, count);
  return uploadImage(filePaths, source, moduleName, vm);
}
/**
 * 选择图片接口
 * @param {*} sourceType - 0: 相机，1: 相册
 * @param {*} count - 选择相片的数量
 */
export function chooseImage(sourceType, count = 1) {
  return new Promise((resolve) => {
    if (isNative || isInUmeApp) {
      callNative('getPhoto', { count, sourceType }, (r) => {
        let result = r;
        if (typeof result === 'string') {
          result = JSON.parse(result);
        }
        if (result.status === 11111) {
          let filePaths = result.data;
          filePaths = filePaths.map((base64Img) => {
            return base64Img.replace(/[\r\n]/g, '');
          });
          resolve(filePaths);
        } else {
          modal.toast({
            message: '获取图片失败,请重试',
          });
        }
      });
    } else if (isInWeixin) {
      const ua = window.navigator.userAgent.toLowerCase();
      if (/MicroMessenger/i.test(ua)) {
        wx.ready(() => {
          wx.chooseImage({
            count,
            sourceType: [sourceType === 0 ? 'camera' : 'album'],
            success: (result) => {
              const { localIds } = result; // 本地临时路径
              xlog.log('localIds: ', localIds);
              resolve(localIds);
            },
          });
        });
      }
    }
  });
}

/**
 * 图片批量上传
 * @param {Array} imgList 需要上传的base64数组
 * @param {*} source 上传的source，h5/Weex
 * @param {*} moduleName 上传的模块名，找伍彬配
 * @param {*} vm  vue实例
 */
export async function uploadImage(imgList, source, moduleName, vm = {}) {
  vm.showLoading = true;
  vm.loadingContent = '图片上传中';
  const fidList = [];
  const pFileInfos = [];
  for (let i = 0; i < imgList.length; i++) {
    pFileInfos.push(callNativeUpImg(imgList[i], source, moduleName, vm));
  }
  const fileInfos = await Promise.all(pFileInfos);
  for (let i = 0; i < imgList.length; i++) {
    // const fileInfo = await callNativeUpImg(imgList[i], source, moduleName, vm);
    // 兼容iOS上传图片不返回getFileByFid的情况
    if (!fileInfos[i].getFileByFid) {
      fileInfos[
        i
      ].getFileByFid = `http://img.umetrip.com/fs/${moduleName}/${fileInfos[i].fid}`;
    }
    fidList[i] = fileInfos[i];
  }
  return fidList;
}

/**
 * 单次上传
 * @param {String} data 图片base64流
 * @param {String} source 上传的source，h5/Weex
 * @param {String} moduleName 上传的模块名，找伍彬配
 * @param {Object} vm vue实例
 */
function callNativeUpImg(data, source, moduleName, vm) {
  return new Promise((resolve) => {
    if (isNative || isInUmeApp) {
      const base64Image = data;
      xlog.log('开始调用callUploadFileWithParams');
      callNative(
        'callUploadFileWithParams',
        {
          data: base64Image,
          source,
          module: moduleName,
        },
        (r) => {
          let result = r;
          xlog.log(`callUploadFileWithParams返回${JSON.stringify(result)}`);
          vm.showLoading = false;
          if (typeof result === 'string') {
            result = JSON.parse(result);
          }
          if (result.status === 11111) {
            resolve(result.data.fileInfo);
          } else {
            vm.showToast = true;
            vm.content = result.statusMessage || '上传图片出错，请重试！';
            resolve();
          }
        },
      );
    } else if (isInWeixin) {
      const filePath = data;
      wx.getLocalImgData({
        localId: filePath,
        success: (res) => {
          const { localData } = res; // localData是图片的base64数据，可以用img标签显示
          xlog.log('localData: ', localData);
          let base64Img;
          if (/(iphone|ipad)/i.test(navigator.userAgent)) {
            base64Img = localData.split('base64,')[1];
          } else {
            base64Img = localData;
          }
          h5Upload(base64Img, source, moduleName, vm).then((uploadRes) => {
            vm.showLoading = false;
            resolve(uploadRes.fileInfo);
          });
        },
      });
    }
  });
}
// h5上传图片
export async function h5Upload(base64Image, source, moduleName, vm) {
  const blobData = waitUpload(base64Image);
  const formData = new FormData();
  formData.append('file', blobData);
  // let url = 'http://10.237.78.78:8180/UmeImageMagic/api/fileSystem/uploadFile'
  const url =
    'https://img.umetrip.com/jboss/UmeImageMagic/api/fileSystem/uploadFile';
  return new Promise((resolve, reject) => {
    window
      .fetch(url, {
        method: 'POST',
        headers: {
          source,
          module: moduleName,
          rsid,
          rcuuid,
          fileInfo: 'getFileByFid',
        },
        body: formData,
      })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          reject(response.statusText);
        }
      })
      .then((data) => {
        if (data.errCode === 0) {
          resolve(data);
        } else {
          vm.showModal = true;
          vm.content = data.errMsg || data.errorMsg; // errMsg兼容gateway错误
        }
      })
      .catch((error) => {
        xlog.log(error);
        vm.showToast = true;
        vm.content = '图片上传错误，请稍后再试！';
      });
  });
}

function waitUpload(base64Image) {
  const imageBlob = window.atob(base64Image);
  const buffer = new ArrayBuffer(imageBlob.length);
  const ubuffer = new Uint8Array(buffer);
  for (let i = 0; i < imageBlob.length; i++) {
    ubuffer[i] = imageBlob.charCodeAt(i);
  }
  const Builder = window.WebKitBlobBuilder;
  let blob;
  if (Builder) {
    const builder = new Builder();
    builder.append(buffer);
    blob = builder.getBlob('image/jpeg');
  } else {
    blob = new window.Blob([buffer], { type: 'image/jpeg' });
  }
  return blob;
}

/**
 * weex首页向客户端拿参数，先从url上取，取不到从客户端取
 */
export async function getSessionParams(keys) {
  let values;
  let sessionParams = getQuery('sessionParams');
  xlog.info('getQuery', sessionParams);
  if (!sessionParams) {
    xlog.info('callNative', sessionParams);
    sessionParams = await getParamsFromNative();
  }
  if (Array.isArray(keys)) {
    values = [];
    keys.forEach((key) => {
      const reg = new RegExp(`${key}=([^&#]+)`);
      const match = sessionParams.match(reg);
      if (match && match[1]) {
        values.push(match[1]);
      } else {
        values.push('');
      }
    });
  } else if (keys.constructor === Object) {
    values = {};
    for (const key in keys) {
      if (Object.prototype.hasOwnProperty.call(keys, `${key}`)) {
        const reg = new RegExp(`${key}=([^&#]+)`);
        const match = sessionParams.match(reg);
        values[key] = (match && match[1]) || '';
      }
    }
  } else if (typeof keys === 'string') {
    const reg = new RegExp(`${keys}=([^&#]+)`);
    const match = sessionParams.match(reg);
    values = (match && match[1]) || '';
  }
  return values;
}

/**
 * 从客户端取业务参数
 */
export function getParamsFromNative() {
  const p1 = new Promise((resolve) => {
    callNative('getSessionParams', {}, (r) => {
      let res = r;
      if (typeof res === 'string') {
        res = JSON.parse(res);
      }
      const data = res.data || {};
      const sessionParams = decodeURIComponent(data.sessionParams) || '';
      resolve(sessionParams);
    });
  });
  const p2 = new Promise((resolve) => {
    const tempId = setTimeout(() => {
      resolve();
      if (tempId) {
        clearTimeout(tempId);
      }
    }, 3000);
  });
  return Promise.race([p1, p2]);
}

/**
 * 获取地理位置
 * 出参：对象，字段：
 * longitude：经度,
 * latitude: 纬度
 */
export function getLocation() {
  const p1 = new Promise((resolve, reject) => {
    if (isNative || isInUmeApp) {
      callNative('getLocation', {}, (r) => {
        let res = r;
        try {
          if (typeof res === 'string') {
            res = JSON.parse(res);
          }
          const data = res.data || {};
          resolve({
            latitude: data.latitude,
            longitude: data.longitude,
          });
        } catch (error) {
          reject(error);
        }
        // if (timeoutId) clearTimeout(timeoutId)
      });
    } else if (isInWeixin) {
      wx.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success(res) {
          const { latitude } = res; // 纬度，浮点数，范围为90 ~ -90
          const { longitude } = res; // 经度，浮点数，范围为180 ~ -180。
          const { speed } = res; // 速度，以米/每秒计
          const { accuracy } = res; // 位置精度
          resolve({
            latitude,
            longitude,
            speed,
            accuracy,
          });
        },
      });
    } else {
      resolve('');
    }
  });
  const p2 = new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      resolve('');
    }, 3000);
  });
  return Promise.race([p1, p2]);
}

/**
 * 获取网络状态
 */
export function getNetworkType() {
  const p1 = new Promise((resolve, reject) => {
    if (isNative || isInUmeApp) {
      callNative('getNetworkType', {}, (r) => {
        let res = r;
        try {
          if (typeof res === 'string') {
            res = JSON.parse(res);
          }
          const networkType = res.data || ''; // WIFI/2G/3G/4G/无网络
          resolve(networkType);
        } catch (error) {
          reject(error);
        }
        // if (timeoutId) clearTimeout(timeoutId)
      });
    } else if (isInWeixin) {
      wx.getNetworkType({
        success(res) {
          const { networkType } = res; // 返回网络类型2g，3g，4g，wifi
          resolve(networkType);
        },
      });
    } else {
      resolve('');
    }
  });
  const p2 = new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      resolve('');
    }, 3000);
  });
  return Promise.race([p1, p2]);
}

// /**
//  * 跳页面，先用jumpNative2，和jumpNative暂时区分，后面合并
//  */
//  export function jumpNative2() {
//   return new Promise((resolve, reject) => {
//     console.log('building jumpNative2 isWeex:' + isWeex + ' isInUmeApp:' + isInUmeApp);
//     // if (isWeex || isInUmeApp) {
//       callNative('jumpNative2', {'url':'pages/Second', 'title':'从weex来的'}, (r) => {
//         let res = r;
//         try {
//           if (typeof res === 'string') {
//             res = JSON.parse(res);
//           }
//           const data = res.data || {};
//           resolve(data);
//         } catch (error) {
//           reject(error);
//         }
//         // if (timeoutId) clearTimeout(timeoutId)
//       });
//     // } else if (isInWeixin) {
//     //   // 微信暂无
//     // } else {
//     //   resolve('');
//     // }
//   });
// }

/**
 * 获取常用联系人
 */
export function chooseContact() {
  console.log('building chooseContact isWeex:' + isWeex + ' isInUmeApp:' + isInUmeApp);
  return new Promise((resolve, reject) => {
    if (isNative || isInUmeApp) {
      callNative('chooseContact', {}, (r) => {
        let res = r;
        try {
          if (typeof res === 'string') {
            res = JSON.parse(res);
          }
          const data = res.data || {};
          resolve(data);
        } catch (error) {
          reject(error);
        }
        // if (timeoutId) clearTimeout(timeoutId)
      });
    } else if (isInWeixin) {
      // 微信暂无
    } else {
      resolve('');
    }
  });
}

/**
 * 获取蓝牙状态
 */
export function getBluetooth() {
  const p1 = new Promise((resolve, reject) => {
    if (isNative || isInUmeApp) {
      callNative('getBluetooth', {}, (r) => {
        let res = r;
        try {
          if (typeof res === 'string') {
            res = JSON.parse(res);
          }
          const bluetoothState = res.data || '';
          resolve(bluetoothState);
        } catch (error) {
          reject(error);
        }
        // if (timeoutId) clearTimeout(timeoutId)
      });
    } else if (isInWeixin) {
      resolve('');
    } else {
      resolve('');
    }
  });
  // const p2 = new Promise((resolve) => {
  //   const timeoutId = setTimeout(() => {
  //     clearTimeout(timeoutId);
  //     resolve('');
  //   }, 3000);
  // });
  // return Promise.race([p1, p2]);
  return Promise.race([p1]);
}

/**
 * 禁止客户端返回，iOS禁止测滑，Android禁止物理键返回
 * @param {Boolean} isLip 是否打开测滑，false: 禁止测滑
 * @param {Function} cb 用户触发返回按钮时的回调，目前只有Android生效
 */
export function nativeSlider(isLip, cb) {
  if (isNative) {
    // 1 weex / h5
    if (isAndroid) {
      // 2 安卓 / ios
      if (!isLip) {
        // 3 isLip 监听/不监听 false禁止测滑 监听返回，true打开侧滑
        globalEvent.addEventListener('globalOnBack', (res) => {
          if (cb && typeof cb === 'function') {
            cb();
            console.info(`and globalOnBack ${JSON.stringify(res)}`);
          }
        });
        callNative('h5Service', { serviceName: ['onBack'] }, (res) => {
          console.info(`and callNative onBack ${JSON.stringify(res)}`);
        });
      } else if (isLip) {
        // true打开侧滑
        globalEvent.removeEventListener('globalOnBack');
        callNative('h5Service', { serviceName: ['removeBack'] }, (res) => {
          // callNative('h5Service', { serviceName: [] }, (res) => {
          console.info(`and callNative removeBack ${JSON.stringify(res)}`);
        });
      }
    } else if (isIos) {
      // ios
      callNative('noSlider', { isLip }, () => {});
    }
  } else if (isWeb && isInUmeApp) {
    if (h5Ios) {
      callNative('noSlider', { isLip }, () => {});
    }
    registerService('onBack', (data, nativeFn) => {
      nativeFn(isLip ? 0 : 1);
      // this.returnType = data;
      if (!isLip && cb && typeof cb === 'function') cb();
    });
    callNative('h5Service', { serviceName: isLip ? [] : ['onBack'] }, () => {});
  }
}

/**
 * 获取客户端版本号
 */
export function getReqHeader() {
  const p1 = new Promise((resolve, reject) => {
    if (isNative || isInUmeApp) {
      callNative('getReqHeader', {}, (r) => {
        let result = r;
        // 经测试，这个异步api一般在100ms以内
        try {
          if (typeof result === 'string') {
            result = JSON.parse(result);
          }
          const data = result.data || {};
          xlog.log(`从客户端取出来的版本信息: ${JSON.stringify(data)}`);
          // 手动注入version解析出来的版本号
          const rcver = data.rcver || '';
          const version = rcverToNumber(rcver);
          data.version = version;
          resolve(data);
        } catch (error) {
          reject(error);
        }
        // if (timeoutId) clearTimeout(timeoutId)
      });
    } else if (isInWeixin) {
      // 微信不需要
    } else {
      resolve('');
    }
  });
  const p2 = new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      resolve('');
    }, 2000);
  });
  return Promise.race([p1, p2]);
}

export function rcverToNumber(rcver) {
  let version = rcver.split('_')[2];
  version = Number(version.split('.').slice(0, 2).join(''));
  return version;
}

/**
 * 获取用户信息
 */
export function getUserInfo() {
  const p1 = new Promise((resolve, reject) => {
    if (isNative || isInUmeApp) {
      callNative('getUserInfo', {}, (r) => {
        let result = r;
        // 经测试，这个异步api一般在100ms以内
        try {
          if (typeof result === 'string') {
            result = JSON.parse(result);
          }
          resolve(result.data);
        } catch (error) {
          reject(error);
        }
        // if (timeoutId) clearTimeout(timeoutId)
      });
    } else if (isInWeixin) {
      // 微信不需要
    } else {
      resolve('');
    }
  });
  const p2 = new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      resolve('');
    }, 3000);
  });
  return Promise.race([p1, p2]);
}

/**
 * 修改导航栏/状态栏颜色
 * @param {object} [params = {}] 包含以下key：
 * backgroundColor：导航栏/状态栏背景颜色值，颜色值要传全，不要略写，如：#41B24E
 * topColor：状态栏电量等颜色值，传数值 1(黑色) 或 0（白色）
 * btnColor：导航栏上按钮的颜色，传数值 1(黑色) 或 0（白色）
 * titleWordColor：导航栏上title文字颜色色值，如：#ffffff
 * titleContent：title实际的内容
 */
export function changeTitle(params = {}) {
  return new Promise((resolve, reject) => {
    if (isNative || isInUmeApp) {
      callNative('changeTitle', params, (r) => {
        let result = r;
        // 经测试，这个异步api一般在100ms以内
        try {
          if (typeof result === 'string') {
            result = JSON.parse(result);
          }
          resolve(result.data);
        } catch (error) {
          reject(error);
        }
      });
    } else if (isInWeixin) {
      // 微信不需要
    } else {
      resolve('');
    }
  });
}

/**
 * 发起分享
 *  @param {object} [params = {}] 包含以下key：
 */
export function commonShare(params = {}) {
  return new Promise((resolve, reject) => {
    if (isNative || isInUmeApp) {
      callNative('commonShare', params, (r) => {
        xlog.info('commonShare', r);
        let result = r;
        // 经测试，这个异步api一般在100ms以内
        try {
          if (typeof result === 'string') {
            result = JSON.parse(result);
          }
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    } else if (isInWeixin) {
      // 微信不需要
    } else {
      resolve('');
    }
  });
}

/**
 * 定制右上角分享，仅限h5
 * @param {Object} params [params = {}] 包含以下key：
 * url: 右上角图标的url,
 * title: 右上角显示的汉字,
 * titleColor: 右上角显示的汉字的颜色,
 * show: 是否显示右上角的按钮
 */
export function setTopRightBtn(params = {}) {
  return new Promise((resolve, reject) => {
    if (isNative || isInUmeApp) {
      callNative('setTopRightBtn', params, (r) => {
        let result = r;
        // 经测试，这个异步api一般在100ms以内
        try {
          if (typeof result === 'string') {
            result = JSON.parse(result);
          }
          resolve(result.data);
        } catch (error) {
          reject(error);
        }
      });
    } else if (isInWeixin) {
      // 微信不需要
    } else {
      resolve('');
    }
  });
}

/**
 * 扩展setTopRightBtn，支持右上角显示两个按钮
 * @param {Object} params [params = {}] 包含以下key：
 */
export function expandTopRightBtn(params = {}) {
  return new Promise((resolve, reject) => {
    if (isNative || isInUmeApp) {
      callNative('expandTopRightBtn', params, (r) => {
        let result = r;
        // 经测试，这个异步api一般在100ms以内
        try {
          if (typeof result === 'string') {
            result = JSON.parse(result);
          }
          resolve(result.data);
        } catch (error) {
          reject(error);
        }
      });
    } else if (isInWeixin) {
      // 微信不需要
    } else {
      resolve('');
    }
  });
}

/**
 * 呼起微信小程序
 * @param {Object} params [params = {}] 包含以下key：
 * userName：要拉起的小程序的原始id
 * path：跳转小程序的路径(可带参数)
 * miniProgramType：跳转小程序环境 0: 生产，1: 体验，2: 测试
 */
export function openMiniprog(params = {}) {
  const newParams = {
    userName: 'gh_266737106011',
    path: '/pages/index/index',
    miniProgramType: 0,
    ...params,
  };
  return new Promise((resolve, reject) => {
    if (isNative || isInUmeApp) {
      callNative('openMiniprog', newParams, (r) => {
        let result = r;
        // 经测试，这个异步api一般在100ms以内
        try {
          if (typeof result === 'string') {
            result = JSON.parse(result);
          }
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    } else if (isInWeixin) {
      // 微信不需要
    } else {
      resolve('');
    }
  });
}

/**
 * 获取全屏的环境变量
 * @param {object} [params = {}]
 * isOpen: true/false - 是否开启全屏
 * showStatusMsg: true - 是否显示电量信息
 * statusMsgColor: 0 - 电量信息的颜色，0: 白色，1: 黑色
 */
export async function setAutoFullscreen(params = {}) {
  const { env } = weex.config;
  const { rcver } = env;
  let version;
  xlog.log(`从环境变量里拿出来的env: ${JSON.stringify(env)}`);
  let bottomHeight;
  let statusbarHeight;
  const scale = 750 / env.deviceWidth;
  let fullHeight;
  if (isNative) {
    if (rcver) {
      version = rcverToNumber(rcver);
    }
    if (version) {
      xlog.info('rcver');
      // 环境变量里返回的单位是px
      statusbarHeight = isAndroid
        ? env.androidStatusBarHeight
        : env.statusBarHeight;
      bottomHeight = env.safeAreaInsetBottom;
      statusbarHeight *= scale;
      bottomHeight *= scale;
      // 兼容一下有的人调全屏同时改电量颜色
      if (params.statusMsgColor === 0 || !params.showStatusMsg) {
        setFullscreen(params);
      }
    } else {
      const data = await setFullscreen(params);
      statusbarHeight = data.statusbarHeight;
      bottomHeight = data.bottomHeight;
    }
    fullHeight = env.deviceHeight * scale;
  } else {
    const data = await setFullscreen(params);
    statusbarHeight = data.statusbarHeight;
    bottomHeight = data.bottomHeight;
    fullHeight = (window.screen.availHeight / window.screen.availWidth) * 750;
  }
  xlog.log(
    `bottomHeight: ${bottomHeight}statusbarHeight: ${statusbarHeight}fullheight: ${fullHeight}`,
  );
  return {
    statusbarHeight,
    bottomHeight,
    fullHeight,
  };
}
export async function setAutoFullscreenNew(
  params = { isOpen: true, showStatusMsg: true, statusMsgColor: 1 },
) {
  let bottomHeight;
  let statusbarHeight;
  let fullHeight;
  const { env } = weex.config;
  const scale = 750 / env.deviceWidth;
  xlog.log('【2】 从环境变量里拿出来的env', weex.config.env);
  // 【1 weex】
  if (isNative) {
    // 【1.1 有rcver 直接env取】
    if (env.rcver && rcverToNumber(env.rcver)) {
      xlog.log(2, 'rcver', env.rcver);
      statusbarHeight = isAndroid
        ? env.androidStatusBarHeight * scale
        : env.statusBarHeight * scale;
      bottomHeight = env.safeAreaInsetBottom * scale;
      // 兼容改电量颜色
      // if (params.showStatusMsg) {
      setFullscreen(params);
      // }
    } else {
      // 【1.2 没有rcver旧版调setFullscreen取 】
      xlog.log(2, '无rcver', env.rcver);

      const data = await setFullscreen(params);
      statusbarHeight = data.statusbarHeight;
      bottomHeight = data.bottomHeight;
    }
    // 安卓7.2.4新增总高 weex.config.env.visibleScreenHeight；之前安卓deviceHeight不准，dom取可以矫正一下
    fullHeight = env.visibleScreenHeight * scale || env.deviceHeight * scale;
    xlog.log(1, 'weex', statusbarHeight, bottomHeight, fullHeight);
  } else if (isInUmeApp) {
    // 【2 航旅h5】
    // 降级或打开200200。可以从ua取
    /**
     * navigator.userAgent = Mozilla/5.0 (Linux; Android 10; PCT-AL10
     * Build/HUAWEIPCT-AL10; wv) AppleWebKit/537.36 (KHTML, like Gecko)
     * Version/4.0 Chrome/83.0.4103.106 Mobile Safari/537.36;UmeTrip
     * AND_a01_07.19.1102;statusbarHeight=34&bottomHeight=0&screenHeight=770;
     */
    // 先从 navigator.userAgent 取
    const { bottomHeight: bh, statusbarHeight: sh } = getInfoFromNative(isWeb) || {};
    if (bh && sh) {
      statusbarHeight = sh * 2;
      bottomHeight = bh * 2;
    }
    // else {
    //   const data = await setFullscreen(params);
    //   statusbarHeight = data.statusbarHeight;
    //   bottomHeight = data.bottomHeight;
    // }
    await setFullscreen(params);
    fullHeight = (window.screen.availHeight / window.screen.availWidth) * 750;
    console.log(2, 'ume-h5', statusbarHeight, bottomHeight, fullHeight);
  } else {
    // 【3 微信、weexWeb】
    statusbarHeight = 0;
    bottomHeight = 0;
    fullHeight = (window.screen.availHeight / window.screen.availWidth) * 750;
    console.log(3, 'browser-h5', fullHeight);
  }
  return {
    statusbarHeight,
    bottomHeight,
    fullHeight,
  };
}
/**
 * 设置全屏
 * @param {object} [params = {}]
 * isOpen: true/false - 是否开启全屏
 * showStatusMsg: true - 是否显示电量信息
 * statusMsgColor: 0 - 电量信息的颜色，0: 白色，1: 黑色
 */
export function setFullscreen(params = {}) {
  // params应该传对象
  // xlog.log('setFullscreen');
  return new Promise((resolve) => {
    callNative('setFullscreen', params, (r) => {
      console.log('setFullscreen', r);
      let result = r;
      if (typeof result === 'string') {
        result = JSON.parse(result);
      }
      let statusbarHeight;
      let bottomHeight;
      if (result.status === 11111) {
        const data = result.data || {};
        const { env } = weex.config;
        if (isWeb) {
          env.scale = env.dpr || window.devicePixelRatio;
        }
        const scale = (env.scale * 750) / env.deviceWidth;
        statusbarHeight = data.statusbarHeight;
        bottomHeight = data.bottomHeight;
        if (isIos) {
          const reg = /iPhone(\d+)/;
          const { deviceModel } = env;
          let match;
          if (statusbarHeight === undefined || bottomHeight === undefined) {
            // 如果从客户端没有拿到顶部和底部信息，则通过当前的设备机型判断
            match = deviceModel.match(reg);
            let matchTopHeight;
            let matchBotHeight;
            const isIphoneX = /(iPhone10,3|iPhone10,6)/i.test(deviceModel);
            if (match && match[1]) {
              if (Number(match[1]) < 11 && !isIphoneX) {
                // iphonex以下
                matchTopHeight = 20;
                matchBotHeight = 0;
              } else {
                matchTopHeight = 44;
                matchBotHeight = 34;
              }
            }
            if (!statusbarHeight) {
              statusbarHeight = matchTopHeight;
            }
            if (!bottomHeight) {
              bottomHeight = matchBotHeight;
            }
          }
        }
        statusbarHeight = Number(statusbarHeight || 20) * scale;
        bottomHeight = Number(bottomHeight || 0) * scale;
      }
      resolve({
        statusbarHeight,
        bottomHeight,
      });
    });
  });
}

/**
 * 关闭全屏
 */
export function closeFullscreen() {
  callNative(
    'setFullscreen',
    {
      isOpen: false,
    },
    (result) => {
      xlog.log(result);
    },
  );
}
export function getWeexId() {
  // const iosUrl =
  //   'x/x/x/UmeWeexFile/ume_1eee/1.3.6/frameworkTest/pages/testEnv.entry.js?type=1';
  // const andUrl =
  //   'x/x/x/files/weex/ume_1eee/1.3.6/frameworkTest/pages/testEnv.entry.js?type=1';
  let weexId;
  if (isIos) {
    weexId = (weex.config.bundleUrl.match(/UmeWeexFile\/(.*)\/\d+/) || [])[1];
    // weexId = /UmeWeexFile\/(.*)\/\d+/.exec(weex.config.bundleUrl)[1];
  } else if (isAndroid) {
    weexId = (weex.config.bundleUrl.match(/files\/weex\/(.*)\/\d+/) || [])[1];
  }
  // xlog.log('weexId', weexId);
  return weexId || '';
}
function convertToPush(params) {
  const page = (params.weexParams.jsBundleEntry.match(
    /pages\/(.*)\/entry.js/,
  ) || [])[1];
  pushPage(page, params.sessionParams);
}
/**
 * 跳转至客户端页面
 * @param {Object} jumpParams 里面传给客户端的参数：
 * @param {Strinng} pageId 跳转客户端的pageId
 * @param {Boolean} action action=false或者不传进入native页面就执行回调，action=true，用户操作完返回h5/weex页面之后再执行回调
 * @param {Boolean} isClose 跳转时是否关闭当前页面
 * @param {Object} params 跳转页面需要的参数，不关心，直接透传
 */
export function jumpNative(jumpParams = {}) {
  xlog.log('1128 jumpjumo');
  return new Promise((resolve, reject) => {
    const { pageId, targetPageId } = jumpParams;
    if (!pageId && !targetPageId) {
      reject(new Error('pageId不能为空'));
    }

    const params = jumpParams.params || jumpParams.parameter || {};
    if (Number(pageId || targetPageId) === 200200 && isWeb) {
      if (params.url) {
        location.href = params.url;
      }
      xlog.log('本地200200');
      resolve();
    }
    if (Number(pageId || targetPageId) === 200201 && params.weexParams.weexId === getWeexId()) {
      convertToPush(params);
      xlog.log(' 【 走本地200201 】 ');
      resolve();
      return;
    }
    // if (params.weexParams.weexId === 'ume_a0964127705e445c8856b6317a62214b') {
    //   convertToPush(params);
    //   xlog.log(' 【 走本地200201 】 ');
    //   resolve();
    //   return;
    // }
    xlog.log(
      ' 【 callNative jumpNative 业务给的、给客户端的 jumpParams 】 ',
      JSON.stringify(jumpParams),
    );
    xlog.log(
      ' 【 callNative jumpNative  中间参数 jumpParams.params 】 ',
      JSON.stringify(params),
    );
    if (isNative || isInUmeApp) {
      callNative('jumpNative', jumpParams, (r) => {
        let result = r;
        xlog.log('jumpNative res', r);
        // 经测试，这个异步api一般在100ms以内
        try {
          if (typeof result === 'string') {
            result = JSON.parse(result);
          }
          // xlog.log(`1128 jumpNative回调${JSON.stringify(result)}`);
          resolve(result);
        } catch (error) {
          reject(error);
        }
        // if (timeoutId) clearTimeout(timeoutId)
      });
    } else if (isInWeixin) {
      // 微信不需要
    }
  });
}

// 判断用户是否登录、认证
let loginStatus;
let identifyStatus;
export function isLogin(forceUpdate) {
  const p1 = new Promise((resolve) => {
    if (
      loginStatus === undefined ||
      identifyStatus === undefined ||
      forceUpdate
    ) {
      callNative('getUserInfo', {}, (r) => {
        let result = r;
        if (typeof result === 'string') {
          result = JSON.parse(result);
        }
        let sessionId = ''; // 'rsid' is already declared in the upper scope
        let isApprove = '';
        if (result.status === 11111) {
          sessionId = result.data.sessionId || '';
          isApprove = result.data.isApprove || 0;
        }
        loginStatus = sessionId !== '';
        identifyStatus = isApprove === 1;
        resolve({
          loginStatus,
          identifyStatus,
        });
      });
    } else {
      xlog.log('直接返回登录认证结果');
      resolve({
        loginStatus,
        identifyStatus,
      });
    }
  });
  const p2 = new Promise((resolve) => {
    const tempId = setTimeout(() => {
      resolve({
        loginStatus: false,
        identifyStatus: false,
      });
      if (tempId) {
        clearTimeout(tempId);
      }
    }, 1000);
  });
  return Promise.race([p1, p2]);
}

// 跳转到登陆页
export function jumpToLogin() {
  return new Promise((resolve) => {
    callNative(
      'jumpNative',
      {
        pageId: 110300,
        action: true,
        params: {},
      },
      (r) => {
        let res = r;
        if (typeof res === 'string') {
          res = JSON.parse(res);
        }
        xlog.log(`jumpToLogin回调${JSON.stringify(res)}`);
        resolve(res);
      },
    );
  });
}

// 跳认证页
export function jumpToIdentify() {
  return new Promise((resolve) => {
    callNative(
      'jumpNative',
      {
        pageId: 110000,
        action: true,
        params: {},
      },
      (r) => {
        let res = r;
        if (typeof res === 'string') {
          res = JSON.parse(res);
        }
        xlog.log(`jumpToIdentify回调${JSON.stringify(res)}`);
        resolve(res);
      },
    );
  });
}

async function jumpToNativeWithIdentify(jumpParams, d) {
  let data = d;
  if (data.identifyStatus) {
    // 目前已经认证，直接跳转至目的页
    return jumpNative(jumpParams);
  } else {
    // 没有认证先跳认证页
    const identifyRes = await jumpToIdentify();
    // android的状态码可靠，iOS的不可靠
    if (isAndroid) {
      if (identifyRes.status === 11111) {
        // 认证成功直接跳转
        return jumpNative(jumpParams);
      } else {
        return identifyRes;
      }
    } else {
      data = await isLogin(true);
      if (data.identifyStatus) {
        return jumpNative(jumpParams);
      } else {
        return identifyRes;
      }
    }
  }
}

/**
 * 跳转客户端页面，并带有登录认证逻辑
 * @param {Object} jumpParams 传给客户端的参数：
 * @param {Strinng} pageId 跳转客户端的pageId
 * @param {Boolean} action action=false或者不传进入native页面就执行回调，action=true，用户操作完返回h5/weex页面之后再执行回调
 * @param {Boolean} isClose 跳转时是否关闭当前页面
 * @param {Boolean} needLogin 是否需要登录
 * @param {Boolean} needIdentify 是否需要认证
 * @param {Object} params 跳转页面需要的参数，不关心，直接透传
 */
export async function jumpNativeWithStatus(jumpParams) {
  const { pageId, targetPageId } = jumpParams;
  if (!pageId && !targetPageId) {
    return new Error('pageId不能为空');
  }
  if (isNative || isInUmeApp) {
    if (jumpParams.needLogin || jumpParams.needIdentify) {
      let data = await isLogin();
      xlog.log(
        `jumpNativeWithStatus第一次返回的登录信息${JSON.stringify(data)}`,
      );
      if (jumpParams.needLogin) {
        if (data.loginStatus) {
          // 已经登录了
          if (jumpParams.needIdentify) {
            // 需要认证
            return jumpToNativeWithIdentify(jumpParams, data);
          } else {
            // 不需要认证直接跳目的页
            return jumpNative(jumpParams);
          }
        } else {
          // 没有登录先跳登录
          const loginRes = await jumpToLogin();
          // 本来可以通过回调里的status判断是否登录成功，但是iOS不管有没有登录成功都返回11111，Android登录成功了返回的是10002。。。
          // 没办法再调一下jsapi getUserInfo看一下到底登录了没
          data = await isLogin(true);
          xlog.log(
            `jumpNativeWithStatus第二次返回的登录信息${JSON.stringify(data)}`,
          );
          if (data.loginStatus) {
            // 登录成功
            if (jumpParams.needIdentify) {
              // 需要认证
              return jumpToNativeWithIdentify(jumpParams, data);
            } else {
              // 不需要认证直接跳目的页
              return jumpNative(jumpParams);
            }
          } else {
            return loginRes;
          }
        }
      } else if (jumpParams.needIdentify) {
        return jumpToNativeWithIdentify(jumpParams, data);
      }
    } else {
      return jumpNative(jumpParams);
    }
  } else if (isInWeixin) {
    // 微信暂时不需要
    return '';
  } else {
    return '';
  }
}
/**
 *
 * @param {object} params params
 * @param {string} params.pageId params
 * @param {boolean} params.closeWeex params
 * @param {*} b
 * @param {*} channelName
 * @returns
 */
export function popNative(params, b, channelName) {
  let timeoutId;
  let broadcastInstance = b;
  const p1 = new Promise((resolve, reject) => {
    if (isNative) {
      if (isAndroid) {
        // android可以发通知解决，需要所有的页面都注册在同一个频道上，当收到该频道的closeView_all通知时，关闭自己
        broadcastInstance = broadcastInstance || new Broadcast(channelName);
        navigator.pop();
        broadcastInstance.postMessage({
          type: 'closeView_all',
        });
      } else {
        // ios调客户端方法pop回去
        callNative('popNative', params || {}, (r) => {
          xlog.log('popNative:', JSON.stringify(params), r);
          let res = r;
          try {
            if (typeof res === 'string') {
              res = JSON.parse(res);
            }
            resolve(res.status);
          } catch (error) {
            reject(error);
          }
          if (timeoutId) clearTimeout(timeoutId);
        });
      }
    } else {
      navigator.pop();
      resolve('');
    }
  });
  const p2 = new Promise((resolve) => {
    timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      resolve('');
    }, 3000);
  });
  return Promise.race([p1, p2]);
}

/**
 * 呼起客户端支付
 * @param {Number} payType 1: 呼起客户端页面支付；2: 呼起客户端浮框收银台
 * @param {Object} params 支付需要的参数，前端透传中台返回结果, 有signature和bizContent
 */
export function commonPay(payType = 1, params = {}) {
  params.payType = payType;
  return new Promise((resolve, reject) => {
    callNative('commonPay', params, (r) => {
      let result = r;
      try {
        if (typeof result === 'string') {
          result = JSON.parse(result);
        }
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  });
}

/**
 * @param {componentName} componentParams 组件名
 * @param {Object} componentParams 组件需要的参数
 */
export function callNativeComponent(componentName, componentParams = {}) {
  console.log('building callNativeComponent componentName:' + componentName + ' isWeex:' + isWeex + ' isInUmeApp:' + isInUmeApp);
  return new Promise((resolve, reject) => {
    if (isNative || isInUmeApp) {
      if (!componentName) {
        reject(new Error('传入的组件名不能为空'));
      }
      const params = {
        name: componentName,
        isShow: true,
        params: componentParams,
      };
      callNative('callNativeComponent', params, (r) => {
        console.log('building jsapi.js callNativeComponent componentName:' + componentName + ' 回调');
        let result = r;
        try {
          if (typeof result === 'string') {
            result = JSON.parse(result);
          }
          resolve(result.data);
        } catch (error) {
          reject(error);
        }
      });
    } else {
      resolve('');
    }
  });
}

/**
 * 向客户端发通知
 * @param {String} notificationName 通知的名称
 * @param {Object} notificationParams 通知的数据
 * @param {Boolean} useDelegate 使用全局通知(false)还是局部通知(true), 默认使用局部通知
 */
export function fireNotification(
  notificationName,
  notificationParams = {},
  useDelegate = true,
) {
  const jsapiName = useDelegate ? 'callNativeDelegate' : 'fireNotification';
  return new Promise((resolve, reject) => {
    if (isNative || isInUmeApp) {
      if (!notificationName) {
        reject(new Error('传入的通知名不能为空'));
      }
      const params = {
        name: notificationName,
        params: notificationParams,
      };
      callNative(jsapiName, params, (r) => {
        let result = r;
        try {
          if (typeof result === 'string') {
            result = JSON.parse(result);
          }
          resolve(result.data);
        } catch (error) {
          reject(error);
        }
      });
    } else {
      resolve('');
    }
  });
}

/**
 * js xlog日志上传
 * @param {String} level 日志级别
 * @param {String} func 当前报错的方法名，不要是中文，否则Logan上看的是乱码
 * @param {String} content 上传的具体信息，错误堆栈信息等
 */
function jsUploadXlog(level, func, c, type) {
  let content = c;
  if (typeof content === 'object' && !type) {
    // 如果传的是error对象，尝试转为字符串，类型不对担心客户端崩溃(如果使用方自定义type，则不操作)
    content = content.toString();
  }
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line
    let projectName = GLOBAL_VAR ? GLOBAL_VAR.projectName : 'weex';
    if (isNative || isInUmeApp) {
      const params = {
        level,
        mid: '21',
        func,
        submid: projectName || 'weex',
        content,
      };
      // xlog.log(`xlog日志上传${JSON.stringify(params)}`);
      callNative('jsUploadXlog', params, (r) => {
        let result = r;
        try {
          if (typeof result === 'string') {
            result = JSON.parse(result);
          }
          resolve(result.data);
        } catch (error) {
          reject(error);
        }
      });
    } else {
      resolve('');
    }
  });
}
const logger = (fnName, ...args) => {
  // eslint-disable-next-line no-console
  const fn = console[fnName];
  fn && fn(...args);
};

// 单次打印日志最大长度
const byteCount = 1000;
const splitStr = (str) => {
  if (!str) {
    return;
  }
  const { length } = str;
  let count = parseInt(length / byteCount, 10);
  if (length % byteCount) {
    count += 1;
  }
  for (let i = 0; i < count; i++) {
    const info = str.slice(i * byteCount, (i + 1) * byteCount);
    logger('info', info);
  }
};
export const xlog = {
  log(...args) {
    if (isWeb) {
      logger('log', ...args);
      return;
    }

    const logInfo = args.map((item) => {
      if (typeof item === 'object') {
        return JSON.stringify(item);
      } else if (isAndroid && typeof item !== 'string') {
        return item.toString();
      } else {
        return item;
      }
    });
    if (isAndroid) {
      logInfo.forEach((item) => {
        splitStr(item);
      });
    } else {
      logger('info', ...logInfo);
    }
  },

  debug(func, content) {
    return jsUploadXlog('D', func, content);
  },
  info(...args) {
    let content = '';
    let suffix = '';
    args.forEach((item, index) => {
      suffix = index === args.length - 1 ? '' : ', ';
      if (typeof item === 'object') {
        content += JSON.stringify(item) + suffix;
      } else {
        content += item + suffix;
      }
    });
    console.log(content);
    return jsUploadXlog('I', 'umeWeexLog', content, 'info');
  },
  warn(func, content) {
    return jsUploadXlog('W', func, content);
  },
  error(func, content) {
    return jsUploadXlog('E', func, content);
  },
  fatal(func, content) {
    return jsUploadXlog('F', func, content);
  },
};
/**
 * 表示页面浏览事件时，示例：http://172.16.101.17:8090/pages/viewpage.action?pageId=6652811
 * @param {String} ti 页面标题，必传
 * @param {Object} ps 含有以下key，非必传:
 * @param {String} lt 曝光持续时长
 * @param {String} st 属性名（与业务相关）
 */
export function uploadH5Log(ti, ps = {}) {
  const bundleUrl = weex.config.bundleUrl.split('?')[0];
  const pathList = bundleUrl.split('/') || [];
  const lastPathList = pathList.slice(-4);
  const pageName = lastPathList.join('/');
  const p = {
    ti,
    ul: pageName,
  };
  return new Promise((resolve, reject) => {
    callNative(
      'uploadH5Log',
      {
        t: Date.now(),
        p,
        ps,
        e: 6,
      },
      (r) => {
        let result = r;
        try {
          if (typeof result === 'string') {
            result = JSON.parse(result);
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      },
    );
  });
}

/**
 * 曝光事件: http://172.16.101.17:8090/pages/viewpage.action?pageId=6652811
 * @param {String} ti 页面标题，必传
 * @param {String} sv 曝光事件名称，必传
 * @param {String} g 卡片的分组id，非必传
 * @param {Object} ps 含有以下key，非必传:
 * @param {String} lt 曝光持续时长
 * @param {String} st 属性名（与业务相关）
 */
export function uploadH5LogShow(ti = '', sv = '', g = '', ps = {}) {
  const bundleUrl = weex.config.bundleUrl.split('?')[0];
  const pathList = bundleUrl.split('/') || [];
  const lastPathList = pathList.slice(-4);
  const pageName = lastPathList.join('/');
  const p = {
    ti,
    ul: pageName,
    sv,
    g,
  };
  return new Promise((resolve, reject) => {
    callNative(
      'uploadH5Log',
      {
        t: Date.now(),
        p,
        ps,
        e: 104,
      },
      (r) => {
        let result = r;
        try {
          if (typeof result === 'string') {
            result = JSON.parse(result);
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      },
    );
  });
}

/**
 * 页面点击事件， http://172.16.101.17:8090/pages/viewpage.action?pageId=6652811
 * @param {String} ti 页面标题，必传
 * @param {String} sv 点击事件名称，必传
 * @param {Object} ps 含有以下key:
 * @param {String} lt 曝光持续时长
 * @param {String} st 属性名（与业务相关）
 */
export function uploadH5LogBtn(ti, sv, ps = {}) {
  const bundleUrl = weex.config.bundleUrl.split('?')[0];
  const pathList = bundleUrl.split('/') || [];
  const lastPathList = pathList.slice(-4);
  const pageName = lastPathList.join('/');
  const p = {
    ti,
    ul: pageName,
    sv,
  };
  return new Promise((resolve, reject) => {
    callNative(
      'uploadH5Log',
      {
        t: Date.now(),
        p,
        e: 7,
        ps,
      },
      (r) => {
        let result = r;
        try {
          if (typeof result === 'string') {
            result = JSON.parse(result);
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      },
    );
  });
}

/**
 * 神策服务推荐卡片点击埋点
 * @param card 服务推荐卡片
 * @param ti 当前weex页面标题
 * @param type v0.0.53
 * @return {Promise<unknown>} Promise
 */
export function sensorsRecommendLog(card, ti = '', type) {
  // 神策服务推荐打点
  if (isNative) {
    // weex 神策打点
    // 卡片公共参数处理
    // const cardResult = card.jsonData || card.cardResult;
    const cardResult = parseJson(card.jsonData || card.cardResult);
    const trackName =
      cardResult && cardResult.trackName ? `${cardResult.trackName}_` : '';
    const trackParamStr =
      cardResult && cardResult.trackParam
        ? JSON.stringify(cardResult.trackParam)
        : '{}';
    if (!trackName && trackParamStr !== '{}') {
      return;
    }
    const trackParam = {
      group_id: card.groupId,
      service_id: card.serviceId,
      service_name: card.serviceName,
      ...cardResult.trackParam,
    };
    xlog.log('trackName:', trackName);
    xlog.log('trackParam:', trackParam);
    const name =
      type === 'expose'
        ? `${trackName}serviceExpose`
        : `${trackName}serviceClick`;
    return sensorsOtherLog(name, ti, trackParam);
  } else {
    try {
      xlog.log('webSensorsRecommendLog');
      return 'web服务推荐打点成功';
    } catch (err) {
      return err;
    }
  }
}
/**
 * 神策自定义埋点
 * @param trackName 事件名
 * @param ti 页面标题
 * @param trackParam 自定义属性，object
 * @return {Promise<unknown>} Promise
 */
export function sensorsOtherLog(trackName, ti = '', trackParam) {
  // 神策服务自定义打点
  return new Promise((resolve, reject) => {
    if (isNative) {
      // weex 神策打点
      // weex 页面路径
      const bundleUrl = weex.config.bundleUrl.split('?')[0];
      const pathList = bundleUrl.split('/') || [];
      const lastPathList = pathList.slice(-4);
      const pageName = lastPathList.join('/');
      // 卡片公共参数处理
      const trackParam2 = {
        url: pageName,
        title: ti,
        ...trackParam,
      };
      xlog.info(`事件名称：${trackName}`);
      xlog.info(trackParam2);
      callNative(
        'uploadSeverSensorsLog',
        { trackName, trackParam: trackParam2 },
        (r) => {
          let result = r;
          xlog.info('打点信息回调：');
          xlog.info(result);
          try {
            if (typeof result === 'string') {
              result = JSON.parse(result);
            }
            resolve(result.data);
          } catch (error) {
            reject(error);
          }
        },
      );
    } else {
      try {
        resolve('web自定义打点成功');
      } catch (err) {
        reject(err);
      }
    }
  });
}

export function startFaceDetect(params = {}) {
  return new Promise((resolve, reject) => {
    callNative('startFaceDetect', params, (r) => {
      let result = r;
      xlog.log('startFaceDetect回调：');
      xlog.log(result);
      try {
        if (typeof result === 'string') {
          result = JSON.parse(result);
        }
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  });
}
