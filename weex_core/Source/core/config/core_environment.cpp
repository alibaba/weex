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
#include "core_environment.h"
#include <math.h>
#include <stdlib.h>

#include "base/core_constants.h"
#include "base/log_defines.h"
#include "base/log_defines.h"
#include "core/common/view_utils.h"

namespace WeexCore {

  WXCoreEnvironment *WXCoreEnvironment::m_pInstance = nullptr;

  bool WXCoreEnvironment::SetPlatform(std::string platformName) {
    if (platformName.empty())
      return false;
    this->mPlatformName = platformName;
    if (platformName == OS_Android || platformName == OS_iOS) {
      return true;
    } else {
      return false;
    }
  }

  bool WXCoreEnvironment::IsAndroid() {
    return mPlatformName == OS_Android;
  }

  bool WXCoreEnvironment::IsIOS() {
    return mPlatformName == OS_iOS;
  }

  bool WXCoreEnvironment::SetDeviceWidth(const std::string &width) {
    if (width.empty() || isnan(getFloat(width.c_str())))
      return false;
    mDeviceWidth = getFloat(width.c_str());
    return true;
  }

  bool WXCoreEnvironment::SetDeviceHeight(const std::string &height) {
    if (height.empty() || isnan(getFloat(height.c_str())))
      return false;
    mDeviceHeight = getFloat(height.c_str());
    return true;
  }

  bool WXCoreEnvironment::SetSafeAreaInsets(WXSafeAreaInsets insets) {
      mSafeAreaInsets = insets;
      return true;
  }

  const float WXCoreEnvironment::DeviceWidth() {
    return mDeviceWidth;
  }

  const float WXCoreEnvironment::DeviceHeight() {
    return mDeviceHeight;
  }

  const WXSafeAreaInsets WXCoreEnvironment::SafeAreaInsets() {
    return mSafeAreaInsets;
  }

  const std::string WXCoreEnvironment::GetOption(const std::string &key) {
    std::map<std::string, std::string>::iterator iter = mOptions.find(key);
    if (iter != mOptions.end()) {
      return iter->second;
    } else {
      return "";
    }
  }

  const std::map<std::string, std::string>& WXCoreEnvironment::options() {
      return mOptions;
  }

  void WXCoreEnvironment::AddOption(std::string key, std::string value) {
    mOptions.insert(std::pair<std::string, std::string>(key, value));
    if (key == "switchInteractionLog") {
      mInteractionLogSwitch = "true" == value;
    }
  }

  void WXCoreEnvironment::PutOption(std::string key, std::string value){
    auto it = mOptions.find(key);
    if(it == mOptions.end()){
      AddOption(key, value);
      return;
    }else{
      it->second = value;
    }
  }

  void WXCoreEnvironment::setUseRunTimeApi(bool useRuntimeApi) {
    this->mUseRuntimeApi = useRuntimeApi;
  }

  bool WXCoreEnvironment::isUseRunTimeApi(){
    return mUseRuntimeApi;
  }
}
