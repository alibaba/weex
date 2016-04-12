package com.alibaba.weex.util;

import android.content.Context;
import android.util.Log;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ConcurrentHashMap;

public class ThreadAllocMonitor {

  private static final String TAG = "ThreadAlloc";
  private static final boolean Debug = false;
  private static final long CHECK_INTERVAL = 2000L;
  FileWriter writer;
  private Context mContext;
  private Method enableRecentAllocations;
  private Method getRecentAllocations;
  private ConcurrentHashMap<String, Integer> threadAllocMap;
  private Timer mTimer;
  private long total;
  private File dir;
  private File allocStackInfo;
  private boolean needReset;
  private File confFile;
  private String filterClass;
  private long filterTotal;

  public ThreadAllocMonitor(Context context) {
    mContext = context;
    threadAllocMap = new ConcurrentHashMap<String, Integer>();
    needReset = false;
    try {
      Class<?> DdmVmInternalClazz = Class
          .forName("org.apache.harmony.dalvik.ddmc.DdmVmInternal");
      enableRecentAllocations = DdmVmInternalClazz.getMethod(
          "enableRecentAllocations", boolean.class);
      getRecentAllocations = DdmVmInternalClazz
          .getMethod("getRecentAllocations");
    } catch (ClassNotFoundException e) {
      e.printStackTrace();
    } catch (NoSuchMethodException e) {
      e.printStackTrace();
    }

    File barrierExtDir = new File(mContext.getExternalFilesDir(null), "memory");
    dir = new File(barrierExtDir, "ThreadAlloc");
    if (!dir.exists()) {
      dir.mkdirs();
    }

    allocStackInfo = new File(dir, "out.stacks");
    confFile = new File(dir, "configure.txt");
    if (!confFile.exists()) {
      try {
        confFile.createNewFile();
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
  }

  public void startMonitor() {
    total = 0;
    filterTotal = 0;
    setEnableRecentAllocations(true);
    try {
      writer = new FileWriter(allocStackInfo);

      if (filterClass == null || filterClass.isEmpty()) {
        FileReader fileReader = new FileReader(confFile);
        int ch = -1;
        StringBuffer sb = new StringBuffer();
        while ((ch = fileReader.read()) != -1) {
          sb.append((char) ch);
        }
        filterClass = sb.toString().trim();
        fileReader.close();
      }
    } catch (IOException e) {
      e.printStackTrace();
    }

  }

  public void setEnableRecentAllocations(boolean enable) {
    try {
      enableRecentAllocations.invoke(null, enable);
    } catch (IllegalAccessException e) {
      e.printStackTrace();
    } catch (InvocationTargetException e) {
      e.printStackTrace();
    }
  }

  public void startTime() {
    mTimer = new Timer("threadalloctimer", true);
    mTimer.schedule(new TimerTask() {
      @Override
      public void run() {
        Log.d(TAG, "getThreadAlloc start");
        getThreadAlloc();
        Log.d(TAG, "getThreadAlloc end");
      }
    }, 10 * CHECK_INTERVAL);
  }

  public void getThreadAlloc() {
    try {

      byte[] stat = (byte[]) getRecentAllocations.invoke(null);
      if (stat != null) {
        synchronized (threadAllocMap) {
          ByteBuffer data = ByteBuffer.wrap(stat);
          int messageHdrLen, entryHdrLen, stackFrameLen;
          int numEntries, offsetToStrings;
          int numClassNames, numMethodNames, numFileNames;
                /*
                 * Read the header.
				 */
          messageHdrLen = (data.get() & 0xff);
          entryHdrLen = (data.get() & 0xff);
          stackFrameLen = (data.get() & 0xff);
          numEntries = (data.getShort() & 0xffff);
          offsetToStrings = data.getInt();
          numClassNames = (data.getShort() & 0xffff);
          numMethodNames = (data.getShort() & 0xffff);
          numFileNames = (data.getShort() & 0xffff);

          Log.e(TAG, "data size : " + stat.length + ", numEntries : " + numEntries);
          if (numEntries == 0) {
            needReset = true;
          }
          if (needReset == true) {
            setEnableRecentAllocations(false);
            setEnableRecentAllocations(true);
          }

          if (numEntries == 0) {
            return;
          }

          if (Debug) {
            Log.d(TAG, "messageHdrLen : " + messageHdrLen
                       + ", entryHdrLen : " + entryHdrLen
                       + "， stackFrameLen ：" + stackFrameLen
                       + ", numEntries : " + numEntries
                       + ", offsetToStrings : " + offsetToStrings
                       + ", numClassNames : " + numClassNames
                       + ", numMethodNames : " + numMethodNames
                       + ", numFileNames : " + numFileNames);
          }
                /*
                 * Skip forward to the strings and read them.
				 */
          data.position(offsetToStrings);

          String[] classNames = new String[numClassNames];
          String[] methodNames = new String[numMethodNames];
          String[] fileNames = new String[numFileNames];

          readStringTable(data, classNames);
          readStringTable(data, methodNames);
          readStringTable(data, fileNames);

				/*
                 * Skip back to a point just past the header and start reading
				 * entries.
				 */
          data.position(messageHdrLen);
          AllocationInfo[] allocations = new AllocationInfo[numEntries];
          for (int i = 0; i < numEntries; i++) {
            int totalSize;
            int threadId, classNameIndex, stackDepth;
            totalSize = data.getInt();
            threadId = (data.getShort() & 0xffff);
            classNameIndex = (data.getShort() & 0xffff);
            stackDepth = (data.get() & 0xff);
                  /* we've consumed 9 bytes; gobble up any extra */
            for (int skip = 9; skip < entryHdrLen; skip++) {
              data.get();
            }
            StackTraceElement[] steArray = new StackTraceElement[stackDepth];
                  /*
                   * Pull out the stack trace.
			       */
            boolean isBarrier = false;
            boolean isFilter = false;
            for (int sti = 0; sti < stackDepth; sti++) {
              int methodClassNameIndex, methodNameIndex;
              int methodSourceFileIndex;
              short lineNumber;
              String methodClassName, methodName, methodSourceFile;
              methodClassNameIndex = (data.getShort() & 0xffff);

              methodNameIndex = (data.getShort() & 0xffff);
              methodSourceFileIndex = (data.getShort() & 0xffff);
              lineNumber = data.getShort();
              methodClassName = classNames[methodClassNameIndex];
              methodName = methodNames[methodNameIndex];
              methodSourceFile = fileNames[methodSourceFileIndex];
              if (methodClassName.contains("ThreadAllocMonitor")) {
                isBarrier = true;
              }

              if (filterClass != null && !filterClass.isEmpty() && methodClassName.contains(filterClass)) {
                isFilter = true;
              }
              if (Debug) {
                Log.d(TAG, "methodNameIndex : " + methodNameIndex
                           + ", methodSourceFileIndex : " + methodSourceFileIndex
                           + ", lineNumber : " + lineNumber
                           + ", methodClassName : " + methodClassName
                           + ", methodName : " + methodName
                           + ", methodSourceFile : " + methodSourceFile);
              }

              if (!isBarrier) {
                steArray[sti] = new StackTraceElement(methodClassName,
                                                      methodName, methodSourceFile, lineNumber);
              }
                    /* we've consumed 8 bytes; gobble up any extra */
              for (int skip = 8; skip < stackFrameLen; skip++) {
                data.get();
              }
            }

            if (isBarrier) {
              allocations[i] = null;
            } else if (filterClass != null && !filterClass.isEmpty() && !isFilter) {
              allocations[i] = null;
              total += totalSize;
            } else {
              allocations[i] = new AllocationInfo(numEntries - i, classNames[classNameIndex], totalSize, (short) threadId, steArray);
              if (isFilter) {
                filterTotal += totalSize;
              }
              total += totalSize;
            }
          }

          for (int i = 0; i < allocations.length; i++) {
            if (allocations[i] != null) {
              if (Debug) {
                                /*Log.d(TAG, "mThreadId : " + allocations[i].getThreadId()
                                                + ", threadName : " + ThreadCpuMonitor.IdOfName(allocations[i].getThreadId())
                                                + ", mAllocNumber : " + allocations[i].getAllocNumber()
                                                + ", mAllocatedClass : " + allocations[i].getAllocatedClass()
                                                + ", mAllocationSize : " + allocations[i].getSize()
                                                + ", stack length : " + allocations[i].getStackTrace().length
                                );*/

                String stack[] = StackTraceUtil.StackTraceElementArray2StringArray(allocations[i].getStackTrace());
                for (int j = 0; j < stack.length; j++) {
                  Log.d(TAG, " " + stack[j]);
                }

              }

              String key = getKey(allocations[i].getThreadId());
              if (threadAllocMap.containsKey(key)) {
                threadAllocMap.put(key, threadAllocMap.get(key) + allocations[i].getSize());
              } else {
                threadAllocMap.put(key, allocations[i].getSize());
              }

              String stack[] = StackTraceUtil.StackTraceElementArray2StringArray(allocations[i].getStackTrace());
              StringBuffer sb = new StringBuffer();
              for (int j = 0; j < stack.length; j++) {
                sb.append(stack[j]);
                sb.append("\n");
              }
              sb.append(allocations[i].getSize());
              sb.append("\n");
              writer.write(sb.toString());
              //                            total += allocations[i].getSize();

            }

            if (writer != null) {
              writer.flush();
            }
          }
        }

      }
    } catch (IllegalArgumentException e) {
      e.printStackTrace();
    } catch (IllegalAccessException e) {
      e.printStackTrace();
    } catch (InvocationTargetException e) {
      e.printStackTrace();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  /**
   * Reads a string table out of "data". <p/> This is just a serial collection of strings, each of
   * which is a four-byte length followed by UTF-16 data.
   */
  private static void readStringTable(ByteBuffer data, String[] strings) {
    int count = strings.length;
    int i;
    for (i = 0; i < count; i++) {
      int nameLen = data.getInt();
      String descriptor = ByteBufferUtil.getString(data, nameLen);
      strings[i] = descriptorToDot(descriptor);
    }
  }

  private String getKey(int id) {
    StringBuffer sbKey = new StringBuffer();
    sbKey.append(id);
    sbKey.append("@");
    //sbKey.append(ThreadCpuMonitor.IdOfName(id));
    return sbKey.toString();
  }

  /**
   * Converts a VM class descriptor string ("Landroid/os/Debug;") to a dot-notation class name
   * ("android.os.Debug").
   */
  private static String descriptorToDot(String str) {
    // count the number of arrays.
    int array = 0;
    while (str.startsWith("[")) {
      str = str.substring(1);
      array++;
    }
    int len = str.length();
        /* strip off leading 'L' and trailing ';' if appropriate */
    if (len >= 2 && str.charAt(0) == 'L' && str.charAt(len - 1) == ';') {
      str = str.substring(1, len - 1);
      str = str.replace('/', '.');
    } else {
      // convert the basic types
      if ("C".equals(str)) {
        str = "char";
      } else if ("B".equals(str)) {
        str = "byte";
      } else if ("Z".equals(str)) {
        str = "boolean";
      } else if ("S".equals(str)) {
        str = "short";
      } else if ("I".equals(str)) {
        str = "int";
      } else if ("J".equals(str)) {
        str = "long";
      } else if ("F".equals(str)) {
        str = "float";
      } else if ("D".equals(str)) {
        str = "double";
      }
    }
    // now add the array part
    for (int a = 0; a < array; a++) {
      str += "[]";
    }
    return str;
  }

  public void stopMonitor() {
    if (null != mTimer) {
      mTimer.cancel();
      mTimer.purge();
      mTimer = null;
    }
    setEnableRecentAllocations(false);

    if (filterClass != null && !filterClass.isEmpty()) {
      Log.e(TAG, "total : " + String.format("%.2f", (float) total / 1024 / 1024) + " Mb" + ", " + filterClass + " : " + String.format("%.2f", (float) filterTotal / total * 100) + " %");
    } else {
      Log.e(TAG, "total : " + String.format("%.2f", (float) total / 1024 / 1024) + " Mb");
    }

    try {
      writer.close();
    } catch (IOException e) {
      e.printStackTrace();
    }
    synchronized (threadAllocMap) {
      List<Map.Entry<String, Integer>> list = new ArrayList<Map.Entry<String, Integer>>(threadAllocMap.entrySet());
      Collections.sort(list, new Comparator<Map.Entry<String, Integer>>() {
        public int compare(Map.Entry<String, Integer> o1,
                           Map.Entry<String, Integer> o2) {
          return (o2.getValue() - o1.getValue());
        }

      });

      StringBuffer sb = new StringBuffer();
      //Head
      String separator = "------------------------------------";
      sb.append(separator + "\n");
      sb.append("| " + "Name" + "              " + "| " + "Mem(bytes)" + "   |" + "\n");
      sb.append(separator + "\n");

      for (Map.Entry<String, Integer> entry : list) {
        String key = entry.getKey();
        String threadName = key.substring(key.indexOf("@") + 1, key.length());
        if (!threadName.isEmpty()) {
          String line = "| " + threadName;
          for (int i = line.length(); i < 20; i++) {
            line = line + " ";
          }
          line = line + "| " + entry.getValue();

          for (int i = line.length(); i < 35; i++) {
            line = line + " ";
          }
          line = line + "|";
          sb.append(line + "\n");
          sb.append(separator + "\n");
        }
      }
      Log.e(TAG, sb.toString());
      threadAllocMap.clear();
    }
  }
}
