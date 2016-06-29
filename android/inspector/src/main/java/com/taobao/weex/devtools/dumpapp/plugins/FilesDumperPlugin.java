/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.dumpapp.plugins;

import android.content.Context;
import android.os.Environment;

import com.taobao.weex.devtools.common.Util;
import com.taobao.weex.devtools.dumpapp.ArgsHelper;
import com.taobao.weex.devtools.dumpapp.DumpException;
import com.taobao.weex.devtools.dumpapp.DumpUsageException;
import com.taobao.weex.devtools.dumpapp.DumperContext;
import com.taobao.weex.devtools.dumpapp.DumperPlugin;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public class FilesDumperPlugin implements DumperPlugin {
  private static final String NAME = "files";

  private final Context mContext;

  public FilesDumperPlugin(Context context) {
    mContext = context;
  }

  @Override
  public String getName() {
    return NAME;
  }

  @Override
  public void dump(DumperContext dumpContext) throws DumpException {
    Iterator<String> args = dumpContext.getArgsAsList().iterator();

    String command = ArgsHelper.nextOptionalArg(args, "");
    if ("ls".equals(command)) {
      doLs(dumpContext.getStdout());
    } else if ("tree".equals(command)) {
      doTree(dumpContext.getStdout());
    } else if ("download".equals(command)) {
      doDownload(dumpContext.getStdout(), args);
    } else {
      doUsage(dumpContext.getStdout());
      if (!"".equals(command)) {
        throw new DumpUsageException("Unknown command: " + command);
      }
    }
  }

  private void doLs(PrintStream writer) throws DumpUsageException {
    File baseDir = getBaseDir(mContext);
    if (baseDir.isDirectory()) {
      printDirectoryText(baseDir, "", writer);
    }
  }

  private void doTree(PrintStream writer) throws DumpUsageException {
    File baseDir = getBaseDir(mContext);
    printDirectoryVisual(baseDir, 0, writer);
  }

  private static File getBaseDir(Context context) {
    // getFilesDir() yields /data/data/<package>/files, we want the base package dir.
    return context.getFilesDir().getParentFile();
  }

  private static void printDirectoryText(File dir, String path, PrintStream writer) {
    File[] listFiles = dir.listFiles();
    for (int i = 0; i < listFiles.length; ++i) {
      File file = listFiles[i];
      if (file.isDirectory()) {
        printDirectoryText(file, path + file.getName() + "/", writer);
      } else {
        writer.println(path + file.getName());
      }
    }
  }

  private static void printDirectoryVisual(File dir, int depth, PrintStream writer) {
    File[] listFiles = dir.listFiles();
    for (int i = 0; i < listFiles.length; ++i) {
      printHeaderVisual(depth, writer);
      File file = listFiles[i];
      writer.print("+---");
      writer.print(file.getName());
      writer.println();

      if (file.isDirectory()) {
        printDirectoryVisual(file, depth + 1, writer);
      }
    }
  }

  private static void printHeaderVisual(int depth, PrintStream writer) {
    for (int i = 0; i < depth; ++i) {
      writer.print("|   ");
    }
  }

  private void doDownload(PrintStream writer, Iterator<String> remainingArgs)
      throws DumpUsageException {
    String outputPath = ArgsHelper.nextArg(remainingArgs, "Must specify output file or '-'");
    ArrayList<File> selectedFiles = new ArrayList<>();
    while (remainingArgs.hasNext()) {
      selectedFiles.add(resolvePossibleAppStoragePath(mContext, remainingArgs.next()));
    }

    try {
      OutputStream outputStream;
      if ("-".equals(outputPath)) {
        outputStream = writer;
      } else {
        outputStream = new FileOutputStream(resolvePossibleSdcardPath(outputPath));
      }
      ZipOutputStream output = new ZipOutputStream(new BufferedOutputStream(outputStream));
      boolean success = false;
      try {
        byte[] buf = new byte[2048];
        if (selectedFiles.size() > 0) {
          addFiles(output, buf, selectedFiles.toArray(new File[selectedFiles.size()]));
        } else {
          addFiles(output, buf, getBaseDir(mContext).listFiles());
        }
        success = true;
      } finally {
        try {
          output.close();
        } catch (IOException e) {
          Util.close(outputStream, !success);
          if (success) {
            throw e;
          }
        }
      }
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  private void addFiles(ZipOutputStream output, byte[] buf, File[] files) throws IOException {
    for (File file : files) {
      if (file.isDirectory()) {
        addFiles(output, buf, file.listFiles());
      } else {
        output.putNextEntry(
            new ZipEntry(
                relativizePath(
                    getBaseDir(mContext).getParentFile(),
                    file)));
        FileInputStream input = new FileInputStream(file);
        try {
          copy(input, output, buf);
        } finally {
          input.close();
        }
      }
    }
  }

  private static void copy(InputStream in, OutputStream out, byte[] buf) throws IOException {
    int n;
    while ((n = in.read(buf)) >= 0) {
      out.write(buf, 0, n);
    }
  }

  // Disclaimer: stupid implementation :)
  private static String relativizePath(File base, File path) {
    String baseStr = base.getAbsolutePath();
    String pathStr = path.getAbsolutePath();

    if (pathStr.startsWith(baseStr)) {
      return pathStr.substring(baseStr.length() + 1);
    } else {
      return pathStr;
    }
  }

  private static File resolvePossibleAppStoragePath(Context context, String path) {
    if (path.startsWith("/")) {
      return new File(path);
    } else {
      return new File(getBaseDir(context), path);
    }
  }

  private static File resolvePossibleSdcardPath(String path) {
    if (path.startsWith("/")) {
      return new File(path);
    } else {
      return new File(Environment.getExternalStorageDirectory(), path);
    }
  }

  private void doUsage(PrintStream writer) {
    final String cmdName = "dumpapp " + NAME;

    String usagePrefix = "Usage: " + cmdName + " ";
    String blankPrefix = "       " + cmdName + " ";
    writer.println(usagePrefix + "<command> [command-options]");
    writer.println(blankPrefix + "ls");
    writer.println(blankPrefix + "tree");
    writer.println(blankPrefix + "download <output.zip> [<path>...]");
    writer.println();
    writer.println(cmdName + " ls: List files similar to the ls command");
    writer.println();
    writer.println(cmdName + " tree: List files similar to the tree command");
    writer.println();
    writer.println(cmdName + " download: Fetch internal application storage");
    writer.println("    <output.zip>: Output location or '-' for stdout");
    writer.println("    <path>: Fetch only those paths named (directories fetch recursively)");
  }
}
