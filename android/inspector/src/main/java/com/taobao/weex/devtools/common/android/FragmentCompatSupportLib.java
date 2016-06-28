/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.common.android;

import android.app.Dialog;
import android.content.res.Resources;
import android.support.v4.app.DialogFragment;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentActivity;
import android.support.v4.app.FragmentManager;
import android.view.View;

import javax.annotation.Nullable;

final class FragmentCompatSupportLib
    extends FragmentCompat<Fragment, DialogFragment, FragmentManager, FragmentActivity> {
  private static final FragmentAccessorSupportLib sFragmentAccessor =
      new FragmentAccessorSupportLib();
  private static final DialogFragmentAccessorSupportLib sDialogFragmentAccessor =
      new DialogFragmentAccessorSupportLib();
  private static final FragmentManagerAccessorViaReflection<FragmentManager, Fragment>
      sFragmentManagerAccessor = new FragmentManagerAccessorViaReflection<>();
  private static final FragmentActivityAccessorSupportLib sFragmentActivityAccessor =
      new FragmentActivityAccessorSupportLib();

  @Override
  public Class<Fragment> getFragmentClass() {
    return Fragment.class;
  }

  @Override
  public Class<DialogFragment> getDialogFragmentClass() {
    return DialogFragment.class;
  }

  @Override
  public Class<FragmentActivity> getFragmentActivityClass() {
    return FragmentActivity.class;
  }

  @Override
  public FragmentAccessorSupportLib forFragment() {
    return sFragmentAccessor;
  }

  @Override
  public DialogFragmentAccessorSupportLib forDialogFragment() {
    return sDialogFragmentAccessor;
  }

  @Override
  public FragmentManagerAccessor<FragmentManager, Fragment> forFragmentManager() {
    return sFragmentManagerAccessor;
  }

  @Override
  public FragmentActivityAccessorSupportLib forFragmentActivity() {
    return sFragmentActivityAccessor;
  }

  private static class FragmentAccessorSupportLib
      implements FragmentAccessor<Fragment, FragmentManager> {
    @Nullable
    @Override
    public FragmentManager getFragmentManager(Fragment fragment) {
      return fragment.getFragmentManager();
    }

    @Override
    public Resources getResources(Fragment fragment) {
      return fragment.getResources();
    }

    @Override
    public int getId(Fragment fragment) {
      return fragment.getId();
    }

    @Nullable
    @Override
    public String getTag(Fragment fragment) {
      return fragment.getTag();
    }

    @Nullable
    @Override
    public View getView(Fragment fragment) {
      return fragment.getView();
    }

    @Nullable
    @Override
    public FragmentManager getChildFragmentManager(Fragment fragment) {
      return fragment.getChildFragmentManager();
    }
  }

  private static class DialogFragmentAccessorSupportLib
      extends FragmentAccessorSupportLib
      implements DialogFragmentAccessor<DialogFragment, Fragment, FragmentManager> {
    @Override
    public Dialog getDialog(DialogFragment dialogFragment) {
      return dialogFragment.getDialog();
    }
  }

  private static class FragmentActivityAccessorSupportLib
      implements FragmentActivityAccessor<FragmentActivity, FragmentManager> {
    @Nullable
    @Override
    public FragmentManager getFragmentManager(FragmentActivity activity) {
      return activity.getSupportFragmentManager();
    }
  }
}
