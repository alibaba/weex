/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.dumpapp;

import com.taobao.weex.devtools.common.Util;

import org.apache.commons.cli.CommandLineParser;

import java.io.InputStream;
import java.io.PrintStream;
import java.util.List;

import javax.annotation.concurrent.Immutable;

@Immutable
public class DumperContext {
  private final InputStream mStdin;
  private final PrintStream mStdout;
  private final PrintStream mStderr;
  private final CommandLineParser mParser;
  private final List<String> mArgs;

  /**
   * Construct a new context instance using a new set of remaining arguments after invoking
   * {@link CommandLineParser#parse}.
   */
  protected DumperContext(
      DumperContext existingContext,
      List<String> newRemainingArguments) {
    this(
        existingContext.getStdin(),
        existingContext.getStdout(),
        existingContext.getStderr(),
        existingContext.getParser(),
        newRemainingArguments);
  }

  public DumperContext(
      InputStream stdin,
      PrintStream stdout,
      PrintStream stderr,
      CommandLineParser parser,
      List<String> args) {
    mStdin = Util.throwIfNull(stdin);
    mStdout = Util.throwIfNull(stdout);
    mStderr = Util.throwIfNull(stderr);
    mParser = Util.throwIfNull(parser);
    mArgs = Util.throwIfNull(args);
  }

  /**
   * Access the caller's stdin input stream.  This stream should only be read once (do not rely on
   * it having been buffered fully).
   */
  public InputStream getStdin() {
    return mStdin;
  }

  /**
   * Access the caller's stdout output stream.
   */
  public PrintStream getStdout() {
    return mStdout;
  }

  /**
   * Access the caller's stderr output stream.
   */
  public PrintStream getStderr() {
    return mStderr;
  }

  public CommandLineParser getParser() {
    return mParser;
  }

  public List<String> getArgsAsList() {
    return mArgs;
  }
}
