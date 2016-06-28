/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.dumpapp;

import com.taobao.weex.devtools.common.LogUtil;

import java.io.BufferedOutputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintStream;
import java.nio.charset.Charset;

import javax.annotation.Nullable;

/**
 * Implements framing protocol that allows us to implement a command-line protocol via
 * sockets complete with stdin/stdout/stderr, exit codes, and input arguments.
 * <p />
 * This is the server handler of that protocol, with the client handler in WeexInspector's {@code dumpapp}
 * script.
 * <p />
 * The framing protocol involves 5-byte fixed headers, possibly followed by a variable
 * size content body.
 * The grammar is:
 * <pre>
 *   CLIENT_FRAME = STDIN_FRAME | ENTER_FRAME
 *   SERVER_FRAME = STDIN_REQUEST_FRAME | STDOUT_FRAME | STDERR_FRAME | EXIT_FRAME
 *   STDIN_REQUEST_FRAME = '_' BIG_ENDIAN_INT
 *   STDIN_FRAME = '-' BIG_ENDIAN_INT BLOB
 *   STDOUT_FRAME = '1' BIG_ENDIAN_INT BLOB
 *   STDERR_FRAME = '2' BIG_ENDIAN_INT BLOB
 *   ENTER_FRAME = '!' BIG_ENDIAN_INT [ BIG_ENDIAN_SHORT STRING ]...
 *   EXIT_FRAME = 'x' BIG_ENDIAN_INT
 *   BIG_ENDIAN_SHORT = (2 bytes as written by {@link DataOutputStream#writeShort})
 *   BIG_ENDIAN_INT = (4 bytes as written by {@link DataOutputStream#writeInt})
 *   BLOB = (variable-size byte array)
 *   STRING = (variable-size UTF8 string)
 * </pre>
 * The BIG_ENDIAN_INT in STDIN/STDOUT/STDERR_FRAME specifies the size (in bytes) of
 * the immediately following BLOB.  For STDIN_REQUEST_FRAME it represents a request
 * for that much data.
 * <p />
 * The BIG_ENDIAN_INT in ENTER_FRAME specifies the number of arguments, with that number of string
 * to follow.
 * <p />
 * The BIG_ENDIAN_INT in EXIT_FRAME specifies the exit code.
 */
class Framer {
  private static final String TAG = "FramingSocket";

  public static final byte STDIN_FRAME_PREFIX = '-';
  public static final byte STDIN_REQUEST_FRAME_PREFIX = '_';
  public static final byte STDOUT_FRAME_PREFIX = '1';
  public static final byte STDERR_FRAME_PREFIX = '2';
  public static final byte ENTER_FRAME_PREFIX = '!';
  public static final byte EXIT_FRAME_PREFIX = 'x';

  private final DataInputStream mInput;
  private final InputStream mStdin;
  private final PrintStream mStdout;
  private final PrintStream mStderr;
  private final DataOutputStream mMultiplexedOutputStream;

  public Framer(InputStream input, OutputStream output) throws IOException {
    mInput = new DataInputStream(input);
    mMultiplexedOutputStream = new DataOutputStream(output);
    mStdin = new FramingInputStream();
    mStdout = new PrintStream(
        new BufferedOutputStream(
            new FramingOutputStream(STDOUT_FRAME_PREFIX)));
    mStderr = new PrintStream(
        new FramingOutputStream(STDERR_FRAME_PREFIX));
  }

  public InputStream getStdin() {
    return mStdin;
  }

  public PrintStream getStdout() {
    return mStdout;
  }

  public PrintStream getStderr() {
    return mStderr;
  }

  public byte readFrameType() throws IOException {
    return mInput.readByte();
  }

  public int readInt() throws IOException {
    return mInput.readInt();
  }

  public String readString() throws IOException {
    int size = mInput.readUnsignedShort();
    byte[] buf = new byte[size];
    mInput.readFully(buf);
    return new String(buf, Charset.forName("UTF-8"));
  }

