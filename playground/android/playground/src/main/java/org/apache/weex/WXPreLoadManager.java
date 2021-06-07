/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package org.apache.weex;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import android.util.Log;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.common.WXRenderStrategy;
import com.taobao.weex.utils.WXLogUtils;

/**
 * @author zhongcang
 * @date 2019/5/13
 */
public class WXPreLoadManager {

    private Map<String, WXSDKInstance> mPreInitInstanceMap;

    private static class SingleTonHolder {
        private static final WXPreLoadManager INSTANCE = new WXPreLoadManager();
    }

    private WXPreLoadManager() {
        mPreInitInstanceMap = new ConcurrentHashMap<>();
    }

    public static WXPreLoadManager getInstance() {
        return SingleTonHolder.INSTANCE;
    }

    public WXSDKInstance offerPreInitInstance(String pageName) {
        WXSDKInstance instance = mPreInitInstanceMap.remove(pageName);
        return instance;
    }

    public void preLoad(String url) {

        boolean preDownLoad = url.contains("preDownLoad=true");
        boolean preInit = url.contains("preInitInstance=rax") || url.contains("preInitInstance=vue");
        if (!preDownLoad && !preInit){
            return;
        }


        WXSDKInstance instance = new WXSDKInstance();
        Map<String, Object> options = new HashMap<>();
        options.put("bundleUrl", url);
        options.put("render_strategy", WXRenderStrategy.APPEND_ASYNC.toString());
        options.put("wxPreInit",preInit);
        options.put("wxPreDownLoad",preDownLoad);
        String script = null;
        if (preInit){
            if (url.contains("preInitInstance=rax")) {
                script = "// { \"framework\": \"Rax\" }\n";
            } else if (url.contains("preInitInstance=vue")) {
                script = "// { \"framework\": \"Vue\" }\n";
            } else {
                WXLogUtils.e("WXPreLoadManager", "unsupport init bundle type :" + url);
            }
            if (null != script) {
                mPreInitInstanceMap.put(url, instance);
                Log.d("test->", "start preInit: ");
                instance.preInit(url, script, options, null, WXRenderStrategy.APPEND_ASYNC);
            }
        }
        if (preDownLoad){
            if (!mPreInitInstanceMap.containsKey(url)) {
                mPreInitInstanceMap.put(url, instance);
            }
            Log.d("test->", "start preDownLoad: ");
            instance.preDownLoad(url, options, null, WXRenderStrategy.APPEND_ASYNC);
        }
    }
}
