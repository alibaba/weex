/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.protocol.module;

import android.annotation.TargetApi;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteException;
import android.os.Build;

import com.taobao.weex.devtools.common.Util;
import com.taobao.weex.devtools.inspector.helper.ChromePeerManager;
import com.taobao.weex.devtools.inspector.helper.PeerRegistrationListener;
import com.taobao.weex.devtools.inspector.jsonrpc.JsonRpcException;
import com.taobao.weex.devtools.inspector.jsonrpc.JsonRpcPeer;
import com.taobao.weex.devtools.inspector.jsonrpc.JsonRpcResult;
import com.taobao.weex.devtools.inspector.jsonrpc.protocol.JsonRpcError;
import com.taobao.weex.devtools.inspector.protocol.ChromeDevtoolsDomain;
import com.taobao.weex.devtools.inspector.protocol.ChromeDevtoolsMethod;
import com.taobao.weex.devtools.json.ObjectMapper;
import com.taobao.weex.devtools.json.annotation.JsonProperty;

import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@TargetApi(Build.VERSION_CODES.HONEYCOMB)
public class Database implements ChromeDevtoolsDomain {
  /**
   * The protocol doesn't offer an efficient means of pagination or anything like that so
   * we'll just cap the result list to some arbitrarily large number that I think folks will
   * actually need in practice.
   * <p>
   * Note that when this limit is exceeded, a dummy row will be introduced that indicates
   * truncation occurred.
   */
  private static final int MAX_EXECUTE_RESULTS = 250;

  /**
   * Maximum length of a BLOB field before we stop trying to interpret it and just
   * return {@link #UNKNOWN_BLOB_LABEL}
   */
  private static final int MAX_BLOB_LENGTH = 512;

  /**
   * Label to use when a BLOB column cannot be converted to a string.
   */
  private static final String UNKNOWN_BLOB_LABEL = "{blob}";

  private List<DatabaseDriver> mDatabaseDrivers;
  private final ChromePeerManager mChromePeerManager;
  private final DatabasePeerRegistrationListener mPeerListener;
  private final ObjectMapper mObjectMapper;

  /**
   * Constructs the object.
   */
  public Database() {
    mDatabaseDrivers = new ArrayList<>();
    mChromePeerManager = new ChromePeerManager();
    mPeerListener = new DatabasePeerRegistrationListener(mDatabaseDrivers);
    mChromePeerManager.setListener(mPeerListener);
    mObjectMapper = new ObjectMapper();
  }

  public void add(DatabaseDriver databaseDriver) {
    mDatabaseDrivers.add(databaseDriver);
  }

  @ChromeDevtoolsMethod
  public void enable(JsonRpcPeer peer, JSONObject params) {
    mChromePeerManager.addPeer(peer);
  }

  @ChromeDevtoolsMethod
  public void disable(JsonRpcPeer peer, JSONObject params) {
    mChromePeerManager.removePeer(peer);
  }

  @ChromeDevtoolsMethod
  public JsonRpcResult getDatabaseTableNames(JsonRpcPeer peer, JSONObject params)
      throws JsonRpcException {
    GetDatabaseTableNamesRequest request = mObjectMapper.convertValue(params,
        GetDatabaseTableNamesRequest.class);

    String databaseId = request.databaseId;
    DatabaseDriver databaseDriver = getDatabasePeer(databaseId);

    try {
      GetDatabaseTableNamesResponse response = new GetDatabaseTableNamesResponse();
      response.tableNames = databaseDriver.getTableNames(request.databaseId);
      return response;
    } catch (SQLiteException e) {
      throw new JsonRpcException(
          new JsonRpcError(
              JsonRpcError.ErrorCode.INVALID_REQUEST,
              e.toString(),
              null /* data */));
    }
  }

  @ChromeDevtoolsMethod
  public JsonRpcResult executeSQL(JsonRpcPeer peer, JSONObject params) {
    ExecuteSQLRequest request = mObjectMapper.convertValue(params,
        ExecuteSQLRequest.class);

    String databaseId = request.databaseId;
    String query = request.query;

    DatabaseDriver databaseDriver = getDatabasePeer(databaseId);

    try {
      return databaseDriver.executeSQL(request.databaseId, request.query,
          new DatabaseDriver.ExecuteResultHandler<ExecuteSQLResponse>() {
        @Override
        public ExecuteSQLResponse handleRawQuery() throws SQLiteException {
          ExecuteSQLResponse response = new ExecuteSQLResponse();
          // This is done because the inspector UI likes to delete rows if you give them no
          // name/value list
          response.columnNames = Collections.singletonList("success");
          response.values = Collections.singletonList("true");
          return response;
        }

        @Override
        public ExecuteSQLResponse handleSelect(Cursor result) throws SQLiteException {
          ExecuteSQLResponse response = new ExecuteSQLResponse();
          response.columnNames = Arrays.asList(result.getColumnNames());
          response.values = flattenRows(result, MAX_EXECUTE_RESULTS);
          return response;
        }

        @Override
        public ExecuteSQLResponse handleInsert(long insertedId) throws SQLiteException {
          ExecuteSQLResponse response = new ExecuteSQLResponse();
          response.columnNames = Collections.singletonList("ID of last inserted row");
          response.values = Collections.singletonList(String.valueOf(insertedId));
          return response;
        }

        @Override
        public ExecuteSQLResponse handleUpdateDelete(int count) throws SQLiteException {
          ExecuteSQLResponse response = new ExecuteSQLResponse();
          response.columnNames = Collections.singletonList("Modified rows");
          response.values = Collections.singletonList(String.valueOf(count));
          return response;
        }
      });
    } catch (SQLiteException e) {
      Error error = new Error();
      error.code = 0;
      error.message = e.getMessage();
      ExecuteSQLResponse response = new ExecuteSQLResponse();
      response.sqlError = error;
      return response;
    }
  }

