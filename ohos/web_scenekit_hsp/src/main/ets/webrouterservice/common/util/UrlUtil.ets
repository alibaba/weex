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

import { Constant } from '../constant/Constant';

const fakeDomain: string = Constant.FAKE_DOMAIN;

export class UrlUtil {
  public static addFakeDomain(url: string): string {
    if (!url.startsWith(fakeDomain) && !url.startsWith(Constant.PREFIX_HTTPS) && !url.startsWith(Constant.PREFIX_HTTP)) {
      url = fakeDomain + url;
    }
    return url;
  }

  public static isSameTemplate(lastUrl: string, url: string): boolean {
    let urlTemplate: string = UrlUtil.getUrlTemplate(url);
    let lastUrlTemplate: string = UrlUtil.getUrlTemplate(lastUrl);
    return urlTemplate === lastUrlTemplate;
  }

  public static getUrlTemplate(url: string): string {
    if (url.startsWith(fakeDomain)) {
      url = url.substring(fakeDomain.length);
    }
    if (url.indexOf(Constant.QUESTION_MARK) > 0) {
      url = url.substring(0, url.indexOf(Constant.QUESTION_MARK));
    }
    return url;
  }

  public static getUrlParams(routerUrl: string) {
    return routerUrl.substring(routerUrl.indexOf('?'));
  }
}