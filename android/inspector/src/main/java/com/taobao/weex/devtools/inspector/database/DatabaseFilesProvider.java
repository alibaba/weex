/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.database;

import java.io.File;
import java.util.List;

/**
 * Provides a {@link List} of database files.
 */
public interface DatabaseFilesProvider {

  /**
   * Returns a {@link List} of database files.
   */
  List<File> getDatabaseFiles();

}
