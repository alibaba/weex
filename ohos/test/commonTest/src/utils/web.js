// import { isWeex } from './index';
// import { xlog, getHeader } from './jsapi';
import { isWeex, xlog, getHeader } from '@/utils/jsapi.js';

const stream = weex.requireModule('stream');
// eslint-disable-next-line
const globalVar = GLOBAL_VAR || {};
const apiEnv = globalVar.apiEnv || 'prod';
let urlBase = {
  // development: 'http://dev.umetrip.com/gateway/api/web/',
  development: 'https://gray.umetrip.com/gateway/api/web/',
  // development: 'https://www.umetrip.com/gateway/api/web/'
  production: {
    dev: 'http://dev.umetrip.com/gateway/api/web/',
    gray: 'https://gray.umetrip.com/gateway/api/web/',
    prod: 'https://www.umetrip.com/gateway/api/web/',
  },
};
urlBase =
  process.env.NODE_ENV === 'production'
    ? urlBase.production[apiEnv]
    : urlBase.development;

console.log(`globalVar: ${JSON.stringify(globalVar)}`);
console.log(`process.env.NODE_ENV：${process.env.NODE_ENV}`);
console.log(`web里的urlBase：${urlBase}`);

// let rsid = ''; // 39470051$$3ac3c75ef84b4e2089bc61152f939801
// let rcuuid = ''; // xa95d38568aee4bdabb43fdb1be4c3e08

// export function getHeader() {
//   const p1 = new Promise((resolve) => {
//     if (rsid && rcuuid) {
//       resolve({
//         rsid,
//         rcuuid,
//       });
//     } else {
//       try {
//         callNative('getUserInfo', {}, (result) => {
//           // 经测试，这个异步api一般在100ms以内
//           if (typeof result === 'string') {
//             result = JSON.parse(result);
//           }
//           if (result.status === 11111) {
//             rsid = result.data.sessionId;
//             rcuuid = result.data.rcuuid;
//           }
//           resolve({
//             rsid,
//             rcuuid,
//           });
//         });
//       } catch (error) {
//         // console.log(error);
//         resolve({
//           rsid: '',
//           rcuuid: '',
//         });
//       }
//     }
//   });
//   const p2 = new Promise((resolve) => {
//     const tempId = setTimeout(() => {
//       resolve({
//         rsid,
//         rcuuid,
//       });
//       if (tempId) {
//         clearTimeout(tempId);
//       }
//     }, 2000);
//   });
//   return Promise.race([p1, p2]);
// }

export async function fetchHeader(
  method,
  path,
  params = {},
  headers = {},
  vm,
  {
    showLoading = true,
    showModal = true,
    isResolveAll = false,
    useUrlBase = true,
  } = {},
) {
  if (showLoading) {
    vm.showLoading = true;
  }
  // let data = await getHeader()
  let data;
  if (isWeex) {
    // weex客户端会在header里塞rsid等信息
    data = {};
  } else {
    data = await getHeader();
  }
  return fetch(
    method,
    path,
    params,
    {
      rsid: (data && data.rsid) || '',
      rcuuid: (data && data.rcuuid) || '',
      ...headers,
    },
    vm,
    {
      showLoading,
      showModal,
      isResolveAll,
      useUrlBase,
    },
  );
}

