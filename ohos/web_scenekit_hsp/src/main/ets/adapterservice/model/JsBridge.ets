/*
 * Copyright (C) 2024. Huawei Device Co., Ltd. All rights reserved.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the Apache-2.0 license.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * Apache-2.0 license for more details.
 */

export class JsBridge {
  static getJsBridgeScript(webId: number): string {
    let result: string = `
        if(typeof(adapterInited) === 'undefined') {
            var webId = ${webId};

            var weexBroadcast = {
              name: "weex broadcast channel",
              onMessage: function(bc, callback) {
                if(callback === undefined){
                  console.error("callback is undefined.");
                  return;
                }
                if(bc.channelIdList === undefined) {
                  bc.channelIdList = new Array();
                }
                let channelId = new Date().getTime();
                bc.channelIdList.push(channelId);
                console.log('TestXXX :webId' + webId);
                WebAdapter.run('bcOnMessage', JSON.stringify({ 'channelName': bc.name, 'channelId': channelId }), callback, webId);
              },
              postMessage: function(channelName, message) {
                WebAdapter.run('bcPostMessage', JSON.stringify({'channelName': channelName, 'message': message}), undefined, webId);
              },
              close: function(bc) {
                console.warn(bc.name + " 进入关闭监听");
                WebAdapter.run('bcClose', JSON.stringify({'channelName': bc.name, 'channelIdList': bc.channelIdList}), undefined, webId);
                bc.channelIdList.length = 0;
              },
            }

            function BroadcastChannel(key) {
              this.name = key;
              console.log("channel 已创建: " + this.name);
              Object.defineProperties(this, {
                onmessage: {
                  set: function(callback) {
                    console.log('onmessage回调类型：' + typeof callback);
                    weexBroadcast.onMessage(this, callback);
                  }
                }
              });
              this.postMessage = function(message) {
                weexBroadcast.postMessage(this.name, message);
              };
              this.close = function() {
                weexBroadcast.close(this);
              }
            }

            native = new Proxy({}, {
                get(target,property){
                    console.log('property:' + property)
                    if (property === 'run') {
                        return (name, paramObj, callback, isAsync) => {
                            const argsStringify = JSON.stringify(paramObj);
                            console.log('isAsync:' + isAsync)
                            if (name === 'transferSameLayerArgs') {
                                WebAdapter.run(name, paramObj, callback, webId)
                            } else {
                                const argsStringify = JSON.stringify(paramObj);
                                if (isAsync) {
                                    WebAdapter.asyncRun(name, argsStringify, callback, webId)
                                } else {
                                    WebAdapter.run(name, argsStringify, callback, webId)
                                }
                            }
                        }
                    }
                }
            })

            function reloadUrl(param) {
              history.pushState({},"",param)
              console.log('reloadUrl reloadUrl reloadUrl reloadUrl reloadUrl  :  ' + param);
            }
        }
        `
    return result
  }
}