function getAppInfo(userAgent) {
  const result = {};
  const appName = userAgent.match(/appName=([^&;]+)/);
  if (appName) {
    result.appName = appName[1];
  }

  const statusbarHeight = userAgent.match(/statusbarHeight=([^&;]+)/);
  if (statusbarHeight) {
    result.statusbarHeight = Number(statusbarHeight[1]);
  }

  const screenHeight = userAgent.match(/screenHeight=([^&;]+)/);
  if (screenHeight) {
    result.screenHeight = Number(screenHeight[1]);
  }

  const bottomHeight = userAgent.match(/bottomHeight=([^&;]+)/);
  if (bottomHeight) {
    result.bottomHeight = Number(bottomHeight[1]);
  }

  const version = userAgent.match(/(IOS_i|AND_a)\d+_\d+\.\d+\.\d+/);
  if (version && /UmeTrip/.test(userAgent)) {
    result.platform = `UmeTrip ${version[0]}`;
  }

  if (/200201Web/.test(userAgent)) {
    result.channel = '200201Web';
  }

  // 737-747版本注入的数据是weexWeb
  if (/weexWeb/.test(userAgent)) {
    result.channel = 'weexWeb';
  }

  return result;
}

// 从客户端获取数据，兼容老版本 753版本之后都从window对象上获取
// eslint-disable-next-line max-len
// {"appName": "com.umetrip.android.msky.app", "screenHeight": 873, "statusbarHeight": 38, "bottomHeight": 47, "platform": "UmeTrip AND_a01_07.53.0411"}
export const getInfoFromNative = (isWeb) => {
  if (isWeb) {
    let result = null;
    const { __umejs_environment: umeInfo } = window || {};
    // 753之后的版本
    if (umeInfo) {
      result = umeInfo;
    } else {
      const ua = window.navigator.userAgent;
      // 753之前的版本
      result = getAppInfo(ua);
    }
    return result;
  }
};