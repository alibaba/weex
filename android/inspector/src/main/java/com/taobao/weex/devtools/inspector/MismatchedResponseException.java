/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector;

public class MismatchedResponseException extends MessageHandlingException {
  public long mRequestId;

  public MismatchedResponseException(long requestId) {
    super("Response for request id " + requestId + ", but no such request is pending");
    mRequestId = requestId;
  }

  public long getRequestId() {
    return mRequestId;
  }
}
