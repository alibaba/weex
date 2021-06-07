/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package org.apache.weex.benchmark;

import static android.support.test.espresso.Espresso.onView;
import static android.support.test.espresso.matcher.ViewMatchers.withClassName;

import android.support.test.InstrumentationRegistry;
import android.support.test.espresso.action.ViewActions;
import android.support.test.rule.ActivityTestRule;
import android.support.test.runner.AndroidJUnit4;
import android.support.test.uiautomator.UiDevice;
import android.text.TextUtils;
import android.util.Log;
import android.widget.TextView;
import org.apache.weex.BenchmarkActivity;
import com.taobao.weex.ui.view.WXFrameLayout;
import com.taobao.weex.utils.WXLogUtils;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import org.hamcrest.Matchers;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

@RunWith(AndroidJUnit4.class)
public class WeexNativeCompareTest {
  private static final String TAG = "benchmark";
  private static final int TIMES = 40;
  private static final int FRAMES = 120;
  private static final float FIRST_SCREEN_RENDER_TIME = 600F;
  private static final String DUMP_START = "Flags,IntendedVsync,Vsync,OldestInputEvent,NewestInputEvent,"
                                           + "HandleInputStart,AnimationStart,PerformTraversalsStart,DrawStart,"
                                           + "SyncQueued,SyncStart,IssueDrawCommandsStart,SwapBuffers,FrameCompleted,\n";
  private static final String DUMP_END = "---PROFILEDATA---";
  private static final String DUMP_COMMAND = "dumpsys gfxinfo org.apache.weex framestats reset";

  @Rule
  public ActivityTestRule<BenchmarkActivity> mActivityRule = new ActivityTestRule(
      BenchmarkActivity.class);
  @Rule
  public RepeatRule repeatRule = new RepeatRule();
  private UiDevice mUiDevice;

  @Before
  public void init() {
    mUiDevice = UiDevice.getInstance(InstrumentationRegistry.getInstrumentation());
  }

  @Test
  public void testWeexPerformance() {
    List<Long> localTotalTime = new ArrayList<>(TIMES);
    for (int i = 0; i < TIMES; i++) {
      long currentTime = calcTime(true);
      localTotalTime.add(currentTime);
      Log.d(TAG, "Weex render time: " + currentTime + "ms");
    }
    BoxPlot boxPlot = new BoxPlot(localTotalTime);
    Log.i(TAG, "Average Weex render time: " + boxPlot.draw());
  }

  @Test
  public void testNativePerformance(){
    List<Long> localTotalTime = new ArrayList<>(TIMES);
    for (int i = 0; i < TIMES; i++) {
      long currentTime = calcTime(false);
      localTotalTime.add(currentTime);
      Log.d(TAG, "Native render time: " + currentTime + "ms");
    }
    BoxPlot boxPlot = new BoxPlot(localTotalTime);
    Log.i(TAG, "Average native render time: " + boxPlot.draw());
  }

  private long calcTime(boolean weex) {
    BenchmarkActivity benchmarkActivity = mActivityRule.getActivity();
    benchmarkActivity.loadWeexPage(weex);
    if(weex) {
      onView(withClassName(Matchers.is(WXFrameLayout.class.getName()))).perform
          (ViewActions.swipeDown());
    }
    else{
      onView(withClassName(Matchers.is(TextView.class.getName()))).perform
          (ViewActions.swipeDown());
    }
    return benchmarkActivity.getDuration();
        //.getWXInstance().getWXPerformance().screenRenderTime;
  }

  private void processGfxInfo(List<Long> container) {
    try {
      String line;
      String[] columns;
      long timeStart, timeEnd, duration;
      String result = mUiDevice.executeShellCommand(DUMP_COMMAND);
      result = result.substring(result.indexOf(DUMP_START), result.lastIndexOf(DUMP_END));
      result = result.substring(DUMP_START.length());
      BufferedReader bufferedReader = new BufferedReader(new StringReader(result));
      List<Long> list = createList(bufferedReader);
      container.addAll(list);
      BoxPlot boxPlot = new BoxPlot(list);
      boxPlot.draw();
      Log.d(TAG, "FPS : " + boxPlot.getMedian() + " ms");
    } catch (IOException e) {
      WXLogUtils.e(TAG, WXLogUtils.getStackTrace(e));
    }
  }

  private List<Long> createList(BufferedReader bufferedReader) throws IOException {
    String line;
    String[] columns;
    long timeStart, timeEnd, duration;
    List<Long> list = new ArrayList<>(FRAMES);
    while (!TextUtils.isEmpty(line = bufferedReader.readLine())) {
      columns = line.split(",");
      if (Long.parseLong(columns[0]) == 0) {
        timeStart = Long.parseLong(columns[1]);
        timeEnd = Long.parseLong(columns[columns.length - 1]);
        duration = timeEnd - timeStart;
        if (duration > 0) {
          list.add(TimeUnit.MILLISECONDS.convert(duration, TimeUnit.NANOSECONDS));
        }
      }
    }
    return list;
  }
}
