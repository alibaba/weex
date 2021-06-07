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

public class AG_CommonStyle_Input_Widthandheight extends TestFlow {
	public AG_CommonStyle_Input_Widthandheight() {
		super(WXPageActivity.class);
	}

	@Before
	public void setUp() throws InterruptedException {
		super.setUp();
		TreeMap testMap = new <String, Object> TreeMap();
		testMap.put("testComponet", "AG_CommonStyle");
		testMap.put("testChildCaseInit", "AG_CommonStyle_Input_Widthandheight");
		testMap.put("step1",new TreeMap(){
			{
				put("click", "200");
				put("screenshot", "AG_CommonStyle_Input_Widthandheight_01_200");
			}
		});
		testMap.put("step2",new TreeMap(){
			{
				put("click", "400");
				put("screenshot", "AG_CommonStyle_Input_Widthandheight_02_400");
			}
		});
		testMap.put("step3",new TreeMap(){
			{
				put("click", "200");
				put("screenshot", "AG_CommonStyle_Input_Widthandheight_03_200");
			}
		});
		testMap.put("step4",new TreeMap(){
			{
				put("click", "400");
				put("screenshot", "AG_CommonStyle_Input_Widthandheight_04_400");
			}
		});
		super.setTestMap(testMap);
	}

	@Test
	public void doTest(){
		super.testByTestMap();
	}

}