  private DatabaseDriver getDatabasePeer(String databaseId) {
    for (DatabaseDriver databaseDriver : mDatabaseDrivers) {
      List<String> databaseNames = databaseDriver.getDatabaseNames();
      if (databaseNames != null && databaseNames.contains(databaseId))
          return databaseDriver;
      }
    return null;
  }

  /**
   * Flatten all columns and all rows of a cursor to a single array.  The array cannot be
   * interpreted meaningfully without the number of columns.
   *
   * @param cursor
   * @param limit Maximum number of rows to process.
   * @return List of Java primitives matching the value type of each column, converted to
   *      strings.
   */
  private static ArrayList<String> flattenRows(Cursor cursor, int limit) {
    Util.throwIfNot(limit >= 0);
    ArrayList<String> flatList = new ArrayList<>();
    final int numColumns = cursor.getColumnCount();
    for (int row = 0; row < limit && cursor.moveToNext(); row++) {
      for (int column = 0; column < numColumns; column++) {
        switch (cursor.getType(column)) {
          case Cursor.FIELD_TYPE_NULL:
            flatList.add(null);
            break;
          case Cursor.FIELD_TYPE_INTEGER:
            flatList.add(String.valueOf(cursor.getLong(column)));
            break;
          case Cursor.FIELD_TYPE_FLOAT:
            flatList.add(String.valueOf(cursor.getDouble(column)));
            break;
          case Cursor.FIELD_TYPE_BLOB:
            flatList.add(blobToString(cursor.getBlob(column)));
            break;
          case Cursor.FIELD_TYPE_STRING:
          default:
            flatList.add(cursor.getString(column));
            break;
        }
      }
    }
    if (!cursor.isAfterLast()) {
      for (int column = 0; column < numColumns; column++) {
        flatList.add("{truncated}");
      }
    }
    return flatList;
  }

  private static String blobToString(byte[] blob) {
    if (blob.length <= MAX_BLOB_LENGTH) {
      if (fastIsAscii(blob)) {
        try {
          return new String(blob, "US-ASCII");
        } catch (UnsupportedEncodingException e) {
          // Fall through...
        }
      }
    }
    return UNKNOWN_BLOB_LABEL;
  }

  private static boolean fastIsAscii(byte[] blob) {
    for (byte b : blob) {
      if ((b & ~0x7f) != 0) {
        return false;
      }
    }
    return true;
  }

  private static class DatabasePeerRegistrationListener implements PeerRegistrationListener {
    private final List<DatabaseDriver> mDatabaseDrivers;

    private DatabasePeerRegistrationListener(List<DatabaseDriver> databaseDrivers) {
      mDatabaseDrivers = databaseDrivers;
    }

    @Override
    public void onPeerRegistered(JsonRpcPeer peer) {
      for (DatabaseDriver databaseDriver : mDatabaseDrivers) {
        databaseDriver.onRegistered(peer);
      }
    }

    @Override
    public void onPeerUnregistered(JsonRpcPeer peer) {
      for (DatabaseDriver databaseDriver : mDatabaseDrivers) {
        databaseDriver.onUnregistered(peer);
      }
    }
  }

  private static class GetDatabaseTableNamesRequest {
    @JsonProperty(required = true)
    public String databaseId;
  }

  private static class GetDatabaseTableNamesResponse implements JsonRpcResult {
    @JsonProperty(required = true)
    public List<String> tableNames;
  }

  public static class ExecuteSQLRequest {
    @JsonProperty(required = true)
    public String databaseId;

    @JsonProperty(required = true)
    public String query;
  }

  public static class ExecuteSQLResponse implements JsonRpcResult {
    @JsonProperty
    public List<String> columnNames;

    @JsonProperty
    public List<String> values;

    @JsonProperty
    public Error sqlError;
  }

  public static class AddDatabaseEvent {
    @JsonProperty(required = true)
    public DatabaseObject database;
  }

  public static class DatabaseObject {
    @JsonProperty(required = true)
    public String id;

    @JsonProperty(required = true)
    public String domain;

    @JsonProperty(required = true)
    public String name;

    @JsonProperty(required = true)
    public String version;
  }

  public static class Error {
    @JsonProperty(required = true)
    public String message;

    @JsonProperty(required = true)
    public int code;
  }

  public static abstract class DatabaseDriver {

    protected Context mContext;

    public DatabaseDriver(Context context) {
      mContext = context;
    }

    private final void onRegistered(JsonRpcPeer peer) {
      List<String> databaseNames = getDatabaseNames();
      for (String database : databaseNames) {
        Database.DatabaseObject databaseParams = new Database.DatabaseObject();
        databaseParams.id = database;
        databaseParams.name = database;
        databaseParams.domain = mContext.getPackageName();
        databaseParams.version = "N/A";
        Database.AddDatabaseEvent eventParams = new Database.AddDatabaseEvent();
        eventParams.database = databaseParams;
        peer.invokeMethod("Database.addDatabase", eventParams, null /* callback */);
      }
    }

    private final void onUnregistered(JsonRpcPeer peer) {
    }

    public abstract List<String> getDatabaseNames();

    public abstract List<String> getTableNames(String databaseId);

    public abstract ExecuteSQLResponse executeSQL(String databaseName, String query, ExecuteResultHandler<ExecuteSQLResponse> handler)
        throws SQLiteException;

    public interface ExecuteResultHandler<T> {
      T handleRawQuery() throws SQLiteException;

      T handleSelect(Cursor result) throws SQLiteException;

      T handleInsert(long insertedId) throws SQLiteException;

      T handleUpdateDelete(int count) throws SQLiteException;
    }
  }
}
