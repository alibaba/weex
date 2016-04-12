package com.alibaba.weex.util;

public final class NativeLibraryMapInfo {

  private long mStartAddr;
  private long mEndAddr;
  private String mLibrary;

  /**
   * Constructs a new native library map info.
   *
   * @param startAddr The start address of the library.
   * @param endAddr   The end address of the library.
   * @param library   The name of the library.
   */
  NativeLibraryMapInfo(long startAddr, long endAddr, String library) {
    this.mStartAddr = startAddr;
    this.mEndAddr = endAddr;
    this.mLibrary = library;
  }

  /**
   * Returns the name of the library.
   */
  public String getLibraryName() {
    return mLibrary;
  }

  /**
   * Returns the start address of the library.
   */
  public long getStartAddress() {
    return mStartAddr;
  }

  /**
   * Returns the end address of the library.
   */
  public long getEndAddress() {
    return mEndAddr;
  }

  /**
   * Returns whether the specified address is inside the library.
   *
   * @param address The address to test.
   * @return <code>true</code> if the address is between the start and end address of the library.
   * @see #getStartAddress()
   * @see #getEndAddress()
   */
  public boolean isWithinLibrary(long address) {
    return address >= mStartAddr && address <= mEndAddr;
  }
}