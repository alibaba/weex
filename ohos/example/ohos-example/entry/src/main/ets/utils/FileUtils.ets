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

import fs from '@ohos.file.fs'

export class FileUtils {
  static isSandboxPath(path: string) {
    return path && typeof (path) === 'string' && (path.startsWith('/data/storage/') || path.startsWith('internal://'))
  }

  static isFileUri(path: string) {
    return path && typeof (path) === 'string' && (path.startsWith('file://') || path.startsWith('datashare://'))
  }

  static getFdFromUriOrSandBoxPath(uri: string) {
    try {
      const file = fs.openSync(uri, fs.OpenMode.READ_ONLY)
      return file.fd
    } catch (error) {
      console.error(`getFdFromUriOrSandBoxPath openSync error:`, error)
    }
    throw new Error('file is not exist')
  }

  static getFileStatFromUri(path: string) {
    const tempFile = fs.openSync(path, fs.OpenMode.READ_ONLY);
    return fs.statSync(tempFile.fd);
  }

}