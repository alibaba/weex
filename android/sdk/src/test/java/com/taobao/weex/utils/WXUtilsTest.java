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
package com.taobao.weex.utils;

import junit.framework.TestCase;

/**
 * Created by lixinke on 16/2/24.
 */
public class WXUtilsTest extends TestCase {

    public void setUp() throws Exception {
        super.setUp();

    }

    public void testGetFloat() throws Exception {
        float test_float = WXUtils.getFloat("12324.9px");
        assertEquals(12324.9, test_float, 0.9);
    }

    public void testGetInt() throws Exception {
        int test_int = WXUtils.getInt("23px");
        assertEquals(23, test_int);
    }

    public void testGetLong() throws Exception {
        long test_long = WXUtils.getLong("8098px");
        assertEquals(8098, test_long);
    }

    public void testGetDouble() throws Exception {
        double test_Double = WXUtils.getDouble("8098.8989px");
        assertEquals(8098.8, test_Double, 0.89);
    }
}