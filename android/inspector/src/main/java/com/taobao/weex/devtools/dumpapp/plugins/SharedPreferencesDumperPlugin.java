/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.dumpapp.plugins;

import android.annotation.TargetApi;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Build;
import android.text.TextUtils;

import com.taobao.weex.devtools.dumpapp.DumpUsageException;
import com.taobao.weex.devtools.dumpapp.DumperContext;
import com.taobao.weex.devtools.dumpapp.DumperPlugin;

import java.io.File;
import java.io.PrintStream;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class SharedPreferencesDumperPlugin implements DumperPlugin {

  private static final String XML_SUFFIX = ".xml";
  private static final String NAME = "prefs";
  private final Context mAppContext;

  public SharedPreferencesDumperPlugin(Context context) {
    mAppContext = context.getApplicationContext();
  }

  @Override
  public String getName() {
    return NAME;
  }

  @Override
  public void dump(DumperContext dumpContext) throws DumpUsageException {
    PrintStream writer = dumpContext.getStdout();
    List<String> args = dumpContext.getArgsAsList();

    String commandName = args.isEmpty() ? "" : args.remove(0);

    if (commandName.equals("print")) {
      doPrint(writer, args);
    } else if (commandName.equals("write")) {
      doWrite(args);
    } else {
      doUsage(writer);
    }
  }

  /**
   * Executes command to update one value in the shared preferences
   */
  private void doWrite(List<String> args) throws DumpUsageException {
    String usagePrefix = "Usage: prefs write <path> <key> <type> <value>, where type is one of: ";

    Iterator<String> argsIter = args.iterator();
    String path = nextArg(argsIter, "Expected <path>");
    String key = nextArg(argsIter, "Expected <key>");
    String typeName = nextArg(argsIter, "Expected <type>");

    Type type = Type.of(typeName);
    if (type == null) {
      throw new DumpUsageException(
          Type.appendNamesList(new StringBuilder(usagePrefix), ", ").toString());
    }

    SharedPreferences sharedPreferences = getSharedPreferences(path);
    SharedPreferences.Editor editor = sharedPreferences.edit();

    switch (type) {
      case BOOLEAN:
        editor.putBoolean(key, Boolean.valueOf(nextArgValue(argsIter)));
        break;
      case INT:
        editor.putInt(key, Integer.valueOf(nextArgValue(argsIter)));
        break;
      case LONG:
        editor.putLong(key, Long.valueOf(nextArgValue(argsIter)));
        break;
      case FLOAT:
        editor.putFloat(key, Float.valueOf(nextArgValue(argsIter)));
        break;
      case STRING:
        editor.putString(key, nextArgValue(argsIter));
        break;
      case SET:
        putStringSet(editor, key, argsIter);
        break;
    }

    editor.commit();
  }

  @Nonnull
  private static String nextArg(Iterator<String> iter, String messageIfNotPresent)
      throws DumpUsageException {
    if (!iter.hasNext()) {
      throw new DumpUsageException(messageIfNotPresent);
    }
    return iter.next();
  }

  @Nonnull
  private static String nextArgValue(Iterator<String> iter) throws DumpUsageException {
    return nextArg(iter, "Expected <value>");
  }

  @TargetApi(Build.VERSION_CODES.HONEYCOMB)
  private static void putStringSet(
      SharedPreferences.Editor editor,
      String key,
      Iterator<String> remainingArgs) {
    HashSet<String> set = new HashSet<String>();
    while (remainingArgs.hasNext()) {
      set.add(remainingArgs.next());
    }
    editor.putStringSet(key, set);
  }

  /**
   * Execute command to print all keys and values stored in the shared preferences which match
   * the optional given prefix
   */
  private void doPrint(PrintStream writer, List<String> args) {
    String rootPath = mAppContext.getApplicationInfo().dataDir + "/shared_prefs";
    String offsetPrefix = args.isEmpty() ? "" : args.get(0);
    String keyPrefix = (args.size() > 1) ? args.get(1) : "";

    printRecursive(writer, rootPath, "", offsetPrefix, keyPrefix);
  }

  private void printRecursive(
      PrintStream writer,
      String rootPath,
      String offsetPath,
      String pathPrefix,
      String keyPrefix) {
    File file = new File(rootPath, offsetPath);
    if (file.isFile()) {
      if (offsetPath.endsWith(XML_SUFFIX)) {
        int suffixLength = XML_SUFFIX.length();
        String prefsName = offsetPath.substring(0, offsetPath.length() - suffixLength);
        printFile(writer, prefsName, keyPrefix);
      }
    } else if (file.isDirectory()) {
      String[] children = file.list();
      if (children != null) {
        for (int i = 0; i < children.length; i++) {
          String childOffsetPath = TextUtils.isEmpty(offsetPath)
              ? children[i]
              : (offsetPath + File.separator + children[i]);
          if (childOffsetPath.startsWith(pathPrefix)) {
            printRecursive(writer, rootPath, childOffsetPath, pathPrefix, keyPrefix);
          }
        }
      }
    }
  }

  private void printFile(PrintStream writer, String prefsName, String keyPrefix) {
    writer.println(prefsName + ":");
    SharedPreferences preferences = getSharedPreferences(prefsName);
    for (Map.Entry<String, ?> entry : preferences.getAll().entrySet()) {
      if (entry.getKey().startsWith(keyPrefix)) {
        writer.println("  " + entry.getKey() + " = " + entry.getValue());
      }
    }
  }

  private void doUsage(PrintStream writer) {
    final String cmdName = "dumpapp " + NAME;

    String usagePrefix = "Usage: " + cmdName + " ";
    String blankPrefix = "       " + cmdName + " ";
    writer.println(usagePrefix + "<command> [command-options]");
    writer.println(usagePrefix + "print [pathPrefix [keyPrefix]]");
    writer.println(
        Type.appendNamesList(
            new StringBuilder(blankPrefix).append("write <path> <key> <"),
            "|")
            .append("> <value>"));
    writer.println();
    writer.println(cmdName + " print: Print all matching values from the shared preferences");
    writer.println();
    writer.println(cmdName + " write: Writes a value to the shared preferences");
  }

  private SharedPreferences getSharedPreferences(String name) {
    return mAppContext.getSharedPreferences(name, Context.MODE_MULTI_PROCESS);
  }

  private enum Type {
    BOOLEAN("boolean"),
    INT("int"),
    LONG("long"),
    FLOAT("float"),
    STRING("string"),
    SET("set");

    private final String name;

    private Type(String name) {
      this.name = name;
    }

    public static @Nullable Type of(String name) {
      for (Type type : values()) {
        if (type.name.equals(name)) {
          return type;
        }
      }
      return null;
    }

    public static StringBuilder appendNamesList(StringBuilder builder, String separator) {
      boolean isFirst = true;
      for (Type type : values()) {
        if (isFirst) {
          isFirst = false;
        } else {
          builder.append(separator);
        }
        builder.append(type.name);
      }
      return builder;
    }
  }
}
