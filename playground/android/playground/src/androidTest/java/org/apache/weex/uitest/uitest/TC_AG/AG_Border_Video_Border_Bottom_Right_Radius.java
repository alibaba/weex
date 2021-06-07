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

public class AG_Border_Video_Border_Bottom_Right_Radius extends TestFlow {
	public AG_Border_Video_Border_Bottom_Right_Radius() {
		super(WXPageActivity.class);
	}

	@Before
	public void setUp() throws InterruptedException {
		super.setUp();
		TreeMap testMap = new <String, Object> TreeMap();
		testMap.put("testComponet", "AG_Border");
		testMap.put("testChildCaseInit", "AG_Border_Video_Border_Bottom_Right_Radius");
		testMap.put("step1",new TreeMap(){
			{
				put("click", "10");
				put("screenshot", "AG_Border_Video_Border_Bottom_Right_Radius_01_10");
			}
		});
		testMap.put("step2",new TreeMap(){
			{
				put("click", "20");
				put("screenshot", "AG_Border_Video_Border_Bottom_Right_Radius_02_20");
			}
		});
		super.setTestMap(testMap);
	}

	@Test
	public void doTest(){
		super.testByTestMap();
	}

}