  public void writeExitCode(int exitCode) throws IOException {
    mStdout.flush();
    mStderr.flush();
    writeIntFrame(EXIT_FRAME_PREFIX, exitCode);
  }

  public void writeIntFrame(byte type, int intParameter) throws IOException {
    mMultiplexedOutputStream.write(type);
    mMultiplexedOutputStream.writeInt(intParameter);
  }

  public void writeBlob(byte[] data, int offset, int count) throws IOException {
    mMultiplexedOutputStream.write(data, offset, count);
  }

  private static <T extends Throwable> T handleSuppression(@Nullable T previous, T current) {
    if (previous == null) {
      return current;
    } else {
      LogUtil.i(TAG, current, "Suppressed while handling " + previous);
      return previous;
    }
  }

  private class FramingInputStream extends InputStream {
    private final ClosedHelper mClosedHelper = new ClosedHelper();

    @Override
    public int read() throws IOException {
      byte[] buf = new byte[1];
      if (read(buf) == 0) {
        return -1;
      }
      return buf[0];
    }

    @Override
    public int read(byte[] buffer) throws IOException {
      return read(buffer, 0, buffer.length);
    }

    @Override
    public int read(byte[] buffer, int byteOffset, int byteCount) throws IOException {
      mClosedHelper.throwIfClosed();

      synchronized (Framer.this) {
        // Ask the client for more data...
        writeIntFrame(STDIN_REQUEST_FRAME_PREFIX, byteCount);
        byte b = readFrameType();
        if (b != STDIN_FRAME_PREFIX) {
          throw new UnexpectedFrameException(STDIN_FRAME_PREFIX, b);
        }

        // Read what they gave us...
        int length = readInt();
        if (length > 0) {
          if (length > byteCount) {
            throw new DumpappFramingException(
                "Expected at most " + byteCount + " bytes, got: " + length);
          }
          mInput.readFully(buffer, byteOffset, length);
        }
        return length;
      }
    }

    @Override
    public long skip(long byteCount) throws IOException {
      long skipped = 0;
      int bufSize = (int)Math.min(byteCount, 2048);
      byte[] buf = new byte[bufSize];
      synchronized (Framer.this) {
        while (skipped < byteCount) {
          int n = read(buf);
          if (n < 0) {
            break;
          }
          skipped += n;
        }
      }
      return skipped;
    }

    @Override
    public void close() throws IOException {
      mClosedHelper.close();
    }
  }

  private class FramingOutputStream extends OutputStream {

    private final byte mPrefix;
    private final ClosedHelper mClosedHelper = new ClosedHelper();

    public FramingOutputStream(byte prefix) {
      mPrefix = prefix;
    }

    @Override
    public void write(byte[] buffer, int offset, int length) throws IOException {
      mClosedHelper.throwIfClosed();
      if (length > 0) {
        try {
          synchronized (Framer.this) {
            writeIntFrame(mPrefix, length);
            writeBlob(buffer, offset, length);
            mMultiplexedOutputStream.flush();
          }
        } catch (IOException e) {
          // I/O error here can indicate the pipe is broken, so we need to prevent any
          // further writes.
          throw new DumpappOutputBrokenException(e);
        }
      }
    }

    @Override
    public void write(int oneByte) throws IOException {
      byte[] buffer = new byte[] { (byte)oneByte };
      write(buffer, 0, buffer.length);
    }

    @Override
    public void write(byte[] buffer) throws IOException {
      write(buffer, 0, buffer.length);
    }

    @Override
    public void close() throws IOException{
      mClosedHelper.close();
    }
  }

  private static class ClosedHelper {
    private volatile boolean mClosed;

    public void throwIfClosed() throws IOException {
      if (mClosed) {
        throw new IOException("Stream is closed");
      }
    }

    public void close() {
      mClosed = true;
    }
  }
}
