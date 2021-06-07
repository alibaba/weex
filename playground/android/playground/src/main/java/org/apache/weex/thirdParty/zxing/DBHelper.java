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
package org.apache.weex.thirdParty.zxing;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

/**
 * @author Sean Owen
 */
final class DBHelper extends SQLiteOpenHelper {

  private static final int DB_VERSION = 5;
  private static final String DB_NAME = "barcode_scanner_history.db";
  static final String TABLE_NAME = "history";
  static final String ID_COL = "id";
  static final String TEXT_COL = "text";
  static final String FORMAT_COL = "format";
  static final String DISPLAY_COL = "display";
  static final String TIMESTAMP_COL = "timestamp";
  static final String DETAILS_COL = "details";

  DBHelper(Context context) {
    super(context, DB_NAME, null, DB_VERSION);
  }

  @Override
  public void onCreate(SQLiteDatabase sqLiteDatabase) {
    sqLiteDatabase.execSQL(
            "CREATE TABLE " + TABLE_NAME + " (" +
            ID_COL + " INTEGER PRIMARY KEY, " +
            TEXT_COL + " TEXT, " +
            FORMAT_COL + " TEXT, " +
            DISPLAY_COL + " TEXT, " +
            TIMESTAMP_COL + " INTEGER, " +
            DETAILS_COL + " TEXT);");
  }

  @Override
  public void onUpgrade(SQLiteDatabase sqLiteDatabase, int oldVersion, int newVersion) {
    sqLiteDatabase.execSQL("DROP TABLE IF EXISTS " + TABLE_NAME);
    onCreate(sqLiteDatabase);
  }

}
