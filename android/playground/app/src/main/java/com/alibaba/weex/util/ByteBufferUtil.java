package com.alibaba.weex.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;

public class ByteBufferUtil {

  public static ByteBuffer mapFile(File f, long offset, ByteOrder byteOrder) throws IOException {
    FileInputStream dataFile = new FileInputStream(f);
    try {
      FileChannel fc = dataFile.getChannel();
      MappedByteBuffer buffer = fc.map(FileChannel.MapMode.READ_ONLY, offset, f.length() - offset);
      buffer.order(byteOrder);
      return buffer;
    } finally {
      dataFile.close(); // this *also* closes the associated channel, fc
    }
  }

  public static String getString(ByteBuffer buf, int len) {
    char[] data = new char[len];
    for (int i = 0; i < len; i++) {
      data[i] = buf.getChar();
    }
    return new String(data);
  }

  public static void putString(ByteBuffer buf, String str) {
    int len = str.length();
    for (int i = 0; i < len; i++) {
      buf.putChar(str.charAt(i));
    }
  }
}
