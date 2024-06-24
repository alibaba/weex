/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
#ifndef WEEX_PROJECT_WXCOREENVIRONMENT_H
#define WEEX_PROJECT_WXCOREENVIRONMENT_H
#include "core/api/wx_api.h"
#include <string>
#include <map>

namespace WeexCore {

struct WXSafeAreaInsets {
    double top;
    double bottom;
    double left;
    double right;
};

  class WX_EXPORT WXCoreEnvironment {

  private:

    WXCoreEnvironment() {}

    ~WXCoreEnvironment() {}

    static WXCoreEnvironment *m_pInstance;

    //just to release singleton object
    class Garbo {
    public:
      ~Garbo() {
        if (WXCoreEnvironment::m_pInstance) {
          delete WXCoreEnvironment::m_pInstance;
        }
      }
    };

    static Garbo garbo;

    std::string mPlatformName;

    float mDeviceWidth;

    float mDeviceHeight;
      
    WXSafeAreaInsets mSafeAreaInsets;

    std::map<std::string, std::string> mOptions;

    bool mInteractionLogSwitch;

    bool mUseRuntimeApi;

  public:

    bool SetPlatform(std::string platformName);

    inline std::string platform() {
        return mPlatformName;
    }

    bool IsAndroid();

    bool IsIOS();

    bool SetDeviceWidth(const std::string &width);

    bool SetDeviceHeight(const std::string &height);
      
    bool SetSafeAreaInsets(WXSafeAreaInsets insets);

    inline void set_device_height(float height) {
        mDeviceHeight = height;
    }

    inline void set_device_width(float width) {
        mDeviceWidth = width;
    }

    inline bool isInteractionLogOpen(){
        return mInteractionLogSwitch;
    }

    const float DeviceWidth();

    const float DeviceHeight();
      
    const WXSafeAreaInsets SafeAreaInsets();

    const std::string GetOption(const std::string &key);

    const std::map<std::string, std::string> &options();

    bool isUseRunTimeApi();

    void setUseRunTimeApi(bool useRuntimeApi);

    void AddOption(std::string key, std::string value);
    void PutOption(std::string key, std::string value);

    static WXCoreEnvironment *getInstance() {
      if (!m_pInstance) {
        m_pInstance = new WXCoreEnvironment();
      }
      return m_pInstance;
    }
  };
}

#endif //WEEX_PROJECT_WXCOREENVIRONMENT_H
