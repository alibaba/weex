/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import hilog from '@ohos.hilog';

/**
 * The log for all features.
 */
class Log {
  private domain: number;
  private prefix: string;
  private format: string = "[%{public}s] %{public}s";

  constructor(prefix: string) {
    this.prefix = prefix;
    this.domain = 0xFF00;
  }

  debug(...args: Object[]): void {
    hilog.debug(this.domain, this.prefix, this.format, args);
  }

  info(...args: Object[]): void {
    hilog.info(this.domain, this.prefix, this.format, args);
  }

  warn(...args: Object[]): void {
    hilog.warn(this.domain, this.prefix, this.format, args);
  }

  error(...args: Object[]): void {
    hilog.error(this.domain, this.prefix, this.format, args);
  }
}

export default new Log('WebSceneAPI');