export function fetch(
  method,
  path,
  params = {},
  headers = {},
  vm,
  extraParams = {},
) {
  let reqParams = {};
  let url = urlBase + path;
  const timeout = 30000;
  if (!extraParams.useUrlBase) {
    url = path;
  }
  if (/get/i.test(method)) {
    const args = [];
    Object.keys(params).forEach((key) => {
      args.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
      );
    });
    if (url.indexOf('?') !== -1) {
      url = `${url}&${args.join('&')}`;
    } else {
      url = `${url}?${args.join('&')}`;
    }
    reqParams = {
      method: 'GET',
      url,
      headers,
      timeout,
      type: 'json',
    };
  } else if (/post/i.test(method)) {
    reqParams = {
      method: 'POST',
      url,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      timeout,
      type: 'json',
      body: JSON.stringify(params),
    };
  }
  const startTime = new Date().getTime();
  return new Promise((resolve) => {
    stream.fetch(reqParams, (ret) => {
      if (extraParams.showLoading) {
        vm.showLoading = false;
      }
      if (ret && ret.ok) {
        const { data } = ret;
        if (data) {
          if (data.errCode === 0 || data.errorCode === 0) {
            resolve(data);
          } else if (extraParams.isResolveAll) {
            resolve(data);
          } else {
            if (extraParams.showModal) {
              vm.showModal = true;
              vm.content =
                (data && (data.errMsg || data.errorMsg)) ||
                '服务异常，请稍后再试试吧';
            }
            xlog.error(
              'fetch',
              `请求：${JSON.stringify(reqParams)} ---- 响应：${JSON.stringify(
                data,
              )}`,
            );
          }
        } else {
          // 200，内容null：服务异常，请稍后再试试吧
          vm.showToast = true;
          vm.content = '服务异常，请稍后再试试吧';
          xlog.error(
            'fetch',
            `请求：${JSON.stringify(
              reqParams,
            )} ---- 响应：服务异常，请稍后再试试吧`,
          );
        }
      } else {
        // 200之外/无网络/超时
        const duration = new Date().getTime() - startTime;
        if (duration > timeout) {
          // 超时
          vm.content = '网络超时，请稍后再试试吧';
          xlog.error(
            'fetch',
            `请求：${JSON.stringify(
              reqParams,
            )} ---- 响应：网络超时，请稍后再试试吧`,
          );
        } else {
          // 200之外/无网络
          vm.content = '服务不可用，请稍后再试试吧';
          xlog.error(
            'fetch',
            `请求：${JSON.stringify(
              reqParams,
            )} ---- 响应：服务不可用，请稍后再试试吧`,
          );
        }
        vm.showToast = true;
      }
    });
  });
}

// // h5上传图片
// export async function h5Upload(base64Image, source, moduleName, vm) {
//   const blobData = waitUpload(base64Image);
//   const formData = new FormData();
//   formData.append('file', blobData);
//   // let url = 'http://10.237.78.78:8180/UmeImageMagic/api/fileSystem/uploadFile'
//   const url =
//     'https://img.umetrip.com/jboss/UmeImageMagic/api/fileSystem/uploadFile';
//   return new Promise((resolve, reject) => {
//     window
//       .fetch(url, {
//         method: 'POST',
//         headers: {
//           source,
//           module: moduleName,
//           rsid,
//           rcuuid,
//           fileInfo: 'getFileByFid',
//         },
//         body: formData,
//       })
//       .then((response) => {
//         if (response.status === 200) {
//           return response.json();
//         } else {
//           reject(response.statusText);
//         }
//       })
//       .then((data) => {
//         if (data.errCode === 0) {
//           resolve(data);
//         } else {
//           vm.showModal = true;
//           vm.content = data.errMsg || data.errorMsg; // errMsg兼容gateway错误
//         }
//       })
//       .catch(() => {
//         // console.log(error);
//         vm.showToast = true;
//         vm.content = '图片上传错误，请稍后再试！';
//       });
//   });
// }

// function waitUpload(base64Image) {
//   const imageBlob = window.atob(base64Image);
//   const buffer = new ArrayBuffer(imageBlob.length);
//   const ubuffer = new Uint8Array(buffer);
//   for (let i = 0; i < imageBlob.length; i++) {
//     ubuffer[i] = imageBlob.charCodeAt(i);
//   }
//   const Builder = window.WebKitBlobBuilder;
//   let blob;
//   if (Builder) {
//     const builder = new Builder();
//     builder.append(buffer);
//     blob = builder.getBlob('image/jpeg');
//   } else {
//     blob = new window.Blob([buffer], { type: 'image/jpeg' });
//   }
//   return blob;
// }
