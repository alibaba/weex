/**
 * Licensed to the Apache Software Foundation (ASF) under one or more contributor license
 * agreements.  See the NOTICE file distributed with this work for additional information regarding
 * copyright ownership.  The ASF licenses this file to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with the License.  You may obtain
 * a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied.  See the License for the specific language governing permissions and limitations
 * under the License.
 */
package com.taobao.weex.ui.component;

import android.media.MediaPlayer;
import android.net.Uri;
import android.text.TextUtils;
import android.view.Gravity;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.MediaController;
import android.widget.ProgressBar;

import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.WXSDKManager;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.view.WXVideoView;
import com.taobao.weex.utils.WXLogUtils;
import com.taobao.weex.utils.WXResourceUtils;

public class WXVideo extends WXComponent {

  private WXVideoView mVideoView;
  private boolean mAutoPlay;
  private String mSrc;
  private boolean mSrcChanged;
  private boolean mPrepared;
  private boolean mError;
  private ProgressBar mProgressBar;

  public WXVideo(WXSDKInstance instance, WXDomObject dom, WXVContainer parent, String instanceId, boolean isLazy) {
    super(instance, dom, parent, instanceId, isLazy);
  }

  @Override
  protected void initView() {
    FrameLayout videoRoot = new FrameLayout(mContext);
    videoRoot.setBackgroundColor(WXResourceUtils.getColor("#ee000000"));

    mVideoView = new WXVideoView(mContext);
    FrameLayout.LayoutParams videoLayoutParams =
            new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT,
                    FrameLayout.LayoutParams.MATCH_PARENT);
    videoLayoutParams.gravity = Gravity.CENTER;
    mVideoView.setLayoutParams(videoLayoutParams);
    videoRoot.addView(mVideoView);

    mProgressBar = new ProgressBar(mContext);
    FrameLayout.LayoutParams pLayoutParams =
            new FrameLayout.LayoutParams(FrameLayout.LayoutParams.WRAP_CONTENT,
                    FrameLayout.LayoutParams.WRAP_CONTENT);
    mProgressBar.setLayoutParams(pLayoutParams);
    pLayoutParams.gravity = Gravity.CENTER;
    videoRoot.addView(mProgressBar);

    final MediaController controller = new MediaController(mContext);

    controller.setAnchorView(videoRoot);

    mVideoView.setOnErrorListener(new MediaPlayer.OnErrorListener() {

      @Override
      public boolean onError(MediaPlayer mp, int what, int extra) {
        if (WXEnvironment.isApkDebugable()) {
          WXLogUtils.d("Video", "onError:" + what);
        }
        mProgressBar.setVisibility(View.GONE);
        mPrepared = false;
        mError = true;

        if (mDomObj.event != null && mDomObj.event.contains(WXEventType.VIDEO_FAIL)) {
          WXSDKManager.getInstance().fireEvent(mInstanceId, getRef(), WXEventType.VIDEO_FAIL);
        }
        return true;
      }
    });

    mVideoView.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {

      @Override
      public void onPrepared(MediaPlayer mediaPlayer) {
        if (WXEnvironment.isApkDebugable()) {
          WXLogUtils.d("Video", "onPrepared");
        }
        mProgressBar.setVisibility(View.GONE);
        mPrepared = true;
        if (mAutoPlay) {
          mVideoView.start();
        }
        mVideoView.seekTo(5);
        if(!mStopped) {
          controller.show(3);
        }else {
          controller.hide();
        }
        mStopped = false;
      }
    });

    mVideoView.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {

      @Override
      public void onCompletion(MediaPlayer mediaPlayer) {
        if (WXEnvironment.isApkDebugable()) {
          WXLogUtils.d("Video", "onCompletion");
        }
        if (mDomObj.event != null && mDomObj.event.contains(WXEventType.VIDEO_FINISH)) {
          WXSDKManager.getInstance().fireEvent(mInstanceId, getRef(), WXEventType.VIDEO_FINISH);
        }
      }
    });

    mVideoView.setOnVideoPauseListener(new WXVideoView.VideoPlayListener() {

      @Override
      public void onPause() {
        if (WXEnvironment.isApkDebugable()) {
          WXLogUtils.d("Video", "onPause");
        }
        if (mDomObj.event != null && mDomObj.event.contains(WXEventType.VIDEO_PAUSE)) {
          WXSDKManager.getInstance().fireEvent(mInstanceId, getRef(), WXEventType.VIDEO_PAUSE);
        }
      }

      @Override
      public void onStart() {
        if (WXEnvironment.isApkDebugable()) {
          WXLogUtils.d("Video", "onStart");
        }

        if (mDomObj.event != null && mDomObj.event.contains(WXEventType.VIDEO_START)) {
          WXSDKManager.getInstance().fireEvent(mInstanceId, getRef(), WXEventType.VIDEO_START);
        }
      }
    });

    mVideoView.setMediaController(controller);
    controller.setMediaPlayer(mVideoView);

    mHost = videoRoot;
  }

  @Override
  public void flushView() {
    super.flushView();

    if (!TextUtils.isEmpty(mSrc) && mSrcChanged) {
      mSrcChanged = false;
      mVideoView.setVideoURI(Uri.parse(mSrc));
      mProgressBar.setVisibility(View.VISIBLE);
    }
  }

  @Override
  public void destroy() {
    super.destroy();
  }

  @WXComponentProp(name = "src")
  public void setSrc(String src) {
    if (TextUtils.isEmpty(src) || mHost == null) {
      return;
    }
    mSrc = src;
    mSrcChanged = true;
  }

  @WXComponentProp(name = "autoPlay")
  public void setAutoPlay(boolean autoPlay) {
    mAutoPlay = autoPlay;
  }

  private boolean mStopped;

  @WXComponentProp(name = "playStatus")
  public void setPlaystatus(String playstatus) {

    if (mPrepared && !mError && !mStopped) {
      if (playstatus.equals("play")) {
        mVideoView.start();
      } else if (playstatus.equals("pause")) {
        mVideoView.pause();
      } else if (playstatus.equals("stop")) {
        mVideoView.stopPlayback();
        mStopped = true;
      }
    } else if ((mError || mStopped) && playstatus.equals("play")) {
      mError = false;
      mVideoView.resume();
      mProgressBar.setVisibility(View.VISIBLE);
    }
  }
}
