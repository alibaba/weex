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

import java.util.Collections;
import java.util.List;

public class BoxPlot {

  private static final String LINE = "–";

  private List<Long> array;

  private float average, max, min, median, q1, q3;

  public BoxPlot(List<Long> array) {
    this.array = array;
  }

  public void clear() {
    if (array != null) {
      array.clear();
    }
  }

  public float getAverage(){
    return average;
  }

  public float getMedian(){
    return median;
  }

  public String draw() {
    StringBuilder stringBuilder = new StringBuilder();
    if(array!=null) {
      calcValues();
      stringBuilder.append("Average: ");
      stringBuilder.append(average);
      stringBuilder.append(", min: ");
      stringBuilder.append(min);
      stringBuilder.append(", q1: ");
      stringBuilder.append(q1);
      stringBuilder.append(", median: ");
      stringBuilder.append(median);
      stringBuilder.append(", q3: ");
      stringBuilder.append(q3);
      stringBuilder.append(", max: ");
      stringBuilder.append(max);
    }
    return stringBuilder.toString();
  }

  private void calcValues() {
    long sum = 0;
    Collections.sort(array);
    max = Collections.max(array);
    min = Collections.min(array);
    median = array.get(array.size() / 2);
    q1 = array.get(array.size() / 4);
    q3 = array.get(array.size() / 4 * 3);
    for (Long value : array) {
      sum += value;
    }
    average = sum / (float)array.size();
  }
}
