/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.network;

import com.taobao.weex.devtools.inspector.console.CLog;
import com.taobao.weex.devtools.inspector.helper.ChromePeerManager;
import com.taobao.weex.devtools.inspector.protocol.module.Console;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Arrays;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.mock;

@RunWith(PowerMockRunner.class)
@PrepareForTest(CLog.class)
public class ResponseHandlingInputStreamTest {

  private static final String TEST_REQUEST_ID = "1234";

  private static final byte[] TEST_RESPONSE_BODY;
  static {
    int responseBodyLength = 4096 * 2 + 2048; // span multiple buffers when tee-ing
    TEST_RESPONSE_BODY = new byte[responseBodyLength];
    for (int i = 0; i < responseBodyLength; i++) {
      TEST_RESPONSE_BODY[i] = positionToByte(i);
    }
  }

  private ByteArrayOutputStream mTestOutputStream;
  private ResponseHandlingInputStream mResponseHandlingInputStream;
  private NetworkPeerManager mNetworkPeerManager;
  private NetworkEventReporterImpl mNetworkEventReporter;

  @Before
  public void setup() {
    mTestOutputStream = new ByteArrayOutputStream();
    // The only place this is used is when trying to write to the console. Since we are going to
    // mock ResponseHandlingInputStream#writeToConsole passing null is fine.
    mNetworkPeerManager = null;
    mNetworkEventReporter = mock(NetworkEventReporterImpl.class);
    mResponseHandlingInputStream = new ResponseHandlingInputStream(
        new ByteArrayInputStream(TEST_RESPONSE_BODY),
        TEST_REQUEST_ID,
        mTestOutputStream,
        null /* decompressedCounter */,
        mNetworkPeerManager,
        new DefaultResponseHandler(mNetworkEventReporter, TEST_REQUEST_ID));
  }

  @Test
  public void testReadOneByte() throws IOException {
    int result = mResponseHandlingInputStream.read();
    assertEquals(TEST_RESPONSE_BODY[0], positionToByte(result));
    assertBufferMatchesResponseBody(mTestOutputStream.toByteArray(), 1);

    PowerMockito.mockStatic(CLog.class);
    PowerMockito.doNothing().when(CLog.class);
    CLog.writeToConsole(
        Mockito.any(ChromePeerManager.class),
        Mockito.any(Console.MessageLevel.class),
        Mockito.any(Console.MessageSource.class),
        Mockito.anyString());
    mResponseHandlingInputStream.close();
    PowerMockito.verifyStatic();
  }

  @Test
  public void testReadPartial() throws IOException {
    int numBytesToRead = TEST_RESPONSE_BODY.length / 2;
    byte[] tempReadingBuffer = new byte[numBytesToRead];
    int result = mResponseHandlingInputStream.read(tempReadingBuffer, 0, numBytesToRead);
    assertEquals(numBytesToRead, result);
    assertBufferMatchesResponseBody(tempReadingBuffer, numBytesToRead);
    assertBufferMatchesResponseBody(mTestOutputStream.toByteArray(), numBytesToRead);

    PowerMockito.mockStatic(CLog.class);
    PowerMockito.doNothing().when(CLog.class);
    CLog.writeToConsole(
        Mockito.any(ChromePeerManager.class),
        Mockito.any(Console.MessageLevel.class),
        Mockito.any(Console.MessageSource.class),
        Mockito.anyString());
    mResponseHandlingInputStream.close();
    PowerMockito.verifyStatic();
  }

  @Test
  public void testReadFully() throws IOException {
    byte[] tempReadingBuffer = new byte[TEST_RESPONSE_BODY.length];
    int result = mResponseHandlingInputStream.read(tempReadingBuffer);
    assertEquals(TEST_RESPONSE_BODY.length, result);
    assertBufferMatchesResponseBody(tempReadingBuffer, TEST_RESPONSE_BODY.length);
    assertBufferMatchesResponseBody(mTestOutputStream.toByteArray(), TEST_RESPONSE_BODY.length);

    PowerMockito.mockStatic(CLog.class);
    PowerMockito.verifyZeroInteractions(CLog.class);
    mResponseHandlingInputStream.close();
    PowerMockito.verifyStatic();
  }

  @Test
  public void testSkipFew() throws IOException {
    long numBytesToSkip = TEST_RESPONSE_BODY.length / 2;
    long result = mResponseHandlingInputStream.skip(numBytesToSkip);
    assertEquals(numBytesToSkip, result);
    assertBufferMatchesResponseBody(mTestOutputStream.toByteArray(), (int) numBytesToSkip);

    PowerMockito.mockStatic(CLog.class);
    PowerMockito.doNothing().when(CLog.class);
    CLog.writeToConsole(
        Mockito.any(ChromePeerManager.class),
        Mockito.any(Console.MessageLevel.class),
        Mockito.any(Console.MessageSource.class),
        Mockito.anyString());
    mResponseHandlingInputStream.close();
    PowerMockito.verifyStatic();
  }

  @Test
  public void testSkipMany() throws IOException {
    long numBytesToSkip = TEST_RESPONSE_BODY.length * 2;
    long result = mResponseHandlingInputStream.skip(numBytesToSkip);
    assertEquals((long) TEST_RESPONSE_BODY.length, result);
    assertBufferMatchesResponseBody(mTestOutputStream.toByteArray(), TEST_RESPONSE_BODY.length);
    PowerMockito.verifyZeroInteractions(CLog.class);
    mResponseHandlingInputStream.close();
  }

  private static final class TestIOException extends IOException {}

  @Test
  public void testSwallowException() throws IOException {
    OutputStream exceptionOutputStream = new OutputStream() {
      @Override
      public void write(int oneByte) throws IOException {
        throw new TestIOException();
      }
    };
    ResponseHandlingInputStream responseHandlingInputStream = new ResponseHandlingInputStream(
        new ByteArrayInputStream(TEST_RESPONSE_BODY),
        TEST_REQUEST_ID,
        exceptionOutputStream,
        null /* decompressedCounter */,
        mNetworkPeerManager,
        new DefaultResponseHandler(mNetworkEventReporter, TEST_REQUEST_ID));

    PowerMockito.mockStatic(CLog.class);
    responseHandlingInputStream.read();
    PowerMockito.verifyStatic();
  }

  /**
   * Returns the truncated byte value of position.
   */
  private static byte positionToByte(int position) {
    return (byte) (position % 0xff);
  }

  /**
   * Asserts that buffer's length equal to count and matches the first count bytes of the
   * test response body.
   */
  private static void assertBufferMatchesResponseBody(byte[] buffer, int count) {
    assertArrayEquals(Arrays.copyOf(TEST_RESPONSE_BODY, count), buffer);
  }

}
