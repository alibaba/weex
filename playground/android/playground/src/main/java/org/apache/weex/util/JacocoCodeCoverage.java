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

package org.apache.weex.util;

import android.content.Context;
import android.util.Log;

import com.taobao.weex.utils.WXLogUtils;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

public class JacocoCodeCoverage {
  public static final String TAG = "CoverageDataDumper";

  public static void dumpCodeCoverage(Context context){

	WXLogUtils.d( TAG, "CoverageDataDumper BroadcastReceiver " );

	try {
	  Class
			  .forName( "com.vladium.emma.rt.RT" )
			  .getMethod( "dumpCoverageData", File.class, boolean.class, boolean.class )
			  .invoke( null,
					  new File(context.getExternalFilesDir( null ) + "/coverage.ec" ),
					  true, // merge
					  false // stopDataCollection
			  );
	  WXLogUtils.d( TAG, "generateCoverageReport: ok! " +
			  "file in [Android/data/org.apache.weex/files]" );
	}

	catch ( Exception e ) {
	  WXLogUtils.e( TAG, e );
	}
  }

  public static void dumpCodeCoverageByJacoco(Context context){

	WXLogUtils.d(TAG, "generateCoverageReport()");

	java.io.File coverageFile = new File(context.getExternalFilesDir( null ) + "/coverage.ec");
	OutputStream out = null;
	// We may use this if we want to avoid refecltion and we include
	// emma.jar
	//RT.dumpCoverageData(coverageFile, false, false);
	// Use reflection to call emma dump coverage method, to avoid
	// always statically compiling against emma jar
	try {
	  Object agent = Class.forName("org.jacoco.agent.rt.RT")
			  .getMethod("getAgent")
			  .invoke(null);
	  out = new FileOutputStream(coverageFile,false);
	  out.write((byte[]) agent.getClass().getMethod("getExecutionData", boolean.class)
			  .invoke(agent, false));
	  WXLogUtils.d( TAG, "generateCoverageReport: ok! " +
			  "file in [Android/data/org.apache.weex/files]" );

	} catch (Exception e) {
	  Log.e(TAG, e.toString());
	} finally {
	  if (out != null) {
		try {
		  out.close();
		} catch (IOException e) {
		  Log.e(TAG, e.getMessage().toString());
		}
	  }
	}
  }
}


