/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.database;

import android.net.Uri;

public class ContentProviderSchema {

  private final String mTableName;
  private final Uri mUri;
  private final String[] mProjection;

  private ContentProviderSchema(Builder builder) {
    mTableName = builder.mTable.mTableName;
    mUri = builder.mTable.mUri;
    mProjection = builder.mTable.mProjection;
  }

  public String getTableName() {
    return mTableName;
  }

  public Uri getUri() {
    return mUri;
  }

  public String[] getProjection() {
    return mProjection;
  }

  public static class Builder {

    private Table mTable;

    public Builder table(Table table) {
      mTable = table;
      return this;
    }

    public ContentProviderSchema build() {
      return new ContentProviderSchema(this);
    }

  }

  public static class Table {

    private Uri mUri;
    private String[] mProjection;
    private String mTableName;

    private Table(Builder builder) {
      mUri = builder.mUri;
      mProjection = builder.mProjection;
      mTableName = builder.mTableName;
      if (mTableName == null) {
        mTableName = mUri.getLastPathSegment();
      }
    }

    public static class Builder {

      private Uri mUri;
      private String[] mProjection;
      private String mTableName;

      public Builder uri(Uri contentUri) {
        mUri = contentUri;
        return this;
      }

      // optional
      public Builder projection(String[] columns) {
        mProjection = columns;
        return this;
      }

      // optional, if not set, last segment of URI will be used as table name
      public Builder name(String tableName) {
        mTableName = tableName;
        return this;
      }

      public Table build() {
        return new Table(this);
      }

    }

  }

}
