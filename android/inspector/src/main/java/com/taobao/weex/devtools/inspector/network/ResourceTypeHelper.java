/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.network;

import com.taobao.weex.devtools.inspector.protocol.module.Page;

public class ResourceTypeHelper {
  private final MimeMatcher<Page.ResourceType> mMimeMatcher;

  public ResourceTypeHelper() {
    mMimeMatcher = new MimeMatcher<Page.ResourceType>();
    mMimeMatcher.addRule("text/css", Page.ResourceType.STYLESHEET);
    mMimeMatcher.addRule("image/*", Page.ResourceType.IMAGE);
    mMimeMatcher.addRule("application/x-javascript", Page.ResourceType.SCRIPT);
    mMimeMatcher.addRule("application/javascript", Page.ResourceType.SCRIPT);

    // This is apparently important to allow the WebKit inspector to do JSON preview.  I don't
    // know exactly why, but whatever.
    mMimeMatcher.addRule("text/javascript", Page.ResourceType.XHR);
    mMimeMatcher.addRule("application/json", Page.ResourceType.XHR);

    // Everything else gets a lame, unformatted blob.
    mMimeMatcher.addRule("text/*", Page.ResourceType.DOCUMENT);

    // I think this disables preview.  Perhaps that's not what we want as the default but we'll
    // need some time to soak in real data to see for sure.
    mMimeMatcher.addRule("*", Page.ResourceType.OTHER);
  }

  public Page.ResourceType determineResourceType(String contentType) {
    String mimeType = stripContentExtras(contentType);
    return mMimeMatcher.match(mimeType);
  }

  /**
   * Strip out any extra data following the semicolon (e.g. \"text/javascript; charset=UTF-8").
   *
   * @return MIME type with content extras stripped out (if there were any).
   */
  public String stripContentExtras(String contentType) {
    int index = contentType.indexOf(';');
    return (index >= 0) ? contentType.substring(0, index) : contentType;
  }
}
