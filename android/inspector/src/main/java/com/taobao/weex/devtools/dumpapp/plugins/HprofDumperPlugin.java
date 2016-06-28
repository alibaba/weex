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
import android.os.Debug;

import com.taobao.weex.devtools.common.Util;
import com.taobao.weex.devtools.dumpapp.DumpException;
import com.taobao.weex.devtools.dumpapp.DumpUsageException;
import com.taobao.weex.devtools.dumpapp.DumperContext;
import com.taobao.weex.devtools.dumpapp.DumperPlugin;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintStream;
import java.util.Iterator;

/**
 * Generates an hprof on the sdcard and returns to the client the absolute path to the file.
 * <p/>
 * For convenient usage, see: {@code scripts/hprof_dump.sh}
 */
public class HprofDumperPlugin implements DumperPlugin {

  private static final String NAME = "hprof";
  private final Context mContext;

  public HprofDumperPlugin(Context context) {
    mContext = context;
  }

  @Override
  public String getName() {
    return NAME;
  }

  @Override
  public void dump(DumperContext dumpContext) throws DumpException {
    final PrintStream output = dumpContext.getStdout();

    Iterator<String> argsIter = dumpContext.getArgsAsList().iterator();
    String outputPath = argsIter.hasNext() ? argsIter.next() : null;
    if (outputPath == null) {
      usage(output);
    } else {
      if ("-".equals(outputPath)) {
        handlePipeOutput(output);
      } else {
        File outputFile = new File(outputPath);
        if (!outputFile.isAbsolute()) {
          outputFile = mContext.getFileStreamPath(outputPath);
        }
        writeHprof(outputFile);
        output.println("Wrote to " + outputFile);
      }
    }
  }

  private void handlePipeOutput(OutputStream output) throws DumpException {
    File hprofFile = mContext.getFileStreamPath("hprof-dump.hprof");
    try {
      writeHprof(hprofFile);
      try {
        InputStream input = new FileInputStream(hprofFile);
        try {
          Util.copy(input, output, new byte[2048]);
        } finally {
          input.close();
        }
      } catch (IOException e) {
        throw new DumpException("Failure copying " + hprofFile + " to dumper output");
      }
    } finally {
      if (hprofFile.exists()) {
        hprofFile.delete();
      }
    }
  }

  private void writeHprof(File outputPath) throws DumpException {
    try {
      // Test that we can write here.  dumpHprofData appears to hang if it cannot write
      // to the target location on ART.
      truncateAndDeleteFile(outputPath);
      Debug.dumpHprofData(outputPath.getAbsolutePath());
    } catch (IOException e) {
      throw new DumpException("Failure writing to " + outputPath + ": " + e.getMessage());
    }
  }

  private static void truncateAndDeleteFile(File file) throws IOException {
    FileOutputStream out = new FileOutputStream(file);
    out.close();
    if (!file.delete()) {
      throw new IOException("Failed to delete " + file);
    }
  }

  private void usage(PrintStream output) throws DumpUsageException {
    output.println("Usage: dumpapp hprof [ path ]");
    output.println("Dump HPROF memory usage data from the running application.");
    output.println();
    output.println("Where path can be any of:");
    output.println("  -           Output directly to stdout");
    output.println("  <path>      Full path to a writable file on the device");
    output.println("  <filename>  Relative filename that will be stored in the app internal storage");
    throw new DumpUsageException("Missing path");
  }
}
