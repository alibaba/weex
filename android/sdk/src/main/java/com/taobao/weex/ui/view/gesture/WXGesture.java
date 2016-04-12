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
package com.taobao.weex.ui.view.gesture;

import android.content.Context;
import android.graphics.Point;
import android.graphics.PointF;
import android.graphics.Rect;
import android.os.Looper;
import android.support.annotation.NonNull;
import android.view.GestureDetector;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnTouchListener;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.taobao.weex.WXSDKManager;
import com.taobao.weex.ui.component.WXComponent;
import com.taobao.weex.ui.component.WXEventType;
import com.taobao.weex.ui.view.gesture.WXGestureType.GestureInfo;
import com.taobao.weex.ui.view.gesture.WXGestureType.HighLevelGesture;
import com.taobao.weex.ui.view.gesture.WXGestureType.LowLevelGesture;
import com.taobao.weex.utils.WXLogUtils;
import com.taobao.weex.utils.WXViewUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class WXGesture implements OnTouchListener {

  private final static String TAG = "Gesture";
  private static final int CUR_EVENT = -1;
  private WXComponent component;
  private GestureDetector mGestureDetector;
  private Rect globalRect;
  private Point globalOffset;
  private Point globalEventOffset;
  private PointF locEventOffset;
  private PointF locLeftTop;
  private boolean scrolling;
  public WXGesture(WXComponent wxComponent, Context context) {
    this.component = wxComponent;
    globalRect = new Rect();
    globalOffset = new Point();
    globalEventOffset = new Point();
    locEventOffset = new PointF();
    locLeftTop = new PointF();
    mGestureDetector = new GestureDetector(context, new GestureListener(), new GestureHandler());
  }

  @Override
  public boolean onTouch(View v, MotionEvent event) {
    try {
      boolean result = mGestureDetector.onTouchEvent(event);
      switch (event.getActionMasked()) {
        case MotionEvent.ACTION_POINTER_DOWN:
        case MotionEvent.ACTION_DOWN:
          result |= handleMotionEvent(LowLevelGesture.ACTION_DOWN, event);
          break;
        case MotionEvent.ACTION_MOVE:
          result |= handleMotionEvent(LowLevelGesture.ACTION_MOVE, event);
          break;
        case MotionEvent.ACTION_UP:
          if (scrolling) {
            result |= handleMotionEvent(HighLevelGesture.PAN_END, event);
            scrolling = false;
          }
          result |= handleMotionEvent(LowLevelGesture.ACTION_UP, event);
          break;
        case MotionEvent.ACTION_POINTER_UP:
          result |= handleMotionEvent(LowLevelGesture.ACTION_UP, event);
          break;
        case MotionEvent.ACTION_CANCEL:
          result |= handleMotionEvent(LowLevelGesture.ACTION_CANCEL, event);
          break;
      }
      return result;
    } catch (Exception e) {
      WXLogUtils.e("Gesture RunTime Error " + WXLogUtils.getStackTrace(e));
      return false;
    }
  }

  /**
   * Handle low-level gesture
   * @param WXGestureType possible low-level gesture, defined in {@link WXEventType}
   * @param motionEvent motionEvent, which contains all pointers event in a period of time
   * @return true if this event is handled, otherwise false.
   */
  private boolean handleMotionEvent(WXGestureType WXGestureType, MotionEvent motionEvent) {
    if (component.containsGesture(WXGestureType)) {
      List<Map<String, Object>> list = createFireEventParam(motionEvent);
      for (Map<String, Object> map : list) {
        WXSDKManager.getInstance().fireEvent(component.mInstanceId, component.mDomObj.ref,
                                             WXGestureType.toString(), map);
      }
      return true;
    } else {
      return false;
    }
  }

  /**
   * Create a list of event for {@link WXSDKManager#fireEvent(String, String, String, Map)}.
   * As there is a batch mechanism in MotionEvent, so this method returns a list.
   * @param motionEvent motionEvent, which contains all pointers event in a period of time
   * @return List of Map, which contains touch object.
   */
  private List<Map<String, Object>> createFireEventParam(MotionEvent motionEvent) {
    List<Map<String, Object>> list = new ArrayList<>(motionEvent.getHistorySize() + 1);
    list.addAll(getHistoricalEvents(motionEvent));
    list.add(createFireEventParam(motionEvent, CUR_EVENT));
    return list;
  }

  /**
   * Get historical event. This is only applied to {@link MotionEvent#ACTION_MOVE}.
   * For other types of motionEvent, historical event is meaningless.
   * @param motionEvent motionEvent, which contains all pointers event in a period of time
   * @return If motionEvent.getActionMasked()!=MotionEvent.ACTION_MOVE,
   * this method will return an empty list.
   * Otherwise this method will return the historical motionEvent, which may also be empty.
   */
  private List<Map<String, Object>> getHistoricalEvents(MotionEvent motionEvent) {
    List<Map<String, Object>> list = new ArrayList<>(motionEvent.getHistorySize());
    if (motionEvent.getActionMasked() == MotionEvent.ACTION_MOVE) {
      Map<String, Object> param;
      for (int i = 0; i < motionEvent.getHistorySize(); i++) {
        param = createFireEventParam(motionEvent, i);
        list.add(param);
      }
    }
    return list;
  }

  /**
   * Create a map represented touch event at a certain moment.
   * @param motionEvent motionEvent, which contains all pointers event in a period of time
   * @param pos index used to retrieve a certain moment in a period of time.
   * @return touchEvent
   * @see <a href="https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent">touchEvent</a>
   */
  private Map<String, Object> createFireEventParam(MotionEvent motionEvent, int pos) {
    JSONArray jsonArray = new JSONArray(motionEvent.getPointerCount());
    if (motionEvent.getActionMasked() == MotionEvent.ACTION_MOVE) {
      for (int i = 0; i < motionEvent.getPointerCount(); i++) {
        jsonArray.add(createJSONObject(motionEvent, pos, i));
      }
    } else if (isPointerNumChanged(motionEvent)) {
      int pointerIndex = motionEvent.getActionIndex();
      jsonArray.add(createJSONObject(motionEvent, CUR_EVENT, pointerIndex));
    }
    Map<String, Object> map = new HashMap<>();
    map.put(GestureInfo.HISTORICAL_XY, jsonArray);
    return map;
  }

  /**
   * Tell whether the number of motion event's pointer changed.
   * @param event the current motion event
   * @return true for number of motion event's pointer changed, otherwise false.
   */
  private boolean isPointerNumChanged(MotionEvent event) {
    return event.getActionMasked() == MotionEvent.ACTION_DOWN ||
           event.getActionMasked() == MotionEvent.ACTION_POINTER_DOWN ||
           event.getActionMasked() == MotionEvent.ACTION_UP ||
           event.getActionMasked() == MotionEvent.ACTION_POINTER_UP ||
           event.getActionMasked() == MotionEvent.ACTION_CANCEL;
  }

  /**
   * Tell whether component contains pan gesture
   * @return true for contains pan gesture, otherwise false.
   */
  private boolean containsPan() {
    return component.containsGesture(HighLevelGesture.PAN_START) ||
           component.containsGesture(HighLevelGesture.PAN_MOVE) ||
           component.containsGesture(HighLevelGesture.PAN_END);
  }

  /**
   * Create a touchObject for a pointer at a certain moment.
   * @param motionEvent motionEvent, which contains all pointers event in a period of time
   * @param pos index used to retrieve a certain moment in a period of time.
   * @param pointerIndex pointerIndex
   * @return JSONObject represent a touch event
   * @see <a href="https://developer.mozilla.org/en-US/docs/Web/API/Touch">touch</a>
   */
  private JSONObject createJSONObject(MotionEvent motionEvent, int pos, int pointerIndex) {
    PointF screenXY, pageXY;
    if (pos == CUR_EVENT) {
      pageXY = getEventLocInPageCoordinate(motionEvent, pointerIndex);
      screenXY = getEventLocInScreenCoordinate(motionEvent, pointerIndex);
    } else {
      pageXY = getEventLocInPageCoordinate(motionEvent, pointerIndex, pos);
      screenXY = getEventLocInScreenCoordinate(motionEvent, pointerIndex, pos);
    }
    return createJSONObject(screenXY, pageXY, (float) motionEvent.getPointerId(pointerIndex));
  }

  /**
   * Create a touchObject for a pointer at a certain moment.
   * @param screenXY the point of event happened in screen coordinate
   * @param pageXY the point of event happened in page coorindate
   * @param pointerId pointerIndex pointerIndex
   * @return JSONObject represent a touch event
   * @see <a href="https://developer.mozilla.org/en-US/docs/Web/API/Touch">touch</a>
   */
  @NonNull
  private JSONObject createJSONObject(PointF screenXY, PointF pageXY, float pointerId) {
    JSONObject jsonObject = new JSONObject();
    jsonObject.put(GestureInfo.PAGE_X, pageXY.x);
    jsonObject.put(GestureInfo.PAGE_Y, pageXY.y);
    jsonObject.put(GestureInfo.SCREEN_X, screenXY.x);
    jsonObject.put(GestureInfo.SCREEN_Y, screenXY.y);
    jsonObject.put(GestureInfo.POINTER_ID, pointerId);
    return jsonObject;
  }

  /**
   * @see {@link #getEventLocInScreenCoordinate(MotionEvent, int, int)}
   */
  private PointF getEventLocInScreenCoordinate(MotionEvent motionEvent, int pointerIndex) {
    return getEventLocInScreenCoordinate(motionEvent, pointerIndex, CUR_EVENT);
  }

  /**
   * Get event location in Screen's coordinate, e.g. root(global) coordinate.
   * @see <a href="https://developer.mozilla.org/en-US/docs/Web/API/Touch/screenX">screenX</a>
   * @see <a href="https://developer.mozilla.org/en-US/docs/Web/API/Touch/screenY">screenY</a>
   * @param motionEvent the original motionEvent
   * @param pointerIndex pointerIndex
   * @param position if motionEvent.getHistoricalSize()!=0, the is the index of historical event,
   *                 otherwise this is {@link #CUR_EVENT} which indicates historicalSize is zero
   * @return the eventLocation in screen's coordinate
   */
  private PointF getEventLocInScreenCoordinate(MotionEvent motionEvent, int pointerIndex, int position) {
    float eventX, eventY;
    if (position == CUR_EVENT) {
      eventX = motionEvent.getX(pointerIndex);
      eventY = motionEvent.getY(pointerIndex);
    } else {
      eventX = motionEvent.getHistoricalX(pointerIndex, position);
      eventY = motionEvent.getHistoricalY(pointerIndex, position);
    }
    return getEventLocInScreenCoordinate(eventX, eventY);
  }

  /**
   * Get event location in Screen's coordinate, e.g. root(global) coordinate.
   * @param eventX {@link MotionEvent#getX()} or {@link MotionEvent#getHistoricalX(int, int)}
   * @param eventY {@link MotionEvent#getX()} or {@link MotionEvent#getHistoricalX(int, int)}
   * @return the eventLocation in screen's coordinate
   * @see {@link #getEventLocInScreenCoordinate(MotionEvent, int, int)}
   */
  @NonNull
  private PointF getEventLocInScreenCoordinate(float eventX, float eventY) {
    globalRect.set(0, 0, 0, 0);
    globalOffset.set(0, 0);
    globalEventOffset.set((int) eventX, (int) eventY);
    component.getRealView().getGlobalVisibleRect(globalRect, globalOffset);
    globalEventOffset.offset(globalOffset.x, globalOffset.y);
    return new PointF(WXViewUtils.getWebPxByWidth(globalEventOffset.x),
                      WXViewUtils.getWebPxByWidth(globalEventOffset.y));
  }

  /**
   * @see {@link #getEventLocInPageCoordinate(MotionEvent, int, int)}
   */
  private PointF getEventLocInPageCoordinate(MotionEvent motionEvent, int pointerIndex) {
    return getEventLocInPageCoordinate(motionEvent, pointerIndex, CUR_EVENT);
  }

  /**
   * Get event's location in Document's (Page) coordinate.
   * @see <a href="https://developer.mozilla.org/en-US/docs/Web/API/Touch/pageX">pageX</a>
   * @see <a href="https://developer.mozilla.org/en-US/docs/Web/API/Touch/pageY">pageY</a>
   * @param motionEvent the original motionEvent
   * @param pointerIndex pointerIndex
   * @param position if motionEvent.getHistoricalSize()!=0, the is the index of historical event,
   *                 otherwise this is {@link #CUR_EVENT} which indicates historicalSize is zero
   * @return the event location in page's coordinate.
   */
  private PointF getEventLocInPageCoordinate(MotionEvent motionEvent, int pointerIndex, int position) {
    float eventX, eventY;
    if (position == CUR_EVENT) {
      eventX = motionEvent.getX(pointerIndex);
      eventY = motionEvent.getY(pointerIndex);
    } else {
      eventX = motionEvent.getHistoricalX(pointerIndex, position);
      eventY = motionEvent.getHistoricalY(pointerIndex, position);
    }
    return getEventLocInPageCoordinate(eventX, eventY);
  }

  /**
   * Get event's location in Document's (Page) coordinate.
   * @param eventX {@link MotionEvent#getX()} or {@link MotionEvent#getHistoricalX(int, int)}
   * @param eventY {@link MotionEvent#getX()} or {@link MotionEvent#getHistoricalX(int, int)}
   * @return the event location in page's coordinate.
   * @see {@link #getEventLocInPageCoordinate(MotionEvent, int, int)}
   */
  @NonNull
  private PointF getEventLocInPageCoordinate(float eventX, float eventY) {
    locEventOffset.set(eventX, eventY);
    locLeftTop.set(0, 0);
    component.computeVisiblePointInViewCoordinate(locLeftTop);
    locEventOffset.offset(locLeftTop.x, locLeftTop.y);
    return new PointF(WXViewUtils.getWebPxByWidth(locEventOffset.x),
                      WXViewUtils.getWebPxByWidth(locEventOffset.y));
  }

  private static class GestureHandler extends android.os.Handler {

    public GestureHandler() {
      super(Looper.getMainLooper());
    }
  }

  private class GestureListener extends GestureDetector.SimpleOnGestureListener {

    private long swipeDownTime = -1;
    private long panDownTime = -1;

    @Override
    public void onLongPress(MotionEvent e) {
      if (component.containsGesture(HighLevelGesture.LONG_PRESS)) {
        List<Map<String, Object>> list = createFireEventParam(e);
        WXSDKManager.getInstance().fireEvent(component.mInstanceId,
                                             component.mDomObj.ref,
                                             HighLevelGesture.LONG_PRESS.toString(),
                                             list.get(list.size() - 1));
      }
    }

    @Override
    public boolean onScroll(MotionEvent e1, MotionEvent e2, float distanceX, float distanceY) {
      boolean result = false;
      if (containsPan() &&
          (e2.getPointerId(e1.getActionIndex()) == e1.getPointerId(e1.getActionIndex()))) {
        if (panDownTime != e1.getEventTime()) {
          panDownTime = e1.getEventTime();
          scrolling = true;
          WXSDKManager.getInstance().fireEvent(component.mInstanceId,
                                               component.mDomObj.ref, HighLevelGesture.PAN_START.toString(),
                                               createFireEventParam(e1, CUR_EVENT));
        } else {
          WXSDKManager.getInstance().fireEvent(component.mInstanceId,
                                               component.mDomObj.ref, HighLevelGesture.PAN_MOVE.toString(),
                                               createFireEventParam(e2, CUR_EVENT));
        }
        result = true;
      }
      if (component.containsGesture(HighLevelGesture.SWIPE)) {
        if (swipeDownTime != e1.getEventTime()) {
          swipeDownTime = e1.getEventTime();
          List<Map<String, Object>> list = createFireEventParam(e2);
          Map<String, Object> param = list.get(list.size() - 1);
          if (Math.abs(distanceX) > Math.abs(distanceY)) {
            param.put(GestureInfo.DIRECTION, distanceX > 0 ? "left" : "right");
          } else {
            param.put(GestureInfo.DIRECTION, distanceY > 0 ? "up" : "down");
          }
          WXSDKManager.getInstance().fireEvent(component.mInstanceId, component.mDomObj.ref,
                                               HighLevelGesture.SWIPE.toString(), param);
          result = true;
        }
      }
      return result;
    }

    @Override
    public boolean onDown(MotionEvent e) {
      return true;
    }

  }

}