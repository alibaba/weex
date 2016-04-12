package com.alibaba.weex.util;

import android.content.Context;
import android.util.Log;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

public class NativeHeapMonitor {

  private static final String TAG = "NativeHeap";
  private static final long CHECK_INTERVAL = 20 * 1000L;
  private final ArrayList<NativeLibraryMapInfo> mNativeLibraryMapInfo = new ArrayList<NativeLibraryMapInfo>();
  private Context mContext;
  private Method getLeakInfo;
  private Field mInstance;
  private Class<?> ddmHandleNativeHeapClazz;
  private Timer mTimer;
  private File mMapsFile;
  private File mStacksFile;
  private FileWriter mMapsWrite;
  private FileWriter mStacksWrite;
  /**
   * caching mechanism to avoid recomputing the backtrace for a particular address several times.
   */
  private HashMap<Long, NativeStackCallInfo> mSourceCache =
      new HashMap<Long, NativeStackCallInfo>();

  public NativeHeapMonitor(Context context) {
    Log.e(TAG, "NativeHeapMonitor");
    mContext = context;
    try {
      ddmHandleNativeHeapClazz = Class.forName("android.ddm.DdmHandleNativeHeap");
      mInstance = ddmHandleNativeHeapClazz.getDeclaredField("mInstance");
      getLeakInfo = ddmHandleNativeHeapClazz.getDeclaredMethod("getLeakInfo");
      mInstance.setAccessible(true);
      getLeakInfo.setAccessible(true);

      File dir = new File(mContext.getExternalFilesDir(null), "NativeHeap");
      if (!dir.exists()) {
        dir.mkdirs();
      }
      mMapsFile = new File(dir, "maps.txt");
      if (!mMapsFile.exists()) {
        mMapsFile.createNewFile();
      }

      mStacksFile = new File(dir, "stacks.txt");
      if (!mStacksFile.exists()) {
        mStacksFile.createNewFile();
      }
      mMapsWrite = new FileWriter(mMapsFile);
      mStacksWrite = new FileWriter(mStacksFile);

    } catch (Throwable e) {
      Log.e(TAG, "NativeHeapMonitor : " + Log.getStackTraceString(e));
    }


  }


  public void startMonitor() {
    Log.e(TAG, "startMonitor");
    mTimer = new Timer("nativeheaptimer", true);
    mTimer.schedule(new TimerTask() {
      @Override
      public void run() {
        getNativeHeap();
        if (null != mTimer) {
          mTimer.cancel();
          mTimer.purge();
          mTimer = null;
        }
        try {
          mMapsWrite.close();
          mStacksWrite.close();
        } catch (IOException e) {
          Log.e(TAG, Log.getStackTraceString(e));
        }
        Log.e(TAG, "write file end");
        mNativeLibraryMapInfo.clear();
      }
    }, CHECK_INTERVAL);


  }

  private void getNativeHeap() {
    try {
      byte[] bytes = (byte[]) getLeakInfo.invoke(mInstance.get(ddmHandleNativeHeapClazz));
      if (bytes != null) {
        Log.e(TAG, "\n" + "bytes length : " + bytes.length);
        ByteBuffer buffer = ByteBuffer.wrap(bytes);
        buffer.order(ByteOrder.LITTLE_ENDIAN);
        int mapSize = buffer.getInt();
        int allocSize = buffer.getInt();
        int allocInfoSize = buffer.getInt();
        int totalMemory = buffer.getInt();
        int backtraceSize = buffer.getInt();

        Log.e(TAG, "mapSize: " + mapSize);
        Log.e(TAG, "allocSize: " + allocSize);
        Log.e(TAG, "allocInfoSize: " + allocInfoSize);
        Log.e(TAG, "totalMemory: " + totalMemory);

        if (allocInfoSize == 0) {
          return;
        }

        if (mapSize > 0) {
          byte[] maps = new byte[mapSize];
          buffer.get(maps, 0, mapSize);
          parseMaps(maps);

        }

        int iterations = allocSize / allocInfoSize;
        for (int i = 0; i < iterations; i++) {
          NativeAllocationInfo info = new NativeAllocationInfo(buffer.getInt() /* size */, buffer.getInt() /* allocations */);
          for (int j = 0; j < backtraceSize; j++) {
            long addr = (buffer.getInt()) & 0x00000000ffffffffL;
            if (addr == 0x0) {
              // skip past null addresses
              continue;
            }
            info.addStackCallAddress(addr);
          }

          ArrayList<NativeStackCallInfo> resolvedStackCall = new ArrayList<NativeStackCallInfo>();
          List<Long> list = info.getStackCallAddresses();
          int size = list.size();
          for (int k = 0; k < size; k++) {
            long addr = list.get(k);
            NativeStackCallInfo source = mSourceCache.get(addr);
            // first check if the addr has already been converted.
            if (source == null) {
              source = sourceForAddr(addr);
              mSourceCache.put(addr, source);
            }
            resolvedStackCall.add(source);
            //                        Log.e(TAG, "addr : " + mStackCallAddresses.get(k));
          }
          info.setResolvedStackCall(resolvedStackCall);
          //                    Log.e(TAG, "" + info.toString());
          String infoStr = info.toString();
          //                    if (infoStr.contains("taobao")) {
          //                    if (infoStr.contains("taobao") && !infoStr.contains("UC")){
          mStacksWrite.write(infoStr);
          //                    }
        }
      } else {
        Log.e(TAG, "bytes null ... ");
      }
    } catch (Throwable e) {
      Log.e(TAG, "onStarted : " + Log.getStackTraceString(e));
    }
  }


