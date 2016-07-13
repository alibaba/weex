/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.dumpapp;

/**
 * Provides a CLI (command-line interface) facility for {@code fbandroid} modules.
 *
 * <p>Binding an instance of this interface allows you to inject custom debug/dumping code
 * into the app that is accessible when a phone running the app is connected via ADB.  To see a
 * list of current plugins, see:
 * <pre>
 *   ./scripts/dumpapp --list
 * </pre>
 *
 * <h3>General Utility</h3>
 *
 * <p>This system allows for complex components to inform developers of what's been going on
 * recently (or over the process lifetime) in a simple, human-readable fashion.  Good candidates
 * for this kind of interface are those that are otherwise hard to isolate or visualize such as
 * the network stack or task runners (BlueService, Executor, etc).  It is also possible to create
 * a kind of simple instrumentation around components that otherwise have no UI.  For example, it
 * may be useful to be able to clear the image cache or delete individual entries on demand as
 * well as viewing the current state of all cached entries.
 *
 * <h3>Implementation Guidelines</h3>
 *
 * Almost any kind of simple interface will work however there are some basic guidelines that you
 * should follow:
 *
 * <ol>
 * <li>Avoid heavy-weight plugins that add significant additional code to the app.  While this
 * code does not ship in katana (proguard strips it out), it is generally a good idea to evaluate
 * large or complex instrumentation projects in the greater context of tools available at Facebook
 * (in particular Scuba which can aggregate data for our user base in the wild).  1 or 2 classes
 * is a good rule of thumb for reasonable plugin size.
 * <li>Don't implement long-running jobs in {@link #dump}.  If the instrumented action takes a
 * long time, consider a way to "fire-and-forget" so that you can return some message to the
 * caller quickly.
 * <li>Don't perform extra up-front initialization not normally needed by the app.  Dumpers should
 * init on demand so that there is no runtime impact to the app.
 * </ol>
 *
 * <h3>Gotchas</h3>
 *
 * <p>In order for dumpapp to work the app must currently be running and there is an
 * initialization overhead of the "dumper" system which may make real-time debug output during
 * app startup tricky or impossible.  However, you can work around this by implementing simple
 * stat counters that can be pulled and reset within your plugin.  After initialization completes
 * (and thus dumpapp becomes available), you can query for the stats that were being collected
 * while the app was starting.
 */
public interface DumperPlugin {

  /**
   * Plugin name according to the dumpsys command-line interface.  Please be mindful of the
   * fact that this is part of a command-line interface and should be generally easy to type and
   * remember.  Avoid underscores, capital letters, and plural names.  Instead, prefer terse names
   * like "network", "logging", etc.
   */
  String getName();

  /**
   * Invoked in response to the user running the dumpapp command and specifying your plugin.
   * <p>
   * Any output written to {@link DumperContext#getStdout()} will be displayed to the caller.
   *
   * @param dumpContext Contains the command-line state (extra arguments, output channel, etc).
   * @throws DumpException Your plugin can throw this event to easily bail from a dump sequence
   *     on unexpected errors.  The message will be displayed directly to the caller and the
   *     dumpapp script will terminate with a non-successful exit code.
   */
  void dump(DumperContext dumpContext) throws DumpException;
}
