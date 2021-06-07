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
package org.apache.weex.uitest.TC_AG;
import org.apache.weex.WXPageActivity;
import org.apache.weex.util.TestFlow;
import java.util.TreeMap;
import org.junit.Before;
import org.junit.Test;

public class AG_Video_Video_Play_Status extends TestFlow {
	public AG_Video_Video_Play_Status() {
		super(WXPageActivity.class);
	}

	@Before
	public void setUp() throws InterruptedException {
		super.setUp();
		TreeMap testMap = new <String, Object> TreeMap();
		testMap.put("testComponet", "AG_Video");
		testMap.put("testChildCaseInit", "AG_Video_Video_Play_Status");
		testMap.put("step1",new TreeMap(){
			{
				put("click", "play");
				put("screenshot", "AG_Video_Video_Play_Status_01_play");
			}
		});
		testMap.put("step2",new TreeMap(){
			{
				put("click", "pause");
				put("screenshot", "AG_Video_Video_Play_Status_02_pause");
			}
		});
		super.setTestMap(testMap);
	}

	@Test
	public void doTest(){
		super.testByTestMap();
	}

}
