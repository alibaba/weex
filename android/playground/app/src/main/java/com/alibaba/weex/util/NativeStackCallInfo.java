package com.alibaba.weex.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Represents a stack call. This is used to return all of the call information as one object.
 */
public final class NativeStackCallInfo {

  private static final Pattern SOURCE_NAME_PATTERN = Pattern.compile("^(.+):(\\d+)$");
  /**
   * address of this stack frame
   */
  private long mAddress;
  /**
   * name of the library
   */
  private String mLibrary;
  /**
   * name of the method
   */
  private String mMethod;
  /**
   * name of the source file + line number in the format<br> &lt;sourcefile&gt;:&lt;linenumber&gt;
   */
  private String mSourceFile;
  private int mLineNumber = -1;

  /**
   * Basic constructor with library, method, and sourcefile information
   *
   * @param address    address of this stack frame
   * @param lib        The name of the library
   * @param method     the name of the method
   * @param sourceFile the name of the source file and the line number as "[sourcefile]:[fileNumber]"
   */
  public NativeStackCallInfo(long address, String lib, String method, String sourceFile) {
    mAddress = address;
    mLibrary = lib;
    mMethod = method;
    Matcher m = SOURCE_NAME_PATTERN.matcher(sourceFile);
    if (m.matches()) {
      mSourceFile = m.group(1);
      try {
        mLineNumber = Integer.parseInt(m.group(2));
      } catch (NumberFormatException e) {
        // do nothing, the line number will stay at -1
      }
    } else {
      mSourceFile = sourceFile;
    }
  }

  @Override
  public String toString() {
    return String.format("\t%1$08x\t%2$s --- %3$s --- %4$s:%5$d",
                         getAddress(), getLibraryName(), getMethodName(), getSourceFile(), getLineNumber());
  }

  /**
   * Returns the address of this stack frame.
   */
  public long getAddress() {
    return mAddress;
  }

  /**
   * Returns the name of the library name.
   */
  public String getLibraryName() {
    return mLibrary;
  }

  /**
   * Returns the name of the method.
   */
  public String getMethodName() {
    return mMethod;
  }

  /**
   * Returns the name of the source file.
   */
  public String getSourceFile() {
    return mSourceFile;
  }

  /**
   * Returns the line number, or -1 if unknown.
   */
  public int getLineNumber() {
    return mLineNumber;
  }
}