  private void parseMaps(byte[] maps) {//(ClientData cd, byte[] maps) {
    InputStreamReader input = new InputStreamReader(new ByteArrayInputStream(maps));
    BufferedReader reader = new BufferedReader(input);
    String line;
    try {
      // most libraries are defined on several lines, so we need to make sure we parse
      // all the library lines and only add the library at the end
      long startAddr = 0;
      long endAddr = 0;
      String library = null;
      while ((line = reader.readLine()) != null) {
        //                Log.e(TAG, "line: " + line);
        if (line.length() < 16) {
          continue;
        }
        try {
          long tmpStart = Long.parseLong(line.substring(0, 8), 16);
          long tmpEnd = Long.parseLong(line.substring(9, 17), 16);
          int index = line.indexOf('/');
          if (index == -1) {
            continue;
          }
          String tmpLib = line.substring(index);
          if (library == null || (library != null && !tmpLib.equals(library))) {
            if (library != null && !isNativeStackCallInfoContain(startAddr, endAddr, library)) {
              NativeLibraryMapInfo item = new NativeLibraryMapInfo(startAddr, endAddr, library);
              mNativeLibraryMapInfo.add(item);
              mMapsWrite.write(library + "(" + Long.toHexString(startAddr) + "-" + Long.toHexString(endAddr) + ")" + "\n");
              //                            Log.e(TAG, library + "(" + Long.toHexString(startAddr) +
              //                                    " - " + Long.toHexString(endAddr) + ")"+ "\n");
            }
            // now init the new library
            library = tmpLib;
            startAddr = tmpStart;
            endAddr = tmpEnd;
          } else {
            // add the new end
            endAddr = tmpEnd;
          }
        } catch (NumberFormatException e) {
          e.printStackTrace();
        }
      }
      if (library != null && !isNativeStackCallInfoContain(startAddr, endAddr, library)) {
        NativeLibraryMapInfo item = new NativeLibraryMapInfo(startAddr, endAddr, library);
        mNativeLibraryMapInfo.add(item);
        mMapsWrite.write(library + "(" + Long.toHexString(startAddr) + "-" + Long.toHexString(endAddr) + ")" + "\n");
        //                Log.e(TAG, library + "(" + Long.toHexString(startAddr) +
        //                        " - " + Long.toHexString(endAddr) + ")" + "\n");
      }
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  private NativeStackCallInfo sourceForAddr(long addr) {
    NativeLibraryMapInfo library = getLibraryFor(addr);
    return new NativeStackCallInfo(addr, library != null ? library.getLibraryName() : null,
                                   Long.toHexString(addr), "");
  }

  private boolean isNativeStackCallInfoContain(long startAddr, long endAddr, String library) {
    if (mNativeLibraryMapInfo != null) {
      Iterator<NativeLibraryMapInfo> it = mNativeLibraryMapInfo.iterator();
      while (it.hasNext()) {
        NativeLibraryMapInfo info = it.next();
        if ((info.getStartAddress() == startAddr) && (info.getEndAddress() == endAddr) && info.getLibraryName().equals(library)) {
          return true;
        }
      }

    }
    return false;
  }

  private NativeLibraryMapInfo getLibraryFor(long addr) {
    if (mNativeLibraryMapInfo != null) {
      Iterator<NativeLibraryMapInfo> it = mNativeLibraryMapInfo.iterator();
      while (it.hasNext()) {
        NativeLibraryMapInfo info = it.next();
        if (info.isWithinLibrary(addr)) {
          return info;
        }
      }

    }
    Log.d(TAG, "Failed finding Library for " + Long.toHexString(addr));
    return null;
  }

}