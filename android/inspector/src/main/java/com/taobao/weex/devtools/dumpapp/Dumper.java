/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.dumpapp;

import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.CommandLineParser;
import org.apache.commons.cli.GnuParser;
import org.apache.commons.cli.HelpFormatter;
import org.apache.commons.cli.ParseException;

import java.io.InputStream;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Dumper {

  /**
   * Map of dumper plugin name to the plugin itself.
   */
  private final Map<String, DumperPlugin> mDumperPlugins;
  private final CommandLineParser mParser;
  private final GlobalOptions mGlobalOptions;

  public Dumper(Iterable<DumperPlugin> dumperPlugins) {
    this(dumperPlugins, new GnuParser());
  }

  public Dumper(
      Iterable<DumperPlugin> dumperPlugins,
      CommandLineParser parser) {
    mDumperPlugins = generatePluginMap(dumperPlugins);
    mParser = parser;
    mGlobalOptions = new GlobalOptions();
  }

  private static Map<String, DumperPlugin> generatePluginMap(Iterable<DumperPlugin> plugins) {
    Map<String, DumperPlugin> map = new HashMap<String, DumperPlugin>();
    for (DumperPlugin plugin : plugins) {
      map.put(plugin.getName(), plugin);
    }
    return Collections.unmodifiableMap(map);
  }

  /**
   * Execute the dump method as if it were a fragile external command.  Swallows exceptions
   * and translates them to dumped output text.
   *
   * @param input Input that came from the CLI's stdin.
   * @param out Output that will eventually make its way to the CLI's stdout.
   * @param err Output that will eventually make its way to the CLI's stderr.
   * @param args Argument list as passed from the CLI.
   *
   * @return Exit code as if this were a command-line invocation.
   */
  public int dump(InputStream input, PrintStream out, PrintStream err, String[] args) {
    try {
      return doDump(input, out, err, args);
    } catch (ParseException e) {
      err.println(e.getMessage());
      dumpUsage(err);
      return 1;
    } catch (DumpException e) {
      err.println(e.getMessage());
      return 1;
    } catch (DumpappOutputBrokenException e) {
      // The peer is already gone, no sense in sending the exception stack to them.
      throw e;
    } catch (RuntimeException e) {
      e.printStackTrace(err);
      return 1;
    }
  }

  /**
   * @throws ParseException If any args syntax constraint is violated and the dump was not able to
   *     proceed.
   * @throws DumpException Human readable error executing the dump command.
   */
  private int doDump(InputStream input, PrintStream out, PrintStream err, String[] args)
      throws ParseException, DumpException {
    CommandLine parsedArgs = mParser.parse(mGlobalOptions.options,
        args,
        true /* stopAtNonOption */);

    if (parsedArgs.hasOption(mGlobalOptions.optionHelp.getOpt())) {
      dumpUsage(out);
      return 0;
    } else if (parsedArgs.hasOption(mGlobalOptions.optionListPlugins.getOpt())) {
      dumpAvailablePlugins(out);
      return 0;
    } else if (!parsedArgs.getArgList().isEmpty()) {
      dumpPluginOutput(input, out, err, parsedArgs);
      return 0;
    } else {
      // Didn't understand the options, spit out help but use a non-success exit code.
      dumpUsage(err);
      return 1;
    }
  }

  private void dumpAvailablePlugins(PrintStream output) {
    List<String> pluginNames = new ArrayList<String>();
    for (DumperPlugin pluginToDump : mDumperPlugins.values()) {
      pluginNames.add(pluginToDump.getName());
    }
    Collections.sort(pluginNames);
    for (String pluginName : pluginNames) {
      output.println(pluginName);
    }
  }

  private void dumpPluginOutput(InputStream input,
      PrintStream out,
      PrintStream err,
      CommandLine parsedArgs) throws DumpException {
    List<String> args = new ArrayList(parsedArgs.getArgList());
    if (args.size() < 1) {
      throw new DumpException("Expected plugin argument");
    }
    String pluginName = args.remove(0);

    DumperPlugin plugin = mDumperPlugins.get(pluginName);
    if (plugin == null) {
      throw new DumpException("No plugin named '" + pluginName + "'");
    }

    DumperContext dumperContext = new DumperContext(input, out, err, mParser, args);
    plugin.dump(dumperContext);
  }

  private void dumpUsage(PrintStream output) {
    final String cmdName = "dumpapp";
    HelpFormatter formatter = new HelpFormatter();

    output.println("Usage: " + cmdName + " [options] <plugin> [plugin-options]");

    PrintWriter writer = new PrintWriter(output);
    try {
      formatter.printOptions(
          writer,
          formatter.getWidth(),
          mGlobalOptions.options,
          formatter.getLeftPadding(),
          formatter.getDescPadding());
    } finally {
      writer.flush();
    }
  }
}
