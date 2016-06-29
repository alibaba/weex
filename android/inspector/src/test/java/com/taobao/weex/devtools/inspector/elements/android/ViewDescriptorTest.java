package com.taobao.weex.devtools.inspector.elements.android;

import android.app.Activity;
import android.os.Build;
import android.widget.CheckBox;
import android.widget.TextView;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.robolectric.Robolectric;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.annotation.Config;

import static org.mockito.Matchers.anyObject;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

@Config(emulateSdk = Build.VERSION_CODES.JELLY_BEAN)
@RunWith(RobolectricTestRunner.class)
public class ViewDescriptorTest {

  private final MethodInvoker mMethodInvoker = mock(MethodInvoker.class);
  private final ViewDescriptor mDescriptor = new ViewDescriptor(mMethodInvoker);
  private final Activity mActivity = Robolectric.setupActivity(Activity.class);
  private final TextView mTextView = new TextView(mActivity);
  private final CheckBox mCheckBox = new CheckBox(mActivity);

  @Test
  public void testSetAttributeAsTextWithSetText() {
    mDescriptor.setAttributesAsText(mTextView, "text=\"Hello World\"");
    verify(mMethodInvoker).invoke(mTextView, "setText", "Hello World");
  }

  @Test
  public void testSetAttributeAsTextWithSetId() {
    mDescriptor.setAttributesAsText(mTextView, "id=\"2\"");
    verify(mMethodInvoker).invoke(mTextView, "setId", "2");
  }

  @Test
  public void testSetAttributeAsTextWithSetChecked() {
    mDescriptor.setAttributesAsText(mCheckBox, "checked=\"true\"");
    verify(mMethodInvoker).invoke(mCheckBox, "setChecked", "true");
  }

  @Test
  public void testSetMultipleAttributesAsText() {
    mDescriptor.setAttributesAsText(mTextView, "id=\"2\" text=\"Hello World\"");
    verify(mMethodInvoker).invoke(mTextView, "setId", "2");
    verify(mMethodInvoker).invoke(mTextView, "setText", "Hello World");
  }

  @Test
  public void testSetAttributeAsTextIgnoreInvalidFormat() {
    mDescriptor.setAttributesAsText(mTextView, "garbage");
    verify(mMethodInvoker, never()).invoke(anyObject(), anyString(), anyString());
  }
}