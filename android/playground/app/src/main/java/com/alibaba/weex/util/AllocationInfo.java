package com.alibaba.weex.util;

import java.util.Comparator;
import java.util.Locale;

public class AllocationInfo {

  private final String mAllocatedClass;
  private final int mAllocNumber;
  private final int mAllocationSize;
  private final short mThreadId;
  private final StackTraceElement[] mStackTrace;

  /*
   * Simple constructor.
   */
  AllocationInfo(int allocNumber, String allocatedClass, int allocationSize,
                 short threadId, StackTraceElement[] stackTrace) {
    mAllocNumber = allocNumber;
    mAllocatedClass = allocatedClass;
    mAllocationSize = allocationSize;
    mThreadId = threadId;
    mStackTrace = stackTrace;
  }

  /**
   * Returns the allocation number. Allocations are numbered as they happen with the most recent one
   * having the highest number
   */
  public int getAllocNumber() {
    return mAllocNumber;
  }

  /**
   * Returns the name of the allocated class.
   */
  public String getAllocatedClass() {
    return mAllocatedClass;
  }

  /**
   * Returns the size of the allocation.
   */
  public int getSize() {
    return mAllocationSize;
  }

  /**
   * Returns the id of the thread that performed the allocation.
   */
  public short getThreadId() {
    return mThreadId;
  }

  public StackTraceElement[] getStackTrace() {
    return mStackTrace;
  }

  public int compareTo(AllocationInfo otherAlloc) {
    return otherAlloc.mAllocationSize - mAllocationSize;
  }

  public String getFirstTraceClassName() {
    if (mStackTrace.length > 0) {
      return mStackTrace[0].getClassName();
    }
    return null;
  }

  public String getFirstTraceMethodName() {
    if (mStackTrace.length > 0) {
      return mStackTrace[0].getMethodName();
    }
    return null;
  }

  /**
   * Returns true if the given filter matches case insensitively (according to the given locale)
   * this allocation info.
   */
  public boolean filter(String filter, boolean fullTrace, Locale locale) {
    if (mAllocatedClass.toLowerCase(locale).contains(filter)) {
      return true;
    }
    if (mStackTrace.length > 0) {
      // check the top of the stack trace always
      final int length = fullTrace ? mStackTrace.length : 1;
      for (int i = 0; i < length; i++) {
        if (mStackTrace[i].getClassName().toLowerCase(locale).contains(filter)) {
          return true;
        }
        if (mStackTrace[i].getMethodName().toLowerCase(locale).contains(filter)) {
          return true;
        }
      }
    }
    return false;
  }

  public enum SortMode {
    NUMBER, SIZE, CLASS, THREAD, IN_CLASS, IN_METHOD
  }

  public static final class AllocationSorter implements Comparator<AllocationInfo> {

    private SortMode mSortMode = SortMode.SIZE;
    private boolean mDescending = true;

    public AllocationSorter() {
    }

    public void setSortMode(SortMode mode, boolean descending) {
      mSortMode = mode;
      mDescending = descending;
    }

    public SortMode getSortMode() {
      return mSortMode;
    }

    public void setSortMode(SortMode mode) {
      if (mSortMode == mode) {
        mDescending = !mDescending;
      } else {
        mSortMode = mode;
      }
    }

    public boolean isDescending() {
      return mDescending;
    }

    @Override
    public int compare(AllocationInfo o1, AllocationInfo o2) {
      int diff = 0;
      switch (mSortMode) {
        case NUMBER:
          diff = o1.mAllocNumber - o2.mAllocNumber;
          break;
        case SIZE:
          // pass, since diff is init with 0, we'll use SIZE compare below
          // as a back up anyway.
          break;
        case CLASS:
          diff = o1.mAllocatedClass.compareTo(o2.mAllocatedClass);
          break;
        case THREAD:
          diff = o1.mThreadId - o2.mThreadId;
          break;
        case IN_CLASS:
          String class1 = o1.getFirstTraceClassName();
          String class2 = o2.getFirstTraceClassName();
          diff = compareOptionalString(class1, class2);
          break;
        case IN_METHOD:
          String method1 = o1.getFirstTraceMethodName();
          String method2 = o2.getFirstTraceMethodName();
          diff = compareOptionalString(method1, method2);
          break;
      }
      if (diff == 0) {
        // same? compare on size
        diff = o1.mAllocationSize - o2.mAllocationSize;
      }
      if (mDescending) {
        diff = -diff;
      }
      return diff;
    }

    /**
     * compares two strings that could be null
     */
    private static int compareOptionalString(String str1, String str2) {
      if (str1 != null) {
        if (str2 == null) {
          return -1;
        } else {
          return str1.compareTo(str2);
        }
      } else {
        if (str2 == null) {
          return 0;
        } else {
          return 1;
        }
      }
    }
  }
}
