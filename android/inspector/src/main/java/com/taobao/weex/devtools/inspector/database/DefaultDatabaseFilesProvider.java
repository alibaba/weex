/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.database;

import android.content.Context;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 * Provides the results of {@link Context#databaseList()}.
 */
public final class DefaultDatabaseFilesProvider implements DatabaseFilesProvider {

  private final Context mContext;

  public DefaultDatabaseFilesProvider(Context context) {
    mContext = context;
  }

  @Override
  public List<File> getDatabaseFiles() {
    List<File> databaseFiles = new ArrayList<File>();
    for (String filename : mContext.databaseList()) {
      databaseFiles.add(new File(filename));
    }
    return databaseFiles;
  }
}
