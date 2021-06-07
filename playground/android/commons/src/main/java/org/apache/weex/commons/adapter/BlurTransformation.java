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
package org.apache.weex.commons.adapter;

import android.graphics.Bitmap;

import com.squareup.picasso.Transformation;

public class BlurTransformation implements Transformation {

  private int mRadius;

  public BlurTransformation(int radius) {
    mRadius = radius;
  }

  @Override public Bitmap transform(Bitmap source) {
    if(mRadius <= 0) {
      return source;
    }
    Bitmap bitmap;
    try {
      bitmap = BlurTool.blur(source, mRadius);
    }catch (Exception e){
      bitmap = source;
    }
    if(bitmap != source) {
      source.recycle();
    }
    return bitmap;
  }

  @Override public String key() {
    return "BlurTransformation(radius=" + mRadius + ")";
  }
}
