export const weexModule = weex.requireModule('weexModule') || {};
export function getQuery(key, url = weex.config.bundleUrl) {
  const reg = new RegExp(`[?|&]${key}=([^&]+)`);
  const match = url.match(reg);
  return match && decodeURIComponent(match[1]);
}

export function createLink(page, params = {}) {
  const args = [];
  Object.keys(params).forEach((key) => {
    args.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  });

  if (weex.config.bundleUrl) {
    const splitedUrl = weex.config.bundleUrl.split('?');
    const hostUrl = splitedUrl[0];
    const wx_tpl = ''; // eslint-disable-line
    const tplPathList = (wx_tpl || hostUrl).split('/'); // eslint-disable-line
    tplPathList[tplPathList.length - 2] = page;

    if (wx_tpl) {
      // eslint-disable-line
      args.unshift(`_wx_tpl=${tplPathList.join('/')}`); // eslint-disable-line
      return `${hostUrl}?${args.join('&')}`;
    } else {
      return `${tplPathList.join('/')}?${args.join('&')}`;
    }
  }
}

// 判断用户是否登录、认证
let loginStatus;
let identifyStatus;
export function isLogin() {
  console.log('building isLogin');
  const p1 = new Promise((resolve) => {
    if (loginStatus === undefined || identifyStatus === undefined) {
      weexModule.callNative('getUserInfo', {}, (result) => {
        let newResult = {};
        if (typeof result === 'string') {
          newResult = JSON.parse(result);
        }
        let rsid = '';
        let isApprove = '';
        if (newResult.status === 11111) {
          rsid = newResult.data.sessionId || '';
          isApprove = newResult.data.isApprove || '0';
        }
        loginStatus = rsid !== '';
        identifyStatus = isApprove === '1';
        resolve({
          loginStatus,
          identifyStatus,
        });
      });
    } else {
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
export function jumpToLogin(callback) {
  console.log('building jumpToLogin');
  weexModule.callNative(
    'jumpNative',
    {
      pageId: 110300,
      action: true,
      params: {},
    },
    (res) => {
      let newRes = {};
      if (typeof res === 'string') {
        newRes = JSON.parse(res);
      }
      if (callback && typeof callback === 'function') {
        callback(newRes.status);
      }
    },
  );
}

// 跳认证页
export function jumpToIdentify(callback) {
  console.log('building jumpToIdentify');
  weexModule.callNative(
    'jumpNative',
    {
      pageId: 110000,
      action: true,
      params: {},
    },
    (res) => {
      let newRes = {};
      if (typeof res === 'string') {
        newRes = JSON.parse(res);
      }
      if (callback && typeof callback === 'function') {
        callback(newRes.status);
      }
    },
  );
}

export function jumpTo(pageId, params = {}) {
  console.log('building jumpTo');
  if (!pageId) {
    return;
  }
  let newParams = params;
  if (!params) {
    newParams = {}; // 客户端必须是个对象，如果传个空字符串跳不过去
  }
  weexModule.callNative(
    'jumpNative',
    {
      pageId,
      newParams,
    },
    () => {},
  );
}

const stream = weex.requireModule('stream');
const urlBase = 'https://www.umetrip.com/gateway/api/web/';
export function fetch(
  method,
  path,
  params = {},
  headers = {},
  vm,
  extraParams,
) {
  let reqParams = {};
  let url = urlBase + path;
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
      timeout: 30000,
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
      timeout: 30000,
      type: 'json',
      body: JSON.stringify(params),
    };
  }
  return new Promise((resolve) => {
    stream.fetch(reqParams, (ret) => {
      if (extraParams.showLoading) {
        vm.showLoading = false;
      }
      if (ret && ret.ok) {
        const { data } = ret;
        if (data && (data.errCode === 0 || data.errorCode === 0)) {
          resolve(data);
        } else if (extraParams.isResolveAll) {
          resolve(data);
        } else if (extraParams.showModal) {
          vm.showModal = true;
          vm.content =
            (data && (data.errMsg || data.errorMsg)) ||
            '数据获取失败，请稍后再试';
        }
      } else {
        vm.showToast = true;
        vm.content = '网络出错，请稍后再试';
      }
    });
  });
}
