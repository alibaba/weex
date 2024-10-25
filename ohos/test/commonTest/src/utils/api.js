/* eslint-disable */

function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
      return callback(WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() {
      document.documentElement.removeChild(WVJBIframe)
    }, 0)
  }
  
  function callHandler(api_name, conf, callback) {
    var user_agent = navigator.userAgent.toLowerCase();
    var IS_ANDROID = -1 != user_agent.indexOf("android");
    var IS_IOS = -1 != user_agent.indexOf("iphone") || -1 != user_agent.indexOf("ipad");
    if (IS_ANDROID) {
      try {
        if (window.WebViewJavascriptBridge) {
          WebViewJavascriptBridge.callHandler(api_name, conf, function(result) {
            if (result && typeof result === 'string') {
              var result = JSON.parse(result)
            }
            if (callback) {
              callback(result)
            }
          })
        } else {
          document.addEventListener(
            'WebViewJavascriptBridgeReady',
            function() {
              WebViewJavascriptBridge.callHandler(api_name, conf, function(result) {
                if (result && typeof result === 'string') {
                  var result = JSON.parse(result)
                }
                if (callback) {
                  callback(result)
                }
              })
            },
            false
          );
        }
      } catch (error) {
        // alert('WebViewJavascriptBridgeReady初始化错误')
      }
      
    } else if (IS_IOS) {
       try {
        setupWebViewJavascriptBridge(function(bridge) {
          bridge.callHandler(api_name, conf, function(result) {
            if (result && typeof result === 'string') {
              var result = JSON.parse(result)
            }
            if (callback) {
              callback(result)
            }
          })
        })
       } catch (error) {
        // alert('WebViewJavascriptBridgeReady初始化错误')
      }
    } else {
      // alert("请在航旅纵横中打开链接")
    }
  }

  function registerHandler(api_name, callback) {
    var user_agent = navigator.userAgent.toLowerCase();
    var IS_ANDROID = -1 != user_agent.indexOf('android');
    var IS_IOS = -1 != user_agent.indexOf('iphone') || -1 != user_agent.indexOf('ipad');

    if (IS_ANDROID) {
      try {
        if (window.WebViewJavascriptBridge) {
          register(api_name, callback);
        } else {
          document.addEventListener('WebViewJavascriptBridgeReady', function () {
            register(api_name, callback);
          }, false);
        }
      } catch (error) {
        // alert('WebViewJavascriptBridgeReady初始化错误')
      }
    } else if (IS_IOS) {
      try {
        setupWebViewJavascriptBridge(function (bridge) {
          register(api_name, callback);
        })
      } catch (error) {
        // alert('WebViewJavascriptBridgeReady初始化错误')
      }
    } else {
      // alert('请在航旅纵横中打开链接')
    }

    function register(api_name, callback) {
      WebViewJavascriptBridge.registerHandler(api_name, function (result, responseCallback) {
        if (callback) {
          callback(result, responseCallback)
        }
      })
    }
  }

function validArgs (name, params) {
     if(params.length === 0) {
      alert("请检查参数，参数不能为空")
     } else if (params.length === 1) {
      if(typeof(params[0]) === 'function'){
        callHandler(name, {}, params[0])
      } else {
        alert("请检查参数是否正确")
      }
    } else {
      if(typeof(params[0]) === 'object' && typeof(params[1]) === 'function'){
        callHandler(name, params[0], params[1])
      } else {
        alert("请检查参数是否正确")
      }
    }
  }

  export function chooseContact() {
    validArgs("chooseContact", arguments)
  }
  
  export function getLocation() {
    validArgs("getLocation", arguments)
  }
  
  export function getNetworkType() {
    validArgs("getNetworkType", arguments)
  }
  
  export function getReqHeader() {
    validArgs("getReqHeader", arguments)
  }
  
  export function getUserInfo() {
    validArgs("getUserInfo", arguments)
  }
  
  export function clearCache() {
    validArgs("clearCache", arguments)
  }
  
  export function onRefresh() {
    validArgs("onRefresh", arguments)
  }
  
  export function onReturn() {
    validArgs("onReturn", arguments)
  }
  
  export function onClosed() {
    validArgs("onClosed", arguments)
  }
  
  export function getGuestCard() {
    validArgs("getGuestCard", arguments)
  }
  
  export function noSlider() {
    validArgs("noSlider", arguments)
  }
  
  export function getAirportList() {
    validArgs("getAirportList", arguments)
  }
  
  export function getAirlineList() {
    validArgs("getAirlineList", arguments)
  }
  
  export function getCertInfo() {
    validArgs("getCertInfo", arguments)
  }
  
  export function commonPay() {
    validArgs("commonPay", arguments)
  }
  
  export function getBluetooth() {
    validArgs("getBluetooth", arguments)
  }
  
  export function Accelerated() {
    validArgs("Accelerated", arguments)
  }
  
  export function getPhoto() {
    validArgs("getPhoto", arguments)
  }
  
  export function finishWebView() {
    validArgs("finishWebView", arguments)
  }
  var rcver = '', version = '', headerResult = {}
  export function callNative(apiName, config = {}, callback) {
    if (!rcver || !version) { // 如果没有取过版本号，先获取
      return callHandler('getReqHeader', {}, function (result) {
        if (result && typeof result === 'string') {
          try {
            result = JSON.parse(result);
          } catch (error) {
            alert(error);
            return;
          }
        }
        if (result.status === 11111) {
          headerResult = result;
          rcver = headerResult.data.rcver;
          version = Number(rcver.split('_')[2].split('.').slice(0, 2).join(''));
          if (apiName === 'getReqHeader') {
            callback(headerResult);
          } else {
            callNative(apiName, config, callback);
          }
        }
      });
    }
    if (apiName === 'getReqHeader') {
      return callback(headerResult);
    }
    const newConfig = {...config};
    newConfig.methodName = apiName;
    if (version > 510) {
      return callHandler('callNative', newConfig, callback); // 为配合客户端兼容weex
    }
    callHandler(apiName, config, callback);
  }
  
  export function registerService(api_name, callback) {
    registerHandler(api_name, callback)
  }
  
  export default {
    callNative
  }
  