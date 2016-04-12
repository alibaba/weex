/**
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
package com.taobao.weex.bridge;

import com.taobao.weappplus_sdk.BuildConfig;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.robolectric.RobolectricGradleTestRunner;
import org.robolectric.annotation.Config;

import java.util.Stack;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

@RunWith(RobolectricGradleTestRunner.class)
@Config(constants = BuildConfig.class)
public class WXHashMapTest {
	private WXHashMap<String, String> mWXHashMap = new WXHashMap<>();

	@Before
	public void setUp() throws Exception {
		mWXHashMap.clear();
	}

	@Test
	public void testPutKV() {
		mWXHashMap.put("one", "1");
		assertEquals("1", mWXHashMap.get("one"));
	}

	@Test
	public void testRemoveObject() {
		mWXHashMap.put("one", "1");
		mWXHashMap.remove("one");
		assertEquals(0, mWXHashMap.size());
	}

	@Test
	public void testRemoveFromMapAndStack() {
		mWXHashMap.put("one","1");
		mWXHashMap.removeFromMapAndStack("one");
		assertEquals(true,mWXHashMap.getInstanceStack().empty());
	}

	@Test
	public void testGetStackTopInstanceId() {
		mWXHashMap.setStackTopInstance("123456");
		mWXHashMap.setStackTopInstance("654321");
		String id=mWXHashMap.getStackTopInstanceId();
		assertEquals("654321",id);
	}

	@Test
	public void testSetStackTopInstance() {
		mWXHashMap.setStackTopInstance("123456");
		int size=mWXHashMap.getInstanceStack().size();
		assertEquals(1,size);
	}

	@Test
	public void testGetInstanceStack() {
		Stack<String> instance= mWXHashMap.getInstanceStack();
		assertNotNull(instance);
	}

}
