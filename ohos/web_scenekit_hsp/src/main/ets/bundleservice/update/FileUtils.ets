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

import fs from '@ohos.file.fs';
import { Constants } from '../constants/Constants';

export class FileUtils {
  static fileExist(dir: string, fileRelatePath: string): boolean {
    let filePath = `${dir}/${fileRelatePath}`;
    return fs.accessSync(filePath);
  }

  static getFileOnResponseWeb(dir: string, fileRelatePath: string): WebResourceResponse {
    let filePath = `${dir}/${fileRelatePath}`;

    const file = fs.openSync(filePath, fs.OpenMode.READ_ONLY);
    const fd: number = file.fd;

    const responseWeb = new WebResourceResponse();
    const headers: Array<Header> = [
      {
        headerKey: Constants.HEADER_KEY_CONNECTION,
        headerValue: Constants.HEADER_VALUE_KEEP_ALIVE
      },
      {
        headerKey: Constants.HEADER_KEY_CACHE_CONTROL,
        headerValue: Constants.HEADER_VALUE_NO_CACHE
      }
    ];
    let mimeType: string;
    if (filePath.endsWith(Constants.SUFFIX_JS)) {
      mimeType = Constants.MIME_TYPE_APPLICATION_JAVASCRIPT;
    }
    else if (filePath.endsWith(Constants.SUFFIX_CSS)) {
      mimeType = Constants.MIME_TYPE_TEXT_CSS;
    }
    else if (filePath.endsWith(Constants.SUFFIX_HTML) || filePath.endsWith(Constants.SUFFIX_HML)) {
      mimeType = Constants.MIME_TYPE_TEXT_HTML;
    }
    else if (filePath.endsWith(Constants.SUFFIX_JPG) || filePath.endsWith(Constants.SUFFIX_JPEG)) {
      mimeType = Constants.MIME_TYPE_IMAGE_JPEG;
    }
    else if (filePath.endsWith(Constants.SUFFIX_PNG)) {
      mimeType = Constants.MIME_TYPE_IMAGE_PNG;
    }
    else if (filePath.endsWith(Constants.SUFFIX_TXT)) {
      mimeType = Constants.MIME_TYPE_TEXT_PLAIN;
    }
    else {
      mimeType = Constants.MIME_TYPE_APPLICATION_OCTET_STREAM;
    }
    responseWeb.setResponseHeader(headers);
    responseWeb.setResponseData(fd);
    responseWeb.setResponseEncoding(Constants.ENCODING_UTF_8);
    responseWeb.setResponseMimeType(mimeType);
    responseWeb.setResponseIsReady(true);
    responseWeb.setResponseCode(Constants.RESPONSE_CODE);
    responseWeb.setReasonMessage(Constants.REASON_MESSAGE_OK);

    return responseWeb;
  }
}