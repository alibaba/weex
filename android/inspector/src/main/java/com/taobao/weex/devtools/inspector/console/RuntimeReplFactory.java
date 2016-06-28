/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.console;

/**
 * Allows callers to specify their own Console tab REPL for the DevTools UI.  This is part of
 * early support for a possible optionally included default implementation for Android.
 * <p />
 * A new {@link RuntimeRepl} instances is created for each unique peer such that memory
 * can be garbage collected when the peer disconnects.
 * <p />
 * This is provided as part of an experimental API.  Depend on it at your own risk...
 */
public interface RuntimeReplFactory {
  RuntimeRepl newInstance();
}
