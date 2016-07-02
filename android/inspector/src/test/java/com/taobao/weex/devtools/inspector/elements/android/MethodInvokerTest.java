/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.elements.android;

import android.app.Activity;
import android.os.Build;
import android.widget.CheckBox;
import android.widget.TextView;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.robolectric.Robolectric;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.annotation.Config;

import static org.junit.Assert.assertEquals;

@Config(emulateSdk = Build.VERSION_CODES.JELLY_BEAN)
@RunWith(RobolectricTestRunner.class)
public class MethodInvokerTest {

  private final Activity mActivity = Robolectric.setupActivity(Activity.class);
  private final TextView mTextView = new TextView(mActivity);
  private final CheckBox mCheckBox = new CheckBox(mActivity);
  private final MethodInvoker mInvoker = new MethodInvoker();

  @Before
  public void setup() {
  }

  @Test
  public void testSetCharSequence() {
    mInvoker.invoke(mTextView, "setText", "Hello World");
    assertEquals("Hello World", mTextView.getText().toString());
  }

  @Test
  public void testSetInteger() {
    mInvoker.invoke(mTextView, "setId", "2");
    assertEquals(2, mTextView.getId());
  }

  @Test
  public void testSetFloat() {
    mInvoker.invoke(mTextView, "setTextSize", "34");
    assertEquals(34f, mTextView.getTextSize(), 0);
  }

  @Test
  public void testSetBoolean() {
    mInvoker.invoke(mCheckBox, "setChecked", "true");
    assertEquals(true, mCheckBox.isChecked());
  }

  @Test
  public void testSetAttributeAsTextIgnoreUnknownAttribute() {
    // Should not throw
    mInvoker.invoke(mTextView, "setSomething", "foo");
  }
}
