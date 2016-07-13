/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.websocket;

import java.io.EOFException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.concurrent.atomic.AtomicBoolean;

/**
 * Binding driver between raw socket I/O and a high-level WebSocket interface.  This implementation
 * is generally very weak and doesn't offer sensible optimizations such as re-used buffers,
 * efficient UTF-8 encoding/decoding, or the full spectrum of features defined in the RFC.
 */
class WebSocketSession implements SimpleSession {
  private final ReadHandler mReadHandler;
  private final WriteHandler mWriteHandler;
  private final SimpleEndpoint mEndpoint;

  private AtomicBoolean mIsOpen = new AtomicBoolean(false);
  private volatile boolean mSentClose;

  public WebSocketSession(
      InputStream rawSocketInput,
      OutputStream rawSocketOutput,
      SimpleEndpoint endpoint) {
    mReadHandler = new ReadHandler(rawSocketInput, endpoint);
    mWriteHandler = new WriteHandler(rawSocketOutput);
    mEndpoint = endpoint;
  }

  public void handle() throws IOException {
    markAndSignalOpen();

    // Loop until orderly shutdown or socket exception.
    try {
      mReadHandler.readLoop(mReadCallback);
    } catch (EOFException e) {
      // No need to rethrow, this can be considered a graceful shutdown of the socket (though
      // not the WebSocket).
      markAndSignalClosed(CloseCodes.UNEXPECTED_CONDITION, "EOF while reading");
    } catch (IOException e) {
      markAndSignalClosed(CloseCodes.CLOSED_ABNORMALLY, null /* reasonPhrase */);
      throw e;
    }
  }

  @Override
  public void sendText(String payload) {
    doWrite(FrameHelper.createTextFrame(payload));
  }

  @Override
  public void sendBinary(byte[] payload) {
    doWrite(FrameHelper.createBinaryFrame(payload));
  }

  @Override
  public void close(int closeReason, String reasonPhrase) {
    sendClose(closeReason, reasonPhrase);
    markAndSignalClosed(closeReason, reasonPhrase);
  }

  private void sendClose(int closeReason, String reasonPhrase) {
    doWrite(FrameHelper.createCloseFrame(closeReason, reasonPhrase));
    markSentClose();
  }

  void markSentClose() {
    mSentClose = true;
  }

  void markAndSignalOpen() {
    if (!mIsOpen.getAndSet(true)) {
      mEndpoint.onOpen(this /* session */);
    }
  }

  void markAndSignalClosed(int closeReason, String reasonPhrase) {
    if (mIsOpen.getAndSet(false)) {
      mEndpoint.onClose(this /* session */, closeReason, reasonPhrase);
    }
  }

  @Override
  public boolean isOpen() {
    return mIsOpen.get();
  }

  private void doWrite(Frame frame) {
    if (signalErrorIfNotOpen()) {
      return;
    }
    mWriteHandler.write(frame, mErrorForwardingWriteCallback);
  }

  /**
   * Signals an error to the {@link SimpleEndpoint} if the session is closed.
   *
   * @return True if an error was signaled (the session is closed); false otherwise.
   */
  private boolean signalErrorIfNotOpen() {
    if (!isOpen()) {
      signalError(new IOException("Session is closed"));
      return true;
    }
    return false;
  }

  private void signalError(IOException e) {
    mEndpoint.onError(this /* session */, e);
  }

  private final ReadCallback mReadCallback = new ReadCallback() {
    @Override
    public void onCompleteFrame(byte opcode, byte[] payload, int payloadLen) {
      switch (opcode) {
        case Frame.OPCODE_CONNECTION_CLOSE:
          handleClose(payload, payloadLen);
          break;
        case Frame.OPCODE_CONNECTION_PING:
          handlePing(payload, payloadLen);
          break;
        case Frame.OPCODE_CONNECTION_PONG:
          handlePong(payload, payloadLen);
          break;
        case Frame.OPCODE_TEXT_FRAME:
          handleTextFrame(payload, payloadLen);
          break;
        case Frame.OPCODE_BINARY_FRAME:
          handleBinaryFrame(payload, payloadLen);
          break;
        default:
          signalError(new IOException("Unsupported frame opcode=" + opcode));
          break;
      }
    }

    private void handleClose(byte[] payload, int payloadLen) {
      int closeCode;
      String closeReasonPhrase;

      if (payloadLen >= 2) {
        closeCode = ((payload[0] & 0xff) << 8) | (payload[1] & 0xff);
        closeReasonPhrase = (payloadLen > 2) ? new String(payload, 2, payloadLen - 2) : null;
      } else {
        closeCode = CloseCodes.CLOSED_ABNORMALLY;
        closeReasonPhrase = "Unparseable close frame";
      }

      // We must acknowledge the peer's close frame.
      if (!mSentClose) {
        sendClose(CloseCodes.NORMAL_CLOSURE, "Received close frame");
      }

      markAndSignalClosed(closeCode, closeReasonPhrase);
    }

    private void handlePing(byte[] payload, int payloadLen) {
      doWrite(FrameHelper.createPongFrame(payload, payloadLen));
    }

    private void handlePong(byte[] payload, int payloadLen) {
      // Great, whatever...
    }

    private void handleTextFrame(byte[] payload, int payloadLen) {
      mEndpoint.onMessage(WebSocketSession.this, new String(payload, 0, payloadLen));
    }

    private void handleBinaryFrame(byte[] payload, int payloadLen) {
      mEndpoint.onMessage(WebSocketSession.this, payload, payloadLen);
    }
  };

  private final WriteCallback mErrorForwardingWriteCallback = new WriteCallback() {
    @Override
    public void onFailure(IOException e) {
      signalError(e);
    }

    @Override
    public void onSuccess() {
      // Boring...
    }
  };
}